using System.Collections.Generic;
using Server.Shared;

namespace Server.Models;

public class Food : INutrients
{
  public int Id { get; set; }
  public LanguageText Name { get; set; } = new();
  public LanguageText Keys { get; set; } = new();
  public LanguageText Description { get; set; } = new();
  public List<string> Imgs { get; set; } = new();
  public MeasurementUnit MeasurementUnit { get; set; }
  public Measure Measures { get; set; } = new();
  public List<string> Categories { get; set; } = new();
  public int? IconId { get; set; }
  public Icon? Icon { get; set; }
  public FoodType Type { get; set; } = FoodType.Solid;
  public NutritionalInformation NutritionalInformation { get; set; } = new();
  public Minerals Minerals { get; set; } = new();
  public Vitamins Vitamins { get; set; } = new();
  public AminoAcids AminoAcids { get; set; } = new();
  public EssentialAminoAcids EssentialAminoAcids { get; set; } = new();
  public double AminoAcidsScore { get; set; } = 0;

  public void Process()
  {
    EssentialAminoAcids = new EssentialAminoAcids(AminoAcids);
    AminoAcidsScore = EssentialAminoAcids.GetScore();
  }
}
