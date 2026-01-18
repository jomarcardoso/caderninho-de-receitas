using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Server.Options;

namespace Server.Services.Auth;

public class FirebaseSessionCookieService
{
  private readonly FirebaseOptions _options;
  private readonly TimeSpan _sessionDuration;

  public FirebaseSessionCookieService(IOptions<FirebaseOptions> options)
  {
    _options = options?.Value ?? new FirebaseOptions();
    var days = _options.SessionDays <= 0 ? 7 : _options.SessionDays;
    _sessionDuration = TimeSpan.FromDays(days);
  }

  public string CookieName => string.IsNullOrWhiteSpace(_options.SessionCookieName)
    ? "__Host-session"
    : _options.SessionCookieName;

  public TimeSpan SessionDuration => _sessionDuration;

  public async Task<string> CreateSessionCookieAsync(string idToken)
  {
    var cookieOptions = new SessionCookieOptions
    {
      ExpiresIn = _sessionDuration
    };
    return await FirebaseAuth.DefaultInstance.CreateSessionCookieAsync(idToken, cookieOptions);
  }

  public async Task<FirebaseToken?> VerifySessionCookieAsync(string sessionCookie, bool checkRevoked)
  {
    if (string.IsNullOrWhiteSpace(sessionCookie)) return null;
    try
    {
      return await FirebaseAuth.DefaultInstance.VerifySessionCookieAsync(sessionCookie, checkRevoked);
    }
    catch
    {
      return null;
    }
  }

  public void AppendSessionCookie(HttpResponse response, string sessionCookie)
  {
    if (string.IsNullOrWhiteSpace(sessionCookie)) return;
    response.Cookies.Append(CookieName, sessionCookie, new CookieOptions
    {
      HttpOnly = true,
      Secure = true,
      SameSite = SameSiteMode.Lax,
      Path = "/",
      MaxAge = _sessionDuration
    });
  }

  public void DeleteSessionCookie(HttpResponse response)
  {
    response.Cookies.Delete(CookieName, new CookieOptions
    {
      HttpOnly = true,
      Secure = true,
      SameSite = SameSiteMode.Lax,
      Path = "/"
    });
  }
}
