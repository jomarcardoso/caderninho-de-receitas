namespace Server.Models;

public enum FoodEditStatus { Pending = 0, Approved = 1, Rejected = 2 }

public class FoodEditRequest
{
  public int Id { get; set; }
  public int FoodId { get; set; }
  public string ProposedBy { get; set; } = string.Empty; // email or user id
  public string Payload { get; set; } = string.Empty;    // JSON with proposed fields
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public FoodEditStatus Status { get; set; } = FoodEditStatus.Pending;
  public string? ApprovedBy { get; set; }
  public DateTime? ApprovedAt { get; set; }
}
