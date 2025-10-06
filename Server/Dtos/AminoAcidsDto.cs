using Server.Shared;

namespace Server.Dtos;

public static class AminoAcidsData
{
  public static readonly Dictionary<AminoAcidType, NutrientDataResponse> Map = new()
  {
    { AminoAcidType.Alanine, new NutrientDataResponse { Index = (int)AminoAcidType.Alanine, Name = new LanguageTextBase { En = "Alanine", Pt = "Alanina" }, ShortName = "Ala", MeasurementUnit = "g" } },
    { AminoAcidType.Arginine, new NutrientDataResponse { Index = (int)AminoAcidType.Arginine, Name = new LanguageTextBase { En = "Arginine", Pt = "Arginina" }, ShortName = "Arg", MeasurementUnit = "g" } },
    { AminoAcidType.AsparticAcid, new NutrientDataResponse { Index = (int)AminoAcidType.AsparticAcid, Name = new LanguageTextBase { En = "Aspartic Acid", Pt = "Ácido Aspártico" }, ShortName = "Asp", MeasurementUnit = "g" } },
    { AminoAcidType.Cystine, new NutrientDataResponse { Index = (int)AminoAcidType.Cystine, Name = new LanguageTextBase { En = "Cystine", Pt = "Cistina" }, ShortName = "Cys", MeasurementUnit = "g" } },
    { AminoAcidType.GlutamicAcid, new NutrientDataResponse { Index = (int)AminoAcidType.GlutamicAcid, Name = new LanguageTextBase { En = "Glutamic Acid", Pt = "Ácido Glutâmico" }, ShortName = "Glu", MeasurementUnit = "g" } },
    { AminoAcidType.Glutamine, new NutrientDataResponse { Index = (int)AminoAcidType.Glutamine, Name = new LanguageTextBase { En = "Glutamine", Pt = "Glutamina" }, ShortName = "Gln", MeasurementUnit = "g" } },
    { AminoAcidType.Glycine, new NutrientDataResponse { Index = (int)AminoAcidType.Glycine, Name = new LanguageTextBase { En = "Glycine", Pt = "Glicina" }, ShortName = "Gly", MeasurementUnit = "g" } },
    { AminoAcidType.Histidine, new NutrientDataResponse { Index = (int)AminoAcidType.Histidine, Name = new LanguageTextBase { En = "Histidine", Pt = "Histidina" }, ShortName = "His", MeasurementUnit = "g" } },
    { AminoAcidType.Isoleucine, new NutrientDataResponse { Index = (int)AminoAcidType.Isoleucine, Name = new LanguageTextBase { En = "Isoleucine", Pt = "Isoleucina" }, ShortName = "Ile", MeasurementUnit = "g" } },
    { AminoAcidType.Leucine, new NutrientDataResponse { Index = (int)AminoAcidType.Leucine, Name = new LanguageTextBase { En = "Leucine", Pt = "Leucina" }, ShortName = "Leu", MeasurementUnit = "g" } },
    { AminoAcidType.Lysine, new NutrientDataResponse { Index = (int)AminoAcidType.Lysine, Name = new LanguageTextBase { En = "Lysine", Pt = "Lisina" }, ShortName = "Lys", MeasurementUnit = "g" } },
    { AminoAcidType.Methionine, new NutrientDataResponse { Index = (int)AminoAcidType.Methionine, Name = new LanguageTextBase { En = "Methionine", Pt = "Metionina" }, ShortName = "Met", MeasurementUnit = "g" } },
    { AminoAcidType.Phenylalanine, new NutrientDataResponse { Index = (int)AminoAcidType.Phenylalanine, Name = new LanguageTextBase { En = "Phenylalanine", Pt = "Fenilalanina" }, ShortName = "Phe", MeasurementUnit = "g" } },
    { AminoAcidType.Proline, new NutrientDataResponse { Index = (int)AminoAcidType.Proline, Name = new LanguageTextBase { En = "Proline", Pt = "Prolina" }, ShortName = "Pro", MeasurementUnit = "g" } },
    { AminoAcidType.Serine, new NutrientDataResponse { Index = (int)AminoAcidType.Serine, Name = new LanguageTextBase { En = "Serine", Pt = "Serina" }, ShortName =  "Ser", MeasurementUnit = "g" } },
    { AminoAcidType.Threonine, new NutrientDataResponse { Index = (int)AminoAcidType.Threonine, Name = new LanguageTextBase { En = "Threonine", Pt = "Treonina" }, ShortName = "Thr", MeasurementUnit = "g" } },
    { AminoAcidType.Tryptophan, new NutrientDataResponse { Index = (int)AminoAcidType.Tryptophan, Name = new LanguageTextBase { En = "Tryptophan", Pt = "Triptofano" }, ShortName = "Trp", MeasurementUnit = "g" } },
    { AminoAcidType.Tyrosine, new NutrientDataResponse { Index = (int)AminoAcidType.Tyrosine, Name = new LanguageTextBase { En = "Tyrosine", Pt = "Tirosina" }, ShortName = "Tyr", MeasurementUnit = "g" } },
    { AminoAcidType.Valine, new NutrientDataResponse { Index = (int)AminoAcidType.Valine, Name = new LanguageTextBase { En = "Valine", Pt = "Valina" }, ShortName = "Val", MeasurementUnit = "g" } }
  };

  public static readonly List<NutrientDataResponse> List = Map.Values
    .OrderBy(m => m.Index)
    .ToList();

  static AminoAcidsData()
  {
    var allEnumValues = Enum.GetValues<AminoAcidType>();
    var missing = allEnumValues.Except(Map.Keys).ToList();
    if (missing.Any())
    {
      throw new InvalidOperationException(
        $"AminoAcidsData.Map is missing mappings for: {string.Join(", ", missing)}");
    }
  }
}