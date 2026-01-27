using Server.Models;

namespace Server.Dtos;

public class RecipeCategoryDto
{
  public LanguageText Name { get; set; } = new();
  public LanguageText? NamePlural { get; set; }
  public LanguageText? Description { get; set; }
  public string? Img { get; set; }
  public string? BannerImg { get; set; }
  public bool? Featured { get; set; }
}
