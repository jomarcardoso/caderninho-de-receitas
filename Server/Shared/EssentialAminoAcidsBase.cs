using System.Collections.Generic;
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
    Tryptophan = 2730 * aminoAcids.Tryptophan / 280;
    Phenylalanine = 2730 * aminoAcids.Phenylalanine / 875;
    Leucine = 2730 * aminoAcids.Leucine / 2730;
    Valine = 2730 * aminoAcids.Valine / 1820;
    Isoleucine = 2730 * aminoAcids.Isoleucine / 1400;
    Lysine = 2730 * aminoAcids.Lysine / 2100;
    Threonine = 2730 * aminoAcids.Threonine / 1050;
    Methionine = 2730 * aminoAcids.Methionine / 728;
    Histidine = 2730 * aminoAcids.Histidine / 700;
  }
  public EssentialAminoAcidsBase(EssentialAminoAcidsBase essentialAminoAcids, double quantity)
  {
    Tryptophan = essentialAminoAcids.Tryptophan * quantity;
    Phenylalanine = essentialAminoAcids.Phenylalanine * quantity;
    Leucine = essentialAminoAcids.Leucine * quantity;
    Valine = essentialAminoAcids.Valine * quantity;
    Isoleucine = essentialAminoAcids.Isoleucine * quantity;
    Lysine = essentialAminoAcids.Lysine * quantity;
    Threonine = essentialAminoAcids.Threonine * quantity;
    Methionine = essentialAminoAcids.Methionine * quantity;
    Histidine = essentialAminoAcids.Histidine * quantity;
  }

  public EssentialAminoAcidsBase Add(EssentialAminoAcidsBase essentialAminoAcids)
  {
    Histidine += essentialAminoAcids.Histidine;
    Isoleucine += essentialAminoAcids.Isoleucine;
    Leucine += essentialAminoAcids.Leucine;
    Lysine += essentialAminoAcids.Lysine;
    Methionine += essentialAminoAcids.Methionine;
    Phenylalanine += essentialAminoAcids.Phenylalanine;
    Threonine += essentialAminoAcids.Threonine;
    Tryptophan += essentialAminoAcids.Tryptophan;
    Valine += essentialAminoAcids.Valine;

    return this;
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
