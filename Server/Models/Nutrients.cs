namespace Server.Models;

public interface INutrients
{
  public NutritionalInformation NutritionalInformation { get; set; }
  public Minerals Minerals { get; set; }
  public Vitamins Vitamins { get; set; }
  public AminoAcids AminoAcids { get; set; }
  public EssentialAminoAcids EssentialAminoAcids { get; set; }
  public double AminoAcidsScore { get; set; }
}