using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Server.Controllers;
using Server.Dtos;
using Server.Models;
using Server.Response;
using Server.Services;
using Server.Shared;

namespace Server.Tests.Controllers;

public class RecipeListControllerTests
{
  private static AppDbContext BuildContext()
  {
    var options = new DbContextOptionsBuilder<AppDbContext>()
      .UseInMemoryDatabase(Guid.NewGuid().ToString())
      .Options;
    return new AppDbContext(options);
  }

  private static RecipeListController BuildController(AppDbContext context, string? ownerId)
  {
    var services = new ServiceCollection();
    services.AddLogging();
    services.AddAutoMapper(cfg => cfg.AddProfile(new MappingProfile()));
    var mapper = services.BuildServiceProvider().GetRequiredService<IMapper>();
    var foodService = new FoodService(context);
    var ingredientService = new IngredientService(foodService);
    var recipeService = new RecipeService(ingredientService, foodService, mapper, context);

    var controller = new RecipeListController(context, recipeService, mapper);
    var httpContext = new DefaultHttpContext();
    if (!string.IsNullOrWhiteSpace(ownerId))
    {
      httpContext.User = new ClaimsPrincipal(new ClaimsIdentity(new[]
      {
        new Claim(ClaimTypes.NameIdentifier, ownerId)
      }, "test"));
    }

    controller.ControllerContext = new ControllerContext { HttpContext = httpContext };
    return controller;
  }

  private static Recipe SeedRecipe(AppDbContext context, string ownerId, string name)
  {
    var recipe = new Recipe
    {
      OwnerId = ownerId,
      Visibility = Visibility.Private,
      CreatedAtUtc = DateTime.UtcNow,
      UpdatedAtUtc = DateTime.UtcNow
    };

    var revision = new RecipeRevision(name, "keys", Language.En, new List<RecipeStep>(), ownerId)
    {
      Recipe = recipe
    };
    recipe.Revisions.Add(revision);
    recipe.LatestRevision = revision;
    recipe.LatestRevisionId = revision.Id;

    context.Recipe.Add(recipe);
    context.SaveChanges();
    return recipe;
  }

  private static RecipeList SeedList(AppDbContext context, string ownerId, string name, Visibility visibility = Visibility.Private)
  {
    var list = new RecipeList
    {
      OwnerId = ownerId,
      Name = name,
      Visibility = visibility,
      CreatedAt = DateTime.UtcNow,
      UpdatedAt = DateTime.UtcNow
    };
    context.RecipeList.Add(list);
    context.SaveChanges();
    return list;
  }

  private static RecipeItem SeedListItem(AppDbContext context, RecipeList list, Recipe recipe, int position)
  {
    var item = new RecipeItem
    {
      RecipeListId = list.Id,
      RecipeId = recipe.Id,
      Position = position,
      Recipe = recipe
    };
    context.RecipeItem.Add(item);
    context.SaveChanges();
    return item;
  }

  [Test]
  public async Task GetMyLists_without_user_returns_unauthorized()
  {
    using var context = BuildContext();
    var controller = BuildController(context, null);

    var result = await controller.GetMyLists();

    Assert.That(result, Is.InstanceOf<UnauthorizedResult>());
  }

  [Test]
  public async Task Create_requires_name()
  {
    using var context = BuildContext();
    var controller = BuildController(context, "user-1");
    var dto = new RecipeListDto
    {
      Name = "  ",
      Description = null,
      Visibility = Visibility.Private
    };

    var result = await controller.Create(dto);

    Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    var badRequest = result as BadRequestObjectResult;
    var error = badRequest?.Value as ApiError;
    Assert.That(error, Is.Not.Null);
    Assert.That(error!.Detail, Is.EqualTo("Name is required"));
  }

