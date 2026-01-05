using Server.Response;
using System.Collections.Generic;

namespace Server.Dtos;

public class WorkspaceResponse
{
  public UserProfileResponse UserProfile { get; set; } = new();
  public List<RecipeListSummaryResponse> RecipeLists { get; set; } = new();
  public List<RecipeItemSummaryResponse> Recipes { get; set; } = new();
}

public class WorkspaceIndexResponse
{
  public UserProfileResponse UserProfile { get; set; } = new();
  public List<RecipeListIndexResponse> RecipeLists { get; set; } = new();
  public List<RecipeIndexResponse> Recipes { get; set; } = new();
}
