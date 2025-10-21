using System.ComponentModel.DataAnnotations;

namespace Server.Models;

public class RecipeShare
{
  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();

  public int RecipeId { get; set; }
  public string Slug { get; set; } = string.Empty; // used in link
  public string OwnerId { get; set; } = string.Empty;
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public bool IsPublic { get; set; } = false;
}

