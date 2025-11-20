using System;
using System.Collections.Generic;
using System.Linq;
using Server.Shared;

namespace Server.Dtos;

public class CategoryItem
{
  public string Key { get; set; } = string.Empty; // camelCase
  public string Url { get; set; } = string.Empty; // kebab-case
  public LanguageTextBase Text { get; set; } = new LanguageTextBase();
  public LanguageTextBase PluralText { get; set; } = new LanguageTextBase();
  public string Img { get; set; } = string.Empty; // caminho relativo (www/public)
}

public static class RecipeCategoryData
{
  private static CategoryItem C(string key, string url, string en, string pt, string enPlural, string ptPlural)
    => new CategoryItem
    {
      Key = key,
      Url = url,
      Text = new LanguageTextBase { En = en, Pt = pt },
      PluralText = new LanguageTextBase { En = enPlural, Pt = ptPlural },
      Img = $"/img/categories/{url}.png",
    };

  public static readonly Dictionary<RecipeCategory, CategoryItem> Map = new()
  {
    { RecipeCategory.Desserts, C("desserts", "desserts", "Dessert", "Doce e sobremesa", "Desserts", "Doces e sobremesas") },
    { RecipeCategory.CakesAndSweetPies, C("cakesAndSweetPies", "cakes-and-sweet-pies", "Cake or sweet pie", "Bolo ou torta doce", "Cakes and sweet pies", "Bolos e tortas doces") },
    { RecipeCategory.SaladsSaucesSides, C("saladsSaucesSides", "salads-sauces-sides", "Salad, sauce or side", "Salada, molho ou acompanhamento", "Salads, sauces and sides", "Saladas, molhos e acompanhamentos") },
    { RecipeCategory.Snacks, C("snacks", "snacks", "Snack", "Lanche", "Snacks", "Lanches") },
    { RecipeCategory.Pasta, C("pasta", "pasta", "Pasta", "Massa", "Pastas", "Massas") },
    { RecipeCategory.Meats, C("meats", "meats", "Meat", "Carne", "Meats", "Carnes") },
    { RecipeCategory.OneDish, C("oneDish", "one-dish", "One-dish meal", "Prato único", "One-dish meals", "Pratos únicos") },
    { RecipeCategory.Poultry, C("poultry", "poultry", "Poultry", "Ave", "Poultry", "Aves") },
    { RecipeCategory.FishAndSeafood, C("fishAndSeafood", "fish-and-seafood", "Fish or seafood", "Peixe ou fruto do mar", "Fish and seafood", "Peixes e frutos do mar") },
    { RecipeCategory.Beverages, C("beverages", "beverages", "Beverage", "Bebida", "Beverages", "Bebidas") },
    { RecipeCategory.Soups, C("soups", "soups", "Soup", "Sopa", "Soups", "Sopas") },
    { RecipeCategory.HealthyEating, C("healthyEating", "healthy-eating", "Healthy recipe", "Receita saudável", "Healthy recipes", "Receitas saudáveis") },
    { RecipeCategory.Breads, C("breads", "breads", "Bread", "Pão", "Breads", "Pães") },
  };

  public static readonly List<CategoryItem> List = Map.Values.ToList();

  static RecipeCategoryData()
  {
    var allEnumValues = Enum.GetValues<RecipeCategory>();
    var missing = allEnumValues.Except(Map.Keys).ToList();
    if (missing.Any())
    {
      throw new InvalidOperationException($"RecipeCategoryData.Map is missing mappings for: {string.Join(", ", missing)}");
    }
  }
}

