using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Server.Services.Auth;

public class GoogleAuthService
{
  private readonly IGoogleTokenValidator tokenValidator;
  private readonly ILogger<GoogleAuthService> logger;
  private readonly string[] audiences;

  public GoogleAuthService(
    IGoogleTokenValidator tokenValidator,
    ILogger<GoogleAuthService> logger,
    IConfiguration configuration)
  {
    this.tokenValidator = tokenValidator;
    this.logger = logger;
    audiences = ResolveAudiences(configuration);
  }

  public async Task<GoogleUserInfo?> ValidateAsync(
    string idToken,
    CancellationToken cancellationToken = default)
  {
    if (string.IsNullOrWhiteSpace(idToken))
    {
      return null;
    }

    try
    {
      var payload = await tokenValidator.ValidateAsync(idToken, audiences, cancellationToken);
      if (payload is null)
      {
        return null;
      }

      return new GoogleUserInfo(
        payload.Name,
        payload.Email,
        payload.Picture,
        payload.GoogleSubject,
        payload.EmailVerified);
    }
    catch (Exception exception)
    {
      logger.LogWarning(exception, "Failed to validate Google ID token");
      return null;
    }
  }

  private static string[] ResolveAudiences(IConfiguration configuration)
  {
    var candidates = configuration
      .GetSection("Authentication:Google:ValidAudiences")
      .Get<string[]>() ?? Array.Empty<string>();

    var normalized = new HashSet<string>(
      candidates.Where(static candidate => !string.IsNullOrWhiteSpace(candidate))
        .Select(static candidate => candidate.Trim()),
      StringComparer.Ordinal);

    var primaryClientId = configuration["Authentication:Google:ClientId"];
    if (!string.IsNullOrWhiteSpace(primaryClientId))
    {
      normalized.Add(primaryClientId.Trim());
    }

    return normalized.ToArray();
  }
}

public record GoogleUserInfo(
  string Name,
  string Email,
  string Picture,
  string GoogleId,
  bool EmailVerified);
