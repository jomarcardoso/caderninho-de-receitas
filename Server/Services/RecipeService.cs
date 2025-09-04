using Server.Dtos;
using Server.Models;

namespace Server.Services;

public class RecipeService
{
  private readonly IngredientService ingredientService;

  public RecipeService(IngredientService _ingredientService)
  {
    ingredientService = _ingredientService ?? throw new ArgumentNullException(nameof(ingredientService));
  }
  public async Task<Recipe> DtoToEntity(RecipeDto recipeDto)
  {
    var steps = new List<RecipeStep>();

    foreach (var stepDto in recipeDto.Steps)
    {
      var ingredients = new List<Ingredient>();
      foreach (var text in stepDto.Ingredients.Split("\n"))
      {
        ingredientService.Text = text;
        var ingredient = await ingredientService.ToEntity();
        ingredients.Add(ingredient);
      }

      steps.Add(new RecipeStep
      {
        Name = stepDto.Name,
        IngredientsText = stepDto.Ingredients,
        Preparation = stepDto.Preparation,
        Additional = stepDto.Additional,
        Ingredients = ingredients
      });
    }

    return new Recipe
    {
      Name = recipeDto.Name ?? string.Empty,
      Description = recipeDto.Description,
      Additional = recipeDto.Additional,
      steps = steps
    };
  }
}
