using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Server.PreProcessing;

public class PlainTextRecipePreProcessor
{
  private static readonly string[] IngredientHeaders =
  {
    "ingredients",
    "ingredient list",
    "ingredientes"
  };

  private static readonly string[] StepHeaders =
  {
    "steps",
    "instructions",
    "directions",
    "method",
    "preparation",
    "modo de preparo"
  };

  private static readonly string[] DescriptionHeaders =
  {
    "description",
    "about",
    "summary",
    "overview"
  };

  private static readonly string[] AdditionalHeaders =
  {
    "additional",
    "notes",
    "tips",
    "observations",
    "observacoes"
  };

  private static readonly string[] KeysHeaders =
  {
    "keys",
    "keywords",
    "tags",
    "categories",
    "labels"
  };

  private static readonly string[] AllHeaders = IngredientHeaders
    .Concat(StepHeaders)
    .Concat(DescriptionHeaders)
    .Concat(AdditionalHeaders)
    .Concat(KeysHeaders)
    .ToArray();

  private static readonly Regex StepPrefixRegex = new(@"^(\d+\.|\d+\)|step\s+\d+:)", RegexOptions.IgnoreCase | RegexOptions.Compiled);
  private static readonly char[] BulletCharacters = { '-', '*', '•', '–', '—' };

  public string Normalize(string plainText)
  {
    if (string.IsNullOrWhiteSpace(plainText))
    {
      throw new PlainTextRecipePreProcessorException("Recipe content must not be empty.");
    }

    string trimmed = plainText.Trim();

    if (LooksLikeJson(trimmed) || LooksStructured(trimmed))
    {
      return trimmed;
    }

    var lines = trimmed
      .Replace("\r", string.Empty)
      .Split('\n')
      .Select(line => line.Trim())
      .ToList();

    string name = ExtractName(lines, out int startIndex);

    if (string.IsNullOrWhiteSpace(name))
    {
      throw new PlainTextRecipePreProcessorException("The recipe name could not be identified.");
    }

    var description = new List<string>();
    var keys = new List<string>();
    var ingredients = new List<string>();
    var steps = new List<string>();
    var additional = new List<string>();

    string currentSection = "description";

    for (int i = startIndex; i < lines.Count; i++)
    {
      string line = lines[i];

      if (string.IsNullOrWhiteSpace(line))
      {
        continue;
      }

      if (TryMatchHeader(line, KeysHeaders, out string keysRemainder))
      {
        currentSection = "keys";
        if (!string.IsNullOrWhiteSpace(keysRemainder))
        {
          keys.AddRange(SplitList(keysRemainder));
        }
        continue;
      }

      if (TryMatchHeader(line, IngredientHeaders, out string ingredientRemainder))
      {
        currentSection = "ingredients";
        if (!string.IsNullOrWhiteSpace(ingredientRemainder))
        {
          ingredients.Add(NormalizeBullet(ingredientRemainder));
        }
        continue;
      }

      if (TryMatchHeader(line, StepHeaders, out string stepRemainder))
      {
        currentSection = "steps";
        if (!string.IsNullOrWhiteSpace(stepRemainder))
        {
          steps.Add(NormalizeStep(stepRemainder));
        }
        continue;
      }

      if (TryMatchHeader(line, DescriptionHeaders, out string descriptionRemainder))
      {
        currentSection = "description";
        if (!string.IsNullOrWhiteSpace(descriptionRemainder))
        {
          description.Add(descriptionRemainder);
        }
        continue;
      }

      if (TryMatchHeader(line, AdditionalHeaders, out string additionalRemainder))
      {
        currentSection = "additional";
        if (!string.IsNullOrWhiteSpace(additionalRemainder))
        {
          additional.Add(additionalRemainder);
        }
        continue;
      }

      switch (currentSection)
      {
        case "keys":
          keys.AddRange(SplitList(line));
          break;
        case "ingredients":
          ingredients.Add(NormalizeBullet(line));
          break;
        case "steps":
          steps.Add(NormalizeStep(line));
          break;
        case "additional":
          additional.Add(line);
          break;
        default:
          if (IsLikelyIngredient(line))
          {
            ingredients.Add(NormalizeBullet(line));
            currentSection = "ingredients";
          }
          else if (IsLikelyStep(line))
          {
            steps.Add(NormalizeStep(line));
            currentSection = "steps";
          }
          else if (LooksLikeKeyLine(line))
          {
            string[] parts = line.Split(':', 2);
            if (parts.Length == 2)
            {
              keys.AddRange(SplitList(parts[1]));
            }
            else
            {
              keys.AddRange(SplitList(line));
            }
            currentSection = "keys";
          }
          else
          {
            description.Add(line);
          }
          break;
      }
    }

    if (keys.Count == 0)
    {
      keys.AddRange(SplitList(name));
    }

    if (steps.Count == 0)
    {
      if (description.Count > 0)
      {
        steps.Add(description[0]);
      }
      else
      {
        steps.Add($"Prepare {name} following the provided instructions.");
      }
    }

    var builder = new StringBuilder();
    builder.AppendLine($"Name: {name}");
    builder.AppendLine($"Keys: {string.Join(",", NormalizeKeys(keys))}");

    if (description.Count > 0)
    {
      builder.AppendLine($"Description: {description[0]}");
      for (int i = 1; i < description.Count; i++)
      {
        builder.AppendLine(description[i]);
      }
    }

    builder.AppendLine("Ingredients:");
    if (ingredients.Count == 0)
    {
      builder.AppendLine("- Ingredients not specified");
    }
    else
    {
      foreach (string ingredient in ingredients)
      {
        builder.AppendLine($"- {ingredient}");
      }
    }

    builder.AppendLine("Steps:");
    for (int i = 0; i < steps.Count; i++)
    {
      string step = steps[i];
      builder.AppendLine($"{i + 1}. {step}");
    }

    if (additional.Count > 0)
    {
      builder.AppendLine("Additional:");
      foreach (string note in additional)
      {
        builder.AppendLine(note);
      }
    }

    return builder.ToString().Trim();
  }

