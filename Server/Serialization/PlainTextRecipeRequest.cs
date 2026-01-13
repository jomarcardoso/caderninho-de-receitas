namespace Server.Serialization;

public class PlainTextRecipeRequest
{
  public string Content { get; set; } = string.Empty;
  public Server.Shared.Visibility? Visibility { get; set; }
}
