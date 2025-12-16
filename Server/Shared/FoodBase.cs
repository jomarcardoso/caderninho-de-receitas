namespace Server.Shared;

public class FoodBase : ISearchable
{
  public int Id { get; set; }
  public LanguageTextBase Name { get; set; } = new LanguageTextBase();
  public LanguageTextBase Description { get; set; } = new LanguageTextBase();
  public List<string> Imgs { get; set; } = new();
  public MeasurementUnit MeasurementUnit { get; set; }
  public MeasureBase Measures { get; set; } = new();
  public LanguageTextBase Keys { get; set; } = new LanguageTextBase();
  public List<string> Categories { get; set; } = new();
  // New preferred field: FK to FoodIcon
  public int? IconId { get; set; }
  // Legacy icon filename. Kept for backward compatibility / migrations but not serialized.
  [System.Text.Json.Serialization.JsonIgnore]
  public string Icon { get; set; } = string.Empty;
  // Navigation with payload to be returned in API responses
  [System.Text.Json.Serialization.JsonPropertyName("icon")]
  public Models.FoodIcon? IconData { get; set; }
  public FoodType Type { get; set; } = FoodType.Solid;
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public MineralsBase Minerals { get; set; } = new();
  public VitaminsBase Vitamins { get; set; } = new();
  public AminoAcidsBase AminoAcids { get; set; } = new();
}
