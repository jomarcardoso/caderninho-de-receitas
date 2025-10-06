using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Server.Models;
using Server.Services;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Server.Tests.Services;

[TestFixture]
public class FoodServiceTests
{
  private AppDbContext context = null!;
  private FoodService service = null!;

  private sealed record FoodFixture(
    int Id,
    [property: JsonPropertyName("Name_Pt")] string? NamePt,
    [property: JsonPropertyName("Keys_Pt")] string? KeysPt,
    [property: JsonPropertyName("Name_En")] string? NameEn,
    [property: JsonPropertyName("Keys_En")] string? KeysEn
  );

  private static void AssertFoodHasName(Food? food, string expectedName)
  {
    Assert.That(food, Is.Not.Null);

    var names = new[] { food!.Name.Pt, food.Name.En }
      .Where(n => !string.IsNullOrWhiteSpace(n))
      .Select(n => n.Trim())
      .ToList();

    Assert.That(names, Does.Contain(expectedName.Trim()).IgnoreCase);
  }

  [OneTimeSetUp]
  public void GlobalSetup()
  {
    var path = Path.Combine(TestContext.CurrentContext.TestDirectory, "mocks", "Foods.json");
    if (!File.Exists(path))
      throw new FileNotFoundException($"Arquivo não encontrado: {path}");

    var json = File.ReadAllText(path);
    var fixtures = JsonSerializer.Deserialize<List<FoodFixture>>(json) ?? new List<FoodFixture>();
    var foods = fixtures.Select(fixture => new Food
    {
      Id = fixture.Id,
      Name = new LanguageText
      {
        Pt = fixture.NamePt ?? string.Empty,
        En = fixture.NameEn ?? string.Empty
      },
      Keys = new LanguageText
      {
        Pt = fixture.KeysPt ?? string.Empty,
        En = fixture.KeysEn ?? string.Empty
      }
    }).ToList();

    var nextId = foods.Any() ? foods.Max(f => f.Id) + 1 : 1;

    foods.AddRange(new[]
    {
      CreateFood(
        nextId++,
        "Melado dourado",
        "Golden Syrup",
        "melado; melado de cana",
        "golden syrup; treacle; light syrup"),
      CreateFood(
        nextId++,
        "Batata assada em gomos",
        "Roasted Potato Wedges",
        "batata assada, batata em gomos",
        "roasted potatoes, baked potatoes, potato wedges"),
      CreateFood(
        nextId++,
        "Tomate em cubos",
        "Diced Tomatoes",
        "tomate em cubos, tomate picado, tomates",
        "diced tomato, chopped tomato, tomatoes, tomato")
    });

    var options = new DbContextOptionsBuilder<AppDbContext>()
      .UseInMemoryDatabase(databaseName: "TestDb")
      .Options;

    context = new AppDbContext(options);
    context.Food.AddRange(foods);
    context.SaveChanges();

    service = new FoodService(context);
  }

  [OneTimeTearDown]
  public void TearDown()
  {
    context.Dispose();
  }

  private static Food CreateFood(int id, string namePt, string nameEn, string keysPt, string keysEn) =>
    new()
    {
      Id = id,
      Name = new LanguageText { Pt = namePt, En = nameEn },
      Keys = new LanguageText { Pt = keysPt, En = keysEn }
    };

  [TestCase("Chocolate preto 45 - 59%", "Chocolate preto 45 - 59%")]
  [TestCase("Cooked black beans", "Cooked black beans")]
  [TestCase(" farInha de mandioca ", "Farinha de mandioca")]
  [TestCase(" Golden Syrup ", "Golden Syrup")]
  [TestCase("roasted potato wedges", "Roasted Potato Wedges")]
  public async Task hasExactFoodWithThisName(string name, string expectedName)
  {
    var foodResult = await service.hasExactFoodWithThisName(name);

    AssertFoodHasName(foodResult, expectedName);
  }

  [Test]
  public async Task hasExactFoodWithThisName_returnsNullWhenInputIsBlank()
  {
    var foodResult = await service.hasExactFoodWithThisName("   \t  ");

    Assert.That(foodResult, Is.Null);
  }

  [TestCase("Chocolate", "Chocolate preto 45 - 59%")]
  [TestCase("black beans", "Cooked black beans")]
  [TestCase("treacle", "Golden Syrup")]
  [TestCase("melado", "Golden Syrup")]
  [TestCase("Potato Wedges", "Roasted Potato Wedges")]
  [TestCase("chocolate em pó", "Chocolate preto 45 - 59%")]
  [TestCase("boiled beans", "Cooked black beans")]
  public async Task hasExactKeyWithThisName(string name, string expectedName)
  {
    var foodResult = await service.hasExactKeyWithThisName(name);

    AssertFoodHasName(foodResult, expectedName);
  }