  [Test]
  public async Task Create_persists_list_and_returns_summaries()
  {
    using var context = BuildContext();
    var controller = BuildController(context, "user-1");
    var dto = new RecipeListDto
    {
      Name = "Desserts",
      Description = "Sweet recipes",
      Visibility = Visibility.Public
    };

    var result = await controller.Create(dto);
    var ok = result as OkObjectResult;

    Assert.That(ok, Is.Not.Null);
    var payload = ok!.Value as List<RecipeListSummaryResponse>;
    Assert.That(payload, Is.Not.Null);
    Assert.That(payload!.Count, Is.EqualTo(1));
    Assert.That(payload[0].Name, Is.EqualTo("Desserts"));
    Assert.That(payload[0].Description, Is.EqualTo("Sweet recipes"));
    Assert.That(payload[0].Visibility, Is.EqualTo(Visibility.Public));

    var persisted = await context.RecipeList.AsNoTracking().FirstAsync();
    Assert.That(persisted.OwnerId, Is.EqualTo("user-1"));
    Assert.That(persisted.Name, Is.EqualTo("Desserts"));
  }

  [Test]
  public async Task Update_updates_list_fields()
  {
    using var context = BuildContext();
    var list = SeedList(context, "user-1", "Old Name");
    var controller = BuildController(context, "user-1");

    var dto = new RecipeListDto
    {
      Name = "Updated Name",
      Description = "Updated description",
      Visibility = Visibility.Public
    };

    var result = await controller.Update(list.Id, dto);
    var ok = result as OkObjectResult;

    Assert.That(ok, Is.Not.Null);
    var payload = ok!.Value as List<RecipeListSummaryResponse>;
    Assert.That(payload, Is.Not.Null);
    Assert.That(payload!.First().Name, Is.EqualTo("Updated Name"));
    Assert.That(payload.First().Visibility, Is.EqualTo(Visibility.Public));

    var updated = await context.RecipeList.AsNoTracking().FirstAsync();
    Assert.That(updated.Name, Is.EqualTo("Updated Name"));
    Assert.That(updated.Description, Is.EqualTo("Updated description"));
    Assert.That(updated.Visibility, Is.EqualTo(Visibility.Public));
  }

  [Test]
  public async Task AddRecipe_returns_created_and_sets_next_position()
  {
    using var context = BuildContext();
    var list = SeedList(context, "user-1", "Favorites");
    var first = SeedRecipe(context, "user-1", "First");
    var second = SeedRecipe(context, "user-1", "Second");
    var third = SeedRecipe(context, "user-1", "Third");
    SeedListItem(context, list, first, 1);
    SeedListItem(context, list, second, 2);
    var controller = BuildController(context, "user-1");

    var result = await controller.AddRecipe(list.Id, third.Id);
    var created = result as ObjectResult;

    Assert.That(created, Is.Not.Null);
    Assert.That(created!.StatusCode, Is.EqualTo(StatusCodes.Status201Created));
    Assert.That(created.Value, Is.EqualTo(true));

    var newItem = await context.RecipeItem
      .AsNoTracking()
      .FirstOrDefaultAsync(i => i.RecipeListId == list.Id && i.RecipeId == third.Id);
    Assert.That(newItem, Is.Not.Null);
    Assert.That(newItem!.Position, Is.EqualTo(3));
  }

  [Test]
  public async Task AddRecipe_returns_false_when_recipe_already_in_list()
  {
    using var context = BuildContext();
    var list = SeedList(context, "user-1", "Favorites");
    var recipe = SeedRecipe(context, "user-1", "Existing");
    SeedListItem(context, list, recipe, 1);
    var controller = BuildController(context, "user-1");

    var result = await controller.AddRecipe(list.Id, recipe.Id);
    var ok = result as OkObjectResult;

    Assert.That(ok, Is.Not.Null);
    Assert.That(ok!.Value, Is.EqualTo(false));
  }

  [Test]
  public async Task RemoveRecipe_deletes_item_and_returns_no_content()
  {
    using var context = BuildContext();
    var list = SeedList(context, "user-1", "Favorites");
    var recipe = SeedRecipe(context, "user-1", "Existing");
    SeedListItem(context, list, recipe, 1);
    var controller = BuildController(context, "user-1");

    var result = await controller.RemoveRecipe(list.Id, recipe.Id);

    Assert.That(result, Is.InstanceOf<NoContentResult>());
    Assert.That(context.RecipeItem.Any(i => i.RecipeListId == list.Id && i.RecipeId == recipe.Id), Is.False);
  }

