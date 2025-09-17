using Server.Shared;

namespace Server.Dtos;

public static class MeasurementUnitData
{
  public static readonly Dictionary<MeasurementUnit, LanguageTextAndPluralBase> Map = new()
  {
    { MeasurementUnit.Gram, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Gram", Pt = "Grama" }, PluralText = new LanguageTextBase { En = "Grams", Pt = "Gramas" } } },
    { MeasurementUnit.Liter, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Liter", Pt = "Litro" }, PluralText = new LanguageTextBase { En = "Liters", Pt = "Litros" } } }
  };

  public static readonly List<LanguageTextAndPluralBase> List = Map.Values
    // .OrderBy(m => m.type)
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