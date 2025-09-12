using Server.Shared;

namespace Server.Dtos;

public class MineralResponse
{
  public int Index { get; set; }
  public LanguageTextBase Name { get; set; } = new LanguageTextBase();
  public string ShortName { get; set; } = string.Empty;
  public string MeasurementUnit { get; set; } = string.Empty;
}

public static class MineralsData
{
  public static readonly Dictionary<MineralType, MineralResponse> Map = new()
  {
    { MineralType.Calcium, new MineralResponse { Index = (int)MineralType.Calcium, Name = new LanguageTextBase { En = "Calcium", Pt = "Cálcio" }, ShortName = "Ca", MeasurementUnit = "mg" } },
    { MineralType.Copper, new MineralResponse { Index = (int)MineralType.Copper, Name = new LanguageTextBase { En = "Copper", Pt = "Cobre" }, ShortName = "Cu", MeasurementUnit = "mg" } },
    { MineralType.Fluoride, new MineralResponse { Index = (int)MineralType.Fluoride, Name = new LanguageTextBase { En = "Fluoride", Pt = "Flúor" }, ShortName = "F", MeasurementUnit = "μg" } },
    { MineralType.Iron, new MineralResponse { Index = (int)MineralType.Iron, Name = new LanguageTextBase { En = "Iron", Pt = "Ferro" }, ShortName = "Fe", MeasurementUnit = "mg" } },
    { MineralType.Magnesium, new MineralResponse { Index = (int)MineralType.Magnesium, Name = new LanguageTextBase { En = "Magnesium", Pt = "Magnésio" }, ShortName = "Mg", MeasurementUnit = "mg" } },
    { MineralType.Manganese, new MineralResponse { Index = (int)MineralType.Manganese, Name = new LanguageTextBase { En = "Manganese", Pt = "Manganês" }, ShortName = "Mn", MeasurementUnit = "mg" } },
    { MineralType.Phosphorus, new MineralResponse { Index = (int)MineralType.Phosphorus, Name = new LanguageTextBase { En = "Phosphorus", Pt = "Fósforo" }, ShortName = "P", MeasurementUnit = "mg" } },
    { MineralType.Potassium, new MineralResponse { Index = (int)MineralType.Potassium, Name = new LanguageTextBase { En = "Potassium", Pt = "Potássio" }, ShortName = "K", MeasurementUnit = "mg" } },
    { MineralType.Selenium, new MineralResponse { Index = (int)MineralType.Selenium, Name = new LanguageTextBase { En = "Selenium", Pt = "Selênio" }, ShortName = "Se", MeasurementUnit = "mcg" } },
    { MineralType.Sodium, new MineralResponse { Index = (int)MineralType.Sodium, Name = new LanguageTextBase { En = "Sodium", Pt = "Sódio" }, ShortName = "Na", MeasurementUnit = "mg" } },
    { MineralType.Zinc, new MineralResponse { Index = (int)MineralType.Zinc, Name = new LanguageTextBase { En = "Zinc", Pt = "Zinco" }, ShortName = "Zn", MeasurementUnit = "mg" } }
  };

  public static readonly List<MineralResponse> List = Map.Values
    .OrderBy(m => m.Index)
    .ToList();

  static MineralsData()
  {
    var allEnumValues = Enum.GetValues<MineralType>();
    var missing = allEnumValues.Except(Map.Keys).ToList();
    if (missing.Any())
    {
      throw new InvalidOperationException(
        $"MineralsData.Map is missing mappings for: {string.Join(", ", missing)}");
    }
  }
}