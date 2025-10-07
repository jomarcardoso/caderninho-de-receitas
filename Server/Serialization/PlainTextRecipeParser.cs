using System.Linq;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Server.Dtos;
using Server.Shared;

namespace Server.Serialization;

public class PlainTextRecipeParser
{
  public RecipeDto Parse(string plainText)
  {
    if (string.IsNullOrWhiteSpace(plainText))
    {
      throw new PlainTextRecipeParserException("Recipe content must not be empty.");
    }

    string trimmed = plainText.Trim();

    RecipeDto? fromJson = TryParseJson(trimmed);

    if (fromJson != null)
    {
      return Normalize(fromJson);
    }

    return ParseStructuredPlainText(trimmed);
  }

  private static RecipeDto? TryParseJson(string payload)
  {
    try
    {
      var token = JToken.Parse(payload);

      if (token.Type == JTokenType.Array)
      {
        token = token.First;
      }

      if (token is JObject obj)
      {
        var dto = obj.ToObject<RecipeDto>();

        if (dto != null && !string.IsNullOrWhiteSpace(dto.Name))
        {
          return dto;
        }
      }
    }
    catch (JsonReaderException)
    {
      // swallow - this means the payload is not json, so we fallback to plain text parsing
    }

    return null;
  }

  private static RecipeDto ParseStructuredPlainText(string content)
  {
    var recipe = new RecipeDto
    {
      Name = string.Empty,
      Keys = string.Empty,
      Description = string.Empty,
      Additional = string.Empty,
      Steps = new List<RecipeStepDto>()
    };

    var ingredients = new List<string>();
    var keys = new List<string>();
    var stepSections = new List<List<string>>();
    var currentStepBuffer = new List<string>();

    var descriptionBuilder = new StringBuilder();
    var additionalBuilder = new StringBuilder();

    var lines = new StringReader(content.Replace("\r", string.Empty));

    string? line;
    string currentSection = string.Empty;
    bool nameAssigned = false;

    while ((line = lines.ReadLine()) != null)
    {
      string trimmed = line.Trim();

      if (string.IsNullOrWhiteSpace(trimmed))
      {
        if (string.Equals(currentSection, "steps", StringComparison.OrdinalIgnoreCase)
          && currentStepBuffer.Count > 0)
        {
          stepSections.Add(new List<string>(currentStepBuffer));
          currentStepBuffer.Clear();
        }

        continue;
      }

      if (TryHandleHeader(trimmed, "Name", value =>
      {
        recipe.Name = value;
        nameAssigned = true;
      }))
      {
        currentSection = "name";
        continue;
      }

      if (TryHandleHeader(trimmed, "Keys", value =>
      {
        keys.AddRange(SplitList(value));
      }))
      {
        currentSection = "keys";
        continue;
      }

      if (TryHandleHeader(trimmed, "Description", value =>
      {
        descriptionBuilder.AppendLine(value);
      }))
      {
        currentSection = "description";
        continue;
      }

      if (TryHandleHeader(trimmed, "Additional", value =>
      {
        additionalBuilder.AppendLine(value);
      }))
      {
        currentSection = "additional";
        continue;
      }

      if (TryHandleHeader(trimmed, "Language", value =>
      {
        recipe.Language = ParseLanguage(value);
      }))
      {
        currentSection = "language";
        continue;
      }

      if (IsSectionHeader(trimmed, "Ingredients"))
      {
        currentSection = "ingredients";

        string remainder = GetHeaderValue(trimmed);

        if (!string.IsNullOrWhiteSpace(remainder))
        {
          ingredients.Add(NormalizeBullet(remainder));
        }

        continue;
      }

      if (IsSectionHeader(trimmed, "Steps"))
      {
        currentSection = "steps";

        string remainder = GetHeaderValue(trimmed);

        if (!string.IsNullOrWhiteSpace(remainder))
        {
          currentStepBuffer.Add(remainder);
        }

        continue;
      }

      switch (currentSection.ToLowerInvariant())
      {
        case "ingredients":
          ingredients.Add(NormalizeBullet(trimmed));
          break;
        case "steps":
          if (StepSeparatorRegex.IsMatch(trimmed) && currentStepBuffer.Count > 0)
          {
            stepSections.Add(new List<string>(currentStepBuffer));
            currentStepBuffer.Clear();
          }
          currentStepBuffer.Add(trimmed);
          break;
        case "description":
          descriptionBuilder.AppendLine(trimmed);
          break;
        case "additional":
          additionalBuilder.AppendLine(trimmed);
          break;
        case "keys":
          keys.AddRange(SplitList(trimmed));
          break;
        default:
          if (!nameAssigned)
          {
            recipe.Name = trimmed;
            nameAssigned = true;
          }
          else
          {
            descriptionBuilder.AppendLine(trimmed);
          }
          break;
      }
    }

    if (currentStepBuffer.Count > 0)
    {
      stepSections.Add(new List<string>(currentStepBuffer));
    }

    recipe.Description = NormalizeMultiline(descriptionBuilder);
    recipe.Additional = NormalizeMultiline(additionalBuilder);

    if (!keys.Any() && !string.IsNullOrWhiteSpace(recipe.Name))
    {
      keys.AddRange(SplitList(recipe.Name));
    }

    recipe.Keys = string.Join(',', keys.Where(k => !string.IsNullOrWhiteSpace(k))
      .Select(k => k.Trim()))
      .ToLowerInvariant();

    recipe.Steps = BuildSteps(stepSections, ingredients);

    if (recipe.Steps.Count == 0)
    {
      recipe.Steps.Add(new RecipeStepDto
      {
        Title = "Preparation",
        Preparation = !string.IsNullOrWhiteSpace(recipe.Description)
          ? recipe.Description
          : "Follow the preparation instructions provided in the recipe description.",
        Additional = recipe.Additional ?? string.Empty,
        IngredientsText = string.Join(Environment.NewLine, ingredients)
      });
    }
    else if (ingredients.Count > 0 && string.IsNullOrWhiteSpace(recipe.Steps[0].IngredientsText))
    {
      recipe.Steps[0].IngredientsText = string.Join(Environment.NewLine, ingredients);
    }

    if (string.IsNullOrWhiteSpace(recipe.Name))
    {
      throw new PlainTextRecipeParserException("The recipe name could not be identified.");
    }

    return Normalize(recipe);
  }

