using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Server.Models;
using Server.Services;
using Server.Shared;

namespace Server.Tests.Services;

public class RecipeServiceCategoryTests
{
  private static AppDbContext BuildContext()
  {
    var options = new DbContextOptionsBuilder<AppDbContext>()
      .UseInMemoryDatabase(Guid.NewGuid().ToString())
      .Options;
    return new AppDbContext(options);
  }

  private static RecipeService BuildService(AppDbContext context)
  {
    var services = new ServiceCollection();
    services.AddLogging();
    services.AddAutoMapper(cfg => cfg.AddProfile(new MappingProfile()));
    var mapper = services.BuildServiceProvider().GetRequiredService<IMapper>();
    var foodService = new FoodService(context);
    var ingredientService = new IngredientService(foodService);
    return new RecipeService(ingredientService, foodService, mapper, context);
  }

  private static RecipeCategory SeedCategory(AppDbContext context, string slug, string nameEn, string namePt)
  {
    var category = new RecipeCategory
    {
      Slug = slug,
      Name = new LanguageText { En = nameEn, Pt = namePt },
      NamePlural = new LanguageText { En = $"{nameEn}s", Pt = $"{namePt}s" },
      Description = new LanguageText { En = string.Empty, Pt = string.Empty },
      Img = string.Empty,
      BannerImg = string.Empty,
      Visibility = Visibility.Public,
      Featured = false,
      CreatedAt = DateTime.UtcNow
    };
    context.RecipeCategory.Add(category);
    context.SaveChanges();
    return category;
  }

  private static async Task<List<int>> InvokeResolveRecipeCategoryIdsAsync(
    RecipeService service,
    IEnumerable<int>? ids)
  {
    var method = typeof(RecipeService).GetMethod(
      "ResolveRecipeCategoryIdsAsync",
      BindingFlags.Instance | BindingFlags.NonPublic);
    if (method is null) throw new InvalidOperationException("Method not found.");
    var task = (Task<List<int>>)method.Invoke(service, new object?[] { ids })!;
    return await task;
  }

  private static async Task<List<int>> InvokeEnsureCategoriesExistAsync(
    RecipeService service,
    IEnumerable<string>? labels)
  {
    var method = typeof(RecipeService).GetMethod(
      "EnsureCategoriesExistAsync",
      BindingFlags.Instance | BindingFlags.NonPublic);
    if (method is null) throw new InvalidOperationException("Method not found.");
    var task = (Task<List<int>>)method.Invoke(service, new object?[] { labels })!;
    return await task;
  }

  [Test]
  public async Task ResolveRecipeCategoryIdsAsync_returns_existing_distinct_ids()
  {
    using var context = BuildContext();
    var cat1 = SeedCategory(context, "desserts", "Dessert", "Doce");
    var cat2 = SeedCategory(context, "snacks", "Snack", "Lanche");
    var service = BuildService(context);

    var result = await InvokeResolveRecipeCategoryIdsAsync(
      service,
      new[] { cat1.Id, cat2.Id, cat1.Id, 0, 999 });

    Assert.That(result, Is.EquivalentTo(new[] { cat1.Id, cat2.Id }));
  }

  [Test]
  public async Task ResolveRecipeCategoryIdsAsync_returns_empty_for_null()
  {
    using var context = BuildContext();
    var service = BuildService(context);

    var result = await InvokeResolveRecipeCategoryIdsAsync(service, null);

    Assert.That(result, Is.Empty);
  }

  [Test]
  public async Task EnsureCategoriesExistAsync_creates_missing_categories_and_returns_ids()
  {
    using var context = BuildContext();
    var existing = SeedCategory(context, "desserts", "Dessert", "Doce");
    var service = BuildService(context);

    var result = await InvokeEnsureCategoriesExistAsync(
      service,
      new[] { "Desserts", "Snacks", "snacks" });

    Assert.That(result.Count, Is.EqualTo(2));
    Assert.That(result, Does.Contain(existing.Id));

    var categories = context.RecipeCategory.AsNoTracking().ToList();
    Assert.That(categories.Count, Is.EqualTo(2));
    var snacks = categories.Single(c => c.Slug == "snacks");
    Assert.That(snacks.Visibility, Is.EqualTo(Visibility.Private));
    Assert.That(snacks.Name.Pt, Is.EqualTo("Snacks"));
  }
}
