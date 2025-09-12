namespace Server.Dtos;

public class CommonDto
{
  public List<MeasureTypeResponse> MeasureTypes { get; set; } = MeasureData.List;
  public List<FoodTypeResponse> FoodTypes { get; set; } = FoodTypeData.List;
  public List<MeasurementUnitResponse> UnitOfMeasurements { get; set; } = MeasurementUnitData.List;
  public List<VitaminResponse> Vitamins { get; set; } = VitaminsData.List;
  public List<AminoAcidResponse> AminoAcids { get; set; } = AminoAcidsData.List;
  public List<MineralResponse> Minerals { get; set; } = MineralsData.List;
}