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
  public string? Description { get; set; }

  public bool IsFeatured { get; set; } = false;
  public DateTime? FeaturedAt { get; set; }
  public DateTime? FeaturedUntil { get; set; }

  // Preferência de tema do usuário
  public ThemeColor Theme { get; set; } = ThemeColor.Primary;

  // Controles de visibilidade e verificação (similar às receitas)
  public bool IsPublic { get; set; } = false;
  public bool Verified { get; set; } = false;

  // Dietary restrictions / preferences
  public List<AllergyRestriction> Allergies { get; set; } = new();
  public List<IntoleranceRestriction> Intolerances { get; set; } = new();
  public List<MedicalRestriction> MedicalRestrictions { get; set; } = new();
  public List<DietStyleRestriction> DietStyles { get; set; } = new();
  public List<CulturalRestriction> CulturalRestrictions { get; set; } = new();
  public List<PersonalPreferenceRestriction> PersonalPreferences { get; set; } = new();

  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
  public DateTime? LastLoginAt { get; set; }

  // Preferred language for UI/content
  public Language Language { get; set; } = Language.En;
}
