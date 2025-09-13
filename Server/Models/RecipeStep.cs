using Microsoft.EntityFrameworkCore;
using Server.Shared;

namespace Server.Models;

[Owned]
public class RecipeStep : RecipeStepBase<List<Ingredient>>
{
  public RecipeStep() { }

  public RecipeStep(string title, string preparation, string additional, List<Ingredient> ingredients)
    : base(title, preparation, additional, ingredients)
  {
    NutritionalInformation = new NutritionalInformationBase();
    Minerals = new Minerals();
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