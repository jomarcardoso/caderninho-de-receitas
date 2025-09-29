using System.Text.RegularExpressions;
using Server.Models;
using Server.Shared;

namespace Server.Services;

public record MeasureRegex(MeasureType Type, Regex Pattern);
public record QuantityAndRest(string MeasureText, MeasureType MeasureType, string Rest);

// const LITERAL_REGEX = /(^\d*\s?m?li?t?r?o?\s)|(^\d*\s?k?i?l?o?gr?a?m?a?s?\s)|(\([a-zA-Z\d\s]*k?i?l?o?gr?a?m?a?s?\s?c?a?d?a?\))|(^\d*\s?kg\s)|(^\d*\s?kilos\s)|(^\d*\s?kilo\s)|(\(.*\d*\s?kilos?\))|(\(\d*\s?m?li?t?r?o?\))/;

// export function getLiteralQuantity(string = ''): number {
//   return Number(
//     string
//       .match(LITERAL_REGEX)?.[0]
//       ?.replace(/\s/g, '')
//       ?.replace(/[a-z]/g, '')
//       ?.replace(/\(/g, '')
//       ?.replace(/\)/g, ''),
//   );
// }

// export function verifyIsLiteralByUnit(string = ''): boolean {
//   return /\(.*cada.*\)/.test(string);
// }

// export function measureTypeFromString(string: string): Measure['type'] {
//   let type: Measurer = 'UNITY';

//   if (string.includes('peito')) {
//     type = 'BREAST';
//   }

//   if (string.includes(' lata')) {
//     type = 'CAN';
//   }

//   if (string.includes(' vidro')) {
//     type = 'GLASS';
//   }

//   if (string.includes(' cacho')) {
//     type = 'BUNCH';
//   }

//   if (string.includes('dente')) {
//     type = 'CLOVE';
//   }

//   if (string.includes('colher')) {
//     type = 'TABLE_SPOON';
//   }

//   if (string.match(/.*colher.*chá.*/)) {
//     type = 'TEA_SPOON';
//   }

//   if (string.includes('fatia') || string.includes('rodela')) {
//     type = 'SLICE';
//   }

//   if (string.includes('folha')) {
//     type = 'UNITY';
//   }

//   if (type === 'UNITY') {
//     if (string.includes('pequeno') || string.includes('pequena')) {
//       type = 'UNITY_SMALL';
//     }

//     if (string.includes('grande')) {
//       type = 'UNITY_LARGE';
//     }
//   }

//   if (
//     string.includes('xícara') ||
//     string.includes('xícara (chá)') ||
//     string.includes('xícaras (chá)') ||
//     string.includes('xicara') ||
//     string.includes('copo')
//   ) {
//     type = 'CUP';
//   }

//   if (verifyIsLiteral(string)) type = 'LITERAL';

//   if (
//     string.includes('a gosto') ||
//     string.startsWith('um fio') ||
//     string.includes('à gosto') ||
//     string.includes('para polvilhar') ||
//     string.includes('pitada') ||
//     /((^|\s)raspas?\s)/.test(string)
//   ) {
//     type = 'LITERAL';
//   }

//   return type;
// }

// function measureFromString(text = ''): Measure {
//   const lowText = text.toLowerCase();
//   const type = measureTypeFromString(lowText);

//   const valueSplit = lowText.split(' ') || [];
//   const quantityString =
//     valueSplit.find((statement) => /^\d{1,}/.test(statement)) || '';

//   let quantity = Number(
//     quantityString
//       .replace(/½/g, '')
//       .replace(/1\/2/g, '')
//       .replace(/⅓/g, '')
//       .replace(/1\/3/g, '')
//       .replace(/⅔/g, '')
//       .replace(/2\/3/g, '')
//       .replace(/¼/g, '')
//       .replace(/1\/4/g, '')
//       .replace(/\D/, ''),
//   );

//   if (valueSplit.find((statement) => statement === 'duas')) quantity = 2;

//   if (isNaN(quantity) || !quantity) quantity = 1;

