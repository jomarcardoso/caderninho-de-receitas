namespace Server.Shared;

public class AminoAcids
{
  public double Alanine { get; set; }
  public double Arginine { get; set; }
  public double AsparticAcid { get; set; }
  public double Cystine { get; set; }
  public double GlutamicAcid { get; set; }
  public double Glutamine { get; set; }
  public double Glycine { get; set; }
  public double Histidine { get; set; }
  public double Isoleucine { get; set; }
  public double Leucine { get; set; }
  public double Lysine { get; set; }
  public double Methionine { get; set; }
  public double Phenylalanine { get; set; }
  public double Proline { get; set; }
  public double Serine { get; set; }
  public double Threonine { get; set; }
  public double Tryptophan { get; set; }
  public double Tyrosine { get; set; }
  public double Valine { get; set; }

  public AminoAcids() { }

  public AminoAcids(AminoAcids aminoAcids, double quantity)
  {
    Alanine = aminoAcids.Alanine * quantity / 100;
    Arginine = aminoAcids.Arginine * quantity / 100;
    AsparticAcid = aminoAcids.AsparticAcid * quantity / 100;
    Cystine = aminoAcids.Cystine * quantity / 100;
    GlutamicAcid = aminoAcids.GlutamicAcid * quantity / 100;
    Glutamine = aminoAcids.Glutamine * quantity / 100;
    Glycine = aminoAcids.Glycine * quantity / 100;
    Histidine = aminoAcids.Histidine * quantity / 100;
    Isoleucine = aminoAcids.Isoleucine * quantity / 100;
    Leucine = aminoAcids.Leucine * quantity / 100;
    Lysine = aminoAcids.Lysine * quantity / 100;
    Methionine = aminoAcids.Methionine * quantity / 100;
    Phenylalanine = aminoAcids.Phenylalanine * quantity / 100;
    Proline = aminoAcids.Proline * quantity / 100;
    Serine = aminoAcids.Serine * quantity / 100;
    Threonine = aminoAcids.Threonine * quantity / 100;
    Tryptophan = aminoAcids.Tryptophan * quantity / 100;
    Tyrosine = aminoAcids.Tyrosine * quantity / 100;
    Valine = aminoAcids.Valine * quantity / 100;
  }

  public AminoAcids Add(AminoAcids aminoAcids)
  {

    Alanine += aminoAcids.Alanine;
    Arginine += aminoAcids.Arginine;
    AsparticAcid += aminoAcids.AsparticAcid;
    Cystine += aminoAcids.Cystine;
    GlutamicAcid += aminoAcids.GlutamicAcid;
    Glutamine += aminoAcids.Glutamine;
    Glycine += aminoAcids.Glycine;
    Histidine += aminoAcids.Histidine;
    Isoleucine += aminoAcids.Isoleucine;
    Leucine += aminoAcids.Leucine;
    Lysine += aminoAcids.Lysine;
    Methionine += aminoAcids.Methionine;
    Phenylalanine += aminoAcids.Phenylalanine;
    Proline += aminoAcids.Proline;
    Serine += aminoAcids.Serine;
    Threonine += aminoAcids.Threonine;
    Tryptophan += aminoAcids.Tryptophan;
    Tyrosine += aminoAcids.Tyrosine;
    Valine += aminoAcids.Valine;

    return this;
  }
}