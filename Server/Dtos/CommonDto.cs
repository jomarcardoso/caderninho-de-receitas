using Server.Shared;

namespace Server.Dtos;

public class CommonDto
{
  public Dictionary<MeasureType, LanguageTextBase> MeasureTypes { get; set; } = MeasureData.Map;
  public Dictionary<FoodType, LanguageTextBase> FoodTypes { get; set; } = FoodTypeData.Map;
  public Dictionary<MeasurementUnit, MeasurementUnitResponse> UnitOfMeasurements { get; set; } = MeasurementUnitData.Map;
  public Dictionary<VitaminType, VitaminResponse> Vitamins { get; set; } = VitaminsData.Map;
  public Dictionary<AminoAcidType, AminoAcidResponse> AminoAcids { get; set; } = AminoAcidsData.Map;
  public Dictionary<MineralType, MineralResponse> Minerals { get; set; } = MineralsData.Map;
  public Dictionary<NutritionalInformationType, NutritionalInformationResponse> NutritionalInformation { get; set; } = NutritionalInformationData.Map;
}