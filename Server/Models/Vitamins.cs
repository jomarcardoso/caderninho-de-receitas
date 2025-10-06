using Microsoft.EntityFrameworkCore;
using Server.Shared;

namespace Server.Models;

[Owned]
public class Vitamins : VitaminsBase
{
  public Vitamins() { }

  public Vitamins(VitaminsBase vitamins, double quantity)
      : base(vitamins, quantity)
  {
  }
}