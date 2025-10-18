namespace Server.Shared;

  public class FoodBase : ISearchable
  {
    public int Id { get; set; }
    public LanguageTextBase Name { get; set; } = new LanguageTextBase();
    public LanguageTextBase Description { get; set; } = new LanguageTextBase();
  public List<string> Imgs { get; set; } = new();
    public MeasurementUnit MeasurementUnit { get; set; }
    public MeasureBase Measures { get; set; } = new();
    public LanguageTextBase Keys { get; set; } = new LanguageTextBase();
    public string Icon { get; set; } = string.Empty;
    public FoodType Type { get; set; } = FoodType.Solid;
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public MineralsBase Minerals { get; set; } = new();
  public VitaminsBase Vitamins { get; set; } = new();
  public AminoAcidsBase AminoAcids { get; set; } = new();
}
