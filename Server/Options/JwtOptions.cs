namespace Server.Options;

public class JwtOptions
{
  public string Issuer { get; set; } = string.Empty;
  public string Audience { get; set; } = string.Empty;
  public string Secret { get; set; } = string.Empty;
  public int ExpiresInMinutes { get; set; } = 60 * 24;
}

