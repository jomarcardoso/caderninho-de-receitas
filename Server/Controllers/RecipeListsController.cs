using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

using Server.Dtos;
using Server.Models;
using Server.Response;
using Server.Services;
using Server.Shared;

namespace Server.Controllers;

[ApiController]
[Route("api/recipelist")]
[Authorize]
public class RecipeListsController : ControllerBase
{
  private readonly AppDbContext _context;
  private readonly RecipeService _recipeService;
  public RecipeListsController(AppDbContext context, RecipeService recipeService)
  {
    _context = context;
    _recipeService = recipeService;
  }

  private string GetUserId()
  {
    var id = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
    return string.IsNullOrWhiteSpace(id) ? string.Empty : id!.Trim();
  }

  private RecipeSummaryResponse MapRecipeSummary(Recipe recipe, string callerUserId)
  {
    return _recipeService.BuildRecipeSummaryResponse(
      recipe,
      RecipeService.RevisionView.LatestPreferred,
      callerUserId
    );
  }

  private static RecipeItemSummaryResponse ToItemSummary(RecipeSummaryResponse summary)
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

  private RecipeListSummaryResponse MapSummary(RecipeList entity, UserProfile? owner, string callerUserId, bool includeItems = false)
  {
    var summary = new RecipeListSummaryResponse
    {
      Id = entity.Id,
      Name = entity.Name,
      Description = entity.Description,
      Visibility = entity.Visibility,
      Items = new()
    };

    if (includeItems && entity.Items?.Any() == true)
    {
      summary.Items = entity.Items
        .OrderBy(i => i.Position)
        .Where(i => i.Recipe is not null)
        .Select(i => ToItemSummary(MapRecipeSummary(i.Recipe!, callerUserId)))
        .ToList();
    }

    return summary;
  }

  private RecipeListResponse MapResponse(RecipeList entity, UserProfile? owner, string callerUserId, bool includeItems = false)
  {
    var response = new RecipeListResponse
    {
      Id = entity.Id,
      Name = entity.Name,
      Description = entity.Description,
      Visibility = entity.Visibility,
      CreatedAt = entity.CreatedAt,
      UpdatedAt = entity.UpdatedAt,
      Owner = owner is null
        ? new UserProfileSummaryResponse { Id = entity.OwnerId, DisplayName = entity.OwnerId }
        : UserProfileResponseBuilder.BuildSummary(owner, isAdmin: false, callerUserId),
      Items = new()
    };

    if (includeItems && entity.Items?.Any() == true)
    {
      response.Items = entity.Items
        .OrderBy(i => i.Position)
        .Where(i => i.Recipe is not null)
        .Select(i => ToItemSummary(MapRecipeSummary(i.Recipe!, callerUserId)))
        .ToList();
    }

    return response;
  }

  private static RecipeIndexResponse MapRecipeIndex(Recipe recipe)
  {
    var name = recipe.LatestRevision?.Name ?? recipe.PublishedRevision?.Name ?? string.Empty;
    return new RecipeIndexResponse { Id = recipe.Id, Name = name };
  }

  private static RecipeListIndexResponse MapIndexSummary(RecipeList entity)
  {
    var summary = new RecipeListIndexResponse
    {
      Id = entity.Id,
      Name = entity.Name,
      Items = new()
    };

    if (entity.Items?.Any() == true)
    {
      summary.Items = entity.Items
        .OrderBy(i => i.Position)
        .Where(i => i.Recipe is not null)
        .Select(i => MapRecipeIndex(i.Recipe!))
        .ToList();
    }

    return summary;
  }

  [HttpGet]
  public async Task<IActionResult> GetMyLists()
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();
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

    // owner profile is the caller
    var ownerProfile = await _context.UserProfile
      .Include(p => p.Revisions)
      .FirstOrDefaultAsync(p => p.Id == userId);

