using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace Server.Auth;

public class AdminRoleClaimsTransformation : IClaimsTransformation
{
  private readonly IConfiguration configuration;
  private readonly HashSet<string> admins;
  private readonly HashSet<string> owners;
  private readonly HashSet<string> keepers;

  public AdminRoleClaimsTransformation(IConfiguration configuration)
  {
    this.configuration = configuration;
    string[] toSet(string path) => configuration.GetSection(path).Get<string[]>() ?? Array.Empty<string>();
    admins = new HashSet<string>(toSet("Authorization:Admins").Select(e => e.Trim().ToLowerInvariant()));
    owners = new HashSet<string>(toSet("Authorization:Owners").Select(e => e.Trim().ToLowerInvariant()));
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

      // Owner implies Admin
      if (owners.Contains(email))
      {
        if (!id.HasClaim(ClaimTypes.Role, "Owner")) id.AddClaim(new Claim(ClaimTypes.Role, "Owner"));
        if (!id.HasClaim(ClaimTypes.Role, "Admin")) id.AddClaim(new Claim(ClaimTypes.Role, "Admin"));
      }

      if (admins.Contains(email) && !id.HasClaim(ClaimTypes.Role, "Admin"))
      {
        id.AddClaim(new Claim(ClaimTypes.Role, "Admin"));
      }

      if (keepers.Contains(email) && !id.HasClaim(ClaimTypes.Role, "Keeper"))
      {
        id.AddClaim(new Claim(ClaimTypes.Role, "Keeper"));
      }
    }
    catch { }

    return Task.FromResult(principal);
  }
}
