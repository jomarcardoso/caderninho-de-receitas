namespace Server.Shared;

public abstract class RecipeStepContract
{
  public string Title { get; set; } = string.Empty;
  public string Preparation { get; set; } = string.Empty;
  public string Additional { get; set; } = string.Empty;
  public string? IngredientsText { get; set; } = string.Empty;

  public RecipeStepContract() { }

  public RecipeStepContract(string title, string preparation, string additional, string? ingredientsText)
  {
    Title = title;
    Preparation = preparation;
    Additional = additional;
    IngredientsText = ingredientsText ?? string.Empty;
  }
}

public abstract class RecipeStepBase<TRecipeIngredient> : RecipeStepContract, INutrientsBase
{
  public List<TRecipeIngredient> Ingredients { get; set; } = new();
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public MineralsBase Minerals { get; set; } = new();
  public VitaminsBase Vitamins { get; set; } = new();
  public AminoAcidsBase AminoAcids { get; set; } = new();
  public EssentialAminoAcidsBase EssentialAminoAcids { get; set; } = new();
  public double AminoAcidsScore { get; set; } = 0;

  public RecipeStepBase() { }

  public RecipeStepBase(string title, string preparation, string additional, string? ingredientsText)
    : base(title, preparation, additional, ingredientsText) { }
}
