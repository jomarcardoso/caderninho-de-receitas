using Server.Shared;

namespace Server.Dtos;

public class RecipeDto : RecipeContract<RecipeStepDto>
{
  public List<string> Imgs { get; set; } = new();
}

public class AuthorSummary
{
  public string Id { get; set; } = string.Empty;
  public string? DisplayName { get; set; }
  public string? PictureUrl { get; set; }
}

public class RecipeResponse : RecipeBase<RecipeStepResponse, int>
{
  public AuthorSummary? Author { get; set; }
  public bool IsOwner { get; set; } = false;
}

public class RecipesDataResponse : FoodsDataResponse
{
  public List<RecipeResponse> Recipes { get; set; } = new();
  public List<Models.RecipeList> RecipeLists { get; set; } = new();
}

public class RecipeDataResponse : FoodsDataResponse
{
  public RecipeResponse Recipes { get; set; } = new();
  public List<RecipeResponse> RelatedRecipes { get; set; } = new();
}
