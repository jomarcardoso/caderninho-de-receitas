namespace Server.Options;

public class FirebaseOptions
{
  public string? ServiceAccountPath { get; set; }
  public string? ServiceAccountJson { get; set; }
  public int SessionDays { get; set; } = 7;
  public string SessionCookieName { get; set; } = "__Host-session";
}
