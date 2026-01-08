using System;
using System.Linq;
using Server.Dtos;
using Server.Models;

namespace Server.Services;

public record UserProfileViewContext(bool IsOwner, bool IsAdmin, bool HasShareToken);

public static class UserProfileResponseBuilder
{
  private static UserProfileRevision? PickRevision(UserProfile profile, bool preferLatest)
  {
    var fallback = profile.Revisions?.OrderByDescending(r => r.CreatedAtUtc).FirstOrDefault();
    if (preferLatest)
    {
      return profile.LatestRevision ?? profile.PublishedRevision ?? fallback;
    }

    return profile.PublishedRevision ?? profile.LatestRevision ?? fallback;
  }

  public static UserProfileResponse Build(UserProfile profile, UserProfileViewContext ctx)
  {
    var preferLatest = ctx.IsOwner || ctx.IsAdmin || ctx.HasShareToken;
    var revision = PickRevision(profile, preferLatest);

    UserProfileResponse response = ctx.IsAdmin
      ? new UserProfileAdminResponse()
      : ctx.IsOwner
        ? new UserProfileOwnerResponse()
        : new UserProfileResponse();

    response.Id = profile.Id;
    response.Locale = profile.Locale;
    response.ThemeColor = profile.ThemeColor;
    response.IsPublic = profile.IsPublic;
    response.Language = profile.Language;
    response.DisplayName = string.IsNullOrWhiteSpace(revision?.DisplayName) ? profile.Id : revision!.DisplayName!;
    response.PictureUrl = revision?.PictureUrl;
    response.Description = revision?.Description;

    if (response is UserProfileOwnerResponse owner)
    {
      owner.Emails = (profile.Emails ?? new()).ToList();
      owner.GoogleId = profile.GoogleId;
      owner.GoogleEmailVerified = profile.GoogleEmailVerified;
      owner.Roles = (profile.Roles ?? new()).ToList();
      if (ctx.IsOwner || ctx.IsAdmin)
      {
        owner.GivenName = revision?.GivenName;
        owner.FamilyName = revision?.FamilyName;
      }

      owner.Allergies = profile.Allergies ?? new();
      owner.Intolerances = profile.Intolerances ?? new();
      owner.MedicalRestrictions = profile.MedicalRestrictions ?? new();
      owner.DietStyles = profile.DietStyles ?? new();
      owner.CulturalRestrictions = profile.CulturalRestrictions ?? new();
      owner.PersonalPreferences = profile.PersonalPreferences ?? new();

      owner.ShareToken = ctx.IsOwner ? profile.ShareToken : null;
      owner.ShareTokenCreatedAt = ctx.IsOwner ? profile.ShareTokenCreatedAt : null;
      owner.ShareTokenRevokedAt = ctx.IsOwner ? profile.ShareTokenRevokedAt : null;
      owner.ModerationNotes = ctx.IsOwner || ctx.IsAdmin ? revision?.ModerationNotes : null;
      owner.IsFeatured = profile.IsFeatured;
      owner.FeaturedUntil = profile.FeaturedUntil;
    }

    if (response is UserProfileAdminResponse admin)
    {
      admin.FeaturedAt = profile.FeaturedAt;
    }

    return response;
  }

  public static UserProfileOwnerResponse BuildOwnerResponse(UserProfile profile)
  {
    var ctx = new UserProfileViewContext(
      IsOwner: true,
      IsAdmin: false,
      HasShareToken: !string.IsNullOrWhiteSpace(profile.ShareToken));
    return (UserProfileOwnerResponse)Build(profile, ctx);
  }

  public static UserProfileSummaryResponse BuildSummary(UserProfile profile, bool isAdmin, string? callerId)
  {
    var revision = PickRevision(profile, preferLatest: false);
    var displayName = string.IsNullOrWhiteSpace(revision?.DisplayName) ? profile.Id : revision!.DisplayName!;
    var isOwner = !string.IsNullOrWhiteSpace(callerId) && string.Equals(profile.Id, callerId, StringComparison.Ordinal);

    return new UserProfileSummaryResponse
    {
      Id = profile.Id,
      DisplayName = displayName,
      PictureUrl = revision?.PictureUrl,
      IsFeatured = (isAdmin || isOwner) && profile.IsFeatured
    };
  }
}
