using System.Collections.Generic;
using Server.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models;

[NotMapped]
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
  }
}