  [Test]
  public async Task hasExactKeyWithThisName_returnsNullWhenInputIsBlank()
  {
    var foodResult = await service.hasExactKeyWithThisName(string.Empty);

    Assert.That(foodResult, Is.Null);
  }

  [TestCase(" de arroz", "arroz")]
  [TestCase("of sugar", "sugar")]
  [TestCase("the diced tomatoes", "diced tomatoes")]
  [TestCase("dos ovos", "ovos")]
  public void filterPrefix(string text, string expected)
  {
    var result = FoodService.filterPrefix(text);

    Assert.That(result, Is.EqualTo(expected));
  }

  [TestCase("Farinha de trigo peneirada", "Farinha de trigo")]
  [TestCase("carne moída", "carne")]
  [TestCase("frango temperado e assado", "frango")]
  [TestCase("the finely chopped parsley", "parsley")]
  [TestCase("seasoned roasted chicken", "chicken")]
  [TestCase("Golden Syrup to taste", "Golden Syrup")]
  [TestCase("the diced tomatoes", "tomatoes")]
  public void filterName(string name, string expectedName)
  {
    var stringResult = FoodService.filterName(name);

    Assert.That(stringResult, Is.EqualTo(expectedName));
  }

  [TestCase("farinha de manioca", "Farinha de mandioca")]
  [TestCase("farinia de trigo", "Farinha de trigo")]
  [TestCase("iorgute", "Iogurte natural")]
  [TestCase("lentrilha", "Lentilha cozida")]
  [TestCase("tocinho", "Toucinho")]
  [TestCase("golden sirup", "Golden Syrup")]
  [TestCase("roosted potato wadges", "Roasted Potato Wedges")]
  public async Task BestMatch(string name, string expectedName)
  {
    var foodResult = await service.BestMatch(name);

    AssertFoodHasName(foodResult, expectedName);
  }

  [TestCase("Chocolate preto 45 - 59%", "Chocolate preto 45 - 59%")]
  [TestCase("Cooked black beans", "Cooked black beans")]
  [TestCase("farinha de mandioca", "Farinha de mandioca")]
  [TestCase("farinha de rosca ", "Farinha de rosca")]
  [TestCase("Chocolate", "Chocolate preto 45 - 59%")]
  [TestCase("black beans", "Cooked black beans")]
  [TestCase("achocolatado", "Chocolate preto 45 - 59%")]
  [TestCase("chocolate em pó", "Chocolate preto 45 - 59%")]
  [TestCase("chocolate ao leite", "Chocolate preto 45 - 59%")]
  [TestCase("farinha de pão", "Farinha de rosca")]
  [TestCase("farinha de manioca", "Farinha de mandioca")]
  [TestCase("farinia de trigo", "Farinha de trigo")]
  [TestCase("iorgute", "Iogurte natural")]
  [TestCase("lentrilha", "Lentilha cozida")]
  [TestCase("tocinho", "Toucinho")]
  [TestCase("treacle", "Golden Syrup")]
  [TestCase("the diced tomato", "Diced Tomatoes")]
  [TestCase("roosted potato", "Roasted Potato Wedges")]
  public async Task FindFoodByPossibleName(string name, string expectedName)
  {
    var foodResult = await service.FindFoodByPossibleName(name);

    AssertFoodHasName(foodResult, expectedName);
  }

  [Test]
  public void GetFoodsFromRecipes_returnsDistinctFoodsFromRecipeAndSteps()
  {
    var beans = context.Food.First(f => string.Equals(f.Name.En, "Cooked black beans", System.StringComparison.OrdinalIgnoreCase));
    var syrup = context.Food.First(f => string.Equals(f.Name.En, "Golden Syrup", System.StringComparison.OrdinalIgnoreCase));
    var potatoes = context.Food.First(f => string.Equals(f.Name.En, "Roasted Potato Wedges", System.StringComparison.OrdinalIgnoreCase));

    var recipes = new List<Recipe>
    {
      new()
      {
        Id = 1,
        Food = potatoes,
        Steps = new List<RecipeStep>
        {
          new()
          {
            Ingredients = new List<Ingredient>
            {
              new() { Food = beans },
              new() { Food = syrup },
              new() { Food = beans }
            }
          }
        }
      }
    };

    var foods = FoodService.GetFoodsFromRecipes(recipes);

    Assert.That(foods.Select(f => f.Id), Is.EquivalentTo(new[] { potatoes.Id, beans.Id, syrup.Id }));
  }

  [Test]
  public void GetFoodsFromRecipes_returnsEmptyWhenNoRecipes()
  {
    var foods = FoodService.GetFoodsFromRecipes(new List<Recipe>());

    Assert.That(foods, Is.Empty);
  }
}


