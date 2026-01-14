using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using Server.Controllers;
using Server.Dtos;
using Server.Models;
using Server.PreProcessing;
using Server.Serialization;
using Server.Services;
using Server.Shared;
using Server.Response;

namespace Server.Tests.Controllers;

public class RecipeControllerTests
{
  private static AppDbContext BuildContext()
  {
    var options = new DbContextOptionsBuilder<AppDbContext>()
      .UseInMemoryDatabase(Guid.NewGuid().ToString())
      .Options;
    return new RecipeTestAppDbContext(options);
  }

  private static RecipeController BuildController(AppDbContext context, string ownerId)
  {
    var services = new ServiceCollection();
    services.AddLogging();
    services.AddAutoMapper(cfg => cfg.AddProfile(new MappingProfile()));
    var mapper = services.BuildServiceProvider().GetRequiredService<IMapper>();
    var foodService = new FoodService(context);
    var ingredientService = new IngredientService(foodService);
    var recipeService = new RecipeService(ingredientService, foodService, mapper, context);
    var relationService = new RelationService(context);
    var recipeCopyService = new RecipeCopyService(context, recipeService);
    var workspaceService = new WorkspaceService(context, recipeService, mapper);
    var parser = new PlainTextRecipeParser();
    var preProcessor = new PlainTextRecipePreProcessor();
    var config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>()).Build();
    var logger = new NullLogger<RecipeImageOcrService>();
    var ocrService = new RecipeImageOcrService(config, logger);

    var controller = new RecipeController(
      context,
      recipeService,
      relationService,
      recipeCopyService,
      workspaceService,
      parser,
      preProcessor,
      ocrService,
      mapper);

    controller.ControllerContext = new ControllerContext
    {
      HttpContext = new DefaultHttpContext
      {
        User = new ClaimsPrincipal(new ClaimsIdentity(new[]
        {
          new Claim(ClaimTypes.NameIdentifier, ownerId)
        }, "test"))
      }
    };

