using System.Collections.Generic;
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
  private const RegexOptions PatternOptions = RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled;

  private const string NumberWordsPt = @"(\d+(?:[.,]\d+)?|um[a]?|dois|duas|três|quatro|cinco|seis|sete|oito|nove|dez|onze|doze)";
  private const string PartialWordsPt = @"(mei(o|a)|1/2|metade|um terço|1/3|dois terços|2/3|um quarto|1/4|três quartos|3/4)";
  private const string QuantityPt = $@"({NumberWordsPt}(?:\s+{PartialWordsPt})?(?:\s+e\s+{PartialWordsPt})?|{PartialWordsPt})";
  private const string PartialEndPt = $@"( e {PartialWordsPt})?";
  private const string CupPt = @"((?:xícara|xicara)s?|xíc\.?)";
  private const string SpoonPt = @"((?:colher(?:es)?(?: de sopa)?|c\.s\.?)s?)";
  private const string TeaSpoonPt = @"((?:colher(?:es)?(?:inhas?| de ch(?:á|a)| pequenas?)|c\.c\.?)s?)";
  private const string MlPt = @"(?:ml|mililitros?)";
  private const string LiterPt = @"(?:l|litros?)";
  private const string GramPt = @"(?:gr?|gramas?)";
  private const string KiloPt = @"(?:kg|kilo(?:grama)?s?)";
  private const string PinchPt = @"pitadas?";
  private const string CanPt = @"latas?";
  private const string GlassPt = @"(?:copos?|vidros?)";
  private const string SlicePt = @"(?:fatias?|rodelas?)";
  private const string BreastPt = @"peitos?";
  private const string ClovePt = @"dentes?";
  private const string BunchPt = @"cachos?";

  public static readonly Dictionary<MeasureType, Regex> PatternsPt = new()
  {
    { MeasureType.Cup, new Regex($@"\b(?<measure>{QuantityPt}{PartialEndPt}\s?{CupPt}{PartialEndPt})\b", PatternOptions) },
    { MeasureType.TeaSpoon, new Regex($@"\b(?<measure>{QuantityPt}{PartialEndPt}\s?{TeaSpoonPt}{PartialEndPt})\b", PatternOptions) },
    { MeasureType.Spoon, new Regex($@"\b(?<measure>{QuantityPt}{PartialEndPt}\s?{SpoonPt}{PartialEndPt})\b", PatternOptions) },
    { MeasureType.Ml, new Regex($@"\b(?<measure>{QuantityPt}{PartialEndPt}\s?{MlPt}{PartialEndPt})\b", PatternOptions) },
    { MeasureType.Liter, new Regex($@"\b(?<measure>{QuantityPt}{PartialEndPt}\s?{LiterPt}{PartialEndPt})\b", PatternOptions) },
    { MeasureType.Gram, new Regex($@"\b(?<measure>{QuantityPt}{PartialEndPt}\s?{GramPt}{PartialEndPt})\b", PatternOptions) },
    { MeasureType.Kilo, new Regex($@"\b(?<measure>{QuantityPt}{PartialEndPt}\s?{KiloPt}{PartialEndPt})\b", PatternOptions) },
    { MeasureType.Breast, new Regex($@"\b(?<measure>(?:{QuantityPt}{PartialEndPt}\s+)?{BreastPt})\b", PatternOptions) },
    { MeasureType.Clove, new Regex($@"\b(?<measure>(?:{QuantityPt}{PartialEndPt}\s+)?{ClovePt})\b", PatternOptions) },
    { MeasureType.Bunch, new Regex($@"\b(?<measure>(?:{QuantityPt}{PartialEndPt}\s+)?{BunchPt})\b", PatternOptions) },
    { MeasureType.Can, new Regex($@"\b(?<measure>{QuantityPt}{PartialEndPt}\s?{CanPt}{PartialEndPt})\b", PatternOptions) },
    { MeasureType.Glass, new Regex($@"\b(?<measure>{QuantityPt}{PartialEndPt}\s?{GlassPt}{PartialEndPt})\b", PatternOptions) },
    { MeasureType.Slice, new Regex($@"\b(?<measure>{QuantityPt}{PartialEndPt}\s?{SlicePt}{PartialEndPt})\b", PatternOptions) },
    { MeasureType.Pinch, new Regex($@"\b(?<measure>{NumberWordsPt}\s+{PinchPt})\b", PatternOptions) },
    { MeasureType.Unity, new Regex($@"\b(?<measure>{QuantityPt}{PartialEndPt})\b", PatternOptions) },
  };

  private const string NumberWordsEn = @"(\d+(?:[.,]\d+)?|an?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)";
  private const string PartialWordsEn = @"(half|1/2|one half|a half|two thirds|2/3|one third|a third|three quarters|3/4|one quarter|a quarter|quarter|third)";
  private const string QuantityEn = $@"({NumberWordsEn}(?:\s+{PartialWordsEn})?(?:\s+and\s+{PartialWordsEn})?|{PartialWordsEn})";
  private const string PartialEndEn = $@"(?:\s+and\s+{PartialWordsEn})?";
  private const string OptionalArticleEn = @"(?:\s+(?:a|an))?";
  private const string CupEn = @"((?:cup)s?|c(?:up)?\.?)";
  private const string SpoonEn = @"((?:tablespoons?|tbsp\.?|tb\.?|tbs\.?))";
  private const string TeaSpoonEn = @"((?:teaspoons?|tsp\.?))";
  private const string MlEn = @"(?:ml|millilit(?:er|re)s?)";
  private const string LiterEn = @"(?:l|lit(?:er|re)s?)";
  private const string GramEn = @"(?:g|gr(?:ams?)?|gram(?:s)?)";
  private const string KiloEn = @"(?:kg|kilogram(?:s)?|kilogramme(?:s)?|kilo(?:s)?)";
  private const string PinchEn = @"pinch(?:es)?";
  private const string CanEn = @"(?:cans?|tins?)";
  private const string GlassEn = @"(?:glass(?:es)?)";
  private const string SliceEn = @"(?:slice(?:s)?)";
  private const string BreastEn = @"(?:breast(?:s)?)";
  private const string CloveEn = @"(?:clove(?:s)?)";
  private const string BunchEn = @"(?:bunch(?:es)?)";

  public static readonly Dictionary<MeasureType, Regex> PatternsEn = new()
  {
    { MeasureType.Cup, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn}{OptionalArticleEn}\s?{CupEn}{PartialEndEn})\b", PatternOptions) },
    { MeasureType.TeaSpoon, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn}{OptionalArticleEn}\s?{TeaSpoonEn}{PartialEndEn})\b", PatternOptions) },
    { MeasureType.Spoon, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn}{OptionalArticleEn}\s?{SpoonEn}{PartialEndEn})\b", PatternOptions) },
    { MeasureType.Ml, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn}\s?{MlEn}{PartialEndEn})\b", PatternOptions) },
    { MeasureType.Liter, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn}\s?{LiterEn}{PartialEndEn})\b", PatternOptions) },
    { MeasureType.Gram, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn}\s?{GramEn}{PartialEndEn})\b", PatternOptions) },
    { MeasureType.Kilo, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn}\s?{KiloEn}{PartialEndEn})\b", PatternOptions) },
    { MeasureType.Breast, new Regex($@"\b(?<measure>(?:{QuantityEn}{PartialEndEn}\s+)?{BreastEn})\b", PatternOptions) },
    { MeasureType.Clove, new Regex($@"\b(?<measure>(?:{QuantityEn}{PartialEndEn}\s+)?{CloveEn})\b", PatternOptions) },
    { MeasureType.Bunch, new Regex($@"\b(?<measure>(?:{QuantityEn}{PartialEndEn}\s+)?{BunchEn})\b", PatternOptions) },
    { MeasureType.Can, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn}{OptionalArticleEn}\s?{CanEn}{PartialEndEn})\b", PatternOptions) },
    { MeasureType.Glass, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn}{OptionalArticleEn}\s?{GlassEn}{PartialEndEn})\b", PatternOptions) },
    { MeasureType.Slice, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn}{OptionalArticleEn}\s?{SliceEn}{PartialEndEn})\b", PatternOptions) },
    { MeasureType.Pinch, new Regex($@"\b(?<measure>(?:{NumberWordsEn}\s+)?{PinchEn})\b", PatternOptions) },
    { MeasureType.Unity, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn})\b", PatternOptions) },
  };

  public static IEnumerable<KeyValuePair<MeasureType, Regex>> OrderedPatterns
  {
    get
    {
      foreach (var pair in PatternsPt.Where(entry => entry.Key != MeasureType.Unity))
      {
        yield return pair;
      }

      foreach (var pair in PatternsEn.Where(entry => entry.Key != MeasureType.Unity))
      {
        yield return pair;
      }

      if (PatternsPt.TryGetValue(MeasureType.Unity, out var unityPt))
      {
        yield return new KeyValuePair<MeasureType, Regex>(MeasureType.Unity, unityPt);
      }

      if (PatternsEn.TryGetValue(MeasureType.Unity, out var unityEn))
      {
        yield return new KeyValuePair<MeasureType, Regex>(MeasureType.Unity, unityEn);
      }
    }
  }
}

