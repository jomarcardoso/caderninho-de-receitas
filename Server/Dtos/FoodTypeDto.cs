using Server.Shared;

namespace Server.Dtos;

public static class FoodTypeData
{
  public static readonly Dictionary<FoodType, LanguageTextBase> Map = new()
  {
    { FoodType.Liquid,  new LanguageTextBase { En = "Liquid", Pt = "Líquido" } } ,
    { FoodType.Seed,  new LanguageTextBase { En = "Seed", Pt = "Semente" } } ,
    { FoodType.Herb,  new LanguageTextBase { En = "Herb", Pt = "Erva" } } ,
    { FoodType.Temper,  new LanguageTextBase { En = "Seasoning", Pt = "Tempero" } } ,
    { FoodType.Fruit,  new LanguageTextBase { En = "Fruit", Pt = "Fruta" } } ,
    { FoodType.Solid,  new LanguageTextBase { En = "Solid", Pt = "Sólido" } } ,
    { FoodType.Oil,  new LanguageTextBase { En = "Oil", Pt = "Óleo" } } ,
    { FoodType.Legumen,  new LanguageTextBase { En = "Legume", Pt = "Legume" } } ,
    { FoodType.Flake,  new LanguageTextBase { En = "Flake", Pt = "Floco" } } ,
    { FoodType.Root,  new LanguageTextBase { En = "Root", Pt = "Raiz" } } ,
    { FoodType.Meat,  new LanguageTextBase { En = "Meat", Pt = "Carne" } } ,
    { FoodType.Vegetable,  new LanguageTextBase { En = "Vegetable", Pt = "Vegetal" } } ,
    { FoodType.Cake,  new LanguageTextBase { En = "Cake", Pt = "Bolo" } } ,
    { FoodType.Cheese,  new LanguageTextBase { En = "Cheese", Pt = "Queijo" } } ,
    { FoodType.Powder,  new LanguageTextBase { En = "Powder", Pt = "Pó" } },
    { FoodType.Starch,  new LanguageTextBase { En = "Starch", Pt = "Amido" } },
    { FoodType.Recipe,  new LanguageTextBase { En = "Recipe", Pt = "Receita" } }
  };

  public static readonly List<LanguageTextBase> List = Map.Values
    // .OrderBy(m => m.Type)
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
