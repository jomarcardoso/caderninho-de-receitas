namespace Server.Options;

public class GcsOptions
{
  public string BucketName { get; set; } = string.Empty;
  public string? CredentialsPath { get; set; }
  public string? PublicBaseUrl { get; set; }
}
