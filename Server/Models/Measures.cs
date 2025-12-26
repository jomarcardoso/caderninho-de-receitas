using Microsoft.EntityFrameworkCore;

namespace Server.Models;

[Owned]
public class Measures
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
}
