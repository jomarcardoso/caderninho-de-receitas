namespace Server.Shared;

public abstract class RecipeContract<TRecipeStep>
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string Keys { get; set; } = string.Empty;
  public string? Description { get; set; }
  public string? Additional { get; set; }
  public List<TRecipeStep> Steps { get; set; } = new List<TRecipeStep>();
  public Language Language = Language.En;
}

public abstract class RecipeBase<TRecipeStep, TFood> : RecipeContract<TRecipeStep>, INutrientsBase
{
  public TFood Food { get; set; }
  public string Image { get; set; } = string.Empty;
  public int SavedByOthersCount { get; set; } = 0;
  public bool IsPublic { get; set; } = true;
  //RecipeCategory category { get; set; }
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public MineralsBase Minerals { get; set; } = new();
  public VitaminsBase Vitamins { get; set; } = new();
  public AminoAcidsBase AminoAcids { get; set; } = new();
  public EssentialAminoAcidsBase EssentialAminoAcids { get; set; } = new();
}
