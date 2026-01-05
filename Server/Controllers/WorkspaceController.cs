using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using Server.Dtos;
using Server.Services;
using Server.Dtos;
using Server.Models;

namespace Server.Controllers;

[ApiController]
[Route("api/workspace")]
[Authorize]
public class WorkspaceController : ControllerBase
{
  private readonly AppDbContext _context;
  private readonly RecipeService _recipeService;

  public WorkspaceController(AppDbContext context, RecipeService recipeService)
  {
    _context = context;
    _recipeService = recipeService;
  }

  private string GetUserId()
  {
    var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    return string.IsNullOrWhiteSpace(id) ? string.Empty : id.Trim();
  }

  private RecipeItemSummaryResponse ToItemSummary(RecipeSummaryResponse summary)
  {
    return new RecipeItemSummaryResponse
    {
      Id = summary.Id,
      Name = summary.Name,
      Imgs = summary.Imgs,
      SavedByOthersCount = summary.SavedByOthersCount,
      NutritionalInformation = summary.NutritionalInformation,
      IsOwner = summary.IsOwner
    };
  }

  private RecipeListSummaryResponse MapListSummary(RecipeList entity, string callerUserId)
  {
    var list = new RecipeListSummaryResponse
    {
      Id = entity.Id,
      Name = entity.Name,
      Description = entity.Description,
      IsPublic = entity.IsPublic,
      Items = new()
    };

    if (entity.Items?.Any() == true)
    {
      list.Items = entity.Items
        .OrderBy(i => i.Position)
        .Where(i => i.Recipe is not null)
        .Select(i => ToItemSummary(_recipeService.BuildRecipeSummaryResponse(
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

  private RecipeListIndexResponse MapListIndex(RecipeList entity)
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

  [HttpGet]
  public async Task<IActionResult> GetWorkspace()
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();

    var profile = await _context.UserProfile
      .Include(p => p.Revisions)
      .FirstOrDefaultAsync(p => p.Id == userId);
    if (profile is null) return NotFound();

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

    var response = new WorkspaceResponse
    {
      UserProfile = profileResponse,
      RecipeLists = lists.Select(l => MapListSummary(l, userId)).ToList(),
      Recipes = otherRecipes
        .Select(r => ToItemSummary(_recipeService.BuildRecipeSummaryResponse(
          r,
          RecipeService.RevisionView.LatestPreferred,
          userId)))
        .ToList()
    };

    return Ok(response);
  }

  [HttpGet("index")]
  public async Task<IActionResult> GetWorkspaceIndex()
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();

    var profile = await _context.UserProfile
      .Include(p => p.Revisions)
      .FirstOrDefaultAsync(p => p.Id == userId);
    if (profile is null) return NotFound();

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

    var response = new WorkspaceIndexResponse
    {
      UserProfile = profileResponse,
      RecipeLists = lists.Select(MapListIndex).ToList(),
      Recipes = otherRecipes.Select(MapIndex).ToList()
    };

    return Ok(response);
  }
}
