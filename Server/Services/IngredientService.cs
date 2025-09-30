using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Server.Models;
using Server.Shared;

namespace Server.Services;

public record MeasureRegex(MeasureType Type, Regex Pattern);
public record QuantityAndRest(string MeasureText, MeasureType MeasureType, string Rest);

public static class MeasurePatterns
{
  private const RegexOptions PatternOptions = RegexOptions.IgnoreCase | RegexOptions.CultureInvariant;
  private const string NumberWords = @"(\d+(?:[.,]\d+)?|um[a]?|dois|duas|três|quatro|cinco|seis|sete|oito|nove|dez|onze|doze)";
  private const string PartialWords = @"(mei(o|a)|1/2|metade|um terço|1/3|dois terços|2/3|um quarto|1/4|três quartos|3/4)";
  private const string Quantity = $@"({NumberWords}(?:\s+{PartialWords})?(?:\s+e\s+{PartialWords})?|{PartialWords})";
  private const string PartialEnd = $@"( e {PartialWords})?";
  private const string Cup = @"((?:xícara|xicara)s?|xíc\.?)";
  private const string Spoon = @"((?:colher(?:es)?(?: de sopa)?|c\.s\.?)s?)";
  private const string TeaSpoon = @"((?:colher(?:es)?(?:inhas?| de ch(?:á|a)| pequenas?)|c\.c\.?)s?)";
  private const string Ml = @"(?:ml|mililitros?)";
  private const string Liter = @"(?:l|litros?)";
  private const string Gram = @"(?:gr?|gramas?)";
  private const string Kilo = @"(?:kg|kilo(?:grama)?s?)";
  private const string Pinch = @"pitadas?";
  private const string Can = @"latas?";
  private const string Glass = @"(?:copos?|vidros?)";
  private const string Slice = @"(?:fatias?|rodelas?)";
  private const string Breast = @"peitos?";
  private const string Clove = @"dentes?";
  private const string Bunch = @"cachos?";

  public static readonly Dictionary<MeasureType, Regex> PatternsPt = new()
    {
        { MeasureType.Cup, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Cup}{PartialEnd})\b", PatternOptions) },
        { MeasureType.TeaSpoon, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{TeaSpoon}{PartialEnd})\b", PatternOptions) },
        { MeasureType.Spoon, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Spoon}{PartialEnd})\b", PatternOptions) },
        { MeasureType.Ml, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Ml}{PartialEnd})\b", PatternOptions) },
        { MeasureType.Liter, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Liter}{PartialEnd})\b", PatternOptions) },
        { MeasureType.Gram, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Gram}{PartialEnd})\b", PatternOptions) },
        { MeasureType.Kilo, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Kilo}{PartialEnd})\b", PatternOptions) },
        { MeasureType.Breast, new Regex($@"\b(?<measure>(?:{Quantity}{PartialEnd}\s+)?{Breast})\b", PatternOptions) },
        { MeasureType.Clove, new Regex($@"\b(?<measure>(?:{Quantity}{PartialEnd}\s+)?{Clove})\b", PatternOptions) },
        { MeasureType.Bunch, new Regex($@"\b(?<measure>(?:{Quantity}{PartialEnd}\s+)?{Bunch})\b", PatternOptions) },
        { MeasureType.Can, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Can}{PartialEnd})\b", PatternOptions) },
        { MeasureType.Glass, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Glass}{PartialEnd})\b", PatternOptions) },
        { MeasureType.Slice, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Slice}{PartialEnd})\b", PatternOptions) },
        { MeasureType.Pinch, new Regex($@"\b(?<measure>{NumberWords} {Pinch})\b", PatternOptions) },
        { MeasureType.Unity, new Regex($@"\b(?<measure>{Quantity}{PartialEnd})\b", PatternOptions) },
    };
}

