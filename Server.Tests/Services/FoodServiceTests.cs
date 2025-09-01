using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Text.Json;
using Server.Services;
using Server.Models;

namespace Server.Tests.Services;

[TestFixture]
public class FoodServiceTests
{
  private AppDbContext context = null!;
  private FoodService service;

  [SetUp]
  public void Setup()
  {
    var json = File.ReadAllText("mocks/FoodsPt.json");
    var foods = JsonSerializer.Deserialize<List<Food>>(json);
    var options = new DbContextOptionsBuilder<AppDbContext>()
        .UseInMemoryDatabase(databaseName: "TestDb")
        .Options;

    context = new AppDbContext(options);

    context.Foods.AddRange(foods);
    context.SaveChanges();

    service = new FoodService(context);
  }

  [TearDown]
  public void TearDown()
  {
    context.Dispose();
  }

  [TestCase("chocolate", "Chocolate preto 45 - 59%")]
  public void hasExactFoodWithThisName_Parametrized(string name, string expectedName)
  {
    var foodResult = service.hasExactFoodWithThisName(name);

    Assert.That(foodResult.namePt, Is.EqualTo(expectedName));
  }
}
