using Server.Models;

namespace Server.Dtos;

public class IngredientDto
{
  public string Text { get; set; } = string.Empty;

  // public Ingredient ToEntity()
  // {
  //   return new Ingredient
  //   {
  //     Text = Text
  //   };
  // }
}