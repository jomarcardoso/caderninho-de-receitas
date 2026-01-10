using System.Collections.Generic;
using Server.Shared;

namespace Server.Models;

public class RecipeStep : RecipeStepBase<Ingredient>
{
  public int Id { get; set; }

  public RecipeStep() { }

  public RecipeStep(string title, string preparation, string additional, string ingredientsText, List<Ingredient> ingredients)
    : base(title, preparation, additional, ingredientsText)
  {
    NutritionalInformation = new NutritionalInformationBase();
    Minerals = new MineralsBase();
    Vitamins = new VitaminsBase();
    AminoAcids = new AminoAcidsBase();
    EssentialAminoAcids = new EssentialAminoAcidsBase();

    Ingredients = ingredients ?? new List<Ingredient>();

    foreach (var ingredient in Ingredients)
    {
      NutritionalInformation.Add(ingredient.NutritionalInformation);
      Minerals.Add(ingredient.Minerals);
      Vitamins.Add(ingredient.Vitamins);
      AminoAcids.Add(ingredient.AminoAcids);
      EssentialAminoAcids.Add(ingredient.EssentialAminoAcids);
    }

    AminoAcidsScore = EssentialAminoAcids.GetScore();
  }
}
