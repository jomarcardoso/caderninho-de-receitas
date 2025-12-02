namespace Server.Models;

public enum CategoryEditStatus { Pending = 0, Approved = 1, Rejected = 2 }

public class CategoryEditRequest
{
  public int Id { get; set; }
  public int CategoryId { get; set; }
  public string ProposedBy { get; set; } = string.Empty;
  public string Payload { get; set; } = string.Empty;
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public CategoryEditStatus Status { get; set; } = CategoryEditStatus.Pending;
  public string? ApprovedBy { get; set; }
  public DateTime? ApprovedAt { get; set; }
}
