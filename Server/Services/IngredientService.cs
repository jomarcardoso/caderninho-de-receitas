using System.Text.RegularExpressions;
using Server.Constants;
using Server.Models;

namespace Server.Services;

public record QuantityAndRest(string MeasureText, MeasureType MeasureType, string Rest);

public class IngredientService
{
  public QuantityAndRest SplitTextInMeasureAndRest(string text)
  {
    foreach (var kv in MeasurePatterns.PatternsPt)
    {
      Regex regex = kv.Value;
      Match match = regex.Match(text);
      Group mesasureMatch = match.Groups["measure"];

      if (match.Success)
      {
        Console.WriteLine($"Match encontrado: {mesasureMatch.Value} em {mesasureMatch.Index}");
        return new QuantityAndRest(
            text.Substring(0, mesasureMatch.Index + mesasureMatch.Length).Trim(),
            kv.Key,
            text.Substring(mesasureMatch.Index + mesasureMatch.Length).Trim()
        );
      }
    }

    return new QuantityAndRest("", MeasureType.Literal, text);
  }

  // public Double QuantityFromMeasureTextAndMeasureType(string measureText, MeasureType measureType)
  // {

  // }

  public Ingredient ingredientFromText(string text)
  {
    var (measureText, measureType, restText) = SplitTextInMeasureAndRest(text);

    return new Ingredient
    {
      Food = new Food(),
      Measure = new Measure(),
      Quantity = 0,
    };
  }
}
