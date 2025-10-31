using System.ComponentModel.DataAnnotations;

namespace Server.Models;

public class UserProfile
{
  [Key]
  [MaxLength(128)]
  public string OwnerId { get; set; } = string.Empty; // matches ClaimTypes.NameIdentifier

  [MaxLength(256)]
  public string? DisplayName { get; set; }

  [MaxLength(256)]
  public string? GivenName { get; set; }

  [MaxLength(256)]
  public string? FamilyName { get; set; }

  [MaxLength(1024)]
  public string? PictureUrl { get; set; }

  [MaxLength(16)]
  public string? Locale { get; set; }

  [MaxLength(280)]
  public string? Bio { get; set; }

  public bool IsFeatured { get; set; } = false;
  public DateTime? FeaturedAt { get; set; }

  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
  public DateTime? LastLoginAt { get; set; }
}

