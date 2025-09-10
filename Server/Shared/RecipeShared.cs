namespace Server.Shared;

public abstract class RecipeContract<TRecipeStep>
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public string? Additional { get; set; }
  public List<TRecipeStep> Steps { get; set; } = new List<TRecipeStep>();
}

public abstract class RecipeBase<TRecipeStep> : RecipeContract<TRecipeStep>, INutrients
{
  //RecipeCategory category { get; set; }
  public NutritionalInformation NutritionalInformation { get; set; } = new();
  public Minerals Minerals { get; set; } = new();
  public Vitamins Vitamins { get; set; } = new();
  public AminoAcids AminoAcids { get; set; } = new();
}