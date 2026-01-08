using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Shared;

namespace Server.Services;

public class UserProfileService
{
  private readonly IClaimsTransformation claimsTransformation;
  private readonly AppDbContext _context;

  public UserProfileService(AppDbContext context, IClaimsTransformation claimsTransformation)
  {
    _context = context;
    this.claimsTransformation = claimsTransformation;
  }

  public static string? GetClaim(ClaimsPrincipal user, string type)
  {
    return user?.FindFirst(type)?.Value;
  }

  public async Task<UserProfile?> UpsertFromClaimsAsync(ClaimsPrincipal user)
  {
    var ownerId = GetClaim(user, ClaimTypes.NameIdentifier);
    if (string.IsNullOrWhiteSpace(ownerId)) return null;

    var profile = await _context.UserProfile
      .Include(p => p.Revisions)
      .Include(p => p.PublishedRevision)
      .Include(p => p.LatestRevision)
      .FirstOrDefaultAsync(p => p.Id == ownerId);
    var now = DateTime.UtcNow;

    var displayName = GetClaim(user, ClaimTypes.Name) ?? string.Empty;
    var givenName = GetClaim(user, ClaimTypes.GivenName);
    var familyName = GetClaim(user, ClaimTypes.Surname);
    var locale = GetClaim(user, ClaimTypes.Locality) ?? GetClaim(user, "locale");
    var picture = GetClaim(user, "picture") ?? GetClaim(user, "urn:google:picture");
    var email = GetClaim(user, ClaimTypes.Email);
    var googleId = GetClaim(user, ClaimTypes.NameIdentifier);
    var emailVerified = string.Equals(GetClaim(user, "email_verified"), "true", StringComparison.OrdinalIgnoreCase);
    var roles = user?.FindAll(ClaimTypes.Role)
      ?.Select(c => Enum.TryParse<Role>(c.Value, true, out var r) ? r : (Role?)null)
      ?.Where(r => r.HasValue)
      ?.Select(r => r!.Value)
      ?.Distinct()
      .ToList() ?? new List<Role>();

    if (profile is null)
    {
      profile = new UserProfile
      {
        Id = ownerId,
        Locale = locale,
        CreatedAtUtc = now,
        UpdatedAtUtc = now,
        LastLoginAtUtc = now,
        IsPublic = false,
        TombstoneStatus = TombstoneStatus.Active,
        ShareToken = Guid.NewGuid().ToString("N"),
        ShareTokenCreatedAt = now,
        GoogleId = googleId,
        GoogleEmailVerified = emailVerified,
        Roles = roles
      };
      if (!string.IsNullOrWhiteSpace(email)) profile.Emails.Add(email);
      var revision = new UserProfileRevision
      {
        UserProfileId = ownerId,
        DisplayName = string.IsNullOrWhiteSpace(displayName) ? ownerId : displayName,
        GivenName = givenName,
        FamilyName = familyName,
        PictureUrl = picture,
        Description = null,
        Status = RevisionStatus.Approved,
        CreatedByUserId = ownerId,
        CreatedAtUtc = now,
        UpdatedAtUtc = now
      };
      profile.Revisions = new List<UserProfileRevision> { revision };
      profile.PublishedRevision = revision;
      profile.PublishedRevisionId = revision.Id;
      profile.LatestRevision = revision;
      profile.LatestRevisionId = revision.Id;
      _context.UserProfile.Add(profile);
    }
    else
    {
      profile.Locale = profile.Locale ?? locale;
      profile.UpdatedAtUtc = now;
      profile.LastLoginAtUtc = now;
      if (!string.IsNullOrWhiteSpace(email) && !profile.Emails.Contains(email, StringComparer.OrdinalIgnoreCase))
      {
        profile.Emails.Add(email);
      }
      profile.GoogleId = profile.GoogleId ?? googleId;
      profile.GoogleEmailVerified = emailVerified || profile.GoogleEmailVerified;
      if (roles.Count > 0)
      {
        profile.Roles = roles;
      }

      var revision = profile.LatestRevision ?? profile.PublishedRevision ?? profile.Revisions.FirstOrDefault();
      if (revision is null)
      {
        revision = new UserProfileRevision
        {
          UserProfileId = ownerId,
          DisplayName = string.IsNullOrWhiteSpace(displayName) ? ownerId : displayName,
          GivenName = givenName,
          FamilyName = familyName,
          PictureUrl = picture,
          Description = null,
          Status = RevisionStatus.Approved,
          CreatedByUserId = ownerId,
          CreatedAtUtc = now,
          UpdatedAtUtc = now
        };
        profile.Revisions.Add(revision);
        profile.LatestRevision = revision;
        profile.LatestRevisionId = revision.Id;
        if (profile.PublishedRevision is null)
        {
          profile.PublishedRevision = revision;
          profile.PublishedRevisionId = revision.Id;
        }
      }
      else
      {
        bool changed = false;
        if (string.IsNullOrWhiteSpace(revision.DisplayName) && !string.IsNullOrWhiteSpace(displayName))
        {
          revision.DisplayName = displayName;
          changed = true;
        }
        if (revision.GivenName is null && givenName is not null)
        {
          revision.GivenName = givenName;
          changed = true;
        }
        if (revision.FamilyName is null && familyName is not null)
        {
          revision.FamilyName = familyName;
          changed = true;
        }
        if (revision.PictureUrl is null && picture is not null)
        {
          revision.PictureUrl = picture;
          changed = true;
        }
        if (changed)
        {
          revision.UpdatedAtUtc = now;
        }
      }

      profile.LatestRevision = revision;
      profile.LatestRevisionId = revision.Id;
      profile.PublishedRevision ??= revision;
      profile.PublishedRevisionId ??= revision.Id;

      if (string.IsNullOrWhiteSpace(profile.ShareToken))
      {
        profile.ShareToken = Guid.NewGuid().ToString("N");
        profile.ShareTokenCreatedAt = now;
      }
    }

    await _context.SaveChangesAsync();
    return profile;
  }

