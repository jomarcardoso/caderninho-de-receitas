using Server.Dtos;
using Server.Shared;

namespace Server.Response;

public class RevisionResponse<T>
{
  public int Id { get; set; }
  public T? Original { get; set; }
  public T? Proposed { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime UpdatedAt { get; set; }
  public UserProfileResponse CreatedByUser { get; set; } = new();
  public RevisionStatus Status { get; set; }
  public RevisionType Type { get; set; }
}
