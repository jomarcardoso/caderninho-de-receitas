using Microsoft.EntityFrameworkCore;

namespace Server.Tests.Services;

private AppDbContext context = null!;
private FoodService service;

[TestFixture]
public class FoodServiceTests
{
  private FoodService service;
  [SetUp]
  public void Setup()
  {
    var options = new DbContextOptionsBuilder<AppDbContext>()
        .UseInMemoryDatabase(databaseName: "TestDb")
        .Options;

    context = new AppDbContext(options);
    service = new FoodService(context);
  }
}