using Server.Shared;

namespace Server.Dtos;

public class NutritionalInformationResponse
{
  public int Index { get; set; }
  public LanguageTextBase Text { get; set; } = new LanguageTextBase();
  public string ShortName { get; set; } = string.Empty;
  public string MeasurementUnit { get; set; } = string.Empty;
}

public static class NutritionalInformationData
{
  public static readonly Dictionary<NutritionalInformationType, NutritionalInformationResponse> Map = new()
  {
    { NutritionalInformationType.Acidification, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.Acidification, Text = new LanguageTextBase { En = "Acidification", Pt = "Acidificação" }, ShortName = "Acid", MeasurementUnit = "pH" } },
    { NutritionalInformationType.Ashes, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.Ashes, Text = new LanguageTextBase { En = "Ashes", Pt = "Cinzas" }, ShortName = "Ash", MeasurementUnit = "g" } },
    { NutritionalInformationType.Calories, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.Calories, Text = new LanguageTextBase { En = "Calories", Pt = "Calorias" }, ShortName = "Cal", MeasurementUnit = "kcal" } },
    { NutritionalInformationType.Carbohydrates, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.Carbohydrates, Text = new LanguageTextBase { En = "Carbohydrates", Pt = "Carboidratos" }, ShortName = "Carb", MeasurementUnit = "g" } },
    { NutritionalInformationType.Cholesterol, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.Cholesterol, Text = new LanguageTextBase { En = "Cholesterol", Pt = "Colesterol" }, ShortName = "Chol", MeasurementUnit = "mg" } },
    { NutritionalInformationType.DietaryFiber, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.DietaryFiber, Text = new LanguageTextBase { En = "Dietary Fiber", Pt = "Fibra Alimentar" }, ShortName = "Fiber", MeasurementUnit = "g" } },
    { NutritionalInformationType.Gi, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.Gi, Text = new LanguageTextBase { En = "Glycemic Index", Pt = "Índice Glicêmico" }, ShortName = "GI", MeasurementUnit = "" } },
    { NutritionalInformationType.Gl, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.Gl, Text = new LanguageTextBase { En = "Glycemic Load", Pt = "Carga Glicêmica" }, ShortName = "GL", MeasurementUnit = "" } },
    { NutritionalInformationType.MonounsaturatedFats, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.MonounsaturatedFats, Text = new LanguageTextBase { En = "Monounsaturated Fats", Pt = "Gorduras Monoinsaturadas" }, ShortName = "MUFA", MeasurementUnit = "g" } },
    { NutritionalInformationType.PolyunsaturatedFats, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.PolyunsaturatedFats, Text = new LanguageTextBase { En = "Polyunsaturated Fats", Pt = "Gorduras Poli-insaturadas" }, ShortName = "PUFA", MeasurementUnit = "g" } },
    { NutritionalInformationType.Proteins, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.Proteins, Text = new LanguageTextBase { En = "Proteins", Pt = "Proteínas" }, ShortName = "Prot", MeasurementUnit = "g" } },
    { NutritionalInformationType.SaturedFats, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.SaturedFats, Text = new LanguageTextBase { En = "Saturated Fats", Pt = "Gorduras Saturadas" }, ShortName = "SFA", MeasurementUnit = "g" } },
    { NutritionalInformationType.Sugar, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.Sugar, Text = new LanguageTextBase { En = "Sugar", Pt = "Açúcar" }, ShortName = "Sugar", MeasurementUnit = "g" } },
    { NutritionalInformationType.TotalFat, new NutritionalInformationResponse { Index = (int)NutritionalInformationType.TotalFat, Text = new LanguageTextBase { En = "Total Fat", Pt = "Gordura Total" }, ShortName = "Fat", MeasurementUnit = "g" } }
  };

  public static readonly List<NutritionalInformationResponse> List = Map.Values
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