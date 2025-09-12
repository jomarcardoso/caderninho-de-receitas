using Server.Shared;

namespace Server.Dtos;

public class MeasurementUnitResponse
{
  public int type { get; set; }
  public LanguageTextBase Text { get; set; } = new LanguageTextBase();
  public LanguageTextBase PluralText { get; set; } = new LanguageTextBase();
}

public static class MeasurementUnitData
{
  public static readonly Dictionary<MeasurementUnit, MeasurementUnitResponse> Map = new()
  {
    { MeasurementUnit.Gram, new MeasurementUnitResponse { type = (int)MeasurementUnit.Gram, Text = new LanguageTextBase { En = "Gram", Pt = "Grama" }, PluralText = new LanguageTextBase { En = "Grams", Pt = "Gramas" } } },
    { MeasurementUnit.Liter, new MeasurementUnitResponse { type = (int)MeasurementUnit.Liter, Text = new LanguageTextBase { En = "Liter", Pt = "Litro" }, PluralText = new LanguageTextBase { En = "Liters", Pt = "Litros" } } }
  };

  public static readonly List<MeasurementUnitResponse> List = Map.Values
    .OrderBy(m => m.type)
    .ToList();

  static MeasurementUnitData()
  {
    var allEnumValues = Enum.GetValues<MeasurementUnit>();
    var missing = allEnumValues.Except(Map.Keys).ToList();
    if (missing.Any())
    {
      throw new InvalidOperationException(
        $"MeasurementUnitData.Map is missing mappings for: {string.Join(", ", missing)}");
    }
  }
}