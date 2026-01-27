using Server.Dtos;
using Server.Shared;

namespace Server.Response;

public class RecipeCategoryRevisionResponse
{
  public int Id { get; set; }
  public RecipeCategoryResponse RecipeCategory { get; set; } = new();
  public DateTime CreatedAt { get; set; }
  public DateTime UpdatedAt { get; set; }
  public UserProfileResponse CreatedByUser { get; set; } = new();
  public RevisionStatus Status { get; set; }
  public RevisionType Type { get; set; }
}
