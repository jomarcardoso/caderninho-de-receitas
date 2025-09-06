using System.ComponentModel.DataAnnotations.Schema;
using Server.Shared;

namespace Server.Models.Food;

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
  public double Sugar { get; set; }
  public UnitOfMeasurement UnitOfMeasurement { get; set; }
  public ICollection<Measure> OneMeasures { get; set; } = [];
  public string Keys { get; set; } = string.Empty;
  public string KeysPt { get; set; } = string.Empty;
  public bool IsRecipe { get; set; }
  public string Icon { get; set; } = string.Empty;
  public FoodType Type { get; set; } = FoodType.Solid;
  [NotMapped]
  public double Quantity { get; set; } = 100;
  public NutritionalInformation NutritionalInformation { get; set; } = new();
  public Minerals Minerals { get; set; } = new();
  public Vitamins Vitamins { get; set; } = new();
  public AminoAcids AminoAcids { get; set; } = new();
}