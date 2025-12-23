using System;
using Server.Models;

namespace Server.Response;

public class FoodSummaryResponse
{
  public int Id { get; set; }
  public LanguageText Name { get; set; } = new();
  public string Icon { get; set; } = string.Empty;
  public string[] Imgs { get; set; } = Array.Empty<string>();
}
