using Microsoft.EntityFrameworkCore;
using Server.Shared;

namespace Server.Models;

[Owned]
public class NutritionalInformation : NutritionalInformationBase
{
  public NutritionalInformation() { }

  public NutritionalInformation(NutritionalInformationBase nutritionalInformation, double quantity)
      : base(nutritionalInformation, quantity)
  {
  }
}