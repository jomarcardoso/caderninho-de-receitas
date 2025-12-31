using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services;

public class UserProfileService
{
  private readonly AppDbContext _context;

  public UserProfileService(AppDbContext context)
  {
    _context = context;
  }

  public static string? GetClaim(ClaimsPrincipal user, string type)
  {
    return user?.FindFirst(type)?.Value;
  }

  public async Task<UserProfile?> UpsertFromClaimsAsync(ClaimsPrincipal user)
  {
    var ownerId = GetClaim(user, ClaimTypes.NameIdentifier);
    if (string.IsNullOrWhiteSpace(ownerId)) return null;

    var profile = await _context.UserProfile.FirstOrDefaultAsync(p => p.Id == ownerId);
    var now = DateTime.UtcNow;

    var displayName = GetClaim(user, ClaimTypes.Name) ?? string.Empty;
    var givenName = GetClaim(user, ClaimTypes.GivenName);
    var familyName = GetClaim(user, ClaimTypes.Surname);
    var locale = GetClaim(user, ClaimTypes.Locality) ?? GetClaim(user, "locale");
    var picture = GetClaim(user, "picture") ?? GetClaim(user, "urn:google:picture");

    if (profile is null)
    {
      profile = new UserProfile
      {
        Id = ownerId,
        DisplayName = displayName,
        GivenName = givenName,
        FamilyName = familyName,
        Locale = locale,
        PictureUrl = picture,
        CreatedAt = now,
        UpdatedAt = now,
        LastLoginAt = now,
      };
      _context.UserProfile.Add(profile);
    }
    else
    {
      profile.DisplayName = string.IsNullOrWhiteSpace(profile.DisplayName) ? displayName : profile.DisplayName;
      profile.GivenName = profile.GivenName ?? givenName;
      profile.FamilyName = profile.FamilyName ?? familyName;
      profile.Locale = profile.Locale ?? locale;
      profile.PictureUrl = profile.PictureUrl ?? picture;
      profile.UpdatedAt = now;
      profile.LastLoginAt = now;
    }

    await _context.SaveChangesAsync();
    return profile;
  }

  public async Task<UserProfile?> GetByOwnerIdAsync(string ownerId)
  {
    return await _context.UserProfile.FirstOrDefaultAsync(p => p.Id == ownerId);
  }

  public async Task<List<UserProfile>> GetFeaturedAsync(int quantity = 6)
  {
    quantity = Math.Clamp(quantity, 1, 24);
    return await _context.UserProfile
      .AsNoTracking()
      .Where(u => u.IsFeatured)
      .OrderByDescending(u => u.FeaturedAt)
      .ThenByDescending(u => u.LastLoginAt)
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
    profile.UpdatedAt = DateTime.UtcNow;
    await _context.SaveChangesAsync();
    return true;
  }
}
