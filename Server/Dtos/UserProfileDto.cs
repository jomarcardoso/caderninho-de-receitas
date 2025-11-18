using System.ComponentModel.DataAnnotations;
using Server.Models;

namespace Server.Dtos;

public class UserProfileDto
{
  [Required]
  [MaxLength(128)]
  public string OwnerId { get; set; } = string.Empty;

  [MaxLength(256)]
  public string? DisplayName { get; set; }

  [MaxLength(1024)]
  public string? PictureUrl { get; set; }

  [MaxLength(280)]
  public string? Bio { get; set; }

  public ThemeColor Theme { get; set; } = ThemeColor.Primary;

  public bool IsPublic { get; set; } = false;

  public bool Verified { get; set; } = false;
}

public class UpdateUserProfileRequest
{
  [MaxLength(280)]
  public string? Bio { get; set; }

  public ThemeColor? Theme { get; set; }

  public bool? IsPublic { get; set; }

  // Optionally allow admin to toggle verification
  public bool? Verified { get; set; }
}

