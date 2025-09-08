using Server.Shared;

namespace Server.Dtos;

public class RecipeStepDto : RecipeStepContract<string>;

public class RecipeStepResponseDto : RecipeStepBase<List<IngredientResponseDto>>;