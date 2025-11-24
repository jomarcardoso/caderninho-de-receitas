using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Server.Options;

namespace Server.Services.Auth;

public class JwtTokenService
{
  private readonly JwtOptions _options;
  private readonly byte[] _key;

  public JwtTokenService(JwtOptions options)
  {
    _options = options ?? throw new ArgumentNullException(nameof(options));
    if (string.IsNullOrWhiteSpace(_options.Secret))
    {
      throw new InvalidOperationException("JWT Secret is not configured.");
    }
    _key = Encoding.UTF8.GetBytes(_options.Secret);
  }

  public string GenerateToken(string subject, string email, string? name, IEnumerable<Claim>? extraClaims = null)
  {
    var claims = new List<Claim>
    {
      new Claim(ClaimTypes.NameIdentifier, subject),
      new Claim(ClaimTypes.Email, email ?? string.Empty),
    };
    if (!string.IsNullOrWhiteSpace(name))
    {
      claims.Add(new Claim(ClaimTypes.Name, name!));
    }
    if (extraClaims is not null)
    {
      claims.AddRange(extraClaims);
    }

    var credentials = new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha256);
    var handler = new JwtSecurityTokenHandler();
    var token = handler.CreateJwtSecurityToken(
      issuer: _options.Issuer,
      audience: _options.Audience,
      expires: DateTime.UtcNow.AddMinutes(_options.ExpiresInMinutes),
      subject: new ClaimsIdentity(claims),
      signingCredentials: credentials
    );
    return handler.WriteToken(token);
  }
}
