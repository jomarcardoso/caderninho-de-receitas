using Server.Models;
using Server.Shared;

namespace Server.Dtos;

public class RecipeDto : RecipeContract<RecipeStepDto>;

public class RecipeResponseDto : RecipeBase<RecipeStepResponse>;

public class RecipeAndFoodResponseDto
{
  public List<RecipeResponseDto> Recipes { get; set; } = new();
  public List<Food> Foods { get; set; } = new();
  public List<MeasureTypeResponse> MeasureTypes { get; set; } = MeasureData.List;
}
