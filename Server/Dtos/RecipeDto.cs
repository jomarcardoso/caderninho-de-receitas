using Server.Shared;

namespace Server.Dtos;

public class RecipeDto : RecipeContract<RecipeStepDto>
{
  public List<string> Imgs { get; set; } = new();
}

public class RecipeResponse : RecipeBase<RecipeStepResponse, int>;

public class RecipesDataResponse : FoodsDataResponse
{
  public List<RecipeResponse> Recipes { get; set; } = new();
  public List<Server.Models.RecipeList> RecipeLists { get; set; } = new();
}

public class RecipeDataResponse : FoodsDataResponse
{
  public RecipeResponse Recipes { get; set; } = new();
  public List<RecipeResponse> RelatedRecipes { get; set; } = new();
}
