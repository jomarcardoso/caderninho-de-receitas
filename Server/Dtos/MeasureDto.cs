using Server.Shared;

namespace Server.Dtos;

public class MeasureTypeResponse
{
  public int Type { get; set; }
  public LanguageTextBase Text { get; set; } = new LanguageTextBase();
}

public static class MeasureData
{
  public static readonly Dictionary<MeasureType, MeasureTypeResponse> Map = new()
  {
    { MeasureType.Cup, new MeasureTypeResponse { Type = (int)MeasureType.Cup, Text = new LanguageTextBase { En = "Cup", Pt = "Xícara" } } },
    { MeasureType.Spoon, new MeasureTypeResponse { Type = (int)MeasureType.Spoon, Text = new LanguageTextBase { En = "Tablespoon", Pt = "Colher de Sopa" } } },
    { MeasureType.TeaSpoon, new MeasureTypeResponse { Type = (int)MeasureType.TeaSpoon, Text = new LanguageTextBase { En = "Teaspoon", Pt = "Colher de Chá" } } },
    { MeasureType.Unity, new MeasureTypeResponse { Type = (int)MeasureType.Unity, Text = new LanguageTextBase { En = "Unit", Pt = "Unidade" } } },
    { MeasureType.UnitySmall, new MeasureTypeResponse { Type = (int)MeasureType.UnitySmall, Text = new LanguageTextBase { En = "Small Unit", Pt = "Unidade Pequena" } } },
    { MeasureType.UnityLarge, new MeasureTypeResponse { Type = (int)MeasureType.UnityLarge, Text = new LanguageTextBase { En = "Large Unit", Pt = "Unidade Grande" } } },
    { MeasureType.Literal, new MeasureTypeResponse { Type = (int)MeasureType.Literal, Text = new LanguageTextBase { En = "Literal", Pt = "Literal" } } },
    { MeasureType.Can, new MeasureTypeResponse { Type = (int)MeasureType.Can, Text = new LanguageTextBase { En = "Can", Pt = "Lata" } } },
    { MeasureType.Glass, new MeasureTypeResponse { Type = (int)MeasureType.Glass, Text = new LanguageTextBase { En = "Glass", Pt = "Copo" } } },
    { MeasureType.Breast, new MeasureTypeResponse { Type = (int)MeasureType.Breast, Text = new LanguageTextBase { En = "Breast", Pt = "Peito" } } },
    { MeasureType.Clove, new MeasureTypeResponse { Type = (int)MeasureType.Clove, Text = new LanguageTextBase { En = "Clove", Pt = "Dente" } } },
    { MeasureType.Slice, new MeasureTypeResponse { Type = (int)MeasureType.Slice, Text = new LanguageTextBase { En = "Slice", Pt = "Fatia" } } },
    { MeasureType.Bunch, new MeasureTypeResponse { Type = (int)MeasureType.Bunch, Text = new LanguageTextBase { En = "Bunch", Pt = "Maço" } } },
    { MeasureType.Ml, new MeasureTypeResponse { Type = (int)MeasureType.Ml, Text = new LanguageTextBase { En = "Milliliter", Pt = "Mililitro" } } },
    { MeasureType.Liter, new MeasureTypeResponse { Type = (int)MeasureType.Liter, Text = new LanguageTextBase { En = "Liter", Pt = "Litro" } } },
    { MeasureType.Gram, new MeasureTypeResponse { Type = (int)MeasureType.Gram, Text = new LanguageTextBase { En = "Gram", Pt = "Grama" } } },
    { MeasureType.Kilo, new MeasureTypeResponse { Type = (int)MeasureType.Kilo, Text = new LanguageTextBase { En = "Kilogram", Pt = "Quilo" } } },
    { MeasureType.Pinch, new MeasureTypeResponse { Type = (int)MeasureType.Pinch, Text = new LanguageTextBase { En = "Pinch", Pt = "Pitada" } } }
  };

  // Lista ordenada pelo Index definido no Map
  public static readonly List<MeasureTypeResponse> List = Map.Values
    .OrderBy(m => m.Type)
    .ToList();

  static MeasureData()
  {
    var allEnumValues = Enum.GetValues<MeasureType>();
    var missing = allEnumValues.Except(Map.Keys).ToList();
    if (missing.Any())
    {
      throw new InvalidOperationException(
        $"MeasureData.Map is missing mappings for: {string.Join(", ", missing)}");
    }
  }
}
