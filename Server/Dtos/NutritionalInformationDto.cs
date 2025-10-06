using Server.Shared;

namespace Server.Dtos;

public static class NutritionalInformationData
{
  public static readonly Dictionary<NutritionalInformationType, NutrientDataResponse> Map = new()
  {
    { NutritionalInformationType.Acidification, new NutrientDataResponse { Index = (int)NutritionalInformationType.Acidification, Name = new LanguageTextBase { En = "Acidification", Pt = "Acidificação" }, ShortName = "Acid", MeasurementUnit = "pH" } },
    { NutritionalInformationType.Ashes, new NutrientDataResponse { Index = (int)NutritionalInformationType.Ashes, Name = new LanguageTextBase { En = "Ashes", Pt = "Cinzas" }, ShortName = "Ash", MeasurementUnit = "g" } },
    { NutritionalInformationType.Calories, new NutrientDataResponse { Index = (int)NutritionalInformationType.Calories, Name = new LanguageTextBase { En = "Calories", Pt = "Calorias" }, ShortName = "Cal", MeasurementUnit = "kcal" } },
    { NutritionalInformationType.Carbohydrates, new NutrientDataResponse { Index = (int)NutritionalInformationType.Carbohydrates, Name = new LanguageTextBase { En = "Carbohydrates", Pt = "Carboidratos" }, ShortName = "Carb", MeasurementUnit = "g" } },
    { NutritionalInformationType.Cholesterol, new NutrientDataResponse { Index = (int)NutritionalInformationType.Cholesterol, Name = new LanguageTextBase { En = "Cholesterol", Pt = "Colesterol" }, ShortName = "Chol", MeasurementUnit = "mg" } },
    { NutritionalInformationType.DietaryFiber, new NutrientDataResponse { Index = (int)NutritionalInformationType.DietaryFiber, Name = new LanguageTextBase { En = "Dietary Fiber", Pt = "Fibra Alimentar" }, ShortName = "Fiber", MeasurementUnit = "g" } },
    { NutritionalInformationType.Gi, new NutrientDataResponse { Index = (int)NutritionalInformationType.Gi, Name = new LanguageTextBase { En = "Glycemic Index", Pt = "Índice Glicêmico" }, ShortName = "GI", MeasurementUnit = "" } },
    { NutritionalInformationType.Gl, new NutrientDataResponse { Index = (int)NutritionalInformationType.Gl, Name = new LanguageTextBase { En = "Glycemic Load", Pt = "Carga Glicêmica" }, ShortName = "GL", MeasurementUnit = "" } },
    { NutritionalInformationType.MonounsaturatedFats, new NutrientDataResponse { Index = (int)NutritionalInformationType.MonounsaturatedFats, Name = new LanguageTextBase { En = "Monounsaturated Fats", Pt = "Gorduras Monoinsaturadas" }, ShortName = "MUFA", MeasurementUnit = "g" } },
    { NutritionalInformationType.PolyunsaturatedFats, new NutrientDataResponse { Index = (int)NutritionalInformationType.PolyunsaturatedFats, Name = new LanguageTextBase { En = "Polyunsaturated Fats", Pt = "Gorduras Poli-insaturadas" }, ShortName = "PUFA", MeasurementUnit = "g" } },
    { NutritionalInformationType.Proteins, new NutrientDataResponse { Index = (int)NutritionalInformationType.Proteins, Name = new LanguageTextBase { En = "Proteins", Pt = "Proteínas" }, ShortName = "Prot", MeasurementUnit = "g" } },
    { NutritionalInformationType.SaturedFats, new NutrientDataResponse { Index = (int)NutritionalInformationType.SaturedFats, Name = new LanguageTextBase { En = "Saturated Fats", Pt = "Gorduras Saturadas" }, ShortName = "SFA", MeasurementUnit = "g" } },
    { NutritionalInformationType.Sugar, new NutrientDataResponse { Index = (int)NutritionalInformationType.Sugar, Name = new LanguageTextBase { En = "Sugar", Pt = "Açúcar" }, ShortName = "Sugar", MeasurementUnit = "g" } },
    { NutritionalInformationType.TotalFat, new NutrientDataResponse { Index = (int)NutritionalInformationType.TotalFat, Name = new LanguageTextBase { En = "Total Fat", Pt = "Gordura Total" }, ShortName = "Fat", MeasurementUnit = "g" } }
  };

  public static readonly List<NutrientDataResponse> List = Map.Values
    .OrderBy(m => m.Index)
    .ToList();

  static NutritionalInformationData()
  {
    var allEnumValues = Enum.GetValues<NutritionalInformationType>();
    var missing = allEnumValues.Except(Map.Keys).ToList();
    if (missing.Any())
    {
      throw new InvalidOperationException(
        $"NutritionalInformationData.Map is missing mappings for: {string.Join(", ", missing)}");
    }
  }
}