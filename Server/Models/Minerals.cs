using Microsoft.EntityFrameworkCore;
using Server.Shared;

namespace Server.Models;

[Owned]
public class Minerals : MineralsBase
{
  public Minerals() { }

  public Minerals(MineralsBase minerals, double quantity)
      : base(minerals, quantity)
  {
  }
}