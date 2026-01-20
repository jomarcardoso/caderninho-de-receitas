using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Server.Services.Auth;

namespace Server.Auth;

public class FirebaseSessionAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
  private readonly FirebaseSessionCookieService _cookieService;
  private readonly FirebaseUserProfileService _profiles;

  public FirebaseSessionAuthHandler(
    IOptionsMonitor<AuthenticationSchemeOptions> options,
    ILoggerFactory logger,
    UrlEncoder encoder,
    FirebaseSessionCookieService cookieService,
    FirebaseUserProfileService profiles)
    : base(options, logger, encoder)
  {
    _cookieService = cookieService;
    _profiles = profiles;
  }

  protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
  {
    if (!Request.Cookies.TryGetValue(_cookieService.CookieName, out var sessionCookie) ||
        string.IsNullOrWhiteSpace(sessionCookie))
    {
      return AuthenticateResult.NoResult();
    }

    var decoded = await _cookieService.VerifySessionCookieAsync(sessionCookie, checkRevoked: true);
    if (decoded is null)
    {
      return AuthenticateResult.Fail("Invalid session cookie.");
    }

    var profile = await _profiles.GetByFirebaseUidAsync(decoded.Uid, Context.RequestAborted)
      ?? await _profiles.UpsertFromFirebaseAsync(decoded, Context.RequestAborted);

    if (profile is null)
    {
      return AuthenticateResult.Fail("User profile not found.");
    }

    var claims = new List<Claim>
    {
      new Claim(ClaimTypes.NameIdentifier, profile.Id),
      new Claim("firebase_uid", decoded.Uid)
    };

    var displayName = profile.LatestRevision?.DisplayName ?? profile.PublishedRevision?.DisplayName;
    if (!string.IsNullOrWhiteSpace(displayName))
    {
      claims.Add(new Claim(ClaimTypes.Name, displayName));
    }

    foreach (var email in profile.Emails.Where(e => !string.IsNullOrWhiteSpace(e)))
    {
      claims.Add(new Claim(ClaimTypes.Email, email));
    }

    var identity = new ClaimsIdentity(claims, Scheme.Name);
    var principal = new ClaimsPrincipal(identity);
    var ticket = new AuthenticationTicket(principal, Scheme.Name);
    return AuthenticateResult.Success(ticket);
  }
}