public class IngredientService
{
  private static readonly Regex LiteralPhraseRegex = new(@"(?:(?:a|\u00E0)\s+gosto|um\s+fio|fio\s+de|raspas?|raspa|para\s+polvilhar)", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
  private static readonly Regex LiteralByUnitRegex = new(@"\(.*\bcada\b.*\)", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);

  private string _text = string.Empty;
  public string Text
  {
    get => _text;
    set
    {
      if (!string.IsNullOrEmpty(value))
      {
        _text = StringService.ReplaceStarting(value, "- ", "").Trim();
      }
      else
      {
        _text = string.Empty;
      }
    }
  }

  private readonly FoodService foodService;

  public IngredientService(FoodService foodService)
  {
    this.foodService = foodService ?? throw new ArgumentNullException(nameof(foodService));
  }

  public QuantityAndRest SplitTextInMeasureAndRest()
  {
    var literal = TryResolveLiteralMeasure(Text);
    if (literal is not null)
    {
      return literal;
    }

    foreach (var kv in MeasurePatterns.PatternsPt)
    {
      var regex = kv.Value;
      Match match = regex.Match(Text);
      Group measureMatch = match.Groups["measure"];

      if (match.Success && !string.IsNullOrWhiteSpace(measureMatch.Value))
      {
        var measureText = Text.Substring(0, measureMatch.Index + measureMatch.Length).Trim();
        var rest = Text.Substring(measureMatch.Index + measureMatch.Length).Trim();
        var result = new QuantityAndRest(measureText, kv.Key, rest);
        return AdjustMeasureTypeByDescriptors(result, Text);
      }
    }

    var fallback = new QuantityAndRest(string.Empty, MeasureType.Unity, Text);
    return AdjustMeasureTypeByDescriptors(fallback, Text);
  }

  private static QuantityAndRest? TryResolveLiteralMeasure(string text)
  {
    var literalByUnitMatch = LiteralByUnitRegex.Match(text);
    if (literalByUnitMatch.Success)
    {
      var measureText = literalByUnitMatch.Value.Trim();
      var rest = RemoveSegment(text, literalByUnitMatch.Index, literalByUnitMatch.Length).Trim();
      rest = string.IsNullOrWhiteSpace(rest) ? text : rest;
      return new QuantityAndRest(measureText, MeasureType.Literal, rest);
    }

    var literalMatch = LiteralPhraseRegex.Match(text);
    if (literalMatch.Success)
    {
      var measureText = literalMatch.Value.Trim();
      var rest = RemoveSegment(text, literalMatch.Index, literalMatch.Length).Trim();
      rest = string.IsNullOrWhiteSpace(rest) ? text : rest;
      return new QuantityAndRest(measureText, MeasureType.Literal, rest);
    }

    return null;
  }

  private static string RemoveSegment(string text, int index, int length)
  {
    if (index < 0 || length <= 0 || index >= text.Length)
    {
      return text;
    }

    return text[..index] + text[(index + length)..];
  }

  private static QuantityAndRest AdjustMeasureTypeByDescriptors(QuantityAndRest result, string originalText)
  {
    if (result.MeasureType != MeasureType.Unity)
    {
      return result;
    }

    var tokens = GetNormalizedTokens(originalText);

    if (ContainsAnyToken(tokens, "pequeno", "pequena", "pequenos", "pequenas"))
    {
      return new QuantityAndRest(result.MeasureText, MeasureType.UnitySmall, result.Rest);
    }

    if (ContainsAnyToken(tokens, "grande", "grandes"))
    {
      return new QuantityAndRest(result.MeasureText, MeasureType.UnityLarge, result.Rest);
    }

    return result;
  }

  private static HashSet<string> GetNormalizedTokens(string text)
  {
    return Regex.Split(NormalizeToken(text), @"\s+", RegexOptions.CultureInvariant)
      .Where(token => !string.IsNullOrWhiteSpace(token))
      .ToHashSet();
  }

  private static bool ContainsAnyToken(HashSet<string> tokens, params string[] candidates)
  {
    foreach (var candidate in candidates)
    {
      if (tokens.Contains(candidate))
      {
        return true;
      }
    }

    return false;
  }

  public static double ParseMeasureQuantity(string? measureText)
  {
    if (string.IsNullOrWhiteSpace(measureText))
    {
      return 1;
    }

    var normalizedText = measureText.ToLowerInvariant().Replace(',', '.');

    double total = 0;

    void ConsumeMatches(string pattern, Func<Match, double> valueSelector)
    {
      foreach (Match match in Regex.Matches(normalizedText, pattern, RegexOptions.CultureInvariant))
      {
        total += valueSelector(match);
      }

      normalizedText = Regex.Replace(normalizedText, pattern, " ", RegexOptions.CultureInvariant);
    }

    ConsumeMatches(@"\d+\.\d+", match => double.Parse(match.Value, CultureInfo.InvariantCulture));
    ConsumeMatches(@"(\d+)\s+(\d+)/(\d+)", match =>
    {
      var whole = double.Parse(match.Groups[1].Value, CultureInfo.InvariantCulture);
      var numerator = double.Parse(match.Groups[2].Value, CultureInfo.InvariantCulture);
      var denominator = double.Parse(match.Groups[3].Value, CultureInfo.InvariantCulture);

      return whole + numerator / denominator;
    });
    ConsumeMatches(@"\d+/\d+", match =>
    {
      var parts = match.Value.Split('/');
      var numerator = double.Parse(parts[0], CultureInfo.InvariantCulture);
      var denominator = double.Parse(parts[1], CultureInfo.InvariantCulture);
      return numerator / denominator;
    });
    ConsumeMatches(@"\d+", match => double.Parse(match.Value, CultureInfo.InvariantCulture));

    var measurementWordsPattern = @"\b(?:xícaras?|xicaras?|xicara|xíc\.?|colheres?|colher(?:es)?(?: de (?:sopa|chá))?|colher(?:inhas?|inha)?|c\.s\.?|c\.c\.?|ml|mililitros?|l|litros?|gramas?|grama|gr|g|kg|kilo(?:grama)?s?|latas?|lata|copos?|copo|fatias?|fatia|pitadas?|pitada|unidades?|unidade)\b";
    normalizedText = Regex.Replace(normalizedText, measurementWordsPattern, " ", RegexOptions.CultureInvariant);
    normalizedText = Regex.Replace(normalizedText, @"\b(?:de|do|da|dos|das|para|por|com)\b", " ", RegexOptions.CultureInvariant);

    var tokens = Regex.Split(normalizedText, @"[\s\-]+", RegexOptions.CultureInvariant)
      .Where(token => !string.IsNullOrWhiteSpace(token))
      .ToList();

    var numberWords = BuildLookup(new Dictionary<string, double>
    {
      ["um"] = 1,
      ["uma"] = 1,
      ["dois"] = 2,
      ["duas"] = 2,
      ["três"] = 3,
      ["tres"] = 3,
      ["quatro"] = 4,
      ["cinco"] = 5,
      ["seis"] = 6,
      ["sete"] = 7,
      ["oito"] = 8,
      ["nove"] = 9,
      ["dez"] = 10,
      ["onze"] = 11,
      ["doze"] = 12,
    });

    var singlePartials = BuildLookup(new Dictionary<string, double>
    {
      ["meio"] = 0.5,
      ["meia"] = 0.5,
      ["metade"] = 0.5,
    });

    var multiPartials = BuildLookup(new Dictionary<string, double>
    {
      ["um terço"] = 1.0 / 3,
      ["um terco"] = 1.0 / 3,
      ["dois terços"] = 2.0 / 3,
      ["dois tercos"] = 2.0 / 3,
      ["um quarto"] = 0.25,
      ["três quartos"] = 3.0 / 4,
      ["tres quartos"] = 3.0 / 4,
    });

    for (var i = 0; i < tokens.Count; i++)
    {
      var normalizedToken = NormalizeToken(tokens[i]);

      if (string.IsNullOrEmpty(normalizedToken) || normalizedToken == "e" || normalizedToken == "&")
      {
        continue;
      }

      if (i + 1 < tokens.Count)
      {
        var nextNormalized = NormalizeToken(tokens[i + 1]);
        var pairKey = $"{normalizedToken} {nextNormalized}";
        if (multiPartials.TryGetValue(pairKey, out var pairValue))
        {
          total += pairValue;
          i += 1;
          continue;
        }
      }

      if (singlePartials.TryGetValue(normalizedToken, out var partialValue))
      {
        total += partialValue;
        continue;
      }

      if (numberWords.TryGetValue(normalizedToken, out var numberValue))
      {
        total += numberValue;
        continue;
      }

      if (double.TryParse(normalizedToken, NumberStyles.Float, CultureInfo.InvariantCulture, out var numericValue))
      {
        total += numericValue;
      }
    }

    return total > 0 ? total : 1;
  }

  private static Dictionary<string, double> BuildLookup(Dictionary<string, double> source)
  {
    return source
      .GroupBy(pair => NormalizeToken(pair.Key))
      .ToDictionary(group => group.Key, group => group.First().Value);
  }

  private static string NormalizeToken(string value)
  {
    if (string.IsNullOrWhiteSpace(value))
    {
      return string.Empty;
    }

    var normalizedForm = value.Trim().Normalize(NormalizationForm.FormD);
    var builder = new StringBuilder(normalizedForm.Length);

    foreach (var character in normalizedForm)
    {
      if (CharUnicodeInfo.GetUnicodeCategory(character) != UnicodeCategory.NonSpacingMark)
      {
        builder.Append(character);
      }
    }

    return builder.ToString().ToLowerInvariant();
  }

  public static double ConvertToLiteralQuantity(double quantity, MeasureType measureType)
  {
    return measureType switch
    {
      MeasureType.Cup => quantity * 200,      // 1 xícara = 200g açúcar (exemplo)
      MeasureType.Spoon => quantity * 15,    // 1 colher = 15g
      MeasureType.TeaSpoon => quantity * 5,  // 1 colher de chá = 5g
      _ => quantity
    };
  }

  public async Task<Ingredient> ToEntity()
  {
    var (measureText, measureType, restText) = SplitTextInMeasureAndRest();
    var food = await foodService.FindFoodByPossibleName(restText);
    var quantity = ParseMeasureQuantity(measureText);
    var grams = ConvertToLiteralQuantity(quantity, measureType);

    return new Ingredient(
      Text,
      food,
      grams,
      measureType,
      quantity
    );
  }
}
