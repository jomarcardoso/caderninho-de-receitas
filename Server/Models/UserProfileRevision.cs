using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Models;

public class UserProfileRevision
{
  public Guid Id { get; set; } = Guid.NewGuid();

  [MaxLength(128)]
  public string UserProfileId { get; set; } = string.Empty;
  public UserProfile UserProfile { get; set; } = default!;

  [MaxLength(256)]
  public string? DisplayName { get; set; }

  [MaxLength(256)]
  public string? GivenName { get; set; }

  [MaxLength(256)]
  public string? FamilyName { get; set; }

  [MaxLength(1024)]
  public string? PictureUrl { get; set; }

  [MaxLength(280)]
  public string? Description { get; set; }

  public RevisionStatus Status { get; set; } = RevisionStatus.Draft;

  // Audit
  [MaxLength(80)]
  public string CreatedByUserId { get; set; } = string.Empty;
  public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;

  // Review/moderação
  [MaxLength(80)]
  public string? ReviewedByUserId { get; set; }
  public DateTime? ReviewedAtUtc { get; set; }
  public string? ModerationNotes { get; set; }
}
