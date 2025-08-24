namespace server.Constants;

using System.Text.RegularExpressions;
using server.Models;

public record MeasureRegex(MeasureType Type, Regex Pattern);

public static class MeasurePatterns
{
  private const string NumberWords = @"(\d*|um[a]?|dois|duas|três|quatro|cinco|seis|sete|oito|nove|dez|onze|doze)";
  private const string PartialWords = @"(mei(o|a)|1/2|metade|um terço|1/3|dois terços|2/3|um quarto|1/4|três quartos|3/4)";
  private const string Quantity = $"({NumberWords}|{PartialWords})";
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
        { MeasureType.Cup, new Regex($@"\b(?<measure>{Quantity}{Cup}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.TeaSpoon, new Regex($@"\b(?<measure>{Quantity}{TeaSpoon}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Spoon, new Regex($@"\b(?<measure>{Quantity}{Spoon}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Ml, new Regex($@"\b(?<measure>{Quantity}\s?{Ml})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Liter, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Liter}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Gram, new Regex($@"\b(?<measure>{Quantity}\s?{Gram})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Kilo, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Kilo}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Can, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Can}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Glass, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Glass}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Slice, new Regex($@"\b(?<measure>{Quantity}{PartialEnd}\s?{Slice}{PartialEnd})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Pinch, new Regex($@"\b(?<measure>{NumberWords} {Pinch})\b", RegexOptions.IgnoreCase) },
        { MeasureType.Unity, new Regex($@"\b(?<measure>{Quantity}{PartialEnd})\b", RegexOptions.IgnoreCase) },
    };
}
