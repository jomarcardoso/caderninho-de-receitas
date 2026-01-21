using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Models;

namespace Server.Services;

public class WorkspaceService
{
  private readonly AppDbContext _context;
  private readonly RecipeService _recipeService;
  private readonly IMapper _mapper;

  public WorkspaceService(AppDbContext context, RecipeService recipeService, IMapper mapper)
  {
    _context = context;
    _recipeService = recipeService;
    _mapper = mapper;
  }

  private RecipeListSummaryResponse MapListSummary(RecipeList entity, string callerUserId)
  {
    var list = new RecipeListSummaryResponse
    {
      Id = entity.Id,
      Name = entity.Name,
      Description = entity.Description,
      Visibility = entity.Visibility,
      Items = new()
    };

    if (entity.Items?.Any() == true)
    {
      list.Items = entity.Items
        .OrderBy(i => i.Position)
        .Where(i => i.Recipe is not null)
        .Select(i =>
        {
          var item = _mapper.Map<RecipeItemSummaryResponse>(
            _recipeService.BuildRecipeSummaryResponse(
              i.Recipe!,
              RecipeService.RevisionView.LatestPreferred,
              callerUserId));
          item.Position = i.Position;
          return item;
        })
        .ToList();
    }

    return list;
  }

  private static RecipeIndexResponse MapIndex(Recipe recipe)
  {
    var name = recipe.LatestRevision?.Name ?? recipe.PublishedRevision?.Name ?? string.Empty;
    return new RecipeIndexResponse { Id = recipe.Id, Name = name };
  }

  private static RecipeListIndexResponse MapListIndex(RecipeList entity)
  {
    var list = new RecipeListIndexResponse
    {
      Id = entity.Id,
      Name = entity.Name,
      Items = new()
    };

    if (entity.Items?.Any() == true)
    {
      list.Items = entity.Items
        .OrderBy(i => i.Position)
        .Where(i => i.Recipe is not null)
        .Select(i => MapIndex(i.Recipe!))
        .ToList();
    }

    return list;
  }

  public async Task<WorkspaceResponse?> BuildWorkspaceResponseAsync(string userId)
  {
    var profile = await _context.UserProfile
      .Include(p => p.Revisions)
      .FirstOrDefaultAsync(p => p.Id == userId);
    if (profile is null) return null;

    var profileResponse = UserProfileResponseBuilder.Build(
      profile,
      new UserProfileViewContext(IsOwner: true, IsAdmin: false, HasShareToken: false));

    var lists = await _context.RecipeList
      .AsNoTracking()
      .Include(l => l.Items)
      .Where(l => l.OwnerId == userId)
      .OrderBy(l => l.Name)
      .ToListAsync();

    var recipeIdsInLists = lists
      .SelectMany(l => l.Items ?? new List<RecipeItem>())
      .Select(i => i.RecipeId)
      .Distinct()
      .ToHashSet();

    if (recipeIdsInLists.Count > 0)
    {
      var listRecipes = await _recipeService.GetRecipesForSummaryByIdsAsync(recipeIdsInLists);
      var listRecipesById = listRecipes.ToDictionary(r => r.Id);

      foreach (var list in lists)
      {
        foreach (var item in list.Items ?? new List<RecipeItem>())
        {
          if (listRecipesById.TryGetValue(item.RecipeId, out var recipe))
          {
            item.Recipe = recipe;
          }
        }
      }
    }

    var otherRecipes = await _recipeService.GetRecipesForSummaryByOwnerAsync(userId, recipeIdsInLists);

    return new WorkspaceResponse
    {
      UserProfile = profileResponse,
      RecipeLists = lists.Select(l => MapListSummary(l, userId)).ToList(),
      Recipes = otherRecipes
        .Select(r =>
        {
          var item = _mapper.Map<RecipeItemSummaryResponse>(
            _recipeService.BuildRecipeSummaryResponse(
              r,
              RecipeService.RevisionView.LatestPreferred,
              userId));
          item.Position = 0;
          return item;
        })
        .ToList()
    };
  }

  public async Task<WorkspaceIndexResponse?> BuildWorkspaceIndexResponseAsync(string userId)
  {
    var profile = await _context.UserProfile
      .Include(p => p.Revisions)
      .FirstOrDefaultAsync(p => p.Id == userId);
    if (profile is null) return null;

    var profileResponse = UserProfileResponseBuilder.Build(
      profile,
      new UserProfileViewContext(IsOwner: true, IsAdmin: false, HasShareToken: false));

    var lists = await _context.RecipeList
      .AsNoTracking()
      .Include(l => l.Items)
      .Where(l => l.OwnerId == userId)
      .OrderBy(l => l.Name)
      .ToListAsync();

    var recipeIdsInLists = lists
      .SelectMany(l => l.Items ?? new List<RecipeItem>())
      .Select(i => i.RecipeId)
      .Distinct()
      .ToHashSet();

    if (recipeIdsInLists.Count > 0)
    {
      var listRecipes = await _recipeService.GetRecipesForSummaryByIdsAsync(recipeIdsInLists);
      var listRecipesById = listRecipes.ToDictionary(r => r.Id);

      foreach (var list in lists)
      {
        foreach (var item in list.Items ?? new List<RecipeItem>())
        {
          if (listRecipesById.TryGetValue(item.RecipeId, out var recipe))
          {
            item.Recipe = recipe;
          }
        }
      }
    }

    var otherRecipes = await _recipeService.GetRecipesForSummaryByOwnerAsync(userId, recipeIdsInLists);

    return new WorkspaceIndexResponse
    {
      UserProfile = profileResponse,
      RecipeLists = lists.Select(MapListIndex).ToList(),
      Recipes = otherRecipes.Select(MapIndex).ToList()
    };
  }
}
