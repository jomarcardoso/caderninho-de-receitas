using Server.Shared;

namespace Server.Dtos;

public class IconDto
{
  public string Name { get; set; } = string.Empty; // filename with extension
  public string Url { get; set; } = string.Empty; // public URL

  // Optional search keys (per language). When provided, stored in DB.
  public LanguageTextBase? Keys { get; set; }
}
