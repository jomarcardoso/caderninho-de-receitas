using Server.Shared;

namespace Server.Dtos;

public class RecipeDto : RecipeContract<RecipeStepDto>;

public class RecipeResponseDto : RecipeBase<RecipeStepResponse, int>;

public class RecipesDto : FoodsResponse
{
  public List<RecipeResponseDto> Recipes { get; set; } = new();
}
