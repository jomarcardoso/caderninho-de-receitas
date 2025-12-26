using Server.Models;
using Server.Shared;
using System.Text.Json.Serialization;

namespace Server.Dtos;

// Transport DTO for creating/updating Food (used also in edit requests).
public class FoodDto
{
  public int Id { get; set; }
  public LanguageText Name { get; set; } = new();
  public LanguageText Keys { get; set; } = new();
  public LanguageText Description { get; set; } = new();
  public List<string> Imgs { get; set; } = new();
  [JsonConverter(typeof(JsonStringEnumConverter))]
  public MeasurementUnit MeasurementUnit { get; set; }
  public Measures Measures { get; set; } = new();
  public List<string> Categories { get; set; } = new();
  public int? IconId { get; set; }
  [JsonConverter(typeof(JsonStringEnumConverter))]
  public FoodType Type { get; set; } = FoodType.Solid;
  public NutritionalInformation NutritionalInformation { get; set; } = new();
  public Minerals Minerals { get; set; } = new();
  public Vitamins Vitamins { get; set; } = new();
  public AminoAcids AminoAcids { get; set; } = new();
}
