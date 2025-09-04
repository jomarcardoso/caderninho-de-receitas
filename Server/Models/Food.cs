using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models;

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
  public double Quantity { get; set; }
}

public class Food
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string NamePt { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public string DescriptionPt { get; set; } = string.Empty;
  public string Image { get; set; } = string.Empty;
  public double Gi { get; set; }
  public double Calories { get; set; }
  public double Acidification { get; set; }
  public double Carbohydrates { get; set; }
  public double Ashes { get; set; }
  public double Proteins { get; set; }
  public double SaturedFats { get; set; }
  public double MonounsaturatedFats { get; set; }
  public double PolyunsaturatedFats { get; set; }
  public double Cholesterol { get; set; }
  public double TotalFat { get; set; }
  public double DietaryFiber { get; set; }
  public double Sugar { get; set; }
  public double Gl { get; set; }
  public UnitOfMeasurement UnitOfMeasurement { get; set; }
  public ICollection<Measure> OneMeasures { get; set; } = [];

  public string Keys { get; set; } = string.Empty;
  public string KeysPt { get; set; } = string.Empty;
  public bool IsRecipe { get; set; }
  public string Icon { get; set; } = string.Empty;
  public FoodType Type { get; set; } = FoodType.Solid;
  [NotMapped]
  public double Quantity { get; set; } = 100;

  // minerals
  public double Calcium { get; set; }
  public double Copper { get; set; }
  public double Fluoride { get; set; }
  public double Iron { get; set; }
  public double Magnesium { get; set; }
  public double Manganese { get; set; }
  public double Phosphorus { get; set; }
  public double Potassium { get; set; }
  public double Sodium { get; set; }
  public double Zinc { get; set; }
  public double Selenium { get; set; }

  // vitamins
  public double A { get; set; }
  public double AlphaCarotene { get; set; }
  public double B1 { get; set; }
  public double B11 { get; set; }
  public double B12 { get; set; }
  public double B2 { get; set; }
  public double B3 { get; set; }
  public double B5 { get; set; }
  public double B6 { get; set; }
  public double B7 { get; set; }
  public double B9 { get; set; }
  public double BetaCarotene { get; set; }
  public double C { get; set; }
  public double Choline { get; set; }
  public double CryptoxanthinCarotene { get; set; }
  public double D { get; set; }
  public double D2 { get; set; }
  public double D3 { get; set; }
  public double E { get; set; }
  public double K { get; set; }
  public double Lycopene { get; set; }

  // amino acids
  public double Alanine { get; set; }
  public double Arginine { get; set; }
  public double AsparticAcid { get; set; }
  public double Cystine { get; set; }
  public double GlutamicAcid { get; set; }
  public double Glutamine { get; set; }
  public double Glycine { get; set; }
  public double Histidine { get; set; }
  public double Isoleucine { get; set; }
  public double Leucine { get; set; }
  public double Lysine { get; set; }
  public double Methionine { get; set; }
  public double Phenylalanine { get; set; }
  public double Proline { get; set; }
  public double Serine { get; set; }
  public double Threonine { get; set; }
  public double Tryptophan { get; set; }
  public double Tyrosine { get; set; }
  public double Valine { get; set; }
}