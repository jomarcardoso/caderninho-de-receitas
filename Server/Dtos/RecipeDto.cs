using Server.Shared;

namespace Server.Dtos;

public class RecipeDto : RecipeContract<RecipeStepDto>
{
  public List<string> Imgs { get; set; } = new();
}

public class RecipeResponseDto : RecipeBase<RecipeStepResponse, int>;

public class RecipesDto : FoodsResponse
{
  public List<RecipeResponseDto> Recipes { get; set; } = new();
}
