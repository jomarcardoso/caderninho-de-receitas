using Server.Shared;

namespace Server.Dtos;

public class RecipeStepDto : RecipeStepContract<string>;

public class RecipeStepResponse : RecipeStepBase<List<IngredientResponse>>;