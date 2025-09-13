namespace Server.Shared;

public abstract class RecipeContract<TRecipeStep>
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public string? Additional { get; set; }
  public List<TRecipeStep> Steps { get; set; } = new List<TRecipeStep>();
}

public abstract class RecipeBase<TRecipeStep> : RecipeContract<TRecipeStep>, INutrientsBase
{
  //RecipeCategory category { get; set; }
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public MineralsBase Minerals { get; set; } = new();
  public VitaminsBase Vitamins { get; set; } = new();
  public AminoAcidsBase AminoAcids { get; set; } = new();
}