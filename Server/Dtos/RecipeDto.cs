using Server.Models;
using Server.Shared;

namespace Server.Dtos;

public class RecipeDto : RecipeContract<RecipeStepDto>;

public class RecipeResponseDto : RecipeBase<RecipeStepResponse>;

public class RecipesDto : FoodsResponse
{
  public List<RecipeResponseDto> Recipes { get; set; } = new();
}
