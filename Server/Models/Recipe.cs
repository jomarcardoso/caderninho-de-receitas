namespace Server.Models;

public class RecipeStep
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string IngredientsText { get; set; } = string.Empty;
  public List<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
  public string Preparation { get; set; } = string.Empty;
  public string Additional { get; set; } = string.Empty;
}

public class Recipe
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public string? Additional { get; set; }
  public List<RecipeStep> steps { get; set; } = new List<RecipeStep>();
  //RecipeCategory category { get; set; }
  public string OwnerId { get; set; } = string.Empty;
}