using Server.Shared;

namespace Server.Dtos;

public class CategoryItem
{
  public int Id { get; set; } = 0;
  public string Key { get; set; } = string.Empty; // slug/camel
  public string Url { get; set; } = string.Empty; // kebab-case
  public LanguageTextBase Text { get; set; } = new LanguageTextBase();
  public LanguageTextBase PluralText { get; set; } = new LanguageTextBase();
  public string Img { get; set; } = string.Empty; // optional relative path
  public LanguageTextBase Description { get; set; } = new LanguageTextBase();
  public string BannerImg { get; set; } = string.Empty;
}

public static class RecipeCategoryDefaults
{
  private static CategoryItem C(string key, string url, string en, string pt, string enPlural, string ptPlural, string? descEn = null, string? descPt = null, string? banner = null)
    => new CategoryItem
    {
      Key = key,
      Url = url,
      Text = new LanguageTextBase { En = en, Pt = pt },
      PluralText = new LanguageTextBase { En = enPlural, Pt = ptPlural },
      Img = $"/img/categories/{url}.png",
      Description = new LanguageTextBase { En = descEn ?? string.Empty, Pt = descPt ?? string.Empty },
      BannerImg = banner ?? string.Empty,
    };

  public static readonly List<CategoryItem> List = new()
  {
    C("desserts", "desserts", "Dessert", "Doce e sobremesa", "Desserts", "Doces e sobremesas"),
    C("cakesAndSweetPies", "cakes-and-sweet-pies", "Cake or sweet pie", "Bolo ou torta doce", "Cakes and sweet pies", "Bolos e tortas doces"),
    C("saladsSaucesSides", "salads-sauces-sides", "Salad, sauce or side", "Salada, molho ou acompanhamento", "Salads, sauces and sides", "Saladas, molhos e acompanhamentos"),
    C("snacks", "snacks", "Snack", "Lanche", "Snacks", "Lanches"),
    C("pasta", "pasta", "Pasta", "Massa", "Pastas", "Massas"),
    C("meats", "meats", "Meat", "Carne", "Meats", "Carnes"),
    C("oneDish", "one-dish", "One-dish meal", "Prato único", "One-dish meals", "Pratos únicos"),
    C("poultry", "poultry", "Poultry", "Ave", "Poultry", "Aves"),
    C("fishAndSeafood", "fish-and-seafood", "Fish or seafood", "Peixe ou fruto do mar", "Fish and seafood", "Peixes e frutos do mar"),
    C("beverages", "beverages", "Beverage", "Bebida", "Beverages", "Bebidas"),
    C("soups", "soups", "Soup", "Sopa", "Soups", "Sopas"),
    C("healthyEating", "healthy-eating", "Healthy recipe", "Receita saudável", "Healthy recipes", "Receitas saudáveis"),
    C("breads", "breads", "Bread", "Pão", "Breads", "Pães"),
  };
}