  [Test]
  public async Task Get_returns_list_with_items_sorted_by_position()
  {
    using var context = BuildContext();
    var list = SeedList(context, "user-1", "Favorites");
    var first = SeedRecipe(context, "user-1", "First");
    var second = SeedRecipe(context, "user-1", "Second");
    SeedListItem(context, list, first, 2);
    SeedListItem(context, list, second, 1);
    var controller = BuildController(context, "user-1");

    var result = await controller.Get(list.Id);
    var ok = result as OkObjectResult;

    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as RecipeListResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Items.Count, Is.EqualTo(2));
    Assert.That(response.Items.Select(i => i.Position).ToList(), Is.EqualTo(new List<int> { 1, 2 }));
  }

  [Test]
  public async Task GetMyLists_returns_recipe_images_from_revision()
  {
    using var context = BuildContext();
    const string ownerId = "user-1";
    var list = SeedList(context, ownerId, "Favorites");

    var food = new Food
    {
      Id = 9301,
      Name = new LanguageText { En = "Apple", Pt = "Maca" },
      Imgs = new List<string> { "food-img-1" }
    };

    var recipe = new Recipe
    {
      OwnerId = ownerId,
      Visibility = Visibility.Private,
      CreatedAtUtc = DateTime.UtcNow,
      UpdatedAtUtc = DateTime.UtcNow,
      Food = food,
      FoodId = food.Id
    };

    var revision = new RecipeRevision("Recipe With Imgs", "keys", Language.En, new List<RecipeStep>(), ownerId)
    {
      Imgs = new List<string> { "recipe-img-1" },
      Recipe = recipe
    };
    recipe.Revisions.Add(revision);
    recipe.LatestRevision = revision;
    recipe.LatestRevisionId = revision.Id;

    context.Food.Add(food);
    context.Recipe.Add(recipe);
    context.SaveChanges();

    SeedListItem(context, list, recipe, 1);
    var controller = BuildController(context, ownerId);

    var result = await controller.GetMyLists();
    var ok = result as OkObjectResult;

    Assert.That(ok, Is.Not.Null);
    var payload = ok!.Value as List<RecipeListSummaryResponse>;
    Assert.That(payload, Is.Not.Null);
    Assert.That(payload!.Count, Is.EqualTo(1));
    Assert.That(payload[0].Items.Count, Is.EqualTo(1));
    Assert.That(payload[0].Items[0].Imgs, Is.EqualTo(new List<string> { "recipe-img-1" }));
  }

  [Test]
  public async Task GetMyLists_falls_back_to_food_images_when_revision_is_empty()
  {
    using var context = BuildContext();
    const string ownerId = "user-1";
    var list = SeedList(context, ownerId, "Favorites");

    var food = new Food
    {
      Id = 9302,
      Name = new LanguageText { En = "Banana", Pt = "Banana" },
      Imgs = new List<string> { "food-img-2", "food-img-3" }
    };

    var recipe = new Recipe
    {
      OwnerId = ownerId,
      Visibility = Visibility.Private,
      CreatedAtUtc = DateTime.UtcNow,
      UpdatedAtUtc = DateTime.UtcNow,
      Food = food,
      FoodId = food.Id
    };

    var revision = new RecipeRevision("Recipe Without Imgs", "keys", Language.En, new List<RecipeStep>(), ownerId)
    {
      Imgs = new List<string>(),
      Recipe = recipe
    };
    recipe.Revisions.Add(revision);
    recipe.LatestRevision = revision;
    recipe.LatestRevisionId = revision.Id;

    context.Food.Add(food);
    context.Recipe.Add(recipe);
    context.SaveChanges();

    SeedListItem(context, list, recipe, 1);
    var controller = BuildController(context, ownerId);

    var result = await controller.GetMyLists();
    var ok = result as OkObjectResult;

    Assert.That(ok, Is.Not.Null);
    var payload = ok!.Value as List<RecipeListSummaryResponse>;
    Assert.That(payload, Is.Not.Null);
    Assert.That(payload!.Count, Is.EqualTo(1));
    Assert.That(payload[0].Items.Count, Is.EqualTo(1));
    Assert.That(payload[0].Items[0].Imgs, Is.EqualTo(new List<string> { "food-img-2", "food-img-3" }));
  }
}
