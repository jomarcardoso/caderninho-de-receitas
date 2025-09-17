using Server.Shared;

namespace Server.Models;

public class Food : INutrients
{
  public int Id { get; set; }
  public LanguageText Name { get; set; } = new LanguageText();
  public LanguageText Description { get; set; } = new LanguageText();
  public string Image { get; set; } = string.Empty;
  public MeasurementUnit MeasurementUnit { get; set; }
  public Measure Measures { get; set; } = new();
  public LanguageText Keys { get; set; } = new LanguageText();
  public bool IsRecipe { get; set; }
  public string Icon { get; set; } = string.Empty;
  public FoodType Type { get; set; } = FoodType.Solid;
  public NutritionalInformation NutritionalInformation { get; set; } = new();
  public Minerals Minerals { get; set; } = new();
  public Vitamins Vitamins { get; set; } = new();
  public AminoAcids AminoAcids { get; set; } = new();
}