namespace Server.Shared;

public enum MeasureType
{
  Cup,
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
  public MeasureType Type { get; set; }
  public double Quantity { get; set; }
}