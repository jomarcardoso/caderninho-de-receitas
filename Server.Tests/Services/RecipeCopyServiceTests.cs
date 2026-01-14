using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Server.Models;
using Server.Services;
using Server.Shared;

namespace Server.Tests.Services;

public class RecipeCopyServiceTests
{
  private static AppDbContext BuildContext()
  {
    var options = new DbContextOptionsBuilder<AppDbContext>()
      .UseInMemoryDatabase(Guid.NewGuid().ToString())
      .Options;
    return new RecipeCopyTestAppDbContext(options);
  }

  private static RecipeCopyService BuildService(AppDbContext context)
  {
    var services = new ServiceCollection();
    services.AddLogging();
    services.AddAutoMapper(cfg => cfg.AddProfile(new MappingProfile()));
    var mapper = services.BuildServiceProvider().GetRequiredService<IMapper>();
    var foodService = new FoodService(context);
    var ingredientService = new IngredientService(foodService);
    var recipeService = new RecipeService(ingredientService, foodService, mapper, context);
    return new RecipeCopyService(context, recipeService);
  }

  private static RecipeRevision NewRevision(string name, string userId)
  {
    return new RecipeRevision(name, "keys", Language.En, new List<RecipeStep>(), userId);
  }

  private static Recipe SeedRecipe(
    AppDbContext context,
    string ownerId,
    Visibility visibility,
    bool hasPublished,
    bool hasLatest,
    bool latestEqualsPublished,
    string? shareToken = null,
    DateTime? shareTokenRevokedAt = null)
  {
    var recipe = new Recipe
    {
      OwnerId = ownerId,
      Visibility = visibility,
      CreatedAtUtc = DateTime.UtcNow,
      UpdatedAtUtc = DateTime.UtcNow,
      ShareToken = shareToken,
      ShareTokenCreatedAt = shareToken is null ? null : DateTime.UtcNow,
      ShareTokenRevokedAt = shareTokenRevokedAt
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
  public async Task ResolveCopySource_returns_not_found_for_missing_recipe()
  {
    using var context = BuildContext();
    var service = BuildService(context);

    var result = await service.ResolveCopySourceAsync(999, "user-1", null);

    Assert.That(result.NotFound, Is.True);
  }

  [Test]
  public async Task ResolveCopySource_returns_error_for_private_recipe_without_token()
  {
    using var context = BuildContext();
    var service = BuildService(context);
    var recipe = SeedRecipe(context, "owner-1", Visibility.Private, hasPublished: false, hasLatest: false, latestEqualsPublished: false);

    var result = await service.ResolveCopySourceAsync(recipe.Id, "user-2", null);

    Assert.That(result.Error, Is.Not.Null);
    Assert.That(result.Error!.Code, Is.EqualTo("recipe.not_public"));
  }

  [Test]
  public async Task ResolveCopySource_returns_error_when_public_without_published()
  {
    using var context = BuildContext();
    var service = BuildService(context);
    var recipe = SeedRecipe(context, "owner-1", Visibility.Public, hasPublished: false, hasLatest: true, latestEqualsPublished: false);

    var result = await service.ResolveCopySourceAsync(recipe.Id, "user-2", null);

    Assert.That(result.Error, Is.Not.Null);
    Assert.That(result.Error!.Code, Is.EqualTo("recipe.no_published_revision"));
  }

  [Test]
  public async Task ResolveCopySource_with_share_token_returns_latest_revision()
  {
    using var context = BuildContext();
    var service = BuildService(context);
    var recipe = SeedRecipe(
      context,
      "owner-1",
      Visibility.Private,
      hasPublished: false,
      hasLatest: true,
      latestEqualsPublished: false,
      shareToken: "token-123");

    var result = await service.ResolveCopySourceAsync(recipe.Id, "user-2", "token-123");

    Assert.That(result.Error, Is.Null);
    Assert.That(result.BaseRevision, Is.Not.Null);
    Assert.That(result.BaseRevision!.Name, Is.EqualTo("latest"));
    Assert.That(result.CanCopyLatest, Is.True);
    Assert.That(result.IsOwner, Is.False);
  }

  [Test]
  public async Task ResolveCopySource_owner_returns_latest_revision()
  {
    using var context = BuildContext();
    var service = BuildService(context);
    var recipe = SeedRecipe(context, "owner-1", Visibility.Private, hasPublished: false, hasLatest: true, latestEqualsPublished: false);

    var result = await service.ResolveCopySourceAsync(recipe.Id, "owner-1", null);

    Assert.That(result.Error, Is.Null);
    Assert.That(result.BaseRevision, Is.Not.Null);
    Assert.That(result.BaseRevision!.Name, Is.EqualTo("latest"));
    Assert.That(result.CanCopyLatest, Is.True);
    Assert.That(result.IsOwner, Is.True);
  }

  [Test]
  public async Task ResolveCopySource_public_without_token_returns_published_revision()
  {
    using var context = BuildContext();
    var service = BuildService(context);
    var recipe = SeedRecipe(context, "owner-1", Visibility.Public, hasPublished: true, hasLatest: true, latestEqualsPublished: false);

    var result = await service.ResolveCopySourceAsync(recipe.Id, "user-2", null);

    Assert.That(result.Error, Is.Null);
    Assert.That(result.BaseRevision, Is.Not.Null);
    Assert.That(result.BaseRevision!.Name, Is.EqualTo("published"));
    Assert.That(result.CanCopyLatest, Is.False);
    Assert.That(result.IsOwner, Is.False);
  }

  [Test]
  public async Task CreateClone_persists_copy_with_latest_revision()
  {
    using var context = BuildContext();
    var service = BuildService(context);
    var recipe = SeedRecipe(context, "owner-1", Visibility.Public, hasPublished: false, hasLatest: true, latestEqualsPublished: false);

    var clone = await service.CreateCloneAsync(recipe, "user-2");

    Assert.That(clone.Id, Is.GreaterThan(0));
    Assert.That(clone.OwnerId, Is.EqualTo("user-2"));
    Assert.That(clone.CopiedFromRecipeId, Is.EqualTo(recipe.Id));
    Assert.That(clone.LatestRevision, Is.Not.Null);
    Assert.That(clone.LatestRevision!.Name, Is.EqualTo("latest"));

    var persisted = await context.Recipe
      .Include(r => r.LatestRevision)
      .FirstAsync(r => r.Id == clone.Id);
    Assert.That(persisted.LatestRevision, Is.Not.Null);
    Assert.That(persisted.LatestRevision!.Name, Is.EqualTo("latest"));
  }

  [Test]
  public async Task IncrementSavedByOthers_increments_when_not_owner()
  {
    using var context = BuildContext();
    var service = BuildService(context);
    var recipe = SeedRecipe(context, "owner-1", Visibility.Public, hasPublished: true, hasLatest: true, latestEqualsPublished: true);

    await service.IncrementSavedByOthersAsync(recipe, "user-2");

    var updated = await context.Recipe.AsNoTracking().FirstAsync(r => r.Id == recipe.Id);
    Assert.That(updated.SavedByOthersCount, Is.EqualTo(1));
  }

  [Test]
  public async Task IncrementSavedByOthers_does_not_increment_for_owner()
  {
    using var context = BuildContext();
    var service = BuildService(context);
    var recipe = SeedRecipe(context, "owner-1", Visibility.Public, hasPublished: true, hasLatest: true, latestEqualsPublished: true);

    await service.IncrementSavedByOthersAsync(recipe, "owner-1");

    var updated = await context.Recipe.AsNoTracking().FirstAsync(r => r.Id == recipe.Id);
    Assert.That(updated.SavedByOthersCount, Is.EqualTo(0));
  }
}

public sealed class RecipeCopyTestAppDbContext : AppDbContext
{
  public RecipeCopyTestAppDbContext(DbContextOptions<AppDbContext> options)
    : base(options)
  {
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    // Avoid EF tracking conflicts for owned nutrient types in these tests.
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
