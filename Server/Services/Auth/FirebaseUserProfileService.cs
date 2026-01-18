using FirebaseAdmin.Auth;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Shared;

namespace Server.Services.Auth;

public class FirebaseUserProfileService
{
  private readonly AppDbContext _context;
  private readonly UserProfileService _profileService;

  public FirebaseUserProfileService(AppDbContext context, UserProfileService profileService)
  {
    _context = context;
    _profileService = profileService;
  }

  public async Task<UserProfile?> GetByFirebaseUidAsync(string firebaseUid, CancellationToken ct = default)
  {
    if (string.IsNullOrWhiteSpace(firebaseUid)) return null;
    return await _context.UserProfile
      .Include(p => p.Revisions)
      .Include(p => p.PublishedRevision)
      .Include(p => p.LatestRevision)
      .Include(p => p.AuthIdentities)
      .FirstOrDefaultAsync(p => p.FirebaseUid == firebaseUid, ct);
  }

  public async Task<UserProfile> UpsertFromFirebaseAsync(
    FirebaseToken token,
    CancellationToken ct = default)
  {
    var uid = token?.Uid?.Trim() ?? string.Empty;
    if (string.IsNullOrWhiteSpace(uid)) throw new InvalidOperationException("Firebase UID is required.");

    var record = await FirebaseAuth.DefaultInstance.GetUserAsync(uid);
    return await UpsertFromFirebaseAsync(record, ct);
  }

  public async Task<UserProfile> UpsertFromFirebaseAsync(
    UserRecord record,
    CancellationToken ct = default)
  {
    var uid = record.Uid?.Trim() ?? string.Empty;
    if (string.IsNullOrWhiteSpace(uid)) throw new InvalidOperationException("Firebase UID is required.");

    var now = DateTime.UtcNow;
    var profile = await GetByFirebaseUidAsync(uid, ct);
    var isGuest = IsGuestUser(record);

    if (profile is null)
    {
      profile = await FindLegacyProfileAsync(record, ct);
    }

    if (profile is null)
    {
      profile = new UserProfile
      {
        Id = uid,
        FirebaseUid = uid,
        IsGuest = isGuest,
        CreatedAtUtc = now,
        UpdatedAtUtc = now,
        LastLoginAtUtc = now,
        Visibility = Visibility.Private,
        TombstoneStatus = TombstoneStatus.Active,
        ShareToken = Guid.NewGuid().ToString("N"),
        ShareTokenCreatedAt = now
      };

      if (!string.IsNullOrWhiteSpace(record.Email))
      {
        profile.Emails.Add(record.Email);
      }

      profile.Revisions = new List<UserProfileRevision>();
      var displayName = string.IsNullOrWhiteSpace(record.DisplayName)
        ? (record.Email ?? uid)
        : record.DisplayName;
      var revision = new UserProfileRevision
      {
        UserProfileId = profile.Id,
        DisplayName = displayName,
        PictureUrl = string.IsNullOrWhiteSpace(record.PhotoUrl) ? null : record.PhotoUrl,
        Status = RevisionStatus.Approved,
        CreatedByUserId = profile.Id,
        CreatedAtUtc = now,
        UpdatedAtUtc = now
      };
      profile.Revisions.Add(revision);
      profile.PublishedRevision = revision;
      profile.PublishedRevisionId = revision.Id;
      profile.LatestRevision = revision;
      profile.LatestRevisionId = revision.Id;

      _context.UserProfile.Add(profile);
    }
    else
    {
      profile.FirebaseUid = string.IsNullOrWhiteSpace(profile.FirebaseUid) ? uid : profile.FirebaseUid;
      if (!isGuest)
      {
        profile.IsGuest = false;
      }
      profile.UpdatedAtUtc = now;
      profile.LastLoginAtUtc = now;

      if (!string.IsNullOrWhiteSpace(record.Email) &&
          !profile.Emails.Contains(record.Email, StringComparer.OrdinalIgnoreCase))
      {
        profile.Emails.Add(record.Email);
      }

      var revision = profile.LatestRevision ?? profile.PublishedRevision ?? profile.Revisions.FirstOrDefault();
      if (revision is null)
      {
        revision = new UserProfileRevision
        {
          UserProfileId = profile.Id,
          DisplayName = string.IsNullOrWhiteSpace(record.DisplayName)
            ? (record.Email ?? profile.Id)
            : record.DisplayName,
          PictureUrl = string.IsNullOrWhiteSpace(record.PhotoUrl) ? null : record.PhotoUrl,
          Status = RevisionStatus.Approved,
          CreatedByUserId = profile.Id,
          CreatedAtUtc = now,
          UpdatedAtUtc = now
        };
        profile.Revisions.Add(revision);
        profile.LatestRevision = revision;
        profile.LatestRevisionId = revision.Id;
        profile.PublishedRevision ??= revision;
        profile.PublishedRevisionId ??= revision.Id;
      }
      else
      {
        var changed = false;
        if (string.IsNullOrWhiteSpace(revision.DisplayName) && !string.IsNullOrWhiteSpace(record.DisplayName))
        {
          revision.DisplayName = record.DisplayName;
          changed = true;
        }
        if (revision.PictureUrl is null && !string.IsNullOrWhiteSpace(record.PhotoUrl))
        {
          revision.PictureUrl = record.PhotoUrl;
          changed = true;
        }
        if (changed) revision.UpdatedAtUtc = now;
      }
    }

    await SyncProviderIdentitiesAsync(profile, record, now, ct);
    await SyncLegacyGoogleFieldsAsync(profile, record, ct);

    // Update roles based on current email claims (admin lists)
    var roles = await _profileService.GetRolesAsync(profile, ct);
    if (roles.Count > 0)
    {
      profile.Roles = roles;
    }

    await _context.SaveChangesAsync(ct);
    return profile;
  }