  private static RecipeDto Normalize(RecipeDto recipe)
  {
    recipe.Name = recipe.Name?.Trim() ?? string.Empty;
    recipe.Keys = recipe.Keys?.Trim() ?? string.Empty;
    recipe.Description = NormalizeSingleLine(recipe.Description);
    recipe.Additional = NormalizeSingleLine(recipe.Additional);
    recipe.Steps ??= new List<RecipeStepDto>();

    if (recipe.Steps.Count == 0)
    {
      recipe.Steps.Add(new RecipeStepDto
      {
        Title = "Preparation",
        Preparation = recipe.Description ?? "Follow the preparation instructions provided in the recipe description.",
        Additional = recipe.Additional ?? string.Empty,
        IngredientsText = string.Empty
      });
    }
    else
    {
      foreach (var step in recipe.Steps)
      {
        step.Title = string.IsNullOrWhiteSpace(step.Title) ? "Step" : step.Title.Trim();
        step.Preparation = NormalizeSingleLine(step.Preparation);
        step.Additional = NormalizeSingleLine(step.Additional);
        step.IngredientsText = step.IngredientsText?.Trim() ?? string.Empty;
      }
    }

    return recipe;
  }

  private static string NormalizeMultiline(StringBuilder builder)
  {
    var text = builder.ToString().Trim();
    return string.IsNullOrWhiteSpace(text) ? string.Empty : text;
  }

