using System.Globalization;
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

  private const string NumberWordsPt = @"(\d+(?:[.,]\d+)?(?:[\u00BC-\u00BE\u2150-\u215E\u2189])?|[\u00BC-\u00BE\u2150-\u215E\u2189]|um[a]?|dois|duas|três|quatro|cinco|seis|sete|oito|nove|dez|onze|doze)";
  private const string PartialWordsPt = @"(mei(o|a)|1/2|metade|um terço|1/3|dois terços|2/3|um quarto|1/4|três quartos|3/4)";
  private const string QuantityPt = $@"({NumberWordsPt}(?:\s+{PartialWordsPt})?(?:\s+e\s+{PartialWordsPt})?|{PartialWordsPt})";
  private const string PartialEndPt = $@"( e {PartialWordsPt})?";
  private const string CupPt = @"((?:xícara|xicara)s?|xíc\.?)";
  private const string SmallCupPt = @"((?:xícara|xicara)s?\s*(?:\(\s*caf(?:é|e)\s*\)|\s+de\s+caf(?:é|e)))";
  private const string SpoonPt = @"((?:colher(?:es)?(?: de sopa)?|c\.s\.?)s?)";
  private const string TeaSpoonPt = @"((?:colher(?:es)?(?:inhas?| de ch(?:á|a)| \(\s*ch(?:á|a)\s*\)| pequenas?)|c\.c\.?)s?)";
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

  private const string PrepositionPt = @"(?:\s*(?:de|do|da|dos|das)\s+)?";
  private const string UnitParenOptPt = @"(?:\s*\([^)]*\))?";

  public static readonly Dictionary<MeasureType, Regex> PatternsPt = new()
  {
    { MeasureType.Cup, new Regex($@"(?<!\S)(?<measure>{QuantityPt}{PartialEndPt}\s*{PrepositionPt}{CupPt}{UnitParenOptPt}{PartialEndPt})(?=\s|$)", PatternOptions) },
    { MeasureType.SmallCup, new Regex($@"(?<!\S)(?<measure>{QuantityPt}{PartialEndPt}\s*{PrepositionPt}{SmallCupPt}{UnitParenOptPt}{PartialEndPt})(?=\s|$)", PatternOptions) },
    { MeasureType.TeaSpoon, new Regex($@"(?<!\S)(?<measure>{QuantityPt}{PartialEndPt}\s*{PrepositionPt}{TeaSpoonPt}{UnitParenOptPt}{PartialEndPt})(?=\s|$)", PatternOptions) },
    { MeasureType.Spoon, new Regex($@"(?<!\S)(?<measure>{QuantityPt}{PartialEndPt}\s*{PrepositionPt}{SpoonPt}{UnitParenOptPt}{PartialEndPt})(?=\s|$)", PatternOptions) },
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
    { MeasureType.Unity, new Regex($@"^\s*(?<measure>{QuantityPt}{PartialEndPt})(?=\s|$)", PatternOptions) },
  };

  private const string NumberWordsEn = @"(\d+(?:[.,]\d+|[\u00BC-\u00BE\u2150-\u215E\u2189])?|[\u00BC-\u00BE\u2150-\u215E\u2189]|an?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)";
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

  private const string PrepositionEn = @"(?:\s*of)?";
  private const string UnitParenOptEn = @"(?:\s*\([^)]*\))?";

  public static readonly Dictionary<MeasureType, Regex> PatternsEn = new()
  {
    { MeasureType.Cup, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn}{OptionalArticleEn}\s*{PrepositionEn}\s*{CupEn}{UnitParenOptEn}{PartialEndEn})\b", PatternOptions) },
    { MeasureType.TeaSpoon, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn}{OptionalArticleEn}\s*{PrepositionEn}\s*{TeaSpoonEn}{UnitParenOptEn}{PartialEndEn})\b", PatternOptions) },
    { MeasureType.Spoon, new Regex($@"\b(?<measure>{QuantityEn}{PartialEndEn}{OptionalArticleEn}\s*{PrepositionEn}\s*{SpoonEn}{UnitParenOptEn}{PartialEndEn})\b", PatternOptions) },
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
    { MeasureType.Unity, new Regex($@"^\s*(?<measure>{QuantityEn}{PartialEndEn})(?=\s|$)", PatternOptions) },
  };

  public static IEnumerable<KeyValuePair<MeasureType, Regex>> OrderedPatterns
  {
    get
    {
      // Define explicit, stable order to avoid Dictionary enumeration variance.
      var orderPt = new[]
      {
        MeasureType.SmallCup,
        MeasureType.Cup,
        MeasureType.TeaSpoon,
        MeasureType.Spoon,
        MeasureType.Ml,
        MeasureType.Liter,
        MeasureType.Gram,
        MeasureType.Kilo,
        MeasureType.Breast,
        MeasureType.Clove,
        MeasureType.Bunch,
        MeasureType.Can,
        MeasureType.Glass,
        MeasureType.Slice,
        MeasureType.Pinch
      };

      foreach (var type in orderPt)
      {
        if (PatternsPt.TryGetValue(type, out var rx))
          yield return new KeyValuePair<MeasureType, Regex>(type, rx);
      }

      var orderEn = orderPt; // same preference for EN
      foreach (var type in orderEn)
      {
        if (PatternsEn.TryGetValue(type, out var rx))
          yield return new KeyValuePair<MeasureType, Regex>(type, rx);
      }

      if (PatternsPt.TryGetValue(MeasureType.Unity, out var unityPt))
        yield return new KeyValuePair<MeasureType, Regex>(MeasureType.Unity, unityPt);
      if (PatternsEn.TryGetValue(MeasureType.Unity, out var unityEn))
        yield return new KeyValuePair<MeasureType, Regex>(MeasureType.Unity, unityEn);
    }
  }
}

  public class IngredientService
  {
  private static readonly Regex TrailingExplicitWeightRegex = new(
    @"\((?:(?!\().)*?(?<num>\d+(?:[.,]\d+)?)\s*(?<unit>g|gr|gramas?|grama|kg|kilo(?:grama)?s?|quil(?:o|ograma)s?|ml|mililitros?|mililitro|l|litros?|litro)\s*\)",
    RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled | RegexOptions.RightToLeft);
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

  private static readonly IReadOnlyDictionary<char, string> FractionCharacterReplacements = new Dictionary<char, string>
  {
    ['¼'] = "1/4",   // U+00BC
    ['½'] = "1/2",   // U+00BD
    ['¾'] = "3/4",   // U+00BE
    ['?'] = "1/7",   // U+2150
    ['?'] = "1/9",   // U+2151
    ['?'] = "1/10",  // U+2152
    ['?'] = "1/3",   // U+2153
    ['?'] = "2/3",   // U+2154
    ['?'] = "1/5",   // U+2155
    ['?'] = "2/5",   // U+2156
    ['?'] = "3/5",   // U+2157
    ['?'] = "4/5",   // U+2158
    ['?'] = "1/6",   // U+2159
    ['?'] = "5/6",   // U+215A
    ['?'] = "1/8",   // U+215B
    ['?'] = "3/8",   // U+215C
    ['?'] = "5/8",   // U+215D
    ['?'] = "7/8"    // U+215E
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

    // match on original text to preserve unicode fractions

    foreach (var kv in MeasurePatterns.OrderedPatterns)
    {
      var regex = kv.Value;
      Match match = regex.Match(Text);
      Group measureMatch = match.Groups["measure"];

      if (match.Success && !string.IsNullOrWhiteSpace(measureMatch.Value))
      {
        // usa o valor do grupo, não substring do Text original
        var measureText = Text.Substring(measureMatch.Index, Math.Min(measureMatch.Length, Math.Max(0, Text.Length - measureMatch.Index))).Trim();

        // calcula resto a partir do texto original
        var rest = Text.Substring(Math.Min(Text.Length, match.Index + match.Length)).Trim();

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

      // If the literal phrase denotes a purpose suffix (e.g., starts with "para" or "for"),
      // drop everything from the start of that phrase to the end to avoid leaving tails like
      // "a bancada" that pollute the food name. Otherwise, only remove the matched segment.
      string rest;
      var startsWithPurpose = Regex.IsMatch(measureText, @"^(?:para|for)\b", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
      if (startsWithPurpose)
      {
        rest = text[..literalMatch.Index].Trim();
      }
      else
      {
        rest = RemoveSegment(text, literalMatch.Index, literalMatch.Length).Trim();
      }

      // If nothing meaningful remains, fall back to the original text so downstream filters can act.
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

  private static string ReplaceFractionCharacters(string value)
  {
    if (string.IsNullOrWhiteSpace(value))
    {
      return string.Empty;
    }

    var builder = new StringBuilder(value.Length + 8);

    for (var i = 0; i < value.Length; i++)
    {
      var current = value[i];

      if (FractionCharacterReplacements.TryGetValue(current, out var replacement))
      {
        if (builder.Length > 0 && !char.IsWhiteSpace(builder[builder.Length - 1]))
        {
          builder.Append(' ');
        }

        builder.Append(replacement);

        if (i + 1 < value.Length && !char.IsWhiteSpace(value[i + 1]))
        {
          builder.Append(' ');
        }
      }
      else
      {
        double __nv = CharUnicodeInfo.GetNumericValue(current); if(__nv > 0 && __nv < 1 && !char.IsDigit(current)) { if (builder.Length > 0 && !char.IsWhiteSpace(builder[builder.Length - 1])) { builder.Append(' ');} builder.Append(__nv.ToString(System.Globalization.CultureInfo.InvariantCulture)); if (i + 1 < value.Length && !char.IsWhiteSpace(value[i + 1])) { builder.Append(' ');} } else { builder.Append(current);}
      }
    }

    return Regex.Replace(builder.ToString(), @"\s+", " ").Trim();
  }

  public static double ParseMeasureQuantity(string? measureText)
  {
    if (string.IsNullOrWhiteSpace(measureText))
    {
      return 1;
    }

    var normalizedText = ReplaceFractionCharacters(measureText).ToLowerInvariant().Replace(',', '.');

    // Accumulate any remaining unicode fraction characters (defensive)
    double unicodeTotal = 0;
    {
      var sb = new StringBuilder(normalizedText.Length + 8);
      for (var __i = 0; __i < normalizedText.Length; __i++)
      {
        var ch = normalizedText[__i];
        double nv = CharUnicodeInfo.GetNumericValue(ch);
        if (nv > 0 && nv < 1 && !char.IsDigit(ch))
        {
          unicodeTotal += nv;
          if (sb.Length > 0 && !char.IsWhiteSpace(sb[sb.Length - 1])) sb.Append(' ');
          if (__i + 1 < normalizedText.Length && !char.IsWhiteSpace(normalizedText[__i + 1])) sb.Append(' ');
        }
        else
        {
          sb.Append(ch);
        }
      }
      normalizedText = sb.ToString();
    }

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

    return (total + unicodeTotal) > 0 ? (total + unicodeTotal) : 1;
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

    public static double ConvertToLiteralQuantity(double quantity, MeasureType measureType, Food food)
  {
    // Always return grams
    // Direct units
    if (measureType == MeasureType.Gram) return quantity;
    if (measureType == MeasureType.Kilo) return quantity * 1000d;

    // ml/liter measures should be converted to grams (1 ml = 1 g)
    if (measureType == MeasureType.Ml) return quantity; // ml equals grams
    if (measureType == MeasureType.Liter) return quantity * 1000d;

    // Try per-food mapping first
    double? perFoodUnit = measureType switch
    {
      MeasureType.Cup => food.Measures.Cup,
      MeasureType.SmallCup => food.Measures.SmallCup,
      MeasureType.Spoon => food.Measures.Spoon,
      MeasureType.TeaSpoon => food.Measures.TeaSpoon,
      MeasureType.Unity => food.Measures.Unity,
      MeasureType.UnitySmall => food.Measures.UnitySmall,
      MeasureType.UnityLarge => food.Measures.UnityLarge,
      MeasureType.Can => food.Measures.Can,
      MeasureType.Glass => food.Measures.Glass,
      MeasureType.Breast => food.Measures.Breast,
      MeasureType.Clove => food.Measures.Clove,
      MeasureType.Slice => food.Measures.Slice,
      MeasureType.Bunch => food.Measures.Bunch,
      MeasureType.Pinch => food.Measures.Pinch,
      _ => null
    };

    if (perFoodUnit.HasValue)
    {
      // Per-food mappings are already in the food's base unit:
      // - Gram-based foods: values are grams
      // - Liter-based foods: values are milliliters (1 ml = 1 g)
      // So in both cases, just multiply by the mapped value.
      return quantity * perFoodUnit.Value;
    }

    // Fallback heuristics when no per-food mapping is available
    if (food.MeasurementUnit == MeasurementUnit.Gram)
    {
      // Approximate grams for volume-based measures
      return measureType switch
      {
        MeasureType.Cup => quantity * 100d,
        MeasureType.SmallCup => quantity * 70d,
        MeasureType.Spoon => quantity * 15d,
        MeasureType.TeaSpoon => quantity * 5d,
        _ => quantity // default to grams already
      };
    }

    if (food.MeasurementUnit == MeasurementUnit.Liter)
    {
      // Convert volume approximations to ml then to grams (1 ml = 1 g)
      var ml = measureType switch
      {
        MeasureType.Cup => quantity * 240d,
        MeasureType.SmallCup => quantity * 70d,
        MeasureType.Spoon => quantity * 15d,
        MeasureType.TeaSpoon => quantity * 5d,
        MeasureType.Glass => quantity * 190d,
        _ => quantity * 1000d // default assume quantity is liters -> grams
      };
      return ml; // ml equals grams under this assumption
    }

    return quantity;
  }

  
  public async Task<Ingredient> ToEntity()
  {
    var (measureText, measureType, restText) = SplitTextInMeasureAndRest();
    var food = await foodService.FindFoodByPossibleName(restText);

    // Default quantity parsed from the detected measure (e.g., cups/spoons)
    var quantity = ParseMeasureQuantity(measureText);

    // If there is an explicit weight/volume at the end (e.g., "(cerca de 740 g)"),
    // prefer that over volumetric measures like cups/spoons.
    // This avoids double-conversion and respects explicit final quantities.
    var explicitWeightMatch = TrailingExplicitWeightRegex.Match(Text);
    if (explicitWeightMatch.Success)
    {
      var numText = explicitWeightMatch.Groups["num"].Value.Replace(',', '.');
      if (double.TryParse(numText, NumberStyles.Float, CultureInfo.InvariantCulture, out var explicitValue))
      {
        var unit = explicitWeightMatch.Groups["unit"].Value.Trim().ToLowerInvariant();

        // Normalize to grams (1 ml = 1 g; 1 l = 1000 g)
        if (unit is "g" or "gr" or "grama" or "gramas")
        {
          measureType = MeasureType.Gram;
          quantity = explicitValue;
        }
        else if (unit.StartsWith("kg") || unit.StartsWith("kilo") || unit.StartsWith("quil"))
        {
          measureType = MeasureType.Gram;
          quantity = explicitValue * 1000d;
        }
        else if (unit is "ml" or "mililitro" or "mililitros")
        {
          measureType = MeasureType.Gram;
          quantity = explicitValue; // 1 ml ~= 1 g
        }
        else if (unit is "l" or "litro" or "litros")
        {
          measureType = MeasureType.Gram;
          quantity = explicitValue * 1000d; // 1 l = 1000 g
        }
      }
    }

    // If there's no parsed measure and the text is a purpose-only mention ("para/for ..."),
    // treat it as a food match only without converting to grams/ml. Keep quantity = 1.
    var isPurposeOnly = string.IsNullOrWhiteSpace(measureText) && Regex.IsMatch(Text, @"\b(para|for)\b", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);

    var grams = isPurposeOnly
      ? 1d
      : ConvertToLiteralQuantity(quantity, measureType, food);

    return new Ingredient(
      Text,
      food,
      grams,
      measureType,
      quantity
    );
  }
}
