using Server.Shared;

namespace Server.Models;

public class RecipeCategoryOpen
{
  public int Id { get; set; }
  public string Slug { get; set; } = string.Empty;
  public LanguageText Name { get; set; } = new LanguageText();
  public LanguageText Description { get; set; } = new LanguageText();
  public string BannerImg { get; set; } = string.Empty;
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
