namespace Server.Shared;

public abstract class RecipeStepContract<TRecipeIngredient>
{
  public string Title { get; set; } = string.Empty;
  public string Preparation { get; set; } = string.Empty;
  public string Additional { get; set; } = string.Empty;
  public TRecipeIngredient Ingredients { get; set; }

  public RecipeStepContract() { }

  public RecipeStepContract(string title, string preparation, string additional, TRecipeIngredient ingredients)
  {
    Title = title;
    Preparation = preparation;
    Additional = additional;
    Ingredients = ingredients;
  }
}

public abstract class RecipeStepBase<TRecipeIngredient> : RecipeStepContract<TRecipeIngredient>, INutrients
{
  public NutritionalInformation NutritionalInformation { get; set; } = new();
  public Minerals Minerals { get; set; } = new();
  public Vitamins Vitamins { get; set; } = new();
  public AminoAcids AminoAcids { get; set; } = new();

  public RecipeStepBase() { }

  public RecipeStepBase(string title, string preparation, string additional, TRecipeIngredient ingredients)
    : base(title, preparation, additional, ingredients) { }
}