    return controller;
  }

  private static RecipeDto BuildDto(Visibility visibility)
  {
    return new RecipeDto
    {
      Name = "Test recipe",
      Keys = "test,recipe",
      Language = Language.En,
      Steps = new List<RecipeStepDto>(),
      Visibility = visibility
    };
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

  private static Recipe SeedRecipe(
    AppDbContext context,
    string ownerId,
    RevisionStatus status,
    Visibility visibility,
    bool hasPublished,
    bool hasLatest,
    bool latestEqualsPublished)
  {
    var recipe = new Recipe
    {
      OwnerId = ownerId,
      Status = status,
      Visibility = visibility,
      CreatedAtUtc = DateTime.UtcNow,
      UpdatedAtUtc = DateTime.UtcNow
    };

    RecipeRevision? published = null;
    RecipeRevision? latest = null;

    if (hasPublished)
    {
      published = NewRevision("published", ownerId);
      published.Recipe = recipe;
      recipe.Revisions.Add(published);
      recipe.PublishedRevision = published;
      recipe.PublishedRevisionId = published.Id;
    }

    if (hasLatest)
    {
      latest = latestEqualsPublished && published is not null
        ? published
        : NewRevision("latest", ownerId);

      if (!ReferenceEquals(latest, published))
      {
        latest.Recipe = recipe;
        recipe.Revisions.Add(latest);
      }

      recipe.LatestRevision = latest;
      recipe.LatestRevisionId = latest.Id;
    }

    context.Recipe.Add(recipe);
    context.SaveChanges();

    return recipe;
  }

  [Test]
  // Private creation keeps Draft and no Published revision.
  public async Task CreateRecipe_private_sets_draft_and_no_published()
  {
    using var context = BuildContext();
    var controller = BuildController(context, "user-1");

    var result = await controller.CreateRecipe(BuildDto(Visibility.Private));
    Assert.That(result, Is.InstanceOf<OkObjectResult>());

    var recipe = await context.Recipe.AsNoTracking().FirstAsync();
    Assert.That(recipe.Status, Is.EqualTo(RevisionStatus.Draft));
    Assert.That(recipe.PublishedRevisionId, Is.Null);
    Assert.That(recipe.Visibility, Is.EqualTo(Visibility.Private));
  }

  [Test]
  // Public creation sets PendingReview and no Published revision.
  public async Task CreateRecipe_public_sets_pending_review_and_no_published()
  {
    using var context = BuildContext();
    var controller = BuildController(context, "user-1");

    var result = await controller.CreateRecipe(BuildDto(Visibility.Public));
    Assert.That(result, Is.InstanceOf<OkObjectResult>());

    var recipe = await context.Recipe.AsNoTracking().FirstAsync();
    Assert.That(recipe.Status, Is.EqualTo(RevisionStatus.PendingReview));
    Assert.That(recipe.PublishedRevisionId, Is.Null);
    Assert.That(recipe.Visibility, Is.EqualTo(Visibility.Public));
  }

  [Test]
  // Create returns a RecipeResponse with persisted data.
  public async Task CreateRecipe_returns_recipe_response_with_persisted_data()
  {
    using var context = BuildContext();
    var controller = BuildController(context, "user-1");

    var result = await controller.CreateRecipe(BuildDto(Visibility.Private));
    var ok = result as OkObjectResult;

    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as RecipeResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Id, Is.GreaterThan(0));
    Assert.That(response.OwnerId, Is.EqualTo("user-1"));
    Assert.That(response.Name, Is.EqualTo("Test recipe"));
    Assert.That(response.Keys, Is.EqualTo("test,recipe"));
    Assert.That(response.Language, Is.EqualTo(Language.En));
    Assert.That(response.Visibility, Is.EqualTo(Visibility.Private));
    Assert.That(response.Steps, Is.Empty);

    var persisted = await context.Recipe.AsNoTracking().FirstAsync(r => r.Id == response.Id);
    Assert.That(persisted.OwnerId, Is.EqualTo("user-1"));
    Assert.That(persisted.Visibility, Is.EqualTo(Visibility.Private));
  }

  [Test]
  // Create with multiple steps and ingredients returns a persisted RecipeResponse.
  public async Task CreateRecipe_with_steps_and_ingredients_returns_recipe_response_with_persisted_data()
  {
    using var context = BuildContext();

    context.Food.AddRange(new[]
    {
      new Food
      {
        Id = 1001,
        Name = new LanguageText { Pt = "Farinha", En = "Flour" },
        Keys = new LanguageText { Pt = "farinha", En = "flour" },
        MeasurementUnit = MeasurementUnit.Gram,
        Measures = new Measure { Cup = 100 }
      },
      new Food
      {
        Id = 1002,
        Name = new LanguageText { Pt = "Leite", En = "Milk" },
        Keys = new LanguageText { Pt = "leite", En = "milk" },
        MeasurementUnit = MeasurementUnit.Liter,
        Measures = new Measure { Cup = 240 }
      },
      new Food
      {
        Id = 1003,
        Name = new LanguageText { Pt = "Ovos", En = "Eggs" },
        Keys = new LanguageText { Pt = "ovos", En = "eggs" },
        MeasurementUnit = MeasurementUnit.Gram
      }
    });
    context.SaveChanges();

    var controller = BuildController(context, "user-1");

    var dto = new RecipeDto
    {
      Name = "Pancakes",
      Keys = "pancakes,breakfast",
      Language = Language.En,
      Visibility = Visibility.Private,
      Steps = new List<RecipeStepDto>
      {
        new()
        {
          Title = "Batter",
          Preparation = "Mix the ingredients.",
          Additional = "No lumps.",
          IngredientsText = string.Join("\n", new[]
          {
            "2 cups flour",
            "1 cup milk",
            "2 eggs"
          })
        },
        new()
        {
          Title = "Cook",
          Preparation = "Cook on a hot pan.",
          Additional = "Flip once.",
          IngredientsText = "1 tbsp oil"
        }
      }
    };

    var result = await controller.CreateRecipe(dto);
    var ok = result as OkObjectResult;

    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as RecipeResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Id, Is.GreaterThan(0));
    Assert.That(response.Name, Is.EqualTo("Pancakes"));
    Assert.That(response.Keys, Is.EqualTo("pancakes,breakfast"));
    Assert.That(response.Steps, Has.Count.EqualTo(2));
    Assert.That(response.Steps[0].Ingredients, Has.Count.EqualTo(3));
    Assert.That(response.Steps[1].Ingredients, Has.Count.EqualTo(1));

    Assert.That(response.Steps[0].Title, Is.EqualTo("Batter"));
    Assert.That(response.Steps[0].IngredientsText, Is.EqualTo("2 cups flour\n1 cup milk\n2 eggs"));
    Assert.That(response.Steps[0].Ingredients[0].Text, Is.EqualTo("2 cups flour"));
    Assert.That(response.Steps[0].Ingredients[1].Text, Is.EqualTo("1 cup milk"));
    Assert.That(response.Steps[0].Ingredients[2].Text, Is.EqualTo("2 eggs"));

    Assert.That(response.Steps[1].Title, Is.EqualTo("Cook"));
    Assert.That(response.Steps[1].IngredientsText, Is.EqualTo("1 tbsp oil"));

    var persisted = await context.Recipe
      .Include(r => r.LatestRevision)
      .ThenInclude(rv => rv.Steps)
      .ThenInclude(s => s.Ingredients)
      .AsNoTracking()
      .FirstAsync(r => r.Id == response.Id);

    Assert.That(persisted.LatestRevision, Is.Not.Null);
    Assert.That(persisted.LatestRevision!.Steps.Count, Is.EqualTo(2));
    Assert.That(persisted.LatestRevision!.Steps[0].Ingredients.Count, Is.EqualTo(3));
  }

  [Test]
  // Public copy adds published revision to workspace.
  public async Task CopyRecipe_public_adds_published_to_workspace()
  {
    using var context = BuildContext();
    SeedUserProfile(context, "user-1");
    var source = SeedRecipe(context, "user-2", RevisionStatus.Approved, Visibility.Public, hasPublished: true, hasLatest: false, latestEqualsPublished: false);
    var controller = BuildController(context, "user-1");

    var result = await controller.CopyRecipe(source.Id);
    var ok = result as OkObjectResult;

    Assert.That(ok, Is.Not.Null);
    var workspace = ok!.Value as WorkspaceResponse;
    Assert.That(workspace, Is.Not.Null);

    var clone = await context.Recipe
      .Include(r => r.LatestRevision)
      .FirstOrDefaultAsync(r => r.OwnerId == "user-1" && r.CopiedFromRecipeId == source.Id);
    Assert.That(clone, Is.Not.Null);
    Assert.That(clone!.LatestRevision!.Name, Is.EqualTo("published"));
    Assert.That(workspace!.Recipes.Any(r => r.Id == clone.Id), Is.True);

    var updatedSource = await context.Recipe.AsNoTracking().FirstAsync(r => r.Id == source.Id);
    Assert.That(updatedSource.SavedByOthersCount, Is.EqualTo(1));
  }

  [Test]
  // Copy with share token uses latest revision content.
  public async Task CopyRecipe_with_share_token_adds_latest_to_workspace()
  {
    using var context = BuildContext();
    SeedUserProfile(context, "user-1");
    var source = SeedRecipe(context, "user-2", RevisionStatus.PendingReview, Visibility.Public, hasPublished: true, hasLatest: true, latestEqualsPublished: false);
    source.ShareToken = "token-1";
    source.ShareTokenCreatedAt = DateTime.UtcNow;
    context.Recipe.Update(source);
    context.SaveChanges();

    var controller = BuildController(context, "user-1");

    var result = await controller.CopyRecipe(source.Id, "token-1");
    var ok = result as OkObjectResult;

    Assert.That(ok, Is.Not.Null);
    var workspace = ok!.Value as WorkspaceResponse;
    Assert.That(workspace, Is.Not.Null);

    var clone = await context.Recipe
      .Include(r => r.LatestRevision)
      .FirstOrDefaultAsync(r => r.OwnerId == "user-1" && r.CopiedFromRecipeId == source.Id);
    Assert.That(clone, Is.Not.Null);
    Assert.That(clone!.LatestRevision!.Name, Is.EqualTo("latest"));
    Assert.That(workspace!.Recipes.Any(r => r.Id == clone.Id), Is.True);

    var updatedSource = await context.Recipe.AsNoTracking().FirstAsync(r => r.Id == source.Id);
    Assert.That(updatedSource.SavedByOthersCount, Is.EqualTo(1));
  }

  [Test]
  // Public copy without published revision returns error.
  public async Task CopyRecipe_public_without_published_returns_error()
  {
    using var context = BuildContext();
    SeedUserProfile(context, "user-1");
    var source = SeedRecipe(context, "user-2", RevisionStatus.PendingReview, Visibility.Public, hasPublished: false, hasLatest: true, latestEqualsPublished: false);
    var controller = BuildController(context, "user-1");

    var result = await controller.CopyRecipe(source.Id);

    Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    var notFound = result as NotFoundObjectResult;
    var error = notFound!.Value as ApiError;
    Assert.That(error, Is.Not.Null);
    Assert.That(error!.Code, Is.EqualTo("recipe.no_published_revision"));
  }

  [Test]
  // Pending endpoint returns only PendingReview items.
  public async Task GetPendingRecipes_returns_only_pending_items()
  {
    using var context = BuildContext();
    SeedRecipe(context, "user-1", RevisionStatus.PendingReview, Visibility.Public, hasPublished: false, hasLatest: true, latestEqualsPublished: false);
    SeedRecipe(context, "user-1", RevisionStatus.Draft, Visibility.Private, hasPublished: false, hasLatest: true, latestEqualsPublished: false);
    SeedRecipe(context, "user-2", RevisionStatus.Approved, Visibility.Public, hasPublished: true, hasLatest: true, latestEqualsPublished: true);

    var controller = BuildController(context, "admin-1");
    var result = await controller.GetPendingRecipes();
    var ok = result as OkObjectResult;

    Assert.That(ok, Is.Not.Null);
    var payload = ok!.Value as List<RecipeResponse>;
    Assert.That(payload, Is.Not.Null);
    Assert.That(payload!.Count, Is.EqualTo(1));
  }

  [Test]
  // Approve promotes Latest to Published and marks Approved.
  public async Task ApproveRecipe_sets_published_to_latest_and_status_approved()
  {
    using var context = BuildContext();
    var recipe = SeedRecipe(context, "user-1", RevisionStatus.PendingReview, Visibility.Public, hasPublished: false, hasLatest: true, latestEqualsPublished: false);
    var controller = BuildController(context, "admin-1");

    var result = await controller.ApproveRecipe(recipe.Id);
    Assert.That(result, Is.InstanceOf<OkObjectResult>());

    var updated = await context.Recipe
      .Include(r => r.PublishedRevision)
      .Include(r => r.LatestRevision)
      .FirstAsync(r => r.Id == recipe.Id);

    Assert.That(updated.Status, Is.EqualTo(RevisionStatus.Approved));
    Assert.That(updated.PublishedRevisionId, Is.EqualTo(updated.LatestRevisionId));
  }

  [Test]
  // Private update keeps Published revision and resets status to Draft.
  public async Task UpdateRecipe_private_sets_draft_and_preserves_published()
  {
    using var context = BuildContext();
    var recipe = SeedRecipe(context, "user-1", RevisionStatus.Approved, Visibility.Public, hasPublished: true, hasLatest: true, latestEqualsPublished: true);
    var publishedId = recipe.PublishedRevisionId;
    var controller = BuildController(context, "user-1");

    var result = await controller.UpdateRecipe(recipe.Id, BuildDto(Visibility.Private));
    Assert.That(result, Is.InstanceOf<OkObjectResult>());

    var updated = await context.Recipe
      .Include(r => r.PublishedRevision)
      .FirstAsync(r => r.Id == recipe.Id);

    Assert.That(updated.Status, Is.EqualTo(RevisionStatus.Draft));
    Assert.That(updated.PublishedRevisionId, Is.EqualTo(publishedId));
    Assert.That(updated.Visibility, Is.EqualTo(Visibility.Private));
  }

  [Test]
  // Public update without Published revision becomes PendingReview and stays unpublished.
  public async Task UpdateRecipe_public_without_published_sets_pending_and_no_published()
  {
    using var context = BuildContext();
    var recipe = SeedRecipe(context, "user-1", RevisionStatus.Draft, Visibility.Private, hasPublished: false, hasLatest: true, latestEqualsPublished: false);
    var controller = BuildController(context, "user-1");

    var result = await controller.UpdateRecipe(recipe.Id, BuildDto(Visibility.Public));
    Assert.That(result, Is.InstanceOf<OkObjectResult>());

    var updated = await context.Recipe.AsNoTracking().FirstAsync(r => r.Id == recipe.Id);
    Assert.That(updated.Status, Is.EqualTo(RevisionStatus.PendingReview));
    Assert.That(updated.PublishedRevisionId, Is.Null);
    Assert.That(updated.Visibility, Is.EqualTo(Visibility.Public));
  }

  [Test]
  // Public update with Published keeps Published and creates a new Latest.
  public async Task UpdateRecipe_public_with_published_preserves_published_and_creates_new_latest()
  {
    using var context = BuildContext();
    var recipe = SeedRecipe(context, "user-1", RevisionStatus.Approved, Visibility.Public, hasPublished: true, hasLatest: true, latestEqualsPublished: true);
    var publishedId = recipe.PublishedRevisionId;
    var controller = BuildController(context, "user-1");

    var result = await controller.UpdateRecipe(recipe.Id, BuildDto(Visibility.Public));
    Assert.That(result, Is.InstanceOf<OkObjectResult>());

    var updated = await context.Recipe
      .Include(r => r.PublishedRevision)
      .Include(r => r.LatestRevision)
      .FirstAsync(r => r.Id == recipe.Id);

    Assert.That(updated.Status, Is.EqualTo(RevisionStatus.PendingReview));
    Assert.That(updated.PublishedRevisionId, Is.EqualTo(publishedId));
    Assert.That(updated.LatestRevisionId, Is.Not.EqualTo(publishedId));
  }

  [Test]
  // Approving when Published != Latest replaces Published and removes the old revision.
  public async Task ApproveRecipe_replaces_published_and_removes_old_revision()
  {
    using var context = BuildContext();
    var recipe = SeedRecipe(context, "user-1", RevisionStatus.PendingReview, Visibility.Public, hasPublished: true, hasLatest: true, latestEqualsPublished: false);
    var oldPublishedId = recipe.PublishedRevisionId;
    var controller = BuildController(context, "admin-1");

    var result = await controller.ApproveRecipe(recipe.Id);
    Assert.That(result, Is.InstanceOf<OkObjectResult>());

    var updated = await context.Recipe
      .Include(r => r.PublishedRevision)
      .Include(r => r.LatestRevision)
      .FirstAsync(r => r.Id == recipe.Id);

    Assert.That(updated.Status, Is.EqualTo(RevisionStatus.Approved));
    Assert.That(updated.PublishedRevisionId, Is.EqualTo(updated.LatestRevisionId));
    Assert.That(context.RecipeRevisions.Any(r => r.Id == oldPublishedId), Is.False);
  }
}

public sealed class RecipeTestAppDbContext : AppDbContext
{
  public RecipeTestAppDbContext(DbContextOptions<AppDbContext> options)
    : base(options)
  {
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    // Avoid EF tracking conflicts for owned nutrient types in tests.
    modelBuilder.Entity<Food>().Ignore(f => f.NutritionalInformation);
    modelBuilder.Entity<Food>().Ignore(f => f.Minerals);
    modelBuilder.Entity<Food>().Ignore(f => f.Vitamins);
    modelBuilder.Entity<Food>().Ignore(f => f.AminoAcids);
    modelBuilder.Entity<Food>().Ignore(f => f.EssentialAminoAcids);

    modelBuilder.Entity<RecipeRevision>().OwnsMany(r => r.Steps, step =>
    {
      step.OwnsMany(s => s.Ingredients, ingredient =>
      {
        ingredient.Ignore(i => i.NutritionalInformation);
        ingredient.Ignore(i => i.Minerals);
        ingredient.Ignore(i => i.Vitamins);
        ingredient.Ignore(i => i.AminoAcids);
        ingredient.Ignore(i => i.EssentialAminoAcids);
      });
    });
  }
}
