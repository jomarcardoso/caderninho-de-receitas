using Server.Shared;

namespace Server.Models;

public class Food : FoodBase, INutrients
{
  new public LanguageText Name { get; set; } = new LanguageText();
  new public LanguageText Keys { get; set; } = new LanguageText();
  new public LanguageText Description { get; set; } = new LanguageText();
  new public Measure Measures { get; set; } = new();
  new public NutritionalInformation NutritionalInformation { get; set; } = new();
  new public Minerals Minerals { get; set; } = new();
  new public Vitamins Vitamins { get; set; } = new();
  new public AminoAcids AminoAcids { get; set; } = new();
  public EssentialAminoAcids EssentialAminoAcids { get; set; } = new();
  public double AminoAcidsScore { get; set; } = 0;

  public void Process()
  {
    EssentialAminoAcids = new EssentialAminoAcids(AminoAcids);
    AminoAcidsScore = EssentialAminoAcids.GetScore();
  }
}