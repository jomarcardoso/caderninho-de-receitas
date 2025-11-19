using Server.Shared;

namespace Server.Dtos;

public class CommonDataResponse
{
  public Dictionary<MeasureType, LanguageTextAndPluralBase> Measures { get; set; } = MeasureData.Map;
  public Dictionary<FoodType, LanguageTextBase> FoodTypes { get; set; } = FoodTypeData.Map;
  public Dictionary<MeasurementUnit, LanguageTextAndPluralBase> MeasurementUnits { get; set; } = MeasurementUnitData.Map;
  public Dictionary<VitaminType, NutrientDataResponse> Vitamins { get; set; } = VitaminsData.Map;
  public Dictionary<AminoAcidType, NutrientDataResponse> AminoAcids { get; set; } = AminoAcidsData.Map;
  public Dictionary<MineralType, NutrientDataResponse> Minerals { get; set; } = MineralsData.Map;
  public Dictionary<NutritionalInformationType, NutrientDataResponse> NutritionalInformation { get; set; } = NutritionalInformationData.Map;
  public Dictionary<RecipeCategory, CategoryItem> RecipeCategories { get; set; } = RecipeCategoryData.Map;
}
