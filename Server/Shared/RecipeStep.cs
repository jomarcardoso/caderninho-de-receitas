namespace Server.Shared;

public class RecipeStepBase<TRecipeIngredient>
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string IngredientsText { get; set; } = string.Empty;
  public List<TRecipeIngredient> Ingredients { get; set; } = new List<TRecipeIngredient>();
  public string Preparation { get; set; } = string.Empty;
  public string Additional { get; set; } = string.Empty;
}