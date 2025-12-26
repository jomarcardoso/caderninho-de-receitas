using Server.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models;

[NotMapped]
public class Ingredient : INutrients
{
  public string Text { get; set; } = string.Empty;
  public Food Food { get; set; } = default!;
  // literal quantity, in liters or grams
  public double Quantity { get; set; } = 0;
  // quantity described, cups, spoons...
  public MeasureType MeasureType { get; set; } = MeasureType.Unity;
  public double MeasureQuantity { get; set; } = 0;
  public NutritionalInformation NutritionalInformation { get; set; } = new();
  public Minerals Minerals { get; set; } = new();
  public Vitamins Vitamins { get; set; } = new();
  public AminoAcids AminoAcids { get; set; } = new();
  public EssentialAminoAcids EssentialAminoAcids { get; set; } = new();
  public double AminoAcidsScore { get; set; } = 0;

  public Ingredient() { }

  public Ingredient(string text, Food food, double quantity, MeasureType measureType, double measureQuantity)
  {
    Text = text;
    Food = food;
    Quantity = quantity;
    MeasureType = measureType;
    MeasureQuantity = measureQuantity;
    NutritionalInformation = new NutritionalInformation(food.NutritionalInformation, quantity);
    Minerals = new Minerals(food.Minerals, quantity);
    Vitamins = new Vitamins(food.Vitamins, quantity);
    AminoAcids = new AminoAcids(food.AminoAcids, quantity);
    EssentialAminoAcids = new EssentialAminoAcids(food.EssentialAminoAcids, quantity);
    AminoAcidsScore = food.AminoAcidsScore;
  }
}
