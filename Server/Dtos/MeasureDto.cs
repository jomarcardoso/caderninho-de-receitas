using Server.Shared;

namespace Server.Dtos;

public static class MeasureData
{
  public static readonly Dictionary<MeasureType, LanguageTextBase> Map = new()
  {
    { MeasureType.Cup,  new LanguageTextBase { En = "Cup", Pt = "Xícara" } } ,
    { MeasureType.Spoon,  new LanguageTextBase { En = "Tablespoon", Pt = "Colher de Sopa" } } ,
    { MeasureType.TeaSpoon,  new LanguageTextBase { En = "Teaspoon", Pt = "Colher de Chá" } } ,
    { MeasureType.Unity,  new LanguageTextBase { En = "Unit", Pt = "Unidade" } } ,
    { MeasureType.UnitySmall,  new LanguageTextBase { En = "Small Unit", Pt = "Unidade Pequena" } } ,
    { MeasureType.UnityLarge,  new LanguageTextBase { En = "Large Unit", Pt = "Unidade Grande" } } ,
    { MeasureType.Literal,  new LanguageTextBase { En = "Literal", Pt = "Literal" } } ,
    { MeasureType.Can,  new LanguageTextBase { En = "Can", Pt = "Lata" } } ,
    { MeasureType.Glass,  new LanguageTextBase { En = "Glass", Pt = "Copo" } } ,
    { MeasureType.Breast,  new LanguageTextBase { En = "Breast", Pt = "Peito" } } ,
    { MeasureType.Clove,  new LanguageTextBase { En = "Clove", Pt = "Dente" } } ,
    { MeasureType.Slice,  new LanguageTextBase { En = "Slice", Pt = "Fatia" } } ,
    { MeasureType.Bunch,  new LanguageTextBase { En = "Bunch", Pt = "Maço" } } ,
    { MeasureType.Ml,  new LanguageTextBase { En = "Milliliter", Pt = "Mililitro" } } ,
    { MeasureType.Liter,  new LanguageTextBase { En = "Liter", Pt = "Litro" } } ,
    { MeasureType.Gram,  new LanguageTextBase { En = "Gram", Pt = "Grama" } } ,
    { MeasureType.Kilo,  new LanguageTextBase { En = "Kilogram", Pt = "Quilo" } } ,
    { MeasureType.Pinch,  new LanguageTextBase { En = "Pinch", Pt = "Pitada" } }
  };

  public static readonly List<LanguageTextBase> List = Map.Values
    // .OrderBy(m => m.Type)
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
