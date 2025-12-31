using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Server.Models;

namespace Server.Dtos;

public class UserProfileDto
{
  [Required]
  [MaxLength(128)]
  public string Id { get; set; } = string.Empty;

  [MaxLength(256)]
  public string? DisplayName { get; set; }

  [MaxLength(1024)]
  public string? PictureUrl { get; set; }

  [MaxLength(280)]
  public string? Bio { get; set; }

  public ThemeColor Theme { get; set; } = ThemeColor.Primary;

  public bool IsPublic { get; set; } = false;

  public bool Verified { get; set; } = false;

  public Server.Shared.Language Language { get; set; } = Server.Shared.Language.En;

  public List<AllergyRestriction> Allergies { get; set; } = new();
  public List<IntoleranceRestriction> Intolerances { get; set; } = new();
  public List<MedicalRestriction> MedicalRestrictions { get; set; } = new();
  public List<DietStyleRestriction> DietStyles { get; set; } = new();
  public List<CulturalRestriction> CulturalRestrictions { get; set; } = new();
  public List<PersonalPreferenceRestriction> PersonalPreferences { get; set; } = new();
}

public class UpdateUserProfileRequest
{
  [MaxLength(280)]
  public string? Bio { get; set; }

  public ThemeColor? Theme { get; set; }

  public bool? IsPublic { get; set; }

  // Optionally allow admin to toggle verification
  public bool? Verified { get; set; }

  public Server.Shared.Language? Language { get; set; }

  public List<AllergyRestriction>? Allergies { get; set; }
  public List<IntoleranceRestriction>? Intolerances { get; set; }
  public List<MedicalRestriction>? MedicalRestrictions { get; set; }
  public List<DietStyleRestriction>? DietStyles { get; set; }
  public List<CulturalRestriction>? CulturalRestrictions { get; set; }
  public List<PersonalPreferenceRestriction>? PersonalPreferences { get; set; }
}