  private static IEnumerable<string> NormalizeKeys(IEnumerable<string> rawKeys)
  {
    return rawKeys
      .Select(k => k.Trim())
      .Where(k => !string.IsNullOrWhiteSpace(k))
      .Select(k => k.ToLowerInvariant())
      .Distinct();
  }

  private static bool LooksLikeJson(string value) => value.StartsWith("{") || value.StartsWith("[");

  private static bool LooksStructured(string value)
    => value.Split('\n').Any(line => line.TrimStart().StartsWith("Name:", StringComparison.OrdinalIgnoreCase));

  private static string ExtractName(IReadOnlyList<string> lines, out int startIndex)
  {
    startIndex = 0;

    for (int i = 0; i < lines.Count; i++)
    {
      string line = lines[i];

      if (string.IsNullOrWhiteSpace(line))
      {
        continue;
      }

      if (IsHeaderLine(line) || IsLikelyIngredient(line) || IsLikelyStep(line) || LooksLikeKeyLine(line))
      {
        continue;
      }

      startIndex = i + 1;
      return line;
    }

    return string.Empty;
  }

  private static bool TryMatchHeader(string line, IReadOnlyCollection<string> headers, out string remainder)
  {
    remainder = string.Empty;
    string trimmed = line.Trim();

    foreach (string header in headers)
    {
      if (trimmed.Equals(header, StringComparison.OrdinalIgnoreCase))
      {
        return true;
      }

      if (trimmed.StartsWith(header + ":", StringComparison.OrdinalIgnoreCase))
      {
        remainder = trimmed.Substring(header.Length + 1).Trim();
        return true;
      }

      if (trimmed.StartsWith(header + "-", StringComparison.OrdinalIgnoreCase))
      {
        remainder = trimmed.Substring(header.Length + 1).Trim();
        return true;
      }
    }

    return false;
  }

  private static IEnumerable<string> SplitList(string value)
  {
    return value.Split(new[] { ',', ';', '|' }, StringSplitOptions.RemoveEmptyEntries)
      .Select(part => part.Trim())
      .Where(part => !string.IsNullOrWhiteSpace(part));
  }

  private static string NormalizeBullet(string value)
  {
    string trimmed = value.Trim();
    trimmed = trimmed.TrimStart(BulletCharacters).Trim();
    return trimmed;
  }

  private static string NormalizeStep(string value)
  {
    string trimmed = value.Trim();

    var match = StepPrefixRegex.Match(trimmed);
    if (match.Success)
    {
      return trimmed.Substring(match.Length).Trim();
    }

    return trimmed;
  }

  private static bool IsLikelyIngredient(string line)
  {
    string trimmed = line.Trim();

    if (trimmed.StartsWith("- ") || trimmed.StartsWith("* ") || trimmed.StartsWith("• "))
    {
      return true;
    }

    if (Regex.IsMatch(trimmed, @"^\d+\s*(g|gr|kg|ml|l|cup|cups|tbsp|tsp|tablespoon|teaspoon|oz|ounce|ounces|mg|ml)\b", RegexOptions.IgnoreCase))
    {
      return true;
    }

    return false;
  }

  private static bool IsLikelyStep(string line)
  {
    string trimmed = line.Trim();
    return StepPrefixRegex.IsMatch(trimmed) || trimmed.StartsWith("Step", StringComparison.OrdinalIgnoreCase);
  }

  private static bool LooksLikeKeyLine(string line)
  {
    string trimmed = line.Trim();
    if (trimmed.Contains(':'))
    {
      trimmed = trimmed.Split(':', 2)[0];
    }

    return KeysHeaders.Any(header => trimmed.StartsWith(header, StringComparison.OrdinalIgnoreCase));
  }

  private static bool IsHeaderLine(string line)
    => TryMatchHeader(line, AllHeaders, out _);
}

public class PlainTextRecipePreProcessorException : Exception
{
  public PlainTextRecipePreProcessorException(string message) : base(message)
  {
  }
}
