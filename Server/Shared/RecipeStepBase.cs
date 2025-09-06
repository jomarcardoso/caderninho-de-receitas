namespace Server.Shared;

public class RecipeStepBase<TRecipeIngredient>
{
  public int Id { get; set; }
  public string Title { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public List<TRecipeIngredient> Ingredients { get; set; } = new List<TRecipeIngredient>();
  public string Preparation { get; set; } = string.Empty;
  public string Additional { get; set; } = string.Empty;
}