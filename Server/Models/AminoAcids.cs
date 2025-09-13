using Microsoft.EntityFrameworkCore;
using Server.Shared;

namespace Server.Models;

[Owned]
public class AminoAcids : AminoAcidsBase
{
  public AminoAcids() { }

  public AminoAcids(AminoAcidsBase aminoAcids, double quantity)
      : base(aminoAcids, quantity)
  {
  }
}