  private async Task<UserProfile?> FindLegacyProfileAsync(UserRecord record, CancellationToken ct)
  {
    var providerData = record.ProviderData?.ToList() ?? new List<IUserInfo>();

    foreach (var info in providerData)
    {
      if (string.IsNullOrWhiteSpace(info.ProviderId) || string.IsNullOrWhiteSpace(info.Uid))
      {
        continue;
      }

      var identity = await _context.UserAuthIdentity
        .AsNoTracking()
        .FirstOrDefaultAsync(i => i.Provider == info.ProviderId && i.ProviderUserId == info.Uid, ct);
      if (identity is not null)
      {
        return await _context.UserProfile
          .Include(p => p.Revisions)
          .Include(p => p.PublishedRevision)
          .Include(p => p.LatestRevision)
          .Include(p => p.AuthIdentities)
          .FirstOrDefaultAsync(p => p.Id == identity.UserProfileId, ct);
      }
    }

    var googleUid = providerData
      .FirstOrDefault(p => string.Equals(p.ProviderId, "google.com", StringComparison.OrdinalIgnoreCase))
      ?.Uid;

    if (!string.IsNullOrWhiteSpace(googleUid))
    {
      return await _context.UserProfile
        .Include(p => p.Revisions)
        .Include(p => p.PublishedRevision)
        .Include(p => p.LatestRevision)
        .Include(p => p.AuthIdentities)
        .FirstOrDefaultAsync(p => p.GoogleId == googleUid, ct);
    }

    return null;
  }

  private async Task SyncProviderIdentitiesAsync(
    UserProfile profile,
    UserRecord record,
    DateTime now,
    CancellationToken ct)
  {
    var providerData = record.ProviderData?.ToList() ?? new List<IUserInfo>();
    if (providerData.Count == 0) return;

    foreach (var info in providerData)
    {
      if (string.IsNullOrWhiteSpace(info.ProviderId) || string.IsNullOrWhiteSpace(info.Uid))
      {
        continue;
      }

      var existing = await _context.UserAuthIdentity
        .FirstOrDefaultAsync(i => i.Provider == info.ProviderId && i.ProviderUserId == info.Uid, ct);

      if (existing is null)
      {
        existing = new UserAuthIdentity
        {
          UserProfileId = profile.Id,
          Provider = info.ProviderId,
          ProviderUserId = info.Uid,
          Email = info.Email,
          DisplayName = info.DisplayName,
          LinkedAtUtc = now,
          LastSeenAtUtc = now
        };
        _context.UserAuthIdentity.Add(existing);
      }
      else
      {
        existing.UserProfileId = profile.Id;
        existing.Email = info.Email ?? existing.Email;
        existing.DisplayName = info.DisplayName ?? existing.DisplayName;
        existing.LastSeenAtUtc = now;
      }
    }
  }

  private async Task SyncLegacyGoogleFieldsAsync(UserProfile profile, UserRecord record, CancellationToken ct)
  {
    var googleInfo = (record.ProviderData?.ToList() ?? new List<IUserInfo>())
      .FirstOrDefault(p => string.Equals(p.ProviderId, "google.com", StringComparison.OrdinalIgnoreCase));

    if (googleInfo is null) return;

    if (string.IsNullOrWhiteSpace(profile.GoogleId))
    {
      profile.GoogleId = googleInfo.Uid;
    }
    if (record.EmailVerified)
    {
      profile.GoogleEmailVerified = true;
    }

    await Task.CompletedTask;
  }

  private static bool IsGuestUser(UserRecord record)
  {
    var providerData = record.ProviderData;
    return providerData is null || providerData.Length == 0;
  }
}
