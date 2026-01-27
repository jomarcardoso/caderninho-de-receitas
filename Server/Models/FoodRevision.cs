using Server.Shared;

namespace Server.Models;

public class FoodRevision
{
  public int Id { get; set; }

  public int? FoodId { get; set; }

  // JSON payload of the proposed food snapshot (FoodDto).
  public string Payload { get; set; } = string.Empty;

  public RevisionStatus Status { get; set; } = RevisionStatus.PendingReview;
  public RevisionType Type { get; set; } = RevisionType.Update;

  // Audit
  public string CreatedByUserId { get; set; } = string.Empty;
  public UserProfile? CreatedByUser { get; set; }
  public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;

  // Review
  public string? ReviewedByUserId { get; set; }
  public UserProfile? ReviewedByUser { get; set; }
  public DateTime? ReviewedAtUtc { get; set; }
}
