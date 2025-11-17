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
  public List<RecipeListResponse> RecipeLists { get; set; } = new();
}

public class RecipeDataResponse : FoodsDataResponse
{
  public RecipeResponse Recipes { get; set; } = new();
  public List<RecipeResponse> RelatedRecipes { get; set; } = new();
}

public class RecipeListItemResponse
{
  public int RecipeListId { get; set; }
  public int RecipeId { get; set; }
  public int Position { get; set; }
  public DateTime CreatedAt { get; set; }
}

public class RecipeListResponse
{
  public int Id { get; set; }
  public string OwnerId { get; set; } = string.Empty;
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime UpdatedAt { get; set; }
  public List<RecipeListItemResponse> Items { get; set; } = new();
}
