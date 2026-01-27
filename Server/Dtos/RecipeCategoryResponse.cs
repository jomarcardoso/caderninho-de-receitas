using Server.Shared;

namespace Server.Dtos;

public class RecipeCategoryResponse
{
  public int Id { get; set; }
  public string Key { get; set; } = string.Empty; // slug/camel
  public string Url { get; set; } = string.Empty; // kebab-case
  public LanguageTextBase Name { get; set; } = new LanguageTextBase();
  public LanguageTextBase NamePlural { get; set; } = new LanguageTextBase();
  public LanguageTextBase Description { get; set; } = new LanguageTextBase();
  public string Img { get; set; } = string.Empty;
  public string BannerImg { get; set; } = string.Empty;
  public bool Featured { get; set; } = false;
}
