using Microsoft.EntityFrameworkCore;
using Server.Shared;

namespace Server.Models;

[Owned]
public class RecipeStep : RecipeStepBase<Ingredient>
{
  public RecipeStep() { }

  public RecipeStep(string title, string preparation, string additional, string ingredientsText, List<Ingredient> ingredients)
    : base(title, preparation, additional, ingredientsText)
  {
    NutritionalInformation = new NutritionalInformationBase();
    Minerals = new MineralsBase();
    Vitamins = new VitaminsBase();
    AminoAcids = new AminoAcidsBase();

    ingredients.ForEach(i =>
    {
      NutritionalInformation.Add(i.NutritionalInformation);
      Minerals.Add(i.Minerals);
      Vitamins.Add(i.Vitamins);
      AminoAcids.Add(i.AminoAcids);
    });
  }
}
