using Server.Shared;

namespace Server.Dtos;

public class FoodResponse : FoodBase, INutrientsListResponse
{
  public List<NutrientResponse> NutritionalInformation { get; set; } = new();
  public List<NutrientResponse> Minerals { get; set; } = new();
  public List<NutrientResponse> Vitamins { get; set; } = new();
  public List<NutrientResponse> AminoAcids { get; set; } = new();
}

public class FoodsDto : CommonDto
{
  public List<FoodResponse> Foods { get; set; } = new();
}
