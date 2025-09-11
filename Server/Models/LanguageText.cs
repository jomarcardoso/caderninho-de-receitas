using Microsoft.EntityFrameworkCore;

namespace Server.Models;

[Owned]
public class LanguageText
{
  public string En { get; set; } = string.Empty;
  public string Pt { get; set; } = string.Empty;
}