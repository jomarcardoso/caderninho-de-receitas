using Server.Shared;

namespace Server.Dtos;

public static class MineralsData
{
  public static readonly Dictionary<MineralType, NutrientDataResponse> Map = new()
  {
    { MineralType.Calcium, new NutrientDataResponse { Index = (int)MineralType.Calcium, Name = new LanguageTextBase { En = "Calcium", Pt = "Cálcio" }, ShortName = "Ca", MeasurementUnit = "mg" } },
    { MineralType.Copper, new NutrientDataResponse { Index = (int)MineralType.Copper, Name = new LanguageTextBase { En = "Copper", Pt = "Cobre" }, ShortName = "Cu", MeasurementUnit = "mg" } },
    { MineralType.Fluoride, new NutrientDataResponse { Index = (int)MineralType.Fluoride, Name = new LanguageTextBase { En = "Fluoride", Pt = "Flúor" }, ShortName = "F", MeasurementUnit = "μg" } },
    { MineralType.Iron, new NutrientDataResponse { Index = (int)MineralType.Iron, Name = new LanguageTextBase { En = "Iron", Pt = "Ferro" }, ShortName = "Fe", MeasurementUnit = "mg" } },
    { MineralType.Magnesium, new NutrientDataResponse { Index = (int)MineralType.Magnesium, Name = new LanguageTextBase { En = "Magnesium", Pt = "Magnésio" }, ShortName = "Mg", MeasurementUnit = "mg" } },
    { MineralType.Manganese, new NutrientDataResponse { Index = (int)MineralType.Manganese, Name = new LanguageTextBase { En = "Manganese", Pt = "Manganês" }, ShortName = "Mn", MeasurementUnit = "mg" } },
    { MineralType.Phosphorus, new NutrientDataResponse { Index = (int)MineralType.Phosphorus, Name = new LanguageTextBase { En = "Phosphorus", Pt = "Fósforo" }, ShortName = "P", MeasurementUnit = "mg" } },
    { MineralType.Potassium, new NutrientDataResponse { Index = (int)MineralType.Potassium, Name = new LanguageTextBase { En = "Potassium", Pt = "Potássio" }, ShortName = "K", MeasurementUnit = "mg" } },
    { MineralType.Selenium, new NutrientDataResponse { Index = (int)MineralType.Selenium, Name = new LanguageTextBase { En = "Selenium", Pt = "Selênio" }, ShortName = "Se", MeasurementUnit = "mcg" } },
    { MineralType.Sodium, new NutrientDataResponse { Index = (int)MineralType.Sodium, Name = new LanguageTextBase { En = "Sodium", Pt = "Sódio" }, ShortName = "Na", MeasurementUnit = "mg" } },
    { MineralType.Zinc, new NutrientDataResponse { Index = (int)MineralType.Zinc, Name = new LanguageTextBase { En = "Zinc", Pt = "Zinco" }, ShortName = "Zn", MeasurementUnit = "mg" } }
  };

  public static readonly List<NutrientDataResponse> List = Map.Values
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