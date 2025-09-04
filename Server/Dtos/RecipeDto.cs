namespace Server.Dtos;

public class RecipeStepDto
{
  public string Name { get; set; } = string.Empty;
  public string Ingredients { get; set; } = string.Empty;
  public string Preparation { get; set; } = string.Empty;
  public string Additional { get; set; } = string.Empty;
}

public class RecipeDto
{
  public string Name { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public string Additional { get; set; } = string.Empty;
  public List<RecipeStepDto> Steps { get; set; } = new();
}

public class UpdateRecipeDto : RecipeDto
{
  public int Id { get; set; }
}
