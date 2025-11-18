using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Models;
using System.Security.Claims;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
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
    if (!string.IsNullOrWhiteSpace(authId)) return authId!;
    var cookieOwner = Request.Cookies["ownerId"];
    if (!string.IsNullOrWhiteSpace(cookieOwner)) return cookieOwner!.Trim();
    return string.Empty;
  }

  private static UserProfileDto Map(UserProfile p) => new()
  {
    OwnerId = p.OwnerId,
    DisplayName = p.DisplayName,
    PictureUrl = p.PictureUrl,
    Bio = p.Bio,
    Theme = p.Theme,
    IsPublic = p.IsPublic,
    Verified = p.Verified,
  };

  // GET api/userprofile/me
  [HttpGet("me")]
  [AllowAnonymous]
  public async Task<IActionResult> GetMe()
  {
    var ownerId = GetUserId();
    if (string.IsNullOrWhiteSpace(ownerId)) return Ok(new UserProfileDto());

    var profile = await _context.UserProfile.AsNoTracking().FirstOrDefaultAsync(p => p.OwnerId == ownerId);
    if (profile is null)
    {
      // Return a default (not persisted) profile for convenience
      return Ok(new UserProfileDto { OwnerId = ownerId, Theme = ThemeColor.Primary, IsPublic = false, Verified = false });
    }
    return Ok(Map(profile));
  }

  // PUT api/userprofile/me
  [HttpPut("me")]
  [AllowAnonymous]
  public async Task<IActionResult> UpdateMe([FromBody] UpdateUserProfileRequest request)
  {
    var ownerId = GetUserId();
    if (string.IsNullOrWhiteSpace(ownerId)) return BadRequest("OwnerId missing. Call /api/auth/ensure-owner first.");

    var now = DateTime.UtcNow;
    var profile = await _context.UserProfile.FirstOrDefaultAsync(p => p.OwnerId == ownerId);
    if (profile is null)
    {
      profile = new UserProfile { OwnerId = ownerId, CreatedAt = now, UpdatedAt = now };
      _context.UserProfile.Add(profile);
    }

    if (request.Bio is not null) profile.Bio = string.IsNullOrWhiteSpace(request.Bio) ? null : request.Bio.Trim();
    if (request.Theme.HasValue) profile.Theme = request.Theme.Value;
    if (request.IsPublic.HasValue) profile.IsPublic = request.IsPublic.Value;

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
