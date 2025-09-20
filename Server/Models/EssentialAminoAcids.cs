using Microsoft.EntityFrameworkCore;
using Server.Shared;

namespace Server.Models;

[Owned]
public class EssentialAminoAcids : EssentialAminoAcidsBase
{
  public EssentialAminoAcids() { }

  public EssentialAminoAcids(AminoAcidsBase aminoAcids)
      : base(aminoAcids)
  {
  }
}