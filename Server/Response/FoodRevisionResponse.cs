using Server.Dtos;
using Server.Models;
using Server.Shared;

namespace Server.Response;

public class FoodRevisionResponse
{
  public int Id { get; set; }
  public Food Food { get; set; } = new();
  public DateTime CreatedAt { get; set; }
  public DateTime UpdatedAt { get; set; }
  public UserProfileResponse CreatedByUser { get; set; } = new();
  public RevisionStatus Status { get; set; }
  public RevisionType Type { get; set; }
}
