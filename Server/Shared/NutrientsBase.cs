namespace Server.Shared;

public interface Nutrients
{
  public NutritionalInformation NutritionalInformation { get; set; }
  public Minerals Minerals { get; set; }
  public Vitamins Vitamins { get; set; }
  public AminoAcids AminoAcids { get; set; }
}