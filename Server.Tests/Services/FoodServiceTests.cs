using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using Server.Services;
using Server.Models;
using System.Threading.Tasks;
using System.Linq;

namespace Server.Tests.Services;

[TestFixture]
public class FoodServiceTests
{
  private AppDbContext context = null!;
  private FoodService service;
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

  [TestCase("Chocolate preto 45 - 59%", "Chocolate preto 45 - 59%")]
  [TestCase("Cooked black beans", "Cooked black beans")]
  [TestCase("farinha de mandioca", "Farinha de mandioca")]
  [TestCase("farinha de rosca ", "Farinha de rosca")]
  public async Task hasExactFoodWithThisName(string name, string expectedName)
  {
    var foodResult = await service.hasExactFoodWithThisName(name);

    AssertFoodHasName(foodResult, expectedName);
  }

  [TestCase("Chocolate", "Chocolate preto 45 - 59%")]
  [TestCase("black beans", "Cooked black beans")]
  [TestCase("achocolatado", "Chocolate preto 45 - 59%")]
  [TestCase("chocolate em pó", "Chocolate preto 45 - 59%")]
  [TestCase("chocolate ao leite", "Chocolate preto 45 - 59%")]
  [TestCase("farinha de pão", "Farinha de rosca")]
  public async Task hasExactKeyWithThisName(string name, string expectedName)
  {
    var foodResult = await service.hasExactKeyWithThisName(name);

    AssertFoodHasName(foodResult, expectedName);
  }

  [TestCase("Farinha de trigo peneirada", "Farinha de trigo")]
  [TestCase("carne moída", "carne")]
  [TestCase("frango temperado e assado", "frango")]
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
  [TestCase("coked black beans", "Cooked black beans")]
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
  [TestCase("coked black beans", "Cooked black beans")]
  public async Task FindFoodByPossibleName(string name, string expectedName)
  {
    var foodResult = await service.FindFoodByPossibleName(name);

    AssertFoodHasName(foodResult, expectedName);
  }
}
