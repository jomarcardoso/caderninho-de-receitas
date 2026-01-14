using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Response;
using Server.Shared;

namespace Server.Services;

public class RecipeCopyService
{
  private readonly AppDbContext _context;
  private readonly RecipeService _recipeService;

  public RecipeCopyService(AppDbContext context, RecipeService recipeService)
  {
    _context = context;
    _recipeService = recipeService;
  }

  public sealed class CopySourceResult
  {
    public Recipe? Source { get; init; }
    public RecipeRevision? BaseRevision { get; init; }
    public bool CanCopyLatest { get; init; }
    public bool IsOwner { get; init; }
    public ApiError? Error { get; init; }
    public bool NotFound { get; init; }
  }

  public async Task<CopySourceResult> ResolveCopySourceAsync(int id, string userId, string? shareToken, CancellationToken cancellationToken = default)
  {
    var recipe = await _context.Recipe
      .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
    if (recipe is null) return new CopySourceResult { NotFound = true };

    var isOwner = string.Equals(recipe.OwnerId, userId, StringComparison.Ordinal);
    var hasShareToken = !string.IsNullOrWhiteSpace(shareToken)
      && !string.IsNullOrWhiteSpace(recipe.ShareToken)
      && string.Equals(recipe.ShareToken, shareToken, StringComparison.Ordinal)
      && (!recipe.ShareTokenRevokedAt.HasValue || recipe.ShareTokenRevokedAt > DateTime.UtcNow);

    var canCopyLatest = isOwner || hasShareToken;
    if (!canCopyLatest && recipe.Visibility != Visibility.Public)
    {
      return new CopySourceResult
      {
        Error = new ApiError
        {
          Status = StatusCodes.Status404NotFound,
          Title = "Recipe not available",
          Detail = "Recipe is not public.",
          Code = "recipe.not_public"
        }
      };
    }

    if (canCopyLatest)
    {
      await LoadLatestRevisionAsync(recipe, cancellationToken);
    }
    else
    {
      await LoadPublishedRevisionAsync(recipe, cancellationToken);
    }

    var baseRevision = canCopyLatest ? recipe.LatestRevision : recipe.PublishedRevision;
    if (baseRevision is null)
    {
      return new CopySourceResult
      {
        Error = new ApiError
        {
          Status = StatusCodes.Status404NotFound,
          Title = "Recipe not available",
          Detail = canCopyLatest ? "Latest revision not found." : "Published revision not found.",
          Code = canCopyLatest ? "recipe.no_latest_revision" : "recipe.no_published_revision"
        }
      };
    }

    return new CopySourceResult
    {
      Source = recipe,
      BaseRevision = baseRevision,
      CanCopyLatest = canCopyLatest,
      IsOwner = isOwner
    };
  }

  public async Task<Recipe> CreateCloneAsync(Recipe source, string userId, CancellationToken cancellationToken = default)
  {
    var clone = _recipeService.CloneRecipeForUser(source, userId);
    _context.Recipe.Add(clone);
    await _context.SaveChangesAsync(cancellationToken);

    var latest = clone.Revisions.FirstOrDefault();
    if (latest is not null)
    {
      clone.LatestRevisionId = latest.Id;
      clone.LatestRevision = latest;
      _context.Recipe.Update(clone);
      await _context.SaveChangesAsync(cancellationToken);
    }

    return clone;
  }

  public async Task IncrementSavedByOthersAsync(Recipe source, string copierId, CancellationToken cancellationToken = default)
  {
    if (string.Equals(source.OwnerId, copierId, StringComparison.Ordinal)) return;
    source.SavedByOthersCount += 1;
    await _context.SaveChangesAsync(cancellationToken);
  }

  private Task LoadLatestRevisionAsync(Recipe recipe, CancellationToken cancellationToken)
  {
    return _context.Entry(recipe)
      .Reference(r => r.LatestRevision)
      .Query()
      .Include(rv => rv.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .LoadAsync(cancellationToken);
  }

  private Task LoadPublishedRevisionAsync(Recipe recipe, CancellationToken cancellationToken)
  {
    return _context.Entry(recipe)
      .Reference(r => r.PublishedRevision)
      .Query()
      .Include(rv => rv.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .LoadAsync(cancellationToken);
  }
}
