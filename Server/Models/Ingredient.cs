using Server.Shared;

namespace Server.Models;

public class Ingredient : Server.Shared.INutrients
{
  public int Id { get; set; }

  public string Text { get; set; } = string.Empty;
  public Food Food { get; set; } = default!;
  // literal quantity, in liters or grams
  public double Quantity { get; set; } = 0;
  // quantity described, cups, spoons...
  public MeasureType MeasureType { get; set; } = MeasureType.Unity;
  public double MeasureQuantity { get; set; } = 0;
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public MineralsBase Minerals { get; set; } = new();
  public VitaminsBase Vitamins { get; set; } = new();
  public AminoAcidsBase AminoAcids { get; set; } = new();
  public EssentialAminoAcidsBase EssentialAminoAcids { get; set; } = new();
  public double AminoAcidsScore { get; set; } = 0;

  public Ingredient() { }

  public Ingredient(string text, Food food, double quantity, MeasureType measureType, double measureQuantity)
  {
    Text = text;
    Food = food;
    Quantity = quantity;
    MeasureType = measureType;
    MeasureQuantity = measureQuantity;
    NutritionalInformation = new NutritionalInformationBase(food.NutritionalInformation, quantity);
    Minerals = new MineralsBase(food.Minerals, quantity);
    Vitamins = new VitaminsBase(food.Vitamins, quantity);
    AminoAcids = new AminoAcidsBase(food.AminoAcids, quantity);
    EssentialAminoAcids = new EssentialAminoAcidsBase(food.EssentialAminoAcids, quantity);
    AminoAcidsScore = food.AminoAcidsScore;
  }
}
