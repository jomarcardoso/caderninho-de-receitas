using Server.Shared;

namespace Server.Dtos;

public class NutrientDataResponse
{
  public int Index { get; set; }
  public LanguageTextBase Name { get; set; } = new LanguageTextBase();
  public string ShortName { get; set; } = string.Empty;
  public string MeasurementUnit { get; set; } = string.Empty;
}