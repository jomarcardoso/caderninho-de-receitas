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

  private sealed class FoodFixtureFull
  {
    [JsonPropertyName("Id")] public int Id { get; set; }
    [JsonPropertyName("Name_Pt")] public string? Name_Pt { get; set; }
    [JsonPropertyName("Name_En")] public string? Name_En { get; set; }
    [JsonPropertyName("Keys_Pt")] public string? Keys_Pt { get; set; }
    [JsonPropertyName("Keys_En")] public string? Keys_En { get; set; }
  }

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
    var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    var fixtures = JsonSerializer.Deserialize<List<FoodFixtureFull>>(json, jsonOptions) ?? new List<FoodFixtureFull>();

    // Não mapeamos medidas; apenas nome/keys do mock novo
    var foods = fixtures
      .Select((f, index) => new Food
      {
        Id = f.Id != 0 ? f.Id : (index + 1),
        Name = new LanguageText { Pt = f.Name_Pt ?? string.Empty, En = f.Name_En ?? string.Empty },
        Keys = new LanguageText { Pt = f.Keys_Pt ?? string.Empty, En = f.Keys_En ?? string.Empty }
      })
      .ToList();

    var cookedBeans = foods.FirstOrDefault(f => string.Equals(f.Name.En, "Cooked black beans", StringComparison.OrdinalIgnoreCase));
    if (cookedBeans is not null)
    {
      var existing = string.IsNullOrWhiteSpace(cookedBeans.Keys.En) ? Array.Empty<string>() : new[] { cookedBeans.Keys.En };
      cookedBeans.Keys.En = string.Join(
        ", ",
        existing.Concat(new[] { "boiled beans" })
      );
    }

    var nextId = foods.Any() ? foods.Max(f => f.Id) + 1 : 1;

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

  [Test]
  public void filterName_respects_language_preferences()
  {
    // EN modifier 'chopped' is removed only when language is EN
    Assert.That(FoodService.filterName("salsa chopped", Server.Shared.Language.En), Is.EqualTo("salsa"));
    Assert.That(FoodService.filterName("salsa chopped", Server.Shared.Language.Pt), Is.EqualTo("salsa chopped"));

    // PT modifier 'picada' is removed only when language is PT
    Assert.That(FoodService.filterName("salsa picada", Server.Shared.Language.Pt), Is.EqualTo("salsa"));
    Assert.That(FoodService.filterName("salsa picada", Server.Shared.Language.En), Is.EqualTo("salsa picada"));

    // PT purpose phrase 'para decorar' should be removed under PT
    Assert.That(FoodService.filterName("morango para decorar", Server.Shared.Language.Pt), Is.EqualTo("morango"));
  }

  [TestCase("farinha de manioca", "Farinha de mandioca")]
  [TestCase("farinia de trigo", "Farinha de trigo")]
  [TestCase("iorgute", "Iogurte natural")]
  [TestCase("lentrilha", "Lentilha cozida")]
  [TestCase("tocinho", "Toucinho")]
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
  [TestCase("the diced tomato", "Tomate")]
  [TestCase("farinha de trigo para polvilhar a bancada", "Farinha de trigo")]
  [TestCase("azeite para untar a tigela", "Azeite de oliva")]
  [TestCase("1 xícara (chá) de farinha de trigo integral", "Farinha de trigo integral")]
  public async Task FindFoodByPossibleName(string name, string expectedName)
  {
    var foodResult = await service.FindFoodByPossibleName(name);

    AssertFoodHasName(foodResult, expectedName);
  }

  [Test]
  public void GetFoodsFromRecipes_returnsEmptyWhenNoRecipes()
  {
    var foods = FoodService.GetFoodsFromRecipes(new List<Recipe>());

    Assert.That(foods, Is.Empty);
  }
}


