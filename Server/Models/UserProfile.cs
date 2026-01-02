using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Server.Shared;

namespace Server.Models;

public enum ThemeColor
{
  Primary = 0, // #87695e (padrão)
}

public class UserProfile
{
  [Key]
  [MaxLength(128)]
  public string Id { get; set; } = string.Empty; // matches ClaimTypes.NameIdentifier

  [MaxLength(16)]
  public string? Locale { get; set; }

  // Preferred language for UI/content
  public Language Language { get; set; } = Language.En;

  public bool IsFeatured { get; set; } = false;
  public DateTime? FeaturedAt { get; set; }
  public DateTime? FeaturedUntil { get; set; }

  public ThemeColor ThemeColor { get; set; } = ThemeColor.Primary;

  // Controles de visibilidade/estado (similar às receitas)
  public Visibility Visibility { get; set; } = Visibility.Private;
  public TombstoneStatus TombstoneStatus { get; set; } = TombstoneStatus.Active;
  public List<string> Emails { get; set; } = new();
  [MaxLength(256)]
  public string? GoogleId { get; set; }
  public bool GoogleEmailVerified { get; set; } = false;
  public List<Role> Roles { get; set; } = new();

  // Dietary restrictions / preferences
  public List<AllergyRestriction> Allergies { get; set; } = new();
  public List<IntoleranceRestriction> Intolerances { get; set; } = new();
  public List<MedicalRestriction> MedicalRestrictions { get; set; } = new();
  public List<DietStyleRestriction> DietStyles { get; set; } = new();
  public List<CulturalRestriction> CulturalRestrictions { get; set; } = new();
  public List<PersonalPreferenceRestriction> PersonalPreferences { get; set; } = new();

  // Versionamento de perfil
  public Guid? PublishedRevisionId { get; set; }
  public UserProfileRevision? PublishedRevision { get; set; }
  public Guid? LatestRevisionId { get; set; }
  public UserProfileRevision? LatestRevision { get; set; }
  public List<UserProfileRevision> Revisions { get; set; } = new();

  // Compartilhamento
  public string? ShareToken { get; set; }
  public DateTime? ShareTokenCreatedAt { get; set; }
  public DateTime? ShareTokenRevokedAt { get; set; }

  public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
  public DateTime? LastLoginAtUtc { get; set; }
}
