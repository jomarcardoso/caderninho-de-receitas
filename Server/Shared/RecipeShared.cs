namespace Server.Shared;

public abstract class RecipeContract<TRecipeStep> : ISearchable
{
  public int Id { get; set; }
  public LanguageTextBase Name { get; set; } = new LanguageTextBase();
  public LanguageTextBase Keys { get; set; } = new LanguageTextBase();
  public string? Description { get; set; }
  public string? Additional { get; set; }
  public List<TRecipeStep> Steps { get; set; } = new List<TRecipeStep>();
}

public abstract class RecipeBase<TRecipeStep, TFood> : RecipeContract<TRecipeStep>, INutrientsBase
{
  public TFood Food { get; set; }
  public string Image { get; set; } = string.Empty;
  //RecipeCategory category { get; set; }
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public MineralsBase Minerals { get; set; } = new();
  public VitaminsBase Vitamins { get; set; } = new();
  public AminoAcidsBase AminoAcids { get; set; } = new();
  public EssentialAminoAcidsBase EssentialAminoAcids { get; set; } = new();
}