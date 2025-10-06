using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Server.Services.Auth;

public interface IGoogleTokenValidator
{
  Task<GoogleTokenPayload?> ValidateAsync(
    string idToken,
    IEnumerable<string> audiences,
    CancellationToken cancellationToken = default);
}

public record GoogleTokenPayload(
  string GoogleSubject,
  string Email,
  string Name,
  string Picture,
  bool EmailVerified);
