namespace Server.Shared;

public class EssentialAminoAcidsBase
{
  public double Histidine { get; set; }
  public double Isoleucine { get; set; }
  public double Leucine { get; set; }
  public double Lysine { get; set; }
  public double Methionine { get; set; }
  public double Phenylalanine { get; set; }
  public double Threonine { get; set; }
  public double Tryptophan { get; set; }
  public double Valine { get; set; }

  public EssentialAminoAcidsBase() { }

  public EssentialAminoAcidsBase(AminoAcidsBase aminoAcids)
  {
    Tryptophan = aminoAcids.Tryptophan / 280;
    Phenylalanine = aminoAcids.Phenylalanine / 875;
    Leucine = aminoAcids.Leucine / 2730;
    Valine = aminoAcids.Valine / 1820;
    Isoleucine = aminoAcids.Isoleucine / 1400;
    Lysine = aminoAcids.Lysine / 2100;
    Threonine = aminoAcids.Threonine / 1050;
    Methionine = aminoAcids.Methionine / 728;
    Histidine = aminoAcids.Histidine / 700;
  }

  public double GetScore()
  {
    return new List<double>
    {
      Histidine,
      Isoleucine,
      Leucine,
      Lysine,
      Methionine,
      Phenylalanine,
      Threonine,
      Tryptophan,
      Valine
    }.Min() * 100;
  }
}