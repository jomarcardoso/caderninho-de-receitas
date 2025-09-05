namespace Server.Shared;

public class RecipeBase<TRecipeStep>
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public string? Additional { get; set; }
  public List<TRecipeStep> Steps { get; set; } = new List<TRecipeStep>();
  //RecipeCategory category { get; set; }
  public string OwnerId { get; set; } = string.Empty;
}