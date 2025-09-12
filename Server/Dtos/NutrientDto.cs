namespace Server.Dtos;

public class NutrientResponse
{
  public int Index { get; set; }
  public string Name { get; set; } = string.Empty;
}

public interface INutrientsListResponse
{
  public List<NutrientResponse> NutritionalInformation { get; set; }
  public List<NutrientResponse> Minerals { get; set; }
  public List<NutrientResponse> Vitamins { get; set; }
  public List<NutrientResponse> AminoAcids { get; set; }
}