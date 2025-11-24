using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Auth;
using Server.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;
using System.Linq;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  private readonly GoogleAuthService googleAuthService;
  private readonly AppDbContext _context;
  private readonly JwtTokenService _tokenService;
  private readonly IClaimsTransformation _claimsTransformation;

  public AuthController(GoogleAuthService googleAuthService, AppDbContext context, JwtTokenService tokenService, IClaimsTransformation claimsTransformation)
  {
    this.googleAuthService = googleAuthService;
    _context = context;
    _tokenService = tokenService;
    _claimsTransformation = claimsTransformation;
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
      var ownerIdValue = user.GoogleId?.Trim();
      if (!string.IsNullOrWhiteSpace(ownerIdValue))
      {
        var now = DateTime.UtcNow;
        var profile = await _context.UserProfile.FirstOrDefaultAsync(p => p.OwnerId == ownerIdValue, cancellationToken);
        if (profile is null)
        {
          profile = new UserProfile
          {
            OwnerId = ownerIdValue,
            DisplayName = string.IsNullOrWhiteSpace(user.Name) ? ownerIdValue : user.Name,
            PictureUrl = string.IsNullOrWhiteSpace(user.Picture) ? null : user.Picture,
            CreatedAt = now,
            UpdatedAt = now,
            LastLoginAt = now,
          };
          _context.UserProfile.Add(profile);
        }
        else
        {
          profile.DisplayName = string.IsNullOrWhiteSpace(profile.DisplayName) ? (string.IsNullOrWhiteSpace(user.Name) ? ownerIdValue : user.Name) : profile.DisplayName;
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

    var ownerId = user.GoogleId?.Trim() ?? string.Empty;
    var baseClaims = new List<Claim>
    {
      new Claim(ClaimTypes.NameIdentifier, ownerId),
      new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
      new Claim(ClaimTypes.Name, user.Name ?? user.Email ?? ownerId),
    };
    var transformedPrincipal = await _claimsTransformation.TransformAsync(
      new ClaimsPrincipal(new ClaimsIdentity(baseClaims, "google")));
    var roleClaims = transformedPrincipal.Claims
      .Where(c => c.Type == ClaimTypes.Role)
      .Select(c => new Claim(ClaimTypes.Role, c.Value))
      .ToList();
    var roles = roleClaims.Select(c => c.Value).Distinct(StringComparer.OrdinalIgnoreCase).ToArray();
    var token = _tokenService.GenerateToken(
      ownerId,
      user.Email ?? string.Empty,
      user.Name ?? user.Email ?? ownerId,
      roleClaims);

    response.Roles = roles;

    return Ok(new { token, user = response });
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

      // Clear helper owner cookie
      Response.Cookies.Append("ownerId", string.Empty, optsHttpOnly);
      Response.Cookies.Append("ownerId", string.Empty, optsNonHttpOnly);

      // If a session cookie exists from other flows, expire it as well (no-op if absent)
      Response.Cookies.Append("caderninho.session", string.Empty, optsHttpOnly);
    }
    catch { /* best effort */ }

    return Ok();
  }

  [HttpPost("ensure-owner")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public IActionResult EnsureOwner()
  {
    try
    {
      var ownerFromAuth = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      var existing = Request.Cookies["ownerId"];

      string ownerId = (ownerFromAuth?.Trim()) ?? string.Empty;
      if (string.IsNullOrWhiteSpace(ownerId)) ownerId = (existing?.Trim()) ?? string.Empty;
      if (string.IsNullOrWhiteSpace(ownerId)) ownerId = $"anon-{Guid.NewGuid():N}";

      var opts = new CookieOptions
      {
        Path = "/",
        HttpOnly = true,
        SameSite = SameSiteMode.Lax,
        Secure = false,
        Expires = DateTimeOffset.UtcNow.AddDays(30),
      };
      Response.Cookies.Append("ownerId", ownerId, opts);

      return Ok(new { ownerId });
    }
    catch
    {
      return Ok(new { ownerId = string.Empty });
    }
  }
}






