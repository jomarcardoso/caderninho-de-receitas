using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Server.Services.Auth;

public class GoogleAuthService
{
  private readonly ILogger<GoogleAuthService> _logger;
  private readonly IConfiguration _configuration;
  private readonly Func<string, GoogleJsonWebSignature.ValidationSettings, CancellationToken, Task<GoogleJsonWebSignature.Payload?>> _validator;

  public GoogleAuthService(
    ILogger<GoogleAuthService> logger,
    IConfiguration configuration,
    Func<string, GoogleJsonWebSignature.ValidationSettings, CancellationToken, Task<GoogleJsonWebSignature.Payload?>>? validator = null)
  {
    _logger = logger;
    _configuration = configuration;
    _validator = validator ?? DefaultValidateAsync;
  }

  public async Task<GoogleJsonWebSignature.Payload?> ValidateAsync(
    string idToken,
    CancellationToken cancellationToken = default)
  {
    if (string.IsNullOrWhiteSpace(idToken)) return null;

    var audiences = GetAudiences();
    var settings = new GoogleJsonWebSignature.ValidationSettings
    {
      Audience = audiences.Count == 0 ? null : audiences
    };

    try
    {
      return await _validator(idToken, settings, cancellationToken);
    }
    catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
    {
      throw;
    }
    catch (Exception ex)
    {
      _logger.LogWarning(ex, "Failed to validate Google ID token.");
      return null;
    }
  }

  private List<string> GetAudiences()
  {
    var audiences = new List<string>();
    var clientId = _configuration["Authentication:Google:ClientId"];
    if (!string.IsNullOrWhiteSpace(clientId))
    {
      audiences.Add(clientId);
    }

    var clientIds = _configuration.GetSection("Authentication:Google:ClientIds").Get<string[]>();
    if (clientIds is not null)
    {
      foreach (var id in clientIds)
      {
        if (!string.IsNullOrWhiteSpace(id))
        {
          audiences.Add(id);
        }
      }
    }

    return audiences;
  }

  private static async Task<GoogleJsonWebSignature.Payload?> DefaultValidateAsync(
    string idToken,
    GoogleJsonWebSignature.ValidationSettings settings,
    CancellationToken cancellationToken)
  {
    cancellationToken.ThrowIfCancellationRequested();
    return await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
  }
}
