using server.Models;

namespace server.Dtos;

public class IngredientDto
{
  public string Text { get; set; } = string.Empty;

  public Ingredient ToEntity()
  {
    return new Ingredient
    {
      Text = Text
    };
  }
}