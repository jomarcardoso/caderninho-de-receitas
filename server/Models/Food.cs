using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public enum UnitOfMeasurement
{
  Gram,
  Liter,
}

public enum MeasureType
{
  Cup,
  Spoon,
  TeaSpoon,
  Unity,
  UnitySmall,
  UnityLarge,
  Literal,
  Can,
  Glass,
  Breast,
  Clove,
  Slice,
  Bunch,
  Ml,
  Liter,
  Gram,
  Kilo,
  Pinch
}

public enum FoodType
{
  Liquid,
  Seed,
  Herb,
  Temper,
  Fruit,
  Solid,
  Oil,
  Legumen,
  Flake,
  Root,
  Meat,
  Vegetable,
  Cake,
  Cheese,
  Powder
}

public class Measure
{
  public int Id { get; set; }
  public MeasureType Type { get; set; }
  public float Quantity { get; set; }
}

public class Food
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string NamePt { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public string DescriptionPt { get; set; } = string.Empty;
  public string Image { get; set; } = string.Empty;
  public float Gi { get; set; }
  public float Calories { get; set; }
  public float Acidification { get; set; }
  public float Carbohydrates { get; set; }
  public float Ashes { get; set; }
  public float Proteins { get; set; }
  public float SaturedFats { get; set; }
  public float MonounsaturatedFats { get; set; }
  public float PolyunsaturatedFats { get; set; }
  public float Cholesterol { get; set; }
  public float TotalFat { get; set; }
  public float DietaryFiber { get; set; }
  public float Sugar { get; set; }
  public float Gl { get; set; }
  public UnitOfMeasurement UnitOfMeasurement { get; set; }
  public ICollection<Measure> OneMeasures { get; set; } = [];

  public string Keys { get; set; } = string.Empty;
  public string KeysPt { get; set; } = string.Empty;
  public bool IsRecipe { get; set; }
  public string Icon { get; set; } = string.Empty;
  public FoodType Type { get; set; } = FoodType.Solid;
  [NotMapped]
  public float Quantity { get; set; } = 100;

  // minerals
  public float Calcium { get; set; }
  public float Copper { get; set; }
  public float Fluoride { get; set; }
  public float Iron { get; set; }
  public float Magnesium { get; set; }
  public float Manganese { get; set; }
  public float Phosphorus { get; set; }
  public float Potassium { get; set; }
  public float Sodium { get; set; }
  public float Zinc { get; set; }
  public float Selenium { get; set; }

  // vitamins
  public float A { get; set; }
  public float AlphaCarotene { get; set; }
  public float B1 { get; set; }
  public float B11 { get; set; }
  public float B12 { get; set; }
  public float B2 { get; set; }
  public float B3 { get; set; }
  public float B5 { get; set; }
  public float B6 { get; set; }
  public float B7 { get; set; }
  public float B9 { get; set; }
  public float BetaCarotene { get; set; }
  public float C { get; set; }
  public float Choline { get; set; }
  public float CryptoxanthinCarotene { get; set; }
  public float D { get; set; }
  public float D2 { get; set; }
  public float D3 { get; set; }
  public float E { get; set; }
  public float K { get; set; }
  public float Lycopene { get; set; }

  // amino acids
  public float Alanine { get; set; }
  public float Arginine { get; set; }
  public float AsparticAcid { get; set; }
  public float Cystine { get; set; }
  public float GlutamicAcid { get; set; }
  public float Glutamine { get; set; }
  public float Glycine { get; set; }
  public float Histidine { get; set; }
  public float Isoleucine { get; set; }
  public float Leucine { get; set; }
  public float Lysine { get; set; }
  public float Methionine { get; set; }
  public float Phenylalanine { get; set; }
  public float Proline { get; set; }
  public float Serine { get; set; }
  public float Threonine { get; set; }
  public float Tryptophan { get; set; }
  public float Tyrosine { get; set; }
  public float Valine { get; set; }
}