namespace Server.Serialization;

public class PlainTextRecipeRequest
{
  public string Content { get; set; } = string.Empty;
  public bool? IsPublic { get; set; }
}
