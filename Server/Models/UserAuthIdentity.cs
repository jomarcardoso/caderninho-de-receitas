using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Models;

public class UserAuthIdentity
{
  public Guid Id { get; set; } = Guid.NewGuid();

  [MaxLength(128)]
  public string UserProfileId { get; set; } = string.Empty;
  public UserProfile UserProfile { get; set; } = default!;

  [MaxLength(64)]
  public string Provider { get; set; } = string.Empty;

  [MaxLength(256)]
  public string ProviderUserId { get; set; } = string.Empty;

  [MaxLength(256)]
  public string? Email { get; set; }

  [MaxLength(256)]
  public string? DisplayName { get; set; }

  public DateTime LinkedAtUtc { get; set; } = DateTime.UtcNow;
  public DateTime? LastSeenAtUtc { get; set; }
}
