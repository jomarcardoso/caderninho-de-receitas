using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Dtos.Auth;
using Server.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Server.Shared;
using Server.Services;

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
  [ProducesResponseType(typeof(UserProfileOwnerResponse), StatusCodes.Status200OK)]
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

    var ownerId = user.GoogleId?.Trim() ?? string.Empty;
    UserProfile? persistedProfile = null;
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
    var isAdmin = roles.Any(r => string.Equals(r, Role.Admin.ToString(), StringComparison.OrdinalIgnoreCase));

    // Upsert UserProfile with data from Google
    try
    {
      var ownerIdValue = user.GoogleId?.Trim();
      if (!string.IsNullOrWhiteSpace(ownerIdValue))
      {
        var now = DateTime.UtcNow;
        var profile = await _context.UserProfile
          .Include(p => p.Revisions)
          .Include(p => p.PublishedRevision)
          .Include(p => p.LatestRevision)
          .FirstOrDefaultAsync(p => p.Id == ownerIdValue, cancellationToken);
        if (profile is null)
        {
          profile = new UserProfile
          {
            Id = ownerIdValue,
            CreatedAtUtc = now,
            UpdatedAtUtc = now,
            LastLoginAtUtc = now,
            Visibility = Visibility.Private,
            TombstoneStatus = TombstoneStatus.Active,
            ShareToken = Guid.NewGuid().ToString("N"),
            ShareTokenCreatedAt = now,
            GoogleId = ownerIdValue,
            GoogleEmailVerified = user.EmailVerified
          };
          if (!string.IsNullOrWhiteSpace(user.Email)) profile.Emails.Add(user.Email);
          var mappedRoles = roleClaims
            .Select(c => Enum.TryParse<Role>(c.Value, true, out var r) ? r : (Role?)null)
            .Where(r => r.HasValue)
            .Select(r => r!.Value)
            .Distinct()
            .ToList();
          profile.Roles = mappedRoles;
          var rev = new UserProfileRevision
          {
            UserProfileId = ownerIdValue,
            DisplayName = string.IsNullOrWhiteSpace(user.Name) ? ownerIdValue : user.Name,
            PictureUrl = string.IsNullOrWhiteSpace(user.Picture) ? null : user.Picture,
            Status = RevisionStatus.Approved,
            CreatedByUserId = ownerIdValue,
            CreatedAtUtc = now,
            UpdatedAtUtc = now
          };
          profile.Revisions = new List<UserProfileRevision> { rev };
          profile.PublishedRevision = rev;
          profile.PublishedRevisionId = rev.Id;
          profile.LatestRevision = rev;
          profile.LatestRevisionId = rev.Id;
          _context.UserProfile.Add(profile);
        }
        else
        {
          profile.UpdatedAtUtc = now;
          profile.LastLoginAtUtc = now;
          if (!string.IsNullOrWhiteSpace(user.Email) && !profile.Emails.Contains(user.Email, StringComparer.OrdinalIgnoreCase))
          {
            profile.Emails.Add(user.Email);
          }
          profile.GoogleId = profile.GoogleId ?? ownerIdValue;
          profile.GoogleEmailVerified = profile.GoogleEmailVerified || user.EmailVerified;

          var rev = profile.LatestRevision ?? profile.PublishedRevision ?? profile.Revisions.FirstOrDefault();
          if (rev is null)
          {
            rev = new UserProfileRevision
            {
              UserProfileId = ownerIdValue,
              DisplayName = string.IsNullOrWhiteSpace(user.Name) ? ownerIdValue : user.Name,
              PictureUrl = string.IsNullOrWhiteSpace(user.Picture) ? null : user.Picture,
              Status = RevisionStatus.Approved,
              CreatedByUserId = ownerIdValue,
              CreatedAtUtc = now,
              UpdatedAtUtc = now
            };
            profile.Revisions.Add(rev);
            profile.LatestRevision = rev;
            profile.LatestRevisionId = rev.Id;
            if (profile.PublishedRevision is null)
            {
              profile.PublishedRevision = rev;
              profile.PublishedRevisionId = rev.Id;
            }
          }
          else
          {
            bool changed = false;
            if (string.IsNullOrWhiteSpace(rev.DisplayName) && !string.IsNullOrWhiteSpace(user.Name))
            {
              rev.DisplayName = user.Name;
              changed = true;
            }
            if (rev.PictureUrl is null && !string.IsNullOrWhiteSpace(user.Picture))
            {
              rev.PictureUrl = user.Picture;
              changed = true;
            }
            if (changed) rev.UpdatedAtUtc = now;
          }

          profile.LatestRevision = rev;
          profile.LatestRevisionId = rev.Id;
          profile.PublishedRevision ??= rev;
          profile.PublishedRevisionId ??= rev.Id;

          if (string.IsNullOrWhiteSpace(profile.ShareToken))
          {
            profile.ShareToken = Guid.NewGuid().ToString("N");
            profile.ShareTokenCreatedAt = now;
          }

          var mappedRoles = roleClaims
            .Select(c => Enum.TryParse<Role>(c.Value, true, out var r) ? r : (Role?)null)
            .Where(r => r.HasValue)
            .Select(r => r!.Value)
            .Distinct()
            .ToList();
          if (mappedRoles.Count > 0)
          {
            profile.Roles = mappedRoles;
          }
        }
        persistedProfile = profile;
        await _context.SaveChangesAsync(cancellationToken);
      }
    }
    catch { /* ignore profile upsert issues during login */ }
    try
    {
      persistedProfile ??= await _context.UserProfile
        .Include(p => p.Revisions)
        .Include(p => p.PublishedRevision)
        .Include(p => p.LatestRevision)
        .FirstOrDefaultAsync(p => p.Id == ownerId, cancellationToken);
    }
    catch { /* ignore */ }

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

    var token = _tokenService.GenerateToken(
      ownerId,
      user.Email ?? string.Empty,
      user.Name ?? user.Email ?? ownerId,
      roleClaims);

    UserProfileOwnerResponse response;
    if (persistedProfile is not null)
    {
      var viewCtx = new UserProfileViewContext(
        IsOwner: true,
        IsAdmin: isAdmin,
        HasShareToken: !string.IsNullOrWhiteSpace(persistedProfile.ShareToken));
      response = (UserProfileOwnerResponse)UserProfileResponseBuilder.Build(persistedProfile, viewCtx);
    }
    else
    {
      response = new UserProfileOwnerResponse
      {
        Id = ownerId,
        DisplayName = user.Name ?? ownerId,
        PictureUrl = user.Picture,
        Emails = string.IsNullOrWhiteSpace(user.Email) ? new() : new() { user.Email },
        GoogleId = user.GoogleId,
        GoogleEmailVerified = user.EmailVerified,
        Roles = roles
          .Select(r => Enum.TryParse<Role>(r, true, out var rr) ? rr : (Role?)null)
          .Where(r => r.HasValue)
          .Select(r => r!.Value)
          .ToList()
      };
    }

    return Ok(new { token, user = response });
  }

  [HttpPost("logout")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public IActionResult Logout()
  {
    return Ok();
  }

  [HttpPost("refresh")]
  [Authorize]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status401Unauthorized)]
  public IActionResult RefreshToken()
  {
    var ownerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrWhiteSpace(ownerId)) return Unauthorized();

    var email = User.FindFirstValue(ClaimTypes.Email) ?? string.Empty;
    var name = User.FindFirstValue(ClaimTypes.Name) ?? email;
    var roleClaims = User.FindAll(ClaimTypes.Role);

    var token = _tokenService.GenerateToken(ownerId, email, name, roleClaims);
    return Ok(new { token });
  }
}

