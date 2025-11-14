using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.Extensions.Options;

namespace Server.Auth;

public class TestAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
  public TestAuthHandler(
      IOptionsMonitor<AuthenticationSchemeOptions> options,
      ILoggerFactory logger,
      UrlEncoder encoder,
      ISystemClock clock)
      : base(options, logger, encoder, clock) { }

  protected override Task<AuthenticateResult> HandleAuthenticateAsync()
  {
    // In development, prefer the x-temp-owner cookie when present to bind requests
    // to the real OwnerId; fallback to a fixed dev-user.
    var owner = Request?.Cookies["x-temp-owner"];
    owner = string.IsNullOrWhiteSpace(owner) ? "dev-user" : owner!.Trim();

    var claims = new List<Claim>
    {
      new Claim(ClaimTypes.NameIdentifier, owner!),
      new Claim(ClaimTypes.Role, "user"),
    };
    // Friendly defaults for display
    claims.Add(new Claim(ClaimTypes.Name, owner == "dev-user" ? "Developer User" : owner));
    claims.Add(new Claim(ClaimTypes.Email, owner == "dev-user" ? "dev@teste.com" : "user@local"));

    var identity = new ClaimsIdentity(claims, Scheme.Name);
    var principal = new ClaimsPrincipal(identity);
    var ticket = new AuthenticationTicket(principal, Scheme.Name);

    return Task.FromResult(AuthenticateResult.Success(ticket));
  }
}

