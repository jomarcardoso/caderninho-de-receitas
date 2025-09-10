using Server.Shared;

namespace Server.Dtos;

public class MeasureTypeResponse
{
  public int Index { get; set; }
  public string Name { get; set; } = "";
  public string NamePt { get; set; } = "";
}

public static class MeasureData
{
  public static readonly Dictionary<MeasureType, MeasureTypeResponse> Map = new()
  {
    { MeasureType.Cup, new MeasureTypeResponse { Index = (int)MeasureType.Cup, Name = "Cup", NamePt = "Xícara" } },
    { MeasureType.Spoon, new MeasureTypeResponse { Index = (int)MeasureType.Spoon, Name = "Tablespoon", NamePt = "Colher de Sopa" } },
    { MeasureType.TeaSpoon, new MeasureTypeResponse { Index = (int)MeasureType.TeaSpoon, Name = "Teaspoon", NamePt = "Colher de Chá" } },
    { MeasureType.Unity, new MeasureTypeResponse { Index = (int)MeasureType.Unity, Name = "Unit", NamePt = "Unidade" } },
    { MeasureType.UnitySmall, new MeasureTypeResponse { Index = (int)MeasureType.UnitySmall, Name = "Small Unit", NamePt = "Unidade Pequena" } },
    { MeasureType.UnityLarge, new MeasureTypeResponse { Index = (int)MeasureType.UnityLarge, Name = "Large Unit", NamePt = "Unidade Grande" } },
    { MeasureType.Literal, new MeasureTypeResponse { Index = (int)MeasureType.Literal, Name = "Literal", NamePt = "Literal" } },
    { MeasureType.Can, new MeasureTypeResponse { Index = (int)MeasureType.Can, Name = "Can", NamePt = "Lata" } },
    { MeasureType.Glass, new MeasureTypeResponse { Index = (int)MeasureType.Glass, Name = "Glass", NamePt = "Copo" } },
    { MeasureType.Breast, new MeasureTypeResponse { Index = (int)MeasureType.Breast, Name = "Breast", NamePt = "Peito" } },
    { MeasureType.Clove, new MeasureTypeResponse { Index = (int)MeasureType.Clove, Name = "Clove", NamePt = "Dente" } },
    { MeasureType.Slice, new MeasureTypeResponse { Index = (int)MeasureType.Slice, Name = "Slice", NamePt = "Fatia" } },
    { MeasureType.Bunch, new MeasureTypeResponse { Index = (int)MeasureType.Bunch, Name = "Bunch", NamePt = "Maço" } },
    { MeasureType.Ml, new MeasureTypeResponse { Index = (int)MeasureType.Ml, Name = "Milliliter", NamePt = "Mililitro" } },
    { MeasureType.Liter, new MeasureTypeResponse { Index = (int)MeasureType.Liter, Name = "Liter", NamePt = "Litro" } },
    { MeasureType.Gram, new MeasureTypeResponse { Index = (int)MeasureType.Gram, Name = "Gram", NamePt = "Grama" } },
    { MeasureType.Kilo, new MeasureTypeResponse { Index = (int)MeasureType.Kilo, Name = "Kilogram", NamePt = "Quilo" } },
    { MeasureType.Pinch, new MeasureTypeResponse { Index = (int)MeasureType.Pinch, Name = "Pinch", NamePt = "Pitada" } }
  };

  // Lista ordenada pelo Index definido no Map
  public static readonly List<MeasureTypeResponse> List = Map.Values
    .OrderBy(m => m.Index)
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
