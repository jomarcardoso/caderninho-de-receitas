using Server.Shared;

namespace Server.Models;

public class RecipeCategory
{
  public int Id { get; set; }
  public string Slug { get; set; } = string.Empty;
  public LanguageText Name { get; set; } = new LanguageText();
  public LanguageText NamePlural { get; set; } = new LanguageText();
  public LanguageText Description { get; set; } = new LanguageText();
  public string Img { get; set; } = string.Empty;
  public string BannerImg { get; set; } = string.Empty;
  public Visibility Visibility { get; set; } = Visibility.Private;
  public bool Featured { get; set; } = false;
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
