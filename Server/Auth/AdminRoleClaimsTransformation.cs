using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace Server.Auth;

public class AdminRoleClaimsTransformation : IClaimsTransformation
{
  private readonly IConfiguration configuration;
  private readonly HashSet<string> admins;
  private readonly HashSet<string> owners;
  private readonly HashSet<string> moderators;
  private readonly HashSet<string> keepers;

  public AdminRoleClaimsTransformation(IConfiguration configuration)
  {
    this.configuration = configuration;
    string[] toSet(string path) => configuration.GetSection(path).Get<string[]>() ?? Array.Empty<string>();
    admins = new HashSet<string>(toSet("Authorization:Admins").Select(e => e.Trim().ToLowerInvariant()));
    owners = new HashSet<string>(toSet("Authorization:Owners").Select(e => e.Trim().ToLowerInvariant()));
    moderators = new HashSet<string>(toSet("Authorization:Moderators").Select(e => e.Trim().ToLowerInvariant()));
    keepers = new HashSet<string>(toSet("Authorization:Keepers").Select(e => e.Trim().ToLowerInvariant()));
  }

  public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
  {
    try
    {
      var email = principal.FindFirstValue(ClaimTypes.Email)?.Trim().ToLowerInvariant();
      if (string.IsNullOrEmpty(email)) return Task.FromResult(principal);

      var id = principal.Identity as ClaimsIdentity;
      if (id is null) return Task.FromResult(principal);

      void EnsureRole(string role)
      {
        if (!id.HasClaim(ClaimTypes.Role, role)) id.AddClaim(new Claim(ClaimTypes.Role, role));
      }

      // Owner implies Admin -> Moderator -> Keeper
      if (owners.Contains(email))
      {
        EnsureRole("Owner");
        EnsureRole("Admin");
        EnsureRole("Moderator");
        EnsureRole("Keeper");
      }

      if (admins.Contains(email))
      {
        EnsureRole("Admin");
        EnsureRole("Moderator");
        EnsureRole("Keeper");
      }

      if (moderators.Contains(email))
      {
        EnsureRole("Moderator");
        EnsureRole("Keeper");
      }

      if (keepers.Contains(email))
      {
        EnsureRole("Keeper");
      }
    }
    catch { }

    return Task.FromResult(principal);
  }
}
