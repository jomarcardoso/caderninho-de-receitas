using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Server.Models;
using Server.Shared;

namespace Server.Dtos;

// Request/DTO shape (owner/admin level)
public class UserProfileDto
{
  public ThemeColor? ThemeColor { get; set; }

  public Language? Language { get; set; }

  public Visibility? Visibility { get; set; }

  [MaxLength(16)]
  public string? Locale { get; set; }

  [MaxLength(256)]
  public string? DisplayName { get; set; }

  [MaxLength(1024)]
  public string? PictureUrl { get; set; }

  [MaxLength(280)]
  public string? Description { get; set; }

  [MaxLength(256)]
  public string? GivenName { get; set; }

  [MaxLength(256)]
  public string? FamilyName { get; set; }

  public List<AllergyRestriction>? Allergies { get; set; }
  public List<IntoleranceRestriction>? Intolerances { get; set; }
  public List<MedicalRestriction>? MedicalRestrictions { get; set; }
  public List<DietStyleRestriction>? DietStyles { get; set; }
  public List<CulturalRestriction>? CulturalRestrictions { get; set; }
  public List<PersonalPreferenceRestriction>? PersonalPreferences { get; set; }
}

// Admin-only extra fields
public class UserProfileAdminDto : UserProfileDto
{
  public DateTime? FeaturedUntil { get; set; }
}

// Public response
public class UserProfileResponse
{
  public string Id { get; set; } = string.Empty;
  public ThemeColor ThemeColor { get; set; } = ThemeColor.Primary;
  public string? Locale { get; set; }
  public Language Language { get; set; } = Language.En;
  public Visibility Visibility { get; set; } = Visibility.Private;
  public string? DisplayName { get; set; }
  public string? PictureUrl { get; set; }
  public string? Description { get; set; }
}

// Owner response (owner/admin view)
public class UserProfileOwnerResponse : UserProfileResponse
{
  public List<string> Emails { get; set; } = new();
  public string? GoogleId { get; set; }
  public bool GoogleEmailVerified { get; set; }
  public List<Role> Roles { get; set; } = new();
  public string? GivenName { get; set; }
  public string? FamilyName { get; set; }
  public List<AllergyRestriction> Allergies { get; set; } = new();
  public List<IntoleranceRestriction> Intolerances { get; set; } = new();
  public List<MedicalRestriction> MedicalRestrictions { get; set; } = new();
  public List<DietStyleRestriction> DietStyles { get; set; } = new();
  public List<CulturalRestriction> CulturalRestrictions { get; set; } = new();
  public List<PersonalPreferenceRestriction> PersonalPreferences { get; set; } = new();
  public string? ShareToken { get; set; }
  public DateTime? ShareTokenCreatedAt { get; set; }
  public DateTime? ShareTokenRevokedAt { get; set; }
  public string? ModerationNotes { get; set; }
  public bool IsFeatured { get; set; }
  public DateTime? FeaturedUntil { get; set; }
}

// Admin response (extends owner)
public class UserProfileAdminResponse : UserProfileOwnerResponse
{
  public DateTime? FeaturedAt { get; set; }
}

public class UserProfileSummaryResponse
{
  public string Id { get; set; } = string.Empty;
  public string DisplayName { get; set; } = string.Empty;
  public string? PictureUrl { get; set; }
  public bool IsFeatured { get; set; }
}
