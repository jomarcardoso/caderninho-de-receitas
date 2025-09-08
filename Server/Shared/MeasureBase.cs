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

public class Measure
{
  public int Id { get; set; }
  public MeasureType Type { get; set; }
  public double Quantity { get; set; }
}