public class IngredientService
{
  private static readonly Regex LiteralPhraseRegex = new(@"(?:(?:a|\u00E0)\s+gosto|um\s+fio|fio\s+de|raspas?|raspa|para\s+polvilhar|to\s+taste|as\s+needed|a\s+drizzle|drizzle\s+of|for\s+sprinkling)", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled);
  private static readonly Regex LiteralByUnitRegex = new(@"\(.*\b(cada|each|per)\b.*\)", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled);
  private static readonly HashSet<string> TokensToSkip = new(StringComparer.Ordinal)
  {
    "e",
    "&",
    "and",
    "a",
    "an",
    "of",
    "the",
    "per",
    "each",
    "for",
    "with",
    "de",
    "do",
    "da",
    "dos",
    "das",
    "para",
    "por",
    "com"
  };

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

    foreach (var kv in MeasurePatterns.OrderedPatterns)
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

    if (ContainsAnyToken(tokens, "pequeno", "pequena", "pequenos", "pequenas", "small", "little", "tiny"))
    {
      return new QuantityAndRest(result.MeasureText, MeasureType.UnitySmall, result.Rest);
    }

    if (ContainsAnyToken(tokens, "grande", "grandes", "large", "big", "huge"))
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
      foreach (Match match in Regex.Matches(normalizedText, pattern, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant))
      {
        total += valueSelector(match);
      }

