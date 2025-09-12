using Server.Shared;

namespace Server.Dtos;

public class FoodTypeResponse
{
  public int Type { get; set; }
  public LanguageTextBase Text { get; set; } = new LanguageTextBase();
}

public static class FoodTypeData
{
  public static readonly Dictionary<FoodType, FoodTypeResponse> Map = new()
  {
    { FoodType.Liquid, new FoodTypeResponse { Type = (int)FoodType.Liquid, Text = new LanguageTextBase { En = "Liquid", Pt = "Líquido" } } },
    { FoodType.Seed, new FoodTypeResponse { Type = (int)FoodType.Seed, Text = new LanguageTextBase { En = "Seed", Pt = "Semente" } } },
    { FoodType.Herb, new FoodTypeResponse { Type = (int)FoodType.Herb, Text = new LanguageTextBase { En = "Herb", Pt = "Erva" } } },
    { FoodType.Temper, new FoodTypeResponse { Type = (int)FoodType.Temper, Text = new LanguageTextBase { En = "Seasoning", Pt = "Tempero" } } },
    { FoodType.Fruit, new FoodTypeResponse { Type = (int)FoodType.Fruit, Text = new LanguageTextBase { En = "Fruit", Pt = "Fruta" } } },
    { FoodType.Solid, new FoodTypeResponse { Type = (int)FoodType.Solid, Text = new LanguageTextBase { En = "Solid", Pt = "Sólido" } } },
    { FoodType.Oil, new FoodTypeResponse { Type = (int)FoodType.Oil, Text = new LanguageTextBase { En = "Oil", Pt = "Óleo" } } },
    { FoodType.Legumen, new FoodTypeResponse { Type = (int)FoodType.Legumen, Text = new LanguageTextBase { En = "Legume", Pt = "Legume" } } },
    { FoodType.Flake, new FoodTypeResponse { Type = (int)FoodType.Flake, Text = new LanguageTextBase { En = "Flake", Pt = "Floco" } } },
    { FoodType.Root, new FoodTypeResponse { Type = (int)FoodType.Root, Text = new LanguageTextBase { En = "Root", Pt = "Raiz" } } },
    { FoodType.Meat, new FoodTypeResponse { Type = (int)FoodType.Meat, Text = new LanguageTextBase { En = "Meat", Pt = "Carne" } } },
    { FoodType.Vegetable, new FoodTypeResponse { Type = (int)FoodType.Vegetable, Text = new LanguageTextBase { En = "Vegetable", Pt = "Vegetal" } } },
    { FoodType.Cake, new FoodTypeResponse { Type = (int)FoodType.Cake, Text = new LanguageTextBase { En = "Cake", Pt = "Bolo" } } },
    { FoodType.Cheese, new FoodTypeResponse { Type = (int)FoodType.Cheese, Text = new LanguageTextBase { En = "Cheese", Pt = "Queijo" } } },
    { FoodType.Powder, new FoodTypeResponse { Type = (int)FoodType.Powder, Text = new LanguageTextBase { En = "Powder", Pt = "Pó" } } }
  };

  public static readonly List<FoodTypeResponse> List = Map.Values
    .OrderBy(m => m.Type)
    .ToList();

  static FoodTypeData()
  {
    var allEnumValues = Enum.GetValues<FoodType>();
    var missing = allEnumValues.Except(Map.Keys).ToList();
    if (missing.Any())
    {
      throw new InvalidOperationException(
        $"FoodTypeData.Map is missing mappings for: {string.Join(", ", missing)}");
    }
  }
}
