using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Server.Dtos;
using Server.Models;
using Server.Services;
using Server.Shared;
using System.Security.Claims;
using System;
using System.Linq;

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

  private bool IsAdmin() => User.IsInRole(Role.Admin.ToString());

  // GET api/userprofile/{id}
  [HttpGet("{id}")]
  [AllowAnonymous]
  public async Task<IActionResult> GetById([FromRoute] string id, [FromQuery] string? shareToken = null)
  {
    if (string.IsNullOrWhiteSpace(id)) return NotFound();

    var profile = await _context.UserProfile
      .Include(p => p.PublishedRevision)
      .Include(p => p.LatestRevision)
      .Include(p => p.Revisions)
      .FirstOrDefaultAsync(p => p.Id == id.Trim());

    if (profile is null) return NotFound();

    var callerId = GetUserId();
    var isOwner = !string.IsNullOrWhiteSpace(callerId) && string.Equals(callerId, profile.Id, StringComparison.Ordinal);
    var isAdmin = IsAdmin();
    var hasShareToken = !string.IsNullOrWhiteSpace(shareToken)
      && !string.IsNullOrWhiteSpace(profile.ShareToken)
      && string.Equals(profile.ShareToken, shareToken, StringComparison.Ordinal)
      && (!profile.ShareTokenRevokedAt.HasValue || profile.ShareTokenRevokedAt > DateTime.UtcNow);

    var isVisible = profile.Visibility == Visibility.Public || isOwner || isAdmin || hasShareToken;
    if (!isVisible) return NotFound();

    var viewCtx = new UserProfileViewContext(isOwner, isAdmin, hasShareToken);
    return Ok(UserProfileResponseBuilder.Build(profile, viewCtx));
  }

  // GET api/userprofile
  [HttpGet]
  [AllowAnonymous]
  public async Task<IActionResult> Search(
    [FromQuery] string? text = null,
    [FromQuery] int limit = 20,
    [FromQuery] bool? isFeatured = null)
  {
    var isAdmin = IsAdmin();
    var callerId = GetUserId();
    limit = Math.Clamp(limit <= 0 ? 20 : limit, 1, 64);
    var lowered = (text ?? string.Empty).Trim().ToLowerInvariant();

    var query = _context.UserProfile
      .AsNoTracking()
      .Include(p => p.PublishedRevision)
      .Include(p => p.LatestRevision)
      .Where(p => p.PublishedRevision != null || p.LatestRevision != null);

    if (!isAdmin)
    {
      query = query.Where(p => p.Visibility == Visibility.Public && p.TombstoneStatus == TombstoneStatus.Active);
    }

    if (isFeatured.HasValue)
    {
      query = query.Where(p => p.IsFeatured == isFeatured.Value);
    }

    if (!string.IsNullOrWhiteSpace(lowered))
    {
      query = query.Where(p =>
        p.Id.ToLower().Contains(lowered) ||
        (p.PublishedRevision != null && (
          (p.PublishedRevision.DisplayName ?? string.Empty).ToLower().Contains(lowered) ||
          ($"{p.PublishedRevision.GivenName} {p.PublishedRevision.FamilyName}".Trim().ToLower().Contains(lowered))
        )) ||
        (p.LatestRevision != null && (
          (p.LatestRevision.DisplayName ?? string.Empty).ToLower().Contains(lowered) ||
          ($"{p.LatestRevision.GivenName} {p.LatestRevision.FamilyName}".Trim().ToLower().Contains(lowered))
        )));
    }

    var profiles = await query
      .OrderByDescending(p => p.IsFeatured)
      .ThenByDescending(p => p.LastLoginAtUtc)
      .ThenBy(p => p.PublishedRevision != null ? p.PublishedRevision.DisplayName ?? p.Id : p.Id)
      .ThenBy(p => p.Id)
      .Take(limit)
      .ToListAsync();

    var result = profiles
      .Select(p => UserProfileResponseBuilder.BuildSummary(p, isAdmin, callerId))
      .ToList();

    return Ok(result);
  }

  // PUT api/userprofile/{id}
  [HttpPut("{id}")]
  public async Task<IActionResult> Update([FromRoute] string id, [FromBody] UserProfileAdminDto request)
  {
    if (string.IsNullOrWhiteSpace(id)) return NotFound();

    var callerId = GetUserId();
    var isAdmin = IsAdmin();
    var isOwner = !string.IsNullOrWhiteSpace(callerId) && string.Equals(callerId, id, StringComparison.Ordinal);
    if (!isOwner && !isAdmin) return Forbid();

    var now = DateTime.UtcNow;
    var profile = await _context.UserProfile
      .Include(p => p.Revisions)
      .Include(p => p.PublishedRevision)
      .Include(p => p.LatestRevision)
      .FirstOrDefaultAsync(p => p.Id == id.Trim());
    if (profile is null)
    {
      profile = new UserProfile
      {
        Id = id.Trim(),
        CreatedAtUtc = now,
        UpdatedAtUtc = now,
        LastLoginAtUtc = now,
        ShareToken = Guid.NewGuid().ToString("N"),
        ShareTokenCreatedAt = now,
        Visibility = request.Visibility ?? Visibility.Private,
        ThemeColor = request.ThemeColor ?? ThemeColor.Primary,
        Language = request.Language ?? Language.En,
        Locale = request.Locale,
        TombstoneStatus = TombstoneStatus.Active
      };
      var revision = new UserProfileRevision
      {
        UserProfileId = profile.Id,
        DisplayName = string.IsNullOrWhiteSpace(request.DisplayName) ? profile.Id : request.DisplayName!.Trim(),
        PictureUrl = string.IsNullOrWhiteSpace(request.PictureUrl) ? null : request.PictureUrl!.Trim(),
        Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description!.Trim(),
        GivenName = string.IsNullOrWhiteSpace(request.GivenName) ? null : request.GivenName!.Trim(),
        FamilyName = string.IsNullOrWhiteSpace(request.FamilyName) ? null : request.FamilyName!.Trim(),
        Status = RevisionStatus.Approved,
        CreatedByUserId = profile.Id,
        CreatedAtUtc = now,
        UpdatedAtUtc = now
      };
      _context.UserProfileRevision.Add(revision);
      profile.Revisions.Add(revision);
      profile.PublishedRevision = revision;
      profile.PublishedRevisionId = revision.Id;
      profile.LatestRevision = revision;
      profile.LatestRevisionId = revision.Id;

      if (request.Allergies is not null) profile.Allergies = request.Allergies;
      if (request.Intolerances is not null) profile.Intolerances = request.Intolerances;
      if (request.MedicalRestrictions is not null) profile.MedicalRestrictions = request.MedicalRestrictions;
      if (request.DietStyles is not null) profile.DietStyles = request.DietStyles;
      if (request.CulturalRestrictions is not null) profile.CulturalRestrictions = request.CulturalRestrictions;
      if (request.PersonalPreferences is not null) profile.PersonalPreferences = request.PersonalPreferences;

      _context.UserProfile.Add(profile);
    }
    else
    {
      var revision = profile.LatestRevision ?? profile.PublishedRevision ?? profile.Revisions.OrderByDescending(r => r.CreatedAtUtc).FirstOrDefault();
      if (revision is null)
      {
        revision = new UserProfileRevision
        {
          UserProfileId = profile.Id,
          CreatedByUserId = callerId,
          CreatedAtUtc = now,
          UpdatedAtUtc = now,
          Status = RevisionStatus.Approved
        };
        _context.UserProfileRevision.Add(revision);
        profile.Revisions.Add(revision);
      }

      if (request.Locale is not null) profile.Locale = string.IsNullOrWhiteSpace(request.Locale) ? null : request.Locale.Trim();
      if (request.ThemeColor.HasValue) profile.ThemeColor = request.ThemeColor.Value;
      if (request.Visibility.HasValue) profile.Visibility = request.Visibility.Value;
      if (request.Language.HasValue) profile.Language = request.Language.Value;
      if (request.Allergies is not null) profile.Allergies = request.Allergies;
      if (request.Intolerances is not null) profile.Intolerances = request.Intolerances;
      if (request.MedicalRestrictions is not null) profile.MedicalRestrictions = request.MedicalRestrictions;
      if (request.DietStyles is not null) profile.DietStyles = request.DietStyles;
      if (request.CulturalRestrictions is not null) profile.CulturalRestrictions = request.CulturalRestrictions;
      if (request.PersonalPreferences is not null) profile.PersonalPreferences = request.PersonalPreferences;

      if (request.DisplayName is not null) revision.DisplayName = string.IsNullOrWhiteSpace(request.DisplayName) ? profile.Id : request.DisplayName.Trim();
      if (request.PictureUrl is not null) revision.PictureUrl = string.IsNullOrWhiteSpace(request.PictureUrl) ? null : request.PictureUrl.Trim();
      if (request.Description is not null) revision.Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim();
      if (request.GivenName is not null) revision.GivenName = string.IsNullOrWhiteSpace(request.GivenName) ? null : request.GivenName.Trim();
      if (request.FamilyName is not null) revision.FamilyName = string.IsNullOrWhiteSpace(request.FamilyName) ? null : request.FamilyName.Trim();

      revision.Status = RevisionStatus.Approved;
      revision.UpdatedAtUtc = now;
      profile.LatestRevision = revision;
      profile.LatestRevisionId = revision.Id;
      profile.PublishedRevision ??= revision;
      profile.PublishedRevisionId ??= revision.Id;

      if (string.IsNullOrWhiteSpace(profile.ShareToken))
      {
        profile.ShareToken = Guid.NewGuid().ToString("N");
        profile.ShareTokenCreatedAt = now;
      }

      profile.UpdatedAtUtc = now;
    }

    if (isAdmin && request is not null)
    {
      // Admin-only fields
      if (request.FeaturedUntil.HasValue)
      {
        profile.FeaturedUntil = request.FeaturedUntil;
        profile.IsFeatured = request.FeaturedUntil > now;
        profile.FeaturedAt ??= now;
      }
    }

    await _context.SaveChangesAsync();

    try
    {
      // Persist a lightweight theme cookie for SSR to avoid extra fetch on every request
      // Use a short, readable value (e.g., "primary")
      string themeValue = "primary";
    var themeCookie = new CookieOptions
      {
        Path = "/",
        HttpOnly = false,
        SameSite = SameSiteMode.Lax,
        Secure = false,
        Expires = DateTimeOffset.UtcNow.AddYears(1),
      };
      Response.Cookies.Append("theme", themeValue, themeCookie);
    }
    catch { /* best-effort */ }

    var ctx = new UserProfileViewContext(isOwner, isAdmin, false);
    var response = UserProfileResponseBuilder.Build(profile, ctx);
    return Ok(response);
  }
}