      normalizedText = Regex.Replace(normalizedText, pattern, " ", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
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

    var measurementWordsPattern = @"\b(?:xícaras?|xicaras?|xicara|xíc\.?|colheres?|colher(?:es)?(?: de (?:sopa|chá))?|colher(?:inhas?|inha)?|c\.s\.?|c\.c\.?|ml|mililitros?|l|litros?|gramas?|grama|gr|g|kg|kilo(?:grama)?s?|latas?|lata|copos?|copo|fatias?|fatia|pitadas?|pitada|unidades?|unidade|cups?|cup|c(?:up)?\.?|tablespoons?|tablespoon|tbsp\.?|tb\.?|tbs\.?|teaspoons?|teaspoon|tsp\.?|millilit(?:er|re)s?|lit(?:er|re)s?|grams?|gram|kilograms?|kilogrammes?|kilos?|pinches?|pinch|cans?|can|tins?|glass(?:es)?|slice(?:s)?|clove(?:s)?|breast(?:s)?|bunch(?:es)?|units?|unit)\b";
    normalizedText = Regex.Replace(normalizedText, measurementWordsPattern, " ", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
    normalizedText = Regex.Replace(normalizedText, @"\b(?:de|do|da|dos|das|para|por|com|of|the|for|with|per|each)\b", " ", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);

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
      ["one"] = 1,
      ["two"] = 2,
      ["three"] = 3,
      ["four"] = 4,
      ["five"] = 5,
      ["six"] = 6,
      ["seven"] = 7,
      ["eight"] = 8,
      ["nine"] = 9,
      ["ten"] = 10,
      ["eleven"] = 11,
      ["twelve"] = 12,
      ["a"] = 1,
      ["an"] = 1,
      ["single"] = 1,
      ["couple"] = 2,
    });

    var singlePartials = BuildLookup(new Dictionary<string, double>
    {
      ["meio"] = 0.5,
      ["meia"] = 0.5,
      ["metade"] = 0.5,
      ["half"] = 0.5,
      ["quarter"] = 0.25,
      ["third"] = 1.0 / 3,
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
      ["one third"] = 1.0 / 3,
      ["a third"] = 1.0 / 3,
      ["two thirds"] = 2.0 / 3,
      ["one quarter"] = 0.25,
      ["a quarter"] = 0.25,
      ["three quarters"] = 3.0 / 4,
      ["one half"] = 0.5,
      ["a half"] = 0.5,
    });

    for (var i = 0; i < tokens.Count; i++)
    {
      var normalizedToken = NormalizeToken(tokens[i]);

      if (string.IsNullOrEmpty(normalizedToken) || TokensToSkip.Contains(normalizedToken))
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



