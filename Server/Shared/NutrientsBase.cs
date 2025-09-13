namespace Server.Shared;

public interface INutrientsBase
{
  public NutritionalInformationBase NutritionalInformation { get; set; }
  public MineralsBase Minerals { get; set; }
  public VitaminsBase Vitamins { get; set; }
  public AminoAcidsBase AminoAcids { get; set; }
}