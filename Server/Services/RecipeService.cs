using Server.Dtos;
using Server.Models;

namespace Server.Services;

public class RecipeService
{
  public Recipe DtoToEntity(RecipeDto recipeDto)
  {
    return new Recipe
    {
      Name = recipeDto.Name ?? string.Empty,
      Description = recipeDto.Description,
      Additional = recipeDto.Additional,
      // steps = recipeDto.Steps.
    };
  }
}
