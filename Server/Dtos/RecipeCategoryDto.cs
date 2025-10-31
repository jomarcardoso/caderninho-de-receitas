using Server.Shared;

namespace Server.Dtos;

public static class RecipeCategoryData
{
  public static readonly Dictionary<RecipeCategory, LanguageTextAndPluralBase> Map = new()
  {
    { RecipeCategory.Desserts, new LanguageTextAndPluralBase {
        Text = new LanguageTextBase { En = "Dessert", Pt = "Doce e sobremesa" },
        PluralText = new LanguageTextBase { En = "Desserts", Pt = "Doces e sobremesas" }
      }
    },
    { RecipeCategory.CakesAndSweetPies, new LanguageTextAndPluralBase {
        Text = new LanguageTextBase { En = "Cake or sweet pie", Pt = "Bolo ou torta doce" },
        PluralText = new LanguageTextBase { En = "Cakes and sweet pies", Pt = "Bolos e tortas doces" }
      }
    },
    { RecipeCategory.SaladsSaucesSides, new LanguageTextAndPluralBase {
        Text = new LanguageTextBase { En = "Salad, sauce or side", Pt = "Salada, molho ou acompanhamento" },
        PluralText = new LanguageTextBase { En = "Salads, sauces and sides", Pt = "Saladas, molhos e acompanhamentos" }
      }
    },
    { RecipeCategory.Snacks, new LanguageTextAndPluralBase {
        Text = new LanguageTextBase { En = "Snack", Pt = "Lanche" },
        PluralText = new LanguageTextBase { En = "Snacks", Pt = "Lanches" }
      }
    },
    { RecipeCategory.Pasta, new LanguageTextAndPluralBase {
        Text = new LanguageTextBase { En = "Pasta", Pt = "Massa" },
        PluralText = new LanguageTextBase { En = "Pastas", Pt = "Massas" }
      }
    },
    { RecipeCategory.Meats, new LanguageTextAndPluralBase {
        Text = new LanguageTextBase { En = "Meat", Pt = "Carne" },
        PluralText = new LanguageTextBase { En = "Meats", Pt = "Carnes" }
      }
    },
    { RecipeCategory.OneDish, new LanguageTextAndPluralBase {
        Text = new LanguageTextBase { En = "One-dish meal", Pt = "Prato Único" },
        PluralText = new LanguageTextBase { En = "One-dish meals", Pt = "Pratos Únicos" }
      }
    },
    { RecipeCategory.Poultry, new LanguageTextAndPluralBase {
        Text = new LanguageTextBase { En = "Poultry", Pt = "Ave" },
        PluralText = new LanguageTextBase { En = "Poultry", Pt = "Aves" }
      }
    },
    { RecipeCategory.FishAndSeafood, new LanguageTextAndPluralBase {
        Text = new LanguageTextBase { En = "Fish or seafood", Pt = "Peixe ou fruto do mar" },
        PluralText = new LanguageTextBase { En = "Fish and seafood", Pt = "Peixes e frutos do mar" }
      }
    },
    { RecipeCategory.Beverages, new LanguageTextAndPluralBase {
        Text = new LanguageTextBase { En = "Beverage", Pt = "Bebida" },
        PluralText = new LanguageTextBase { En = "Beverages", Pt = "Bebidas" }
      }
    },
    { RecipeCategory.Soups, new LanguageTextAndPluralBase {
        Text = new LanguageTextBase { En = "Soup", Pt = "Sopa" },
        PluralText = new LanguageTextBase { En = "Soups", Pt = "Sopas" }
      }
    },
    { RecipeCategory.HealthyEating, new LanguageTextAndPluralBase {
        Text = new LanguageTextBase { En = "Healthy recipe", Pt = "Receita saudável" },
        PluralText = new LanguageTextBase { En = "Healthy recipes", Pt = "Receitas saudáveis" }
      }
    },
  };

  public static readonly List<LanguageTextAndPluralBase> List = Map.Values.ToList();

  static RecipeCategoryData()
  {
    var allEnumValues = Enum.GetValues<RecipeCategory>();
    var missing = allEnumValues.Except(Map.Keys).ToList();
    if (missing.Any())
    {
      throw new InvalidOperationException(
        $"RecipeCategoryData.Map is missing mappings for: {string.Join(", ", missing)}");
    }
  }
}

