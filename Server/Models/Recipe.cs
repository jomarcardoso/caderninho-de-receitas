using Server.Shared;

namespace Server.Models;

public class RecipeStep : RecipeStepBase<Ingredient>;

public class Recipe : RecipeBase<RecipeStep>
{
  public string OwnerId { get; set; } = string.Empty;
}