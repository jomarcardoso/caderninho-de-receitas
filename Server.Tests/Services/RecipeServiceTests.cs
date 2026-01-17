using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Server.Dtos;
using Server.Models;
using Server.Services;
using Server.Shared;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Server.Tests.Services;

[TestFixture]
public class RecipeServiceTests
{
  private sealed class FoodFixtureFull
  {
    [JsonPropertyName("Id")] public int Id { get; set; }
    [JsonPropertyName("Name_Pt")] public string? Name_Pt { get; set; }
    [JsonPropertyName("Name_En")] public string? Name_En { get; set; }
    [JsonPropertyName("Keys_Pt")] public string? Keys_Pt { get; set; }
    [JsonPropertyName("Keys_En")] public string? Keys_En { get; set; }
  }

  private static AppDbContext BuildContext()
  {
    var options = new DbContextOptionsBuilder<AppDbContext>()
      .UseInMemoryDatabase(Guid.NewGuid().ToString())
      .Options;
    return new RecipeServiceTestAppDbContext(options);
  }

  private static RecipeService BuildRecipeService(AppDbContext context)
  {
    var services = new ServiceCollection();
    services.AddLogging();
    services.AddAutoMapper(cfg => cfg.AddProfile(new MappingProfile()));
    var mapper = services.BuildServiceProvider().GetRequiredService<IMapper>();
    var foodService = new FoodService(context);
    var ingredientService = new IngredientService(foodService);
    return new RecipeService(ingredientService, foodService, mapper, context);
  }

  private static void SeedFoods(AppDbContext context)
  {
    var path = Path.Combine(TestContext.CurrentContext.TestDirectory, "mocks", "Foods.json");
    if (!File.Exists(path))
      throw new FileNotFoundException($"Arquivo nao encontrado: {path}");

    var json = File.ReadAllText(path);
    var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    var fixtures = JsonSerializer.Deserialize<List<FoodFixtureFull>>(json, jsonOptions) ?? new List<FoodFixtureFull>();

    var foods = fixtures
      .Select((f, index) => new Food
      {
        Id = f.Id != 0 ? f.Id : (index + 1),
        Name = new LanguageText { Pt = f.Name_Pt ?? string.Empty, En = f.Name_En ?? string.Empty },
        Keys = new LanguageText { Pt = f.Keys_Pt ?? string.Empty, En = f.Keys_En ?? string.Empty }
      })
      .ToList();

    context.Food.AddRange(foods);
    context.SaveChanges();
  }

  [Test]
  public async Task DtoToEntity_sets_food_from_name_using_Foods_json()
  {
    using var context = BuildContext();
    SeedFoods(context);
    var service = BuildRecipeService(context);

    var dto = new RecipeDto
    {
      Name = "Bolo de cenoura com cobertura de chocolate",
      Keys = string.Empty,
      Language = Language.Pt,
      Steps = new List<RecipeStepDto>()
    };

    var recipe = await service.DtoToEntity(dto);

    Assert.That(recipe.Food, Is.Not.Null);
    Assert.That(recipe.Food!.Id, Is.EqualTo(41));
    Assert.That(recipe.FoodId, Is.EqualTo(41));
  }
}

public sealed class RecipeServiceTestAppDbContext : AppDbContext
{
  public RecipeServiceTestAppDbContext(DbContextOptions<AppDbContext> options)
    : base(options)
  {
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Food>().Ignore(f => f.NutritionalInformation);
    modelBuilder.Entity<Food>().Ignore(f => f.Minerals);
    modelBuilder.Entity<Food>().Ignore(f => f.Vitamins);
    modelBuilder.Entity<Food>().Ignore(f => f.AminoAcids);
    modelBuilder.Entity<Food>().Ignore(f => f.EssentialAminoAcids);
  }
}
