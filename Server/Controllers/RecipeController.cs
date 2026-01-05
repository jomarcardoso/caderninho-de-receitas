using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Server.Models;
using Server.Services;
using Server.PreProcessing;
using Server.Serialization;
using Server.Shared;
using System.Security.Claims;
using Server.Dtos;
using Server.Response;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RecipeController : ControllerBase
{
  private readonly AppDbContext _context;
  private readonly IMapper _mapper;
  private readonly RecipeService recipeService;
  private readonly RelationService relationService;
  private readonly PlainTextRecipeParser plainTextRecipeParser;
  private readonly PlainTextRecipePreProcessor plainTextRecipePreProcessor;
  private readonly RecipeImageOcrService recipeImageOcrService;

  public RecipeController(
    AppDbContext context,
    RecipeService recipeService,
    RelationService relationService,
    PlainTextRecipeParser plainTextRecipeParser,
    PlainTextRecipePreProcessor plainTextRecipePreProcessor,
    RecipeImageOcrService recipeImageOcrService,
    IMapper mapper)
  {
    _context = context;
    this.recipeService = recipeService ?? throw new ArgumentNullException(nameof(recipeService));
    this.relationService = relationService ?? throw new ArgumentNullException(nameof(relationService));
    this.plainTextRecipeParser = plainTextRecipeParser ?? throw new ArgumentNullException(nameof(plainTextRecipeParser));
    this.plainTextRecipePreProcessor = plainTextRecipePreProcessor ?? throw new ArgumentNullException(nameof(plainTextRecipePreProcessor));
    this.recipeImageOcrService = recipeImageOcrService ?? throw new ArgumentNullException(nameof(recipeImageOcrService));
    _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
  }

  private string GetUserId()
  {
    var authId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    return string.IsNullOrWhiteSpace(authId) ? string.Empty : authId.Trim();
  }

  [HttpPost]
  public async Task<IActionResult> CreateRecipe([FromBody] RecipeDto recipeDto)
  {
    if (recipeDto is null) return BadRequest("Recipe payload must be provided.");
    var ownerId = GetUserId();
    if (string.IsNullOrWhiteSpace(ownerId)) return Unauthorized();
    return await CreateRecipeInternalAsync(recipeDto, ownerId, null);
  }

  [HttpPost("many")]
  public async Task<IActionResult> CreateRecipes([FromBody] List<RecipeDto> recipesDto)
  {
    if (recipesDto is null || recipesDto.Count == 0) return BadRequest("At least one recipe must be provided.");
    var ownerId = GetUserId();
    if (string.IsNullOrWhiteSpace(ownerId)) return Unauthorized();

    var recipesToAdd = new List<Recipe>();
    foreach (var dto in recipesDto)
    {
      var recipe = await recipeService.DtoToEntity(dto);
      recipe.OwnerId = ownerId;
      recipe.Visibility = Visibility.Private;
      recipe.PublishedRevisionId = null;
      recipesToAdd.Add(recipe);
    }

    _context.Recipe.AddRange(recipesToAdd);
    await _context.SaveChangesAsync();

    foreach (var recipe in recipesToAdd)
    {
      var latest = recipe.Revisions.FirstOrDefault();
      if (latest is not null)
      {
        recipe.LatestRevisionId = latest.Id;
        recipe.LatestRevision = latest;
      }
    }
    await _context.SaveChangesAsync();

    var responses = recipesToAdd
      .Select(r => recipeService.BuildRecipeResponse(r, RecipeService.RevisionView.LatestPreferred, ownerId))
      .ToList();
    return Ok(responses);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateRecipe(int id, [FromBody] RecipeDto recipeDto)
  {
    if (recipeDto is null) return BadRequest("Recipe payload must be provided.");
    var ownerId = GetUserId();
    if (string.IsNullOrWhiteSpace(ownerId)) return Unauthorized();

    var recipe = await _context.Recipe
      .Include(r => r.Revisions)
      .Include(r => r.LatestRevision)
        .ThenInclude(rv => rv.Steps)
        .ThenInclude(s => s.Ingredients)
        .ThenInclude(i => i.Food)
      .Include(r => r.PublishedRevision)
        .ThenInclude(rv => rv.Steps)
        .ThenInclude(s => s.Ingredients)
        .ThenInclude(i => i.Food)
      .FirstOrDefaultAsync(r => r.Id == id);

    if (recipe is null) return NotFound();
    if (!string.Equals(recipe.OwnerId, ownerId, StringComparison.Ordinal)) return Forbid();

    await recipeService.UpdateEntityFromDto(recipe, recipeDto);
    recipe.OwnerId = ownerId;
    recipe.Visibility = Visibility.Private;
    recipe.PublishedRevisionId = null;
    if (recipe.LatestRevision is not null && recipe.LatestRevision.Status == RevisionStatus.Approved)
      recipe.LatestRevision.Status = RevisionStatus.Draft;

    try
    {
      await _context.SaveChangesAsync();
    }
    catch (DbUpdateException ex)
    {
      return StatusCode(500, new
      {
        error = "db_update_failed_initial",
        message = ex.Message,
        inner = ex.InnerException?.Message ?? string.Empty,
        stack = ex.InnerException?.StackTrace ?? string.Empty
      });
    }

    // Após persistir a revisão, setar o FK LatestRevisionId com o id salvo
    var latest = recipe.Revisions.FirstOrDefault();
    if (latest is not null)
    {
      recipe.LatestRevisionId = latest.Id;
      recipe.LatestRevision = latest;
      _context.Recipe.Update(recipe);
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateException ex)
      {
        return StatusCode(500, new
        {
          error = "db_update_failed_set_latest",
          message = ex.Message,
          inner = ex.InnerException?.Message ?? string.Empty,
          stack = ex.InnerException?.StackTrace ?? string.Empty
        });
      }
    }

    var response = recipeService.BuildRecipeResponse(recipe, RecipeService.RevisionView.LatestPreferred, ownerId);
    return Ok(response);
  }

  [HttpGet("pending")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> GetPendingRecipes()
  {
    var pending = await _context.Recipe
      .AsNoTracking()
      .Include(r => r.LatestRevision)
      .Where(r => r.LatestRevision != null && r.LatestRevision.Status == RevisionStatus.PendingReview)
      .OrderByDescending(r => r.CreatedAtUtc)
      .Select(r => recipeService.BuildRecipeResponse(r, RecipeService.RevisionView.LatestPreferred, GetUserId()))
      .ToListAsync();
    return Ok(pending);
  }

  [HttpPost("{id}/approve")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> ApproveRecipe(int id)
  {
    var recipe = await _context.Recipe
      .Include(r => r.LatestRevision)
      .FirstOrDefaultAsync(r => r.Id == id);
    if (recipe is null) return NotFound();
    if (recipe.LatestRevision is null) return BadRequest(new { error = "No revision to approve." });

    recipe.LatestRevision.Status = RevisionStatus.Approved;
    recipe.PublishedRevisionId = recipe.LatestRevision.Id;
    recipe.Visibility = Visibility.Public;
    recipe.UpdatedAtUtc = DateTime.UtcNow;
    await _context.SaveChangesAsync();
    return Ok(new { id = recipe.Id, visibility = recipe.Visibility, publishedRevisionId = recipe.PublishedRevisionId });
  }

  [HttpPost("{id}/deny")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> DenyRecipe(int id)
  {
    var recipe = await _context.Recipe
      .Include(r => r.LatestRevision)
      .FirstOrDefaultAsync(r => r.Id == id);
    if (recipe is null) return NotFound();
    if (recipe.LatestRevision is null) return BadRequest(new { error = "No revision to deny." });

    recipe.LatestRevision.Status = RevisionStatus.Rejected;
    recipe.Visibility = Visibility.Private;
    recipe.UpdatedAtUtc = DateTime.UtcNow;
    await _context.SaveChangesAsync();
    return Ok(new { id = recipe.Id, status = recipe.LatestRevision.Status });
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteRecipe(int id)
  {
    var claimedUserId = GetUserId();

    var recipe = await _context.Recipe
      .Include(r => r.Revisions)
      .Include(r => r.LatestRevision)
      .ThenInclude(rv => rv.Steps)
      .ThenInclude(s => s.Ingredients)
      .FirstOrDefaultAsync(r => r.Id == id);

    if (recipe is null) return NotFound();
    if (!string.Equals(recipe.OwnerId, claimedUserId, StringComparison.Ordinal)) return NotFound();

    _context.Recipe.Remove(recipe);
    await _context.SaveChangesAsync();

    return Ok();
  }

  [HttpGet]
  public async Task<IActionResult> GetMyRecipes()
  {
    var ownerId = GetUserId();
    if (string.IsNullOrWhiteSpace(ownerId)) return Unauthorized();

    var response = await recipeService.GetRecipeSummariesByUserId(ownerId);
    return Ok(response);
  }

  [HttpGet("search")]
  [AllowAnonymous]
  public async Task<IActionResult> Search(
    [FromQuery] string? text = null,
    [FromQuery] string? categories = null,
    [FromQuery] int quantity = 20)
  {
    var userId = GetUserId();
    var categoryKeys = Request.Query.ContainsKey("categories") && Request.Query["categories"].Count > 1
      ? Request.Query["categories"].ToList()
      : (categories ?? string.Empty)
          .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
          .Where(s => !string.IsNullOrWhiteSpace(s))
          .ToList();

    var recipes = await recipeService.SearchRecipesAsync(text, categoryKeys, quantity, string.IsNullOrWhiteSpace(userId) ? null : userId);
    var recipeResponses = recipes
      .Select(r => recipeService.BuildRecipeResponse(r, RecipeService.RevisionView.PublishedPreferred, userId))
      .ToList();

    return Ok(recipeResponses);
  }

  [HttpGet("categories")]
  [AllowAnonymous]
  public async Task<IActionResult> GetCategories()
  {
    var map = await recipeService.BuildCategoryMapAsync();
    return Ok(map.Values.ToList());
  }

  [HttpGet("{id}")]
  [AllowAnonymous]
  public async Task<IActionResult> GetPublicRecipe(
    int id,
    [FromQuery] int count = 5,
    [FromQuery] string? excludeIds = null,
    [FromQuery] bool excludeSameOwner = true)
  {
    var recipe = await _context.Recipe
      .Include(r => r.Owner)
      .Include(r => r.Revisions)
      .Include(r => r.PublishedRevision)
        .ThenInclude(rv => rv.Steps)
        .ThenInclude(s => s.Ingredients)
        .ThenInclude(i => i.Food)
      .Include(r => r.LatestRevision)
        .ThenInclude(rv => rv.Steps)
        .ThenInclude(s => s.Ingredients)
        .ThenInclude(i => i.Food)
      .FirstOrDefaultAsync(r => r.Id == id);

    if (recipe is null) return NotFound();
    var userId = GetUserId();
    var revision = recipe.PublishedRevision ?? recipe.LatestRevision;
    if (revision is null) return NotFound();
    if (recipe.Visibility != Visibility.Public && !string.Equals(recipe.OwnerId, userId, StringComparison.Ordinal)) return NotFound();

    count = Math.Clamp(count, 1, 5);
    var excluded = new HashSet<int>((excludeIds ?? string.Empty)
      .Split(',', StringSplitOptions.RemoveEmptyEntries)
      .Select(s => int.TryParse(s.Trim(), out var v) ? v : 0)
      .Where(v => v > 0));

    var baseRelations = await _context.RecipeRelation
      .AsNoTracking()
      .Where(r => r.RecipeId == id)
      .OrderByDescending(r => r.Weight)
      .Take(50)
      .ToListAsync();

    var rand = new Random();
    var candidateIds = baseRelations
      .Where(r => !excluded.Contains(r.RelatedRecipeId) && r.RelatedRecipeId != id)
      .Select(r => new { r.RelatedRecipeId, Score = r.Weight + rand.NextDouble() * 0.05 })
      .OrderByDescending(x => x.Score)
      .Take(20)
      .ToList();

    var candidates = await _context.Recipe
      .AsNoTracking()
      .Include(r => r.PublishedRevision)
      .Where(r => candidateIds.Select(x => x.RelatedRecipeId).Contains(r.Id))
      .Select(r => new
      {
        r.Id,
        Name = r.PublishedRevision!.Name,
        r.Imgs,
        r.OwnerId,
        r.Visibility
      })
      .ToListAsync();

    var candidateMap = candidateIds.ToDictionary(x => x.RelatedRecipeId, x => x.Score);
    var filtered = candidates
      .Where(r => r.Visibility == Visibility.Public)
      .Where(r => !excludeSameOwner || r.OwnerId != recipe.OwnerId)
      .OrderByDescending(r => candidateMap.GetValueOrDefault(r.Id, 0))
      .Take(count)
      .Select(r => new { r.Id, r.Name, r.Imgs })
      .ToList();

    var recipeResponse = recipeService.BuildRecipeResponse(recipe, RecipeService.RevisionView.PublishedPreferred, userId);

    var relatedIds = filtered.Select(r => r.Id).ToList();
    var relatedEntities = await _context.Recipe
      .AsNoTracking()
      .Include(r => r.PublishedRevision)
      .Include(r => r.Owner)
      .Where(r => relatedIds.Contains(r.Id))
      .ToListAsync();
    var relatedResponses = relatedEntities
      .Select(r => recipeService.BuildRecipeSummaryResponse(r, RecipeService.RevisionView.PublishedPreferred, userId))
      .ToList();

    recipeResponse.RelatedRecipes = relatedResponses;

    return Ok(recipeResponse);
  }

  [HttpPost("relations/rebuild")]
  [HttpGet("relations/rebuild")]
  public async Task<IActionResult> RebuildRelations([FromQuery] int topPerRecipe = 10, CancellationToken cancellationToken = default)
  {
    topPerRecipe = Math.Clamp(topPerRecipe, 1, 50);
    var created = await relationService.RebuildAllRelationsAsync(topPerRecipe, cancellationToken);
    return Ok(new { created });
  }

  [HttpGet("most-copied")]
  [AllowAnonymous]
  public async Task<IActionResult> GetMostCopiedRecipes([FromQuery] int quantity = 6)
  {
    if (quantity < 1) return BadRequest("Quantity must be greater than zero.");
    if (quantity > 64) return BadRequest("Quantity must not exceed 64.");

    var userId = GetUserId();
    var recipes = await recipeService.GetMostCopiedRecipesAsync(quantity, userId);

    var responses = recipes
      .Select(r => recipeService.BuildRecipeResponse(r, RecipeService.RevisionView.PublishedPreferred, userId))
      .ToList();
    return Ok(responses);
  }

  private async Task<IActionResult> CreateRecipeInternalAsync(RecipeDto recipeDto, string ownerId, bool? isPublic)
  {
    var recipe = await recipeService.DtoToEntity(recipeDto);
    recipe.OwnerId = ownerId;
    recipe.Visibility = Visibility.Private;
    recipe.PublishedRevisionId = null;

    _context.Recipe.Add(recipe);
    await _context.SaveChangesAsync();

    var persistedLatest = recipe.Revisions.FirstOrDefault();
    if (persistedLatest is not null)
    {
      recipe.LatestRevisionId = persistedLatest.Id;
      recipe.LatestRevision = persistedLatest;
      _context.Recipe.Update(recipe);
      await _context.SaveChangesAsync();
    }

    var response = recipeService.BuildRecipeResponse(recipe, RecipeService.RevisionView.LatestPreferred, ownerId);
    return Ok(response);
  }
}