  public async Task<UserProfile?> GetByOwnerIdAsync(string ownerId, CancellationToken ct = default)
  {
    return await _context.UserProfile
      .Include(p => p.PublishedRevision)
      .Include(p => p.LatestRevision)
      .Include(p => p.Revisions)
      .FirstOrDefaultAsync(p => p.Id == ownerId, ct);
  }

  public async Task<List<UserProfile>> GetFeaturedAsync(int quantity = 6)
  {
    quantity = Math.Clamp(quantity, 1, 24);
    return await _context.UserProfile
      .AsNoTracking()
      .Include(p => p.PublishedRevision)
      .Include(p => p.LatestRevision)
      .Where(u => u.IsFeatured)
      .OrderByDescending(u => u.FeaturedAt)
      .ThenByDescending(u => u.LastLoginAtUtc)
      .Take(quantity)
      .ToListAsync();
  }

  public async Task<bool> SetFeaturedAsync(string ownerId, bool featured, DateTime? featuredUntil = null)
  {
    var profile = await _context.UserProfile.FirstOrDefaultAsync(p => p.Id == ownerId);
    if (profile is null) return false;
    profile.IsFeatured = featured;
    profile.FeaturedAt = featured ? DateTime.UtcNow : null;
    profile.FeaturedUntil = featured ? featuredUntil : null;
    profile.UpdatedAtUtc = DateTime.UtcNow;
    await _context.SaveChangesAsync();
    return true;
  }

  public async Task<List<Role>> GetRolesAsync(UserProfile profile, CancellationToken ct = default)
  {
    if (profile is null) return [];

    // Base claims: id + all known emails (from profile)
    var baseClaims = new List<Claim>
    {
      new Claim(ClaimTypes.NameIdentifier, profile.Id)
    };
    foreach (var email in profile.Emails.Where(e => !string.IsNullOrWhiteSpace(e)))
    {
      baseClaims.Add(new Claim(ClaimTypes.Email, email));
    }

    var principal = new ClaimsPrincipal(new ClaimsIdentity(baseClaims, "profile"));
    var transformed = await claimsTransformation.TransformAsync(principal);

    return transformed.Claims
      .Where(c => c.Type == ClaimTypes.Role)
      .Select(c => Enum.TryParse<Role>(c.Value, true, out var parsed) ? parsed : (Role?)null)
      .Where(r => r.HasValue)
      .Select(r => r!.Value)
      .Distinct()
      .ToList();
  }
}
