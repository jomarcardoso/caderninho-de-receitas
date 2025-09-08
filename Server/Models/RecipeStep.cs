using Server.Shared;

namespace Server.Models;

public class RecipeStep : RecipeStepBase<List<Ingredient>>
{
  public int Id { get; set; }

  public RecipeStep() { }

  public RecipeStep(string title, string preparation, string additional, List<Ingredient> ingredients)
    : base(title, preparation, additional, ingredients)
  {
    NutritionalInformation = new NutritionalInformation();
    Minerals = new Minerals();
    Vitamins = new Vitamins();
    AminoAcids = new AminoAcids();

    ingredients.ForEach(i =>
    {
      NutritionalInformation.Add(i.NutritionalInformation);
      Minerals.Add(i.Minerals);
      Vitamins.Add(i.Vitamins);
      AminoAcids.Add(i.AminoAcids);
    });
  }
}