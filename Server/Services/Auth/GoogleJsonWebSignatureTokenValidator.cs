using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Google.Apis.Auth;

namespace Server.Services.Auth;

public class GoogleJsonWebSignatureTokenValidator : IGoogleTokenValidator
{
  public async Task<GoogleTokenPayload?> ValidateAsync(
    string idToken,
    IEnumerable<string> audiences,
    CancellationToken cancellationToken = default)
  {
    if (string.IsNullOrWhiteSpace(idToken))
    {
      return null;
    }

    var allowedAudiences = (audiences ?? Enumerable.Empty<string>())
      .Where(audience => !string.IsNullOrWhiteSpace(audience))
      .Distinct()
      .ToList();

    var settings = new GoogleJsonWebSignature.ValidationSettings
    {
      Audience = allowedAudiences.Count > 0 ? allowedAudiences : null,
    };

    try
    {
      var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
      var emailVerified = payload.EmailVerified is true;

      return new GoogleTokenPayload(
        payload.Subject ?? string.Empty,
        payload.Email ?? string.Empty,
        payload.Name ?? string.Empty,
        payload.Picture ?? string.Empty,
        emailVerified);
    }
    catch (InvalidJwtException)
    {
      return null;
    }
  }
}
