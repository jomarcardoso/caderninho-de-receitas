using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Server.Services.Auth;

public class GoogleAuthService
{
  private readonly ILogger<GoogleAuthService> logger;
  private readonly string[] audiences;
  private readonly Func<string, GoogleJsonWebSignature.ValidationSettings, CancellationToken, Task<GoogleJsonWebSignature.Payload>> validateAsync;

  public GoogleAuthService(
    ILogger<GoogleAuthService> logger,
    IConfiguration configuration)
    : this(logger, configuration, (token, settings, ct) => GoogleJsonWebSignature.ValidateAsync(token, settings))
  {
  }

  internal GoogleAuthService(
    ILogger<GoogleAuthService> logger,
    IConfiguration configuration,
    Func<string, GoogleJsonWebSignature.ValidationSettings, CancellationToken, Task<GoogleJsonWebSignature.Payload>> validateAsync)
  {
    this.logger = logger;
    this.validateAsync = validateAsync;
    audiences = ResolveAudiences(configuration);
  }

  public async Task<GoogleJsonWebSignature.Payload?> ValidateAsync(
    string idToken,
    CancellationToken cancellationToken = default)
  {
    if (string.IsNullOrWhiteSpace(idToken))
    {
      return null;
    }

    try
    {
      var settings = new GoogleJsonWebSignature.ValidationSettings
      {
        Audience = audiences.Length > 0 ? audiences : null
      };

      return await validateAsync(idToken, settings, cancellationToken);
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
