using Microsoft.EntityFrameworkCore;
using Server.Shared;

namespace Server.Models;

[Owned]
public class Measure
{
  public MeasureType Type { get; set; }
  public double Quantity { get; set; }
}
