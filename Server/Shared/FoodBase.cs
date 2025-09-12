namespace Server.Shared;

public abstract class FoodBase
{
  public int Id { get; set; }
  public LanguageTextBase Name { get; set; } = new LanguageTextBase();
  public LanguageTextBase Description { get; set; } = new LanguageTextBase();
  public string Image { get; set; } = string.Empty;
  public MeasurementUnit MeasurementUnit { get; set; }
  public List<MeasureBase> Measures { get; set; } = new();
  public LanguageTextBase Keys { get; set; } = new LanguageTextBase();
  public bool IsRecipe { get; set; }
  public string Icon { get; set; } = string.Empty;
  public FoodType Type { get; set; } = FoodType.Solid;
}