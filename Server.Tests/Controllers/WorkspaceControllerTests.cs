using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Server.Controllers;
using Server.Dtos;
using Server.Models;
using Server.Services;
using Server.Shared;

namespace Server.Tests.Controllers;

public class WorkspaceControllerTests
{
  private static AppDbContext BuildContext()
  {
    var options = new DbContextOptionsBuilder<AppDbContext>()
      .UseInMemoryDatabase(Guid.NewGuid().ToString())
      .Options;
    return new RecipeTestAppDbContext(options);
  }

  private static WorkspaceController BuildController(AppDbContext context, string userId)
  {
    var services = new ServiceCollection();
    services.AddLogging();
    services.AddAutoMapper(cfg => cfg.AddProfile(new MappingProfile()));
    var mapper = services.BuildServiceProvider().GetRequiredService<IMapper>();
    var foodService = new FoodService(context);
    var ingredientService = new IngredientService(foodService);
    var recipeService = new RecipeService(ingredientService, foodService, mapper, context);
    var workspaceService = new WorkspaceService(context, recipeService, mapper);

    var controller = new WorkspaceController(workspaceService)
    {
      ControllerContext = new ControllerContext
      {
        HttpContext = new DefaultHttpContext
        {
          User = new ClaimsPrincipal(new ClaimsIdentity(new[]
          {
            new Claim(ClaimTypes.NameIdentifier, userId)
          }, "test"))
        }
      }
    };

    return controller;
  }

  private static void SeedUserProfile(AppDbContext context, string userId)
  {
    context.UserProfile.Add(new UserProfile
    {
      Id = userId,
      Visibility = Visibility.Public,
      CreatedAtUtc = DateTime.UtcNow,
      UpdatedAtUtc = DateTime.UtcNow
    });
    context.SaveChanges();
  }

  private static RecipeRevision NewRevision(string name, string userId)
  {
    return new RecipeRevision(name, "keys", Language.En, new List<RecipeStep>(), userId);
  }

  [Test]
  // GetWorkspace prefers revision images when available.
  public async Task GetWorkspace_returns_revision_images_when_present()
  {
    using var context = BuildContext();
    const string userId = "user-1";
    SeedUserProfile(context, userId);

    var food = new Food
    {
      Id = 9201,
      Name = new LanguageText { En = "Apple", Pt = "Maca" },
      Imgs = new List<string> { "food-img-1" }
    };

    var recipe = new Recipe
    {
      OwnerId = userId,
      Visibility = Visibility.Private,
      CreatedAtUtc = DateTime.UtcNow,
      UpdatedAtUtc = DateTime.UtcNow,
      Food = food,
      FoodId = food.Id
    };

    var revision = NewRevision("Recipe With Imgs", userId);
    revision.Imgs = new List<string> { "recipe-img-1" };
    revision.Recipe = recipe;
    recipe.Revisions = new List<RecipeRevision> { revision };
    recipe.LatestRevision = revision;
    recipe.LatestRevisionId = revision.Id;

    context.Food.Add(food);
    context.Recipe.Add(recipe);
    context.SaveChanges();

    var controller = BuildController(context, userId);

    var result = await controller.GetWorkspace();
    var ok = result as OkObjectResult;

    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as WorkspaceResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Recipes, Has.Count.EqualTo(1));
    Assert.That(response.Recipes[0].Imgs, Is.EqualTo(new List<string> { "recipe-img-1" }));
  }

  [Test]
  // GetWorkspace falls back to Food images when revision has none.
  public async Task GetWorkspace_falls_back_to_food_images_when_revision_is_empty()
  {
    using var context = BuildContext();
    const string userId = "user-1";
    SeedUserProfile(context, userId);

    var food = new Food
    {
      Id = 9202,
      Name = new LanguageText { En = "Banana", Pt = "Banana" },
      Imgs = new List<string> { "food-img-2", "food-img-3" }
    };

    var recipe = new Recipe
    {
      OwnerId = userId,
      Visibility = Visibility.Private,
      CreatedAtUtc = DateTime.UtcNow,
      UpdatedAtUtc = DateTime.UtcNow,
      Food = food,
      FoodId = food.Id
    };

    var revision = NewRevision("Recipe Without Imgs", userId);
    revision.Imgs = new List<string>();
    revision.Recipe = recipe;
    recipe.Revisions = new List<RecipeRevision> { revision };
    recipe.LatestRevision = revision;
    recipe.LatestRevisionId = revision.Id;

    context.Food.Add(food);
    context.Recipe.Add(recipe);
    context.SaveChanges();

    var controller = BuildController(context, userId);

    var result = await controller.GetWorkspace();
    var ok = result as OkObjectResult;

    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as WorkspaceResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Recipes, Has.Count.EqualTo(1));
    Assert.That(response.Recipes[0].Imgs, Is.EqualTo(new List<string> { "food-img-2", "food-img-3" }));
  }
}
