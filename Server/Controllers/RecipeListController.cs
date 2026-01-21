using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
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
public class RecipeListController : ControllerBase
{
  private readonly AppDbContext _context;
  private readonly RecipeService _recipeService;
  private readonly IMapper _mapper;
  public RecipeListController(AppDbContext context, RecipeService recipeService, IMapper mapper)
  {
    _context = context;
    _recipeService = recipeService;
    _mapper = mapper;
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
        .Select(i =>
        {
          var item = _mapper.Map<RecipeItemSummaryResponse>(MapRecipeSummary(i.Recipe!, callerUserId));
          item.Position = i.Position;
          return item;
        })
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
        .Select(i =>
        {
          var item = _mapper.Map<RecipeItemSummaryResponse>(MapRecipeSummary(i.Recipe!, callerUserId));
          item.Position = i.Position;
          return item;
        })
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

  private async Task AttachRecipesAsync(IEnumerable<RecipeList> lists, bool includeSteps = false)
  {
    var listArray = lists.ToList();
    foreach (var list in listArray)
    {
      var itemsEntry = _context.Entry(list).Collection(l => l.Items);
      if (!itemsEntry.IsLoaded)
      {
        await itemsEntry.LoadAsync();
      }
    }

    var listItems = listArray
      .SelectMany(l => l.Items ?? Enumerable.Empty<RecipeItem>())
      .ToList();

    var recipeIds = listItems
      .Select(i => i.RecipeId)
      .Distinct()
      .ToList();

    if (recipeIds.Count == 0) return;

    var recipes = await _recipeService.GetRecipesForSummaryByIdsAsync(recipeIds, includeSteps);
    var recipeMap = recipes.ToDictionary(r => r.Id);

    foreach (var list in listArray)
    {
      foreach (var item in list.Items ?? Enumerable.Empty<RecipeItem>())
      {
        if (recipeMap.TryGetValue(item.RecipeId, out var recipe))
        {
          item.Recipe = recipe;
        }
      }
    }
  }

  [HttpGet]
  public async Task<IActionResult> GetMyLists()
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();
    var summaries = await LoadMyListSummaries(userId);
    return Ok(summaries);
  }

  [HttpGet("index")]
  public async Task<IActionResult> GetMyListsAsIndex()
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();

    var lists = await _context.RecipeList
      .Include(l => l.Items)
      .Where(l => l.OwnerId == userId)
      .OrderBy(l => l.Name)
      .ToListAsync();

    await AttachRecipesAsync(lists);
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
      Visibility = dto.Visibility,
      CreatedAt = DateTime.UtcNow,
      UpdatedAt = DateTime.UtcNow,
    };
    _context.RecipeList.Add(entity);
    await _context.SaveChangesAsync();
    var summaries = await LoadMyListSummaries(userId);
    return Ok(summaries);
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
    list.Visibility = dto.Visibility;
    list.UpdatedAt = DateTime.UtcNow;
    await _context.SaveChangesAsync();
    var summaries = await LoadMyListSummaries(userId);
    return Ok(summaries);
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
    return NoContent();
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();
    var list = await _context.RecipeList
      .Include(l => l.Items)
      .FirstOrDefaultAsync(l => l.Id == id && l.OwnerId == userId);
    if (list is null) return NotFound();

    await AttachRecipesAsync(new[] { list });
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
    var exists = await _context.RecipeItem.AnyAsync(i => i.RecipeListId == id && i.RecipeId == recipeId);
    if (exists) return Ok(false);
    var pos = await _context.RecipeItem.Where(i => i.RecipeListId == id).MaxAsync(i => (int?)i.Position) ?? 0;
    _context.RecipeItem.Add(new Server.Models.RecipeItem { RecipeListId = id, RecipeId = recipeId, Position = pos + 1 });
    await _context.SaveChangesAsync();
    return StatusCode(StatusCodes.Status201Created, true);
  }

  [HttpDelete("{id}/recipes/{recipeId}")]
  public async Task<IActionResult> RemoveRecipe(int id, int recipeId)
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();
    var list = await _context.RecipeList.FirstOrDefaultAsync(l => l.Id == id && l.OwnerId == userId);
    if (list is null) return NotFound();
    var item = await _context.RecipeItem.FirstOrDefaultAsync(i => i.RecipeListId == id && i.RecipeId == recipeId);
    if (item is null) return NotFound();
    _context.RecipeItem.Remove(item);
    await _context.SaveChangesAsync();
    return NoContent();
  }

  private async Task<List<RecipeListSummaryResponse>> LoadMyListSummaries(string userId)
  {
    var lists = await _context.RecipeList
      .Include(l => l.Items)
      .Where(l => l.OwnerId == userId)
      .OrderBy(l => l.Name)
      .ToListAsync();

    await AttachRecipesAsync(lists);
    var ownerProfile = await _context.UserProfile
      .Include(p => p.Revisions)
      .FirstOrDefaultAsync(p => p.Id == userId);

    return lists.Select(l => MapSummary(l, ownerProfile, userId, includeItems: true)).ToList();
  }
}