  private static string NormalizeSingleLine(string? value)
    => string.IsNullOrWhiteSpace(value) ? string.Empty : value.Trim();

  private static bool TryHandleHeader(string line, string header, Action<string> assign)
  {
    if (line.StartsWith(header + ":", StringComparison.OrdinalIgnoreCase))
    {
      string value = line.Substring(header.Length + 1).Trim();
      assign(value);
      return true;
    }

    return false;
  }

  private static bool IsSectionHeader(string line, string header)
    => line.StartsWith(header, StringComparison.OrdinalIgnoreCase);

  private static string GetHeaderValue(string headerLine)
  {
    int colonIndex = headerLine.IndexOf(':');
    if (colonIndex < 0)
    {
      return string.Empty;
    }

    return headerLine.Substring(colonIndex + 1).Trim();
  }

  private static string NormalizeBullet(string value)
  {
    if (value.StartsWith("- "))
    {
      return value.Substring(2).Trim();
    }

    if (value.StartsWith("* "))
    {
      return value.Substring(2).Trim();
    }

    return value.Trim();
  }

  private static IEnumerable<string> SplitList(string value)
  {
    return value.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries)
      .Select(part => part.Trim())
      .Where(part => !string.IsNullOrWhiteSpace(part));
  }

  private static Language ParseLanguage(string value)
  {
    if (Enum.TryParse<Language>(value, true, out var language))
    {
      return language;
    }

    return Language.En;
  }

  private static List<RecipeStepDto> BuildSteps(List<List<string>> sections, List<string> ingredients)
  {
    var steps = new List<RecipeStepDto>();
    int index = 1;

    foreach (var section in sections.Where(s => s.Any(line => !string.IsNullOrWhiteSpace(line))))
    {
      var step = BuildStep(section, index);

      if (index == 1 && steps.Count == 0 && ingredients.Count > 0 && string.IsNullOrWhiteSpace(step.IngredientsText))
      {
        step.IngredientsText = string.Join(Environment.NewLine, ingredients);
      }

      steps.Add(step);
      index++;
    }

    return steps;
  }

  private static RecipeStepDto BuildStep(List<string> lines, int index)
  {
    string title = $"Step {index}";
    var preparationParts = new List<string>();

    if (lines.Count > 0)
    {
      string firstLine = lines[0];
      var match = TitleWithSeparatorRegex.Match(firstLine);

      if (match.Success)
      {
        string potentialTitle = match.Groups["title"].Value.Trim();
        string remainder = match.Groups["content"].Value.Trim();

        if (!string.IsNullOrWhiteSpace(potentialTitle) && potentialTitle.Length <= 60)
        {
          title = potentialTitle;

          if (!string.IsNullOrWhiteSpace(remainder))
          {
            preparationParts.Add(remainder);
          }

          if (lines.Count > 1)
          {
            preparationParts.AddRange(lines.Skip(1));
          }
        }
        else
        {
          preparationParts.AddRange(lines);
        }
      }
      else
      {
        preparationParts.AddRange(lines);
      }
    }

    string preparation = string.Join(" ", preparationParts.Where(p => !string.IsNullOrWhiteSpace(p))).Trim();

    if (string.IsNullOrWhiteSpace(preparation))
    {
      preparation = title;
    }

    return new RecipeStepDto
    {
      Title = title,
      Preparation = preparation,
      Additional = string.Empty,
      IngredientsText = string.Empty
    };
  }

  private static readonly Regex StepSeparatorRegex = new(@"^(?:\d+\.|\d+\)|Step\s+\d+:)", RegexOptions.IgnoreCase | RegexOptions.Compiled);
  private static readonly Regex TitleWithSeparatorRegex = new(@"^(?<title>[^:]+):(?<content>.*)$", RegexOptions.Compiled);
}

public class PlainTextRecipeParserException : Exception
{
  public PlainTextRecipeParserException(string message) : base(message) { }
}



