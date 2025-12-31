using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Models;
using System.Security.Claims;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserProfileController : ControllerBase
{
  private readonly AppDbContext _context;

  public UserProfileController(AppDbContext context)
  {
    _context = context;
  }

  private string GetUserId()
  {
    var authId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    return string.IsNullOrWhiteSpace(authId) ? string.Empty : authId!.Trim();
  }

  private static UserProfileDto Map(UserProfile p) => new()
  {
    Id = p.Id,
    DisplayName = p.DisplayName,
    PictureUrl = p.PictureUrl,
    Bio = p.Bio,
    Theme = p.Theme,
    IsPublic = p.IsPublic,
    Verified = p.Verified,
    Language = p.Language,
    Allergies = p.Allergies,
    Intolerances = p.Intolerances,
    MedicalRestrictions = p.MedicalRestrictions,
    DietStyles = p.DietStyles,
    CulturalRestrictions = p.CulturalRestrictions,
    PersonalPreferences = p.PersonalPreferences,
  };

  // GET api/userprofile/me
  [HttpGet("me")]
  public async Task<IActionResult> GetMe()
  {
    var ownerId = GetUserId();
    if (string.IsNullOrWhiteSpace(ownerId)) return Unauthorized();

    var profile = await _context.UserProfile.AsNoTracking().FirstOrDefaultAsync(p => p.Id == ownerId);
    if (profile is null)
    {
      // Return a default (not persisted) profile for convenience
      return Ok(new UserProfileDto { Id = ownerId, Theme = ThemeColor.Primary, IsPublic = false, Verified = false });
    }
    return Ok(Map(profile));
  }

  // PUT api/userprofile/me
  [HttpPut("me")]
  public async Task<IActionResult> UpdateMe([FromBody] UpdateUserProfileRequest request)
  {
    var ownerId = GetUserId();
    if (string.IsNullOrWhiteSpace(ownerId)) return Unauthorized();

    var now = DateTime.UtcNow;
    var profile = await _context.UserProfile.FirstOrDefaultAsync(p => p.Id == ownerId);
    if (profile is null)
    {
      profile = new UserProfile { Id = ownerId, CreatedAt = now, UpdatedAt = now };
      _context.UserProfile.Add(profile);
    }

    if (request.Bio is not null) profile.Bio = string.IsNullOrWhiteSpace(request.Bio) ? null : request.Bio.Trim();
    if (request.Theme.HasValue) profile.Theme = request.Theme.Value;
    if (request.IsPublic.HasValue) profile.IsPublic = request.IsPublic.Value;
    if (request.Language.HasValue) profile.Language = request.Language.Value;
    if (request.Allergies is not null) profile.Allergies = request.Allergies;
    if (request.Intolerances is not null) profile.Intolerances = request.Intolerances;
    if (request.MedicalRestrictions is not null) profile.MedicalRestrictions = request.MedicalRestrictions;
    if (request.DietStyles is not null) profile.DietStyles = request.DietStyles;
    if (request.CulturalRestrictions is not null) profile.CulturalRestrictions = request.CulturalRestrictions;
    if (request.PersonalPreferences is not null) profile.PersonalPreferences = request.PersonalPreferences;

    // Verified: only allow if user has an elevated role
    if (request.Verified.HasValue)
    {
      var isAdmin = User.IsInRole("admin") || User.IsInRole("moderator");
      if (isAdmin) profile.Verified = request.Verified.Value;
    }

    profile.UpdatedAt = now;
    await _context.SaveChangesAsync();

    try
    {
      // Persist a lightweight theme cookie for SSR to avoid extra fetch on every request
      // Use a short, readable value (e.g., "primary")
      string themeValue = profile.Theme switch
      {
        ThemeColor.Primary => "primary",
        _ => "primary",
      };
      var themeCookie = new CookieOptions
      {
        Path = "/",
        HttpOnly = false, // client may read if needed; SSR reads cookie header
        SameSite = SameSiteMode.Lax,
        Secure = false,
        Expires = DateTimeOffset.UtcNow.AddYears(1),
      };
      Response.Cookies.Append("theme", themeValue, themeCookie);
    }
    catch { /* best-effort */ }

    return Ok(Map(profile));
  }
}