    return Ok(lists.Select(l => MapSummary(l, ownerProfile, userId, includeItems: true)));
  }

  [HttpGet("index")]
  public async Task<IActionResult> GetMyListsAsIndex()
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();

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

    return Ok(lists.Select(MapIndexSummary));
  }

  [HttpPost]
  public async Task<IActionResult> Create([FromBody] RecipeListDto dto)
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();
    if (string.IsNullOrWhiteSpace(dto?.Name))
      return BadRequest(new ApiError { Title = "Validation failed", Status = 400, Detail = "Name is required" });
    var entity = new RecipeList
    {
      OwnerId = userId,
      Name = dto.Name.Trim(),
      Description = dto.Description?.Trim(),
      Visibility = dto.Visibility ?? Shared.Visibility.Private,
      CreatedAt = DateTime.UtcNow,
      UpdatedAt = DateTime.UtcNow,
    };
    _context.RecipeList.Add(entity);
    await _context.SaveChangesAsync();

    // refetch owner (single)
    var ownerProfile = await _context.UserProfile
      .Include(p => p.Revisions)
      .FirstOrDefaultAsync(p => p.Id == userId);

    return Ok(MapResponse(entity, ownerProfile, userId));
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, [FromBody] RecipeListDto dto)
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();
    var list = await _context.RecipeList.FirstOrDefaultAsync(l => l.Id == id && l.OwnerId == userId);
    if (list is null) return NotFound();
    if (!string.IsNullOrWhiteSpace(dto?.Name)) list.Name = dto.Name.Trim();
    list.Description = dto?.Description?.Trim();
    if (dto?.Visibility is not null) list.Visibility = dto.Visibility.Value;
    list.UpdatedAt = DateTime.UtcNow;
    await _context.SaveChangesAsync();

    var ownerProfile = await _context.UserProfile
      .Include(p => p.Revisions)
      .FirstOrDefaultAsync(p => p.Id == userId);

    return Ok(MapResponse(list, ownerProfile, userId));
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();
    var list = await _context.RecipeList.FirstOrDefaultAsync(l => l.Id == id && l.OwnerId == userId);
    if (list is null) return NotFound();
    _context.RecipeList.Remove(list);
    await _context.SaveChangesAsync();
    return Ok(new { deleted = true });
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();
    var list = await _context.RecipeList
      .Include(l => l.Items)
      .ThenInclude(i => i.Recipe!)
      .ThenInclude(r => r.Owner)
      .Include(l => l.Items)
      .ThenInclude(i => i.Recipe!)
      .ThenInclude(r => r.LatestRevision)
      .Include(l => l.Items)
      .ThenInclude(i => i.Recipe!)
      .ThenInclude(r => r.PublishedRevision)
      .FirstOrDefaultAsync(l => l.Id == id && l.OwnerId == userId);
    if (list is null) return NotFound();

    var ownerProfile = await _context.UserProfile
      .Include(p => p.Revisions)
      .FirstOrDefaultAsync(p => p.Id == userId);

    return Ok(MapResponse(list, ownerProfile, userId, includeItems: true));
  }

  [HttpPost("{id}/recipes/{recipeId}")]
  public async Task<IActionResult> AddRecipe(int id, int recipeId)
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();
    var list = await _context.RecipeList.FirstOrDefaultAsync(l => l.Id == id && l.OwnerId == userId);
    if (list is null) return NotFound();
    var recipe = await _context.Recipe.FirstOrDefaultAsync(r => r.Id == recipeId && r.OwnerId == userId);
    if (recipe is null) return NotFound();
    var exists = await _context.RecipeListItem.AnyAsync(i => i.RecipeListId == id && i.RecipeId == recipeId);
    if (exists) return Ok(new { added = false });
    var pos = await _context.RecipeListItem.Where(i => i.RecipeListId == id).MaxAsync(i => (int?)i.Position) ?? 0;
    _context.RecipeListItem.Add(new Server.Models.RecipeListItem { RecipeListId = id, RecipeId = recipeId, Position = pos + 1 });
    await _context.SaveChangesAsync();
    return Ok(new { added = true });
  }

  [HttpDelete("{id}/recipes/{recipeId}")]
  public async Task<IActionResult> RemoveRecipe(int id, int recipeId)
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();
    var list = await _context.RecipeList.FirstOrDefaultAsync(l => l.Id == id && l.OwnerId == userId);
    if (list is null) return NotFound();
    var item = await _context.RecipeListItem.FirstOrDefaultAsync(i => i.RecipeListId == id && i.RecipeId == recipeId);
    if (item is null) return NotFound();
    _context.RecipeListItem.Remove(item);
    await _context.SaveChangesAsync();
    return Ok(new { removed = true });
  }
}
