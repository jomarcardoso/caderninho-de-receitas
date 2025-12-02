using Server.Shared;

namespace Server.Models;

public class RecipeCategoryOpen
{
  public int Id { get; set; }
  public string Slug { get; set; } = string.Empty;
  public LanguageText Name { get; set; } = new LanguageText();
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
