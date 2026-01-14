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
        .Select(i => _mapper.Map<RecipeItemSummaryResponse>(
          _recipeService.BuildRecipeSummaryResponse(
            i.Recipe!,
            RecipeService.RevisionView.LatestPreferred,
            callerUserId)))
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
      .ThenInclude(i => i.Recipe)
      .ThenInclude(r => r.Owner)
      .Include(l => l.Items)
      .ThenInclude(i => i.Recipe)
      .ThenInclude(r => r.LatestRevision)
      .Include(l => l.Items)
      .ThenInclude(i => i.Recipe)
      .ThenInclude(r => r.PublishedRevision)
      .Where(l => l.OwnerId == userId)
      .OrderBy(l => l.Name)
      .ToListAsync();

    var recipeIdsInLists = lists
      .SelectMany(l => l.Items ?? new List<RecipeListItem>())
      .Select(i => i.RecipeId)
      .Distinct()
      .ToHashSet();

    var otherRecipes = await _context.Recipe
      .AsNoTracking()
      .Include(r => r.Owner)
      .Include(r => r.LatestRevision)
      .Include(r => r.PublishedRevision)
      .Where(r => r.OwnerId == userId && !recipeIdsInLists.Contains(r.Id))
      .ToListAsync();

    return new WorkspaceResponse
    {
      UserProfile = profileResponse,
      RecipeLists = lists.Select(l => MapListSummary(l, userId)).ToList(),
      Recipes = otherRecipes
        .Select(r => _mapper.Map<RecipeItemSummaryResponse>(
          _recipeService.BuildRecipeSummaryResponse(
            r,
            RecipeService.RevisionView.LatestPreferred,
            userId)))
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
      .ThenInclude(i => i.Recipe)
      .ThenInclude(r => r.LatestRevision)
      .Include(l => l.Items)
      .ThenInclude(i => i.Recipe)
      .ThenInclude(r => r.PublishedRevision)
      .Where(l => l.OwnerId == userId)
      .OrderBy(l => l.Name)
      .ToListAsync();

    var recipeIdsInLists = lists
      .SelectMany(l => l.Items ?? new List<RecipeListItem>())
      .Select(i => i.RecipeId)
      .Distinct()
      .ToHashSet();

    var otherRecipes = await _context.Recipe
      .AsNoTracking()
      .Include(r => r.LatestRevision)
      .Include(r => r.PublishedRevision)
      .Where(r => r.OwnerId == userId && !recipeIdsInLists.Contains(r.Id))
      .ToListAsync();

    return new WorkspaceIndexResponse
    {
      UserProfile = profileResponse,
      RecipeLists = lists.Select(MapListIndex).ToList(),
      Recipes = otherRecipes.Select(MapIndex).ToList()
    };
  }
}
