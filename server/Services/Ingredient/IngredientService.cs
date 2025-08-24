using System.Text.RegularExpressions;
using server.Constants;
using server.Models;

namespace server.Services.Ingredient
{
    public record QuantityAndRest(string MeasureText, MeasureType MeasureType, string Rest);

    public class IngredientService
    {
        public QuantityAndRest SplitTextInMeasureAndRest(string text)
        {
            foreach (var kv in MeasurePatterns.PatternsPt)
            {
                Regex regex = kv.Value;
                Match match = regex.Match(text);
                var mesasureMatch = match.Groups["measure"];

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

        public DetailedIngredient ingredientFromText(string text)
        {
            var (measureText, measureType, restText) = SplitTextInMeasureAndRest(text);

            return new DetailedIngredient
            {
                Food = new Food(),
                Measure = new Measure(),
                Quantity = 0,
            };
        }
    }
}
