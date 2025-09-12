using Server.Shared;

namespace Server.Dtos;

public class AminoAcidResponse
{
  public int Index { get; set; }
  public LanguageTextBase Text { get; set; } = new LanguageTextBase();
}

public static class AminoAcidsData
{
  public static readonly Dictionary<AminoAcidType, AminoAcidResponse> Map = new()
  {
    { AminoAcidType.Alanine, new AminoAcidResponse { Index = (int)AminoAcidType.Alanine, Text = new LanguageTextBase { En = "Alanine", Pt = "Alanina" } } },
    { AminoAcidType.Arginine, new AminoAcidResponse { Index = (int)AminoAcidType.Arginine, Text = new LanguageTextBase { En = "Arginine", Pt = "Arginina" } } },
    { AminoAcidType.AsparticAcid, new AminoAcidResponse { Index = (int)AminoAcidType.AsparticAcid, Text = new LanguageTextBase { En = "Aspartic Acid", Pt = "Ácido Aspártico" } } },
    { AminoAcidType.Cystine, new AminoAcidResponse { Index = (int)AminoAcidType.Cystine, Text = new LanguageTextBase { En = "Cystine", Pt = "Cistina" } } },
    { AminoAcidType.GlutamicAcid, new AminoAcidResponse { Index = (int)AminoAcidType.GlutamicAcid, Text = new LanguageTextBase { En = "Glutamic Acid", Pt = "Ácido Glutâmico" } } },
    { AminoAcidType.Glutamine, new AminoAcidResponse { Index = (int)AminoAcidType.Glutamine, Text = new LanguageTextBase { En = "Glutamine", Pt = "Glutamina" } } },
    { AminoAcidType.Glycine, new AminoAcidResponse { Index = (int)AminoAcidType.Glycine, Text = new LanguageTextBase { En = "Glycine", Pt = "Glicina" } } },
    { AminoAcidType.Histidine, new AminoAcidResponse { Index = (int)AminoAcidType.Histidine, Text = new LanguageTextBase { En = "Histidine", Pt = "Histidina" } } },
    { AminoAcidType.Isoleucine, new AminoAcidResponse { Index = (int)AminoAcidType.Isoleucine, Text = new LanguageTextBase { En = "Isoleucine", Pt = "Isoleucina" } } },
    { AminoAcidType.Leucine, new AminoAcidResponse { Index = (int)AminoAcidType.Leucine, Text = new LanguageTextBase { En = "Leucine", Pt = "Leucina" } } },
    { AminoAcidType.Lysine, new AminoAcidResponse { Index = (int)AminoAcidType.Lysine, Text = new LanguageTextBase { En = "Lysine", Pt = "Lisina" } } },
    { AminoAcidType.Methionine, new AminoAcidResponse { Index = (int)AminoAcidType.Methionine, Text = new LanguageTextBase { En = "Methionine", Pt = "Metionina" } } },
    { AminoAcidType.Phenylalanine, new AminoAcidResponse { Index = (int)AminoAcidType.Phenylalanine, Text = new LanguageTextBase { En = "Phenylalanine", Pt = "Fenilalanina" } } },
    { AminoAcidType.Proline, new AminoAcidResponse { Index = (int)AminoAcidType.Proline, Text = new LanguageTextBase { En = "Proline", Pt = "Prolina" } } },
    { AminoAcidType.Serine, new AminoAcidResponse { Index = (int)AminoAcidType.Serine, Text = new LanguageTextBase { En = "Serine", Pt = "Serina" } } },
    { AminoAcidType.Threonine, new AminoAcidResponse { Index = (int)AminoAcidType.Threonine, Text = new LanguageTextBase { En = "Threonine", Pt = "Treonina" } } },
    { AminoAcidType.Tryptophan, new AminoAcidResponse { Index = (int)AminoAcidType.Tryptophan, Text = new LanguageTextBase { En = "Tryptophan", Pt = "Triptofano" } } },
    { AminoAcidType.Tyrosine, new AminoAcidResponse { Index = (int)AminoAcidType.Tyrosine, Text = new LanguageTextBase { En = "Tyrosine", Pt = "Tirosina" } } },
    { AminoAcidType.Valine, new AminoAcidResponse { Index = (int)AminoAcidType.Valine, Text = new LanguageTextBase { En = "Valine", Pt = "Valina" } } }
  };

  public static readonly List<AminoAcidResponse> List = Map.Values
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