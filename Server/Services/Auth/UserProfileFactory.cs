using System;
using Google.Apis.Auth;
using Server.Models;
using Server.Shared;

namespace Server.Services.Auth;

public static class UserProfileFactory
{
  public static UserProfile FromGooglePayload(
    GoogleJsonWebSignature.Payload payload,
    DateTime? nowOverride = null)
  {
    var now = nowOverride ?? DateTime.UtcNow;
    var googleId = payload.Subject?.Trim() ?? string.Empty;

    var profile = new UserProfile
    {
      Id = googleId,
      GoogleId = googleId,
      GoogleEmailVerified = payload.EmailVerified is true,
      CreatedAtUtc = now,
      UpdatedAtUtc = now,
      LastLoginAtUtc = now,
      IsPublic = false,
      TombstoneStatus = TombstoneStatus.Active,
      ShareToken = Guid.NewGuid().ToString("N"),
      ShareTokenCreatedAt = now
    };

    if (!string.IsNullOrWhiteSpace(payload.Email))
    {
      profile.Emails.Add(payload.Email);
    }

    var rev = new UserProfileRevision
    {
      UserProfileId = profile.Id,
      DisplayName = string.IsNullOrWhiteSpace(payload.Name) ? profile.Id : payload.Name,
      PictureUrl = string.IsNullOrWhiteSpace(payload.Picture) ? null : payload.Picture,
      Status = RevisionStatus.Approved,
      CreatedByUserId = profile.Id,
      CreatedAtUtc = now,
      UpdatedAtUtc = now
    };

    profile.Revisions = new List<UserProfileRevision> { rev };
    profile.PublishedRevision = rev;
    profile.PublishedRevisionId = rev.Id;
    profile.LatestRevision = rev;
    profile.LatestRevisionId = rev.Id;

    return profile;
  }

  public static UserProfile Update(UserProfile profile, UserProfile payload)
  {
    DateTime now = DateTime.UtcNow;

    profile.UpdatedAtUtc = now;
    profile.LastLoginAtUtc = now;

    if (!string.IsNullOrWhiteSpace(payload.Emails[0]) && !profile.Emails.Contains(payload.Emails[0], StringComparer.OrdinalIgnoreCase))
    {
      profile.Emails.Add(payload.Emails[0]);
    }

    if (profile.Roles.Count == 0 && payload.Roles.Count > 0)
    {
      profile.Roles = payload.Roles;
    }


    profile.GoogleId = profile.GoogleId ?? payload.Id;
    profile.GoogleEmailVerified = profile.GoogleEmailVerified || payload.GoogleEmailVerified is true;

    UserProfileRevision? rev = profile.LatestRevision ?? profile.PublishedRevision ?? profile.Revisions.FirstOrDefault();
    UserProfileRevision? updateRev = payload.LatestRevision ?? payload.PublishedRevision ?? payload.Revisions.FirstOrDefault();

    if (rev is null && updateRev is not null)
    {
      rev = updateRev;
    }

    if (rev is not null)
    {
      var changed = false;

      if (string.IsNullOrWhiteSpace(rev.DisplayName) && !string.IsNullOrWhiteSpace(updateRev?.DisplayName))
      {
        rev.DisplayName = updateRev.DisplayName;
        changed = true;
      }

      if (rev.PictureUrl is null && !string.IsNullOrWhiteSpace(updateRev?.PictureUrl))
      {
        rev.PictureUrl = updateRev.PictureUrl;
        changed = true;
      }

      if (changed) rev.UpdatedAtUtc = now;
    }

    if (rev is not null)
    {
      profile.LatestRevision = rev;
      profile.LatestRevisionId = rev.Id;
      profile.PublishedRevision ??= rev;
      profile.PublishedRevisionId ??= rev.Id;
    }

    if (string.IsNullOrWhiteSpace(profile.ShareToken))
    {
      profile.ShareToken = Guid.NewGuid().ToString("N");
      profile.ShareTokenCreatedAt = now;
    }

    return profile;
  }
}
