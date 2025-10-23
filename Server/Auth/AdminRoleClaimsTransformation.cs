using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace Server.Auth;

public class AdminRoleClaimsTransformation : IClaimsTransformation
{
  private readonly IConfiguration configuration;
  private readonly HashSet<string> admins;

  public AdminRoleClaimsTransformation(IConfiguration configuration)
  {
    this.configuration = configuration;
    var list = configuration.GetSection("Authorization:Admins").Get<string[]>()
               ?? Array.Empty<string>();
    admins = new HashSet<string>(list.Select(e => e.Trim().ToLowerInvariant()));
  }

  public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
  {
    try
    {
      var email = principal.FindFirstValue(ClaimTypes.Email)?.Trim().ToLowerInvariant();
      if (!string.IsNullOrEmpty(email) && admins.Contains(email))
      {
        var id = principal.Identity as ClaimsIdentity;
        if (id is not null && !id.HasClaim(c => c.Type == ClaimTypes.Role && c.Value == "Admin"))
        {
          id.AddClaim(new Claim(ClaimTypes.Role, "Admin"));
        }
      }
    }
    catch { }

    return Task.FromResult(principal);
  }
}
