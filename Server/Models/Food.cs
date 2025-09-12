using Server.Shared;

namespace Server.Models;

public class Food : INutrients
{
  public List<Measure> Measures { get; set; } = new();
  public NutritionalInformation NutritionalInformation { get; set; } = new();
  public Minerals Minerals { get; set; } = new();
  public Vitamins Vitamins { get; set; } = new();
  public AminoAcids AminoAcids { get; set; } = new();
}