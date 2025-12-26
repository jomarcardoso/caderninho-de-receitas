namespace Server.Shared;

public enum MeasureType
{
  Cup,
  SmallCup,
  Spoon,
  TeaSpoon,
  Unity,
  UnitySmall,
  UnityLarge,
  Literal,
  Can,
  Glass,
  Breast,
  Clove,
  Slice,
  Bunch,
  Ml,
  Liter,
  Gram,
  Kilo,
  Pinch
}

public class MeasureBase
{
  public double? Cup { get; set; }
  public double? SmallCup { get; set; }
  public double? Spoon { get; set; }
  public double? TeaSpoon { get; set; }
  public double? Unity { get; set; }
  public double? UnitySmall { get; set; }
  public double? UnityLarge { get; set; }
  public double? Can { get; set; }
  public double? Glass { get; set; }
  public double? Breast { get; set; }
  public double? Clove { get; set; }
  public double? Slice { get; set; }
  public double? Bunch { get; set; }
  public double? Pinch { get; set; }

  static MeasureBase()
  {
    var enumValues = Enum.GetNames<MeasureType>();
    var properties = typeof(MeasureBase).GetProperties().Select(p => p.Name).ToHashSet();
    var missing = enumValues.Except(properties).ToList();
    if (missing.Any())
    {
      throw new InvalidOperationException(
        $"MeasureBase is missing properties for: {string.Join(", ", missing)}");
    }
  }
}
