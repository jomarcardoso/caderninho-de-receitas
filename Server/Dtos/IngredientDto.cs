using Server.Response;
using Server.Shared;

namespace Server.Dtos;

public class IngredientResponse
{
  public string Text { get; set; } = string.Empty;
  public FoodSummaryResponse Food { get; set; } = new();
  public double Quantity { get; set; } = 0;
  public MeasureType MeasureType { get; set; } = MeasureType.Unity;
  public double MeasureQuantity { get; set; } = 0;
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public MineralsBase Minerals { get; set; } = new();
  public VitaminsBase Vitamins { get; set; } = new();
  public AminoAcidsBase AminoAcids { get; set; } = new();
  public EssentialAminoAcidsBase EssentialAminoAcids { get; set; } = new();
}