//   if (
//     lowText.includes('e meio') ||
//     lowText.includes('e meia') ||
//     lowText.includes('e ½') ||
//     /\d\s?½/.test(lowText) ||
//     lowText.includes('e 1/2') ||
//     /\d 1\/2/.test(lowText)
//   ) {
//     quantity += 0.5;
//   }

//   if (
//     lowText.includes('e um terço') ||
//     lowText.includes('e ⅓') ||
//     /\d\s?⅓/.test(lowText) ||
//     lowText.includes('e 1/3') ||
//     /\d 1\/3/.test(lowText)
//   ) {
//     quantity += 0.333;
//   }

//   if (
//     lowText.includes('e dois terços') ||
//     lowText.includes('e ⅔') ||
//     /\d\s?⅔/.test(lowText) ||
//     lowText.includes('e ⅔') ||
//     /\d 2\/3/.test(lowText)
//   ) {
//     quantity += 0.666;
//   }

//   if (
//     lowText.includes('e um quarto') ||
//     lowText.includes('¼') ||
//     /\d\s?¼/.test(lowText) ||
//     lowText.includes('e 1/4') ||
//     /\d 1\/4/.test(lowText)
//   ) {
//     quantity += 0.25;
//   }

//   if (
//     lowText.startsWith('meio') ||
//     lowText.startsWith('meia') ||
//     lowText.startsWith('1/2') ||
//     lowText.startsWith('½')
//   ) {
//     quantity = 0.5;
//   }

//   if (
//     lowText.startsWith('um terço') ||
//     lowText.startsWith('1/3') ||
//     lowText.startsWith('⅓')
//   ) {
//     quantity = 0.333;
//   }

//   if (
//     lowText.startsWith('um terço') ||
//     lowText.startsWith('2/3') ||
//     lowText.startsWith('⅔')
//   ) {
//     quantity = 0.666;
//   }

//   if (
//     lowText.startsWith('um quarto') ||
//     lowText.startsWith('1/4') ||
//     lowText.startsWith('¼')
//   ) {
//     quantity = 0.25;
//   }

//   const isInKiloGram = lowText.includes('kg');

//   if (type === 'LITERAL') {
//     quantity = getLiteralQuantity(lowText);

//     if (isInKiloGram) {
//       quantity *= 1000;
//     }
//   }

//   const isLiteralByUnit = verifyIsLiteralByUnit(lowText);

//   if (isLiteralByUnit) {
//     const units = Number(lowText.match(/^\d/)?.[0] ?? 2);

//     quantity *= units;
//   }

//   if (
//     lowText.includes('a gosto') ||
//     lowText.includes('à gosto') ||
//     lowText.includes('pitada') ||
//     lowText.includes('para polvilhar') ||
//     /((^|\s)raspas?\s)/.test(lowText)
//   ) {
//     quantity = 0;
//   }

//   return {
//     quantity,
//     type,
//   };
// }

public static class MeasurePatterns
{
  private const string NumberWords = @"(\d+(?:[.,]\d+)?|um[a]?|dois|duas|três|quatro|cinco|seis|sete|oito|nove|dez|onze|doze)";
  private const string PartialWords = @"(mei(o|a)|1/2|metade|um terço|1/3|dois terços|2/3|um quarto|1/4|três quartos|3/4)";
  private const string Quantity = $@"({NumberWords}(?:\s+{PartialWords})?(?:\s+e\s+{PartialWords})?|{PartialWords})";
  private const string PartialEnd = $@"( e {PartialWords})?";
  private const string Cup = @"((?:xícara|xicara)s?|xíc\.?)";
  private const string Spoon = @"((?:colher(?:es)?(?: de sopa)?|c\.s\.?)s?)";
  private const string TeaSpoon = @"((?:colher(?:es)?(?:inhas?| de chá| pequenas?)|c\.c\.?)s?)";
  private const string Ml = @"(?:ml|mililitros?)";
  private const string Liter = @"(?:l|litros?)";
  private const string Gram = @"(?:gr?|gramas?)";
  private const string Kilo = @"(?:kg|kilo(?:grama)?s?)";
  private const string Pinch = @"pitadas?";
  private const string Can = @"latas?";
  private const string Glass = @"copos?";
  private const string Slice = @"fatias?";

  public static readonly Dictionary<MeasureType, Regex> PatternsPt = new()
    {
        { MeasureType.Cup, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Cup}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.TeaSpoon, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{TeaSpoon}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Spoon, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Spoon}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Ml, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Ml}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Liter, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Liter}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Gram, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Gram}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Kilo, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Kilo}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Can, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Can}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Glass, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Glass}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Slice, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Slice}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Pinch, new Regex($@"\b(?<measure>{NumberWords} {Pinch})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Unity, new Regex($@"\b(?<measure>{Quantity}{PartialEnd})\b", RegexOptions.IgnoreCase) },
    };
}

public class IngredientService
{
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

  public IngredientService(FoodService _foodService)
  {
    foodService = _foodService ?? throw new ArgumentNullException(nameof(foodService));
  }

  public QuantityAndRest SplitTextInMeasureAndRest()
  {
    foreach (var kv in MeasurePatterns.PatternsPt)
    {
      Regex regex = kv.Value;
      Match match = regex.Match(Text);
      Group mesasureMatch = match.Groups["measure"];

      if (match.Success)
      {
        return new QuantityAndRest(
            Text.Substring(0, mesasureMatch.Index + mesasureMatch.Length).Trim(),
            kv.Key,
            Text.Substring(mesasureMatch.Index + mesasureMatch.Length).Trim()
        );
      }
    }

    return new QuantityAndRest("", MeasureType.Unity, Text);
  }

  public static double ParseMeasureQuantity(string measureText, MeasureType measureType)
  {
    // Aqui você converte "2", "1/2", "meio" etc. em número
    // Exemplo simples:
    if (measureText.Contains("meio") || measureText.Contains("1/2"))
      return 0.5;

    if (double.TryParse(Regex.Match(measureText, @"\d+").Value, out var number))
      return number;

    return 1; // default
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

  //   public static double GetQuantityByMeasure(MeasureType measureType, Food food)
  //   {
  //     if (measureType == MeasureType.Literal) return food.;


  //     if (measureType == "CUP")
  //     {
  //       if (food.type == "seed")
  //       {
  //         quantity = 200;
  //       }
  //       else if (food.type == "powder")
  //       {
  //         quantity = 120;
  //       }
  //       else if (food.type == "oil")
  //       {
  //         quantity = 180;
  //       }
  //       else
  //       {
  //         quantity = 240;
  //       }
  //     }

  //     if (measureType == "TABLE_SPOON")
  //     {
  //       if (food.type == "powder")
  //       {
  //         quantity = 7.5;
  //       }
  //       else
  //       {
  //         quantity = 15;
  //       }
  //     }

  //     if (measureType == "TEA_SPOON")
  //     {
  //       if (food.type == "powder")
  //       {
  //         quantity = 1.5;
  //       }
  //       else
  //       {
  //         quantity = 5;
  //       }
  //     }

  //     if (measureType == "UNITY_LARGE")
  //     {
  //       quantity =
  //         (food.oneMeasures.find((oneMeasure) => oneMeasure.type == "UNITY")
  //           ?.quantity ?? quantity) * 1.2;
  //     }

  //     if (measureType == "UNITY_SMALL")
  //     {
  //       quantity =
  //         (food.oneMeasures.find((oneMeasure) => oneMeasure.type == "UNITY")
  //           ?.quantity ?? quantity) * 0.8;
  //     }
  //   }

  //   return measureType.quantity* quantity;
  // }

  public async Task<Ingredient> ToEntity()
  {
    var (measureText, measureType, restText) = SplitTextInMeasureAndRest();
    var food = await foodService.FindFoodByPossibleName(restText); // instância do Food
    var quantity = ParseMeasureQuantity(measureText, measureType);
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
