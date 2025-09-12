using Server.Shared;

namespace Server.Dtos;

public class VitaminResponse
{
  public int Index { get; set; }
  public LanguageTextBase Name { get; set; } = new LanguageTextBase();
  public string ShortName { get; set; } = string.Empty;
  public string MeasurementUnit { get; set; } = string.Empty;
}

public static class VitaminsData
{
  public static readonly Dictionary<VitaminType, VitaminResponse> Map = new()
  {
    { VitaminType.A, new VitaminResponse { Index = (int)VitaminType.A, Name = new LanguageTextBase { En = "Retinol", Pt = "Retinol" }, ShortName = "A", MeasurementUnit = "μg" } },
    { VitaminType.AlphaCarotene, new VitaminResponse { Index = (int)VitaminType.AlphaCarotene, Name = new LanguageTextBase { En = "Alpha Carotene", Pt = "Alfa-caroteno" }, ShortName = "Alfa caroteno", MeasurementUnit = "μg" } },
    { VitaminType.B1, new VitaminResponse { Index = (int)VitaminType.B1, Name = new LanguageTextBase { En = "Thiamine", Pt = "Tiamina" }, ShortName = "B1", MeasurementUnit = "mg" } },
    { VitaminType.B11, new VitaminResponse { Index = (int)VitaminType.B11, Name = new LanguageTextBase { En = "Pteroylheptaglutamic acid", Pt = "Ácido pteroilheptaglutâmico" }, ShortName = "B11", MeasurementUnit = "mg" } },
    { VitaminType.B12, new VitaminResponse { Index = (int)VitaminType.B12, Name = new LanguageTextBase { En = "Cobalamin", Pt = "Cobalamina" }, ShortName = "B12", MeasurementUnit = "μg" } },
    { VitaminType.B2, new VitaminResponse { Index = (int)VitaminType.B2, Name = new LanguageTextBase { En = "Riboflavin", Pt = "Riboflavina" }, ShortName = "B2", MeasurementUnit = "mg" } },
    { VitaminType.B3, new VitaminResponse { Index = (int)VitaminType.B3, Name = new LanguageTextBase { En = "Niacin", Pt = "Niacina" }, ShortName = "B3", MeasurementUnit = "mg" } },
    { VitaminType.B5, new VitaminResponse { Index = (int)VitaminType.B5, Name = new LanguageTextBase { En = "Pantothenic acid", Pt = "Ácido pantotênico" }, ShortName = "B5", MeasurementUnit = "mg" } },
    { VitaminType.B6, new VitaminResponse { Index = (int)VitaminType.B6, Name = new LanguageTextBase { En = "Pyridoxine", Pt = "Piridoxina" }, ShortName = "B6", MeasurementUnit = "mg" } },
    { VitaminType.B7, new VitaminResponse { Index = (int)VitaminType.B7, Name = new LanguageTextBase { En = "Biotin", Pt = "Biotina" }, ShortName = "B7", MeasurementUnit = "mg" } },
    { VitaminType.B9, new VitaminResponse { Index = (int)VitaminType.B9, Name = new LanguageTextBase { En = "Folic acid", Pt = "Ácido fólico ou folacina ou ácido pteroil-L-glutâmico ou folato" }, ShortName = "B9", MeasurementUnit = "μg" } },
    { VitaminType.BetaCarotene, new VitaminResponse { Index = (int)VitaminType.BetaCarotene, Name = new LanguageTextBase { En = "Beta Carotene", Pt = "Betacaroteno" }, ShortName = "Betacaroteno", MeasurementUnit = "μg" } },
    { VitaminType.C, new VitaminResponse { Index = (int)VitaminType.C, Name = new LanguageTextBase { En = "Ascorbic acid", Pt = "Ácido ascórbico" }, ShortName = "C", MeasurementUnit = "mg" } },
    { VitaminType.Choline, new VitaminResponse { Index = (int)VitaminType.Choline, Name = new LanguageTextBase { En = "Choline", Pt = "Colina" }, ShortName = "Colina", MeasurementUnit = "mg" } },
    { VitaminType.CryptoxanthinCarotene, new VitaminResponse { Index = (int)VitaminType.CryptoxanthinCarotene, Name = new LanguageTextBase { En = "Cryptoxanthin", Pt = "Criptoxantina" }, ShortName = "Criptoxantina", MeasurementUnit = "μg" } },
    { VitaminType.D, new VitaminResponse { Index = (int)VitaminType.D, Name = new LanguageTextBase { En = "Cholecalciferol", Pt = "Colecalciferol" }, ShortName = "D", MeasurementUnit = "UI" } },
    { VitaminType.D2, new VitaminResponse { Index = (int)VitaminType.D2, Name = new LanguageTextBase { En = "Ergocalciferol", Pt = "Ergocalciferol" }, ShortName = "D₂", MeasurementUnit = "μg" } },
    { VitaminType.D3, new VitaminResponse { Index = (int)VitaminType.D3, Name = new LanguageTextBase { En = "Cholecalciferol", Pt = "Colecalciferol" }, ShortName = "D₃", MeasurementUnit = "μg" } },
    { VitaminType.E, new VitaminResponse { Index = (int)VitaminType.E, Name = new LanguageTextBase { En = "Tocopherol", Pt = "Tocoferol" }, ShortName = "E", MeasurementUnit = "mg" } },
    { VitaminType.K, new VitaminResponse { Index = (int)VitaminType.K, Name = new LanguageTextBase { En = "Phylloquinone or Phytomenadione", Pt = "Filoquinona ou Fitomenadiona" }, ShortName = "K", MeasurementUnit = "μg" } },
    { VitaminType.Lycopene, new VitaminResponse { Index = (int)VitaminType.Lycopene, Name = new LanguageTextBase { En = "Lycopene", Pt = "Licopeno" }, ShortName = "Licopeno", MeasurementUnit = "μg" } }
  };

  public static readonly List<VitaminResponse> List = Map.Values
    .OrderBy(m => m.Index)
    .ToList();

  static VitaminsData()
  {
    var allEnumValues = Enum.GetValues<VitaminType>();
    var missing = allEnumValues.Except(Map.Keys).ToList();
    if (missing.Any())
    {
      throw new InvalidOperationException(
        $"VitaminsData.Map is missing mappings for: {string.Join(", ", missing)}");
    }
  }
}