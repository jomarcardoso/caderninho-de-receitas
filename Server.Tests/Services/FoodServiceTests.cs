using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Text.Json;
using Server.Services;
using Server.Models;
using System.Threading.Tasks;

namespace Server.Tests.Services;

[TestFixture]
public class FoodServiceTests
{
  private AppDbContext context = null!;
  private FoodService service;

  [OneTimeSetUp]
  public void GlobalSetup()
  {
    var path = Path.Combine(TestContext.CurrentContext.TestDirectory, "mocks", "FoodsPt.json");
    if (!File.Exists(path))
      throw new FileNotFoundException($"Arquivo não encontrado: {path}");

    var json = File.ReadAllText(path);
    var foods =
    JsonSerializer.Deserialize<List<Food>>(json) ?? new List<Food>();

    var options = new DbContextOptionsBuilder<AppDbContext>()
        .UseInMemoryDatabase(databaseName: "TestDb")
        .Options;

    context = new AppDbContext(options);

    context.Foods.AddRange(foods);
    context.SaveChanges();

    service = new FoodService(context);
  }

  [OneTimeTearDown]
  public void TearDown()
  {
    context.Dispose();
  }

  [TestCase("Chocolate preto 45 - 59%", "Chocolate preto 45 - 59%")]
  [TestCase("farinha de mandioca", "Farinha de mandioca")]
  [TestCase("farinha de rosca ", "Farinha de rosca")]
  public async Task hasExactFoodWithThisName(string name, string expectedName)
  {
    var foodResult = await service.hasExactFoodWithThisName(name);

    Assert.That(foodResult.NamePt, Is.EqualTo(expectedName));
  }

  [TestCase("Chocolate", "Chocolate preto 45 - 59%")]
  [TestCase("achocolatado", "Chocolate preto 45 - 59%")]
  [TestCase("chocolate em pó", "Chocolate preto 45 - 59%")]
  [TestCase("chocolate ao leite", "Chocolate preto 45 - 59%")]
  [TestCase("farinha de pão", "Farinha de rosca")]
  public async Task hasExactKeyWithThisName(string name, string expectedName)
  {
    var foodResult = await service.hasExactKeyWithThisName(name);

    Assert.That(foodResult.NamePt, Is.EqualTo(expectedName));
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
  public async Task BestMatch(string name, string expectedName)
  {
    var foodResult = await service.BestMatch(name);

    Assert.That(foodResult.NamePt, Is.EqualTo(expectedName));
  }

  [TestCase("Chocolate preto 45 - 59%", "Chocolate preto 45 - 59%")]
  [TestCase("farinha de mandioca", "Farinha de mandioca")]
  [TestCase("farinha de rosca ", "Farinha de rosca")]
  [TestCase("Chocolate", "Chocolate preto 45 - 59%")]
  [TestCase("achocolatado", "Chocolate preto 45 - 59%")]
  [TestCase("chocolate em pó", "Chocolate preto 45 - 59%")]
  [TestCase("chocolate ao leite", "Chocolate preto 45 - 59%")]
  [TestCase("farinha de pão", "Farinha de rosca")]
  [TestCase("farinha de manioca", "Farinha de mandioca")]
  [TestCase("farinia de trigo", "Farinha de trigo")]
  [TestCase("iorgute", "Iogurte natural")]
  [TestCase("lentrilha", "Lentilha cozida")]
  [TestCase("tocinho", "Toucinho")]
  public async Task FindFoodByPossibleName(string name, string expectedName)
  {
    var foodResult = await service.BestMatch(name);

    Assert.That(foodResult.NamePt, Is.EqualTo(expectedName));
  }
}
