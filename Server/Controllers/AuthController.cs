using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Auth;
using Server.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  private readonly GoogleAuthService googleAuthService;
  private readonly AppDbContext _context;

  public AuthController(GoogleAuthService googleAuthService, AppDbContext context)
  {
    this.googleAuthService = googleAuthService;
    _context = context;
  }

  [HttpPost("google")]
  [ProducesResponseType(typeof(GoogleLoginResponseDto), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status401Unauthorized)]
  public async Task<IActionResult> GoogleLogin(
    [FromBody] GoogleLoginRequestDto request,
    CancellationToken cancellationToken)
  {
    if (!ModelState.IsValid)
    {
      return Unauthorized(new { error = "Invalid token" });
    }

    var user = await googleAuthService.ValidateAsync(request.IdToken, cancellationToken);
    if (user is null)
    {
      return Unauthorized(new { error = "Invalid token" });
    }

    var response = new GoogleLoginResponseDto
    {
      DisplayName = user.Name,
      Email = user.Email,
      Picture = user.Picture,
      GoogleId = user.GoogleId,
      EmailVerified = user.EmailVerified,
    };

    // Upsert UserProfile with data from Google
    try
    {
      var ownerId = user.GoogleId?.Trim();
      if (!string.IsNullOrWhiteSpace(ownerId))
      {
        var now = DateTime.UtcNow;
        var profile = await _context.UserProfile.FirstOrDefaultAsync(p => p.OwnerId == ownerId, cancellationToken);
        if (profile is null)
        {
          profile = new UserProfile
          {
            OwnerId = ownerId,
            DisplayName = string.IsNullOrWhiteSpace(user.Name) ? ownerId : user.Name,
            PictureUrl = string.IsNullOrWhiteSpace(user.Picture) ? null : user.Picture,
            CreatedAt = now,
            UpdatedAt = now,
            LastLoginAt = now,
          };
          _context.UserProfile.Add(profile);
        }
        else
        {
          profile.DisplayName = string.IsNullOrWhiteSpace(profile.DisplayName) ? (string.IsNullOrWhiteSpace(user.Name) ? ownerId : user.Name) : profile.DisplayName;
          profile.PictureUrl = profile.PictureUrl ?? (string.IsNullOrWhiteSpace(user.Picture) ? null : user.Picture);
          profile.UpdatedAt = now;
          profile.LastLoginAt = now;
        }
        await _context.SaveChangesAsync(cancellationToken);
      }
    }
    catch { /* ignore profile upsert issues during login */ }

    // Transfer ownership of any dev-user recipes to this Google user
    try
    {
      var targetOwnerId = user.GoogleId?.Trim();
      if (!string.IsNullOrWhiteSpace(targetOwnerId))
      {
        var devUser = "dev-user";
        var recipes = await _context.Recipe
          .Where(r => r.OwnerId == devUser)
          .ToListAsync(cancellationToken);
        if (recipes.Count > 0)
        {
          foreach (var r in recipes) r.OwnerId = targetOwnerId!;
          await _context.SaveChangesAsync(cancellationToken);
        }

        // Transfer RecipeLists as well
        var lists = await _context.RecipeList
          .Where(l => l.OwnerId == devUser)
          .ToListAsync(cancellationToken);
        if (lists.Count > 0)
        {
          foreach (var l in lists) l.OwnerId = targetOwnerId!;
          await _context.SaveChangesAsync(cancellationToken);
        }

        // Transfer RecipeShares as well
        var shares = await _context.RecipeShare
          .Where(s => s.OwnerId == devUser)
          .ToListAsync(cancellationToken);
        if (shares.Count > 0)
        {
          foreach (var s in shares) s.OwnerId = targetOwnerId!;
          await _context.SaveChangesAsync(cancellationToken);
        }
      }
    }
    catch { /* do not fail login if transfer fails */ }

    // In development and in general, set a helper cookie with the owner id so the site at 5106 receives it
    try
    {
      var ownerId = user.GoogleId?.Trim();
      if (!string.IsNullOrWhiteSpace(ownerId))
      {
        var opts = new CookieOptions
        {
          Path = "/",
          HttpOnly = true,
          SameSite = SameSiteMode.Lax,
          Expires = DateTimeOffset.UtcNow.AddDays(30),
          Secure = false, // allow http dev; adjust in prod if needed
        };
        Response.Cookies.Append("x-temp-owner", ownerId!, opts);
      }
    }
    catch { }

    return Ok(response);
  }

  [HttpGet("me")]
  [Authorize]
  [ProducesResponseType(typeof(GoogleLoginResponseDto), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status401Unauthorized)]
  public IActionResult Me()
  {
    var name = User.FindFirstValue(ClaimTypes.Name) ?? string.Empty;
    var email = User.FindFirstValue(ClaimTypes.Email) ?? string.Empty;
    var picture = User.FindFirst("urn:tiktok:avatar_url")?.Value ?? string.Empty;
    var roles = User.FindAll(ClaimTypes.Role).Select(c => c.Value).Distinct().ToArray();

    return Ok(new
    {
      displayName = name,
      email,
      picture,
      roles,
    });
  }

  [HttpPost("logout")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public IActionResult Logout()
  {
    try
    {
      var expire = DateTimeOffset.UtcNow.AddDays(-1);
      var optsHttpOnly = new CookieOptions
      {
        Path = "/",
        HttpOnly = true,
        SameSite = SameSiteMode.Lax,
        Expires = expire,
        Secure = false,
      };
      var optsNonHttpOnly = new CookieOptions
      {
        Path = "/",
        HttpOnly = false,
        SameSite = SameSiteMode.Lax,
        Expires = expire,
        Secure = false,
      };

      // Clear helper owner cookie used in development
      Response.Cookies.Append("x-temp-owner", string.Empty, optsHttpOnly);
      // In case a non-HttpOnly variant was ever set by the client, clear it too
      Response.Cookies.Append("x-temp-owner", string.Empty, optsNonHttpOnly);

      // If a session cookie exists from other flows, expire it as well (no-op if absent)
      Response.Cookies.Append("caderninho.session", string.Empty, optsHttpOnly);
    }
    catch { /* best effort */ }

    return Ok();
  }
}
