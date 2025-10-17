using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Models;
using Server.Services;
using Server.PreProcessing;
using Server.Serialization;
using Server.Shared;
using System.Security.Claims;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RecipeController : ControllerBase
{
  private readonly AppDbContext _context;
  private readonly RecipeService recipeService;
  private readonly RelationService relationService;
  private readonly PlainTextRecipeParser plainTextRecipeParser;
  private readonly PlainTextRecipePreProcessor plainTextRecipePreProcessor;
  private readonly RecipeImageOcrService recipeImageOcrService;

  private const string TemporaryOwnerHeaderName = "X-Temporary-Owner";

  public RecipeController(
    AppDbContext context,
    RecipeService recipeService,
    RelationService relationService,
    PlainTextRecipeParser plainTextRecipeParser,
    PlainTextRecipePreProcessor plainTextRecipePreProcessor,
    RecipeImageOcrService recipeImageOcrService)
  {
    _context = context;
    this.recipeService = recipeService ?? throw new ArgumentNullException(nameof(recipeService));
    this.relationService = relationService ?? throw new ArgumentNullException(nameof(relationService));
    this.plainTextRecipeParser = plainTextRecipeParser ?? throw new ArgumentNullException(nameof(plainTextRecipeParser));
    this.plainTextRecipePreProcessor = plainTextRecipePreProcessor ?? throw new ArgumentNullException(nameof(plainTextRecipePreProcessor));
    this.recipeImageOcrService = recipeImageOcrService ?? throw new ArgumentNullException(nameof(recipeImageOcrService));
  }

  private string GetUserId() => User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

  [HttpPost]
  [AllowAnonymous]
  public async Task<IActionResult> CreateRecipe(
    [FromBody] RecipeDto recipeDto,
    [FromHeader(Name = TemporaryOwnerHeaderName)] string? temporaryOwnerId = null)
  {
    if (recipeDto is null) return BadRequest("Recipe payload must be provided.");
    return await CreateRecipeInternalAsync(recipeDto, temporaryOwnerId, null);
  }

  [HttpPost("many")]
  [AllowAnonymous]
  public async Task<IActionResult> CreateRecipes(
    [FromBody] List<RecipeDto> recipesDto,
    [FromHeader(Name = TemporaryOwnerHeaderName)] string? temporaryOwnerId = null)
  {
    if (recipesDto is null || recipesDto.Count == 0) return BadRequest("At least one recipe must be provided.");

    if (!TryResolveOwnerId(temporaryOwnerId, out var ownerId, out var errorResult)) return errorResult!;

    var recipesToAdd = new List<Recipe>();
    foreach (var dto in recipesDto)
    {
      var recipe = await recipeService.DtoToEntity(dto);
      recipe.OwnerId = ownerId;
      recipesToAdd.Add(recipe);
    }

    _context.Recipe.AddRange(recipesToAdd);
    await _context.SaveChangesAsync();

    var response = await recipeService.GetRecipesAndFoodsByUserId(ownerId);
    return Ok(response);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateRecipe(int id, [FromBody] RecipeDto recipeDto)
  {
    var userId = GetUserId();

    var recipe = await _context.Recipe
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .FirstOrDefaultAsync(r => r.Id == id);

    if (recipe is null) return NotFound();
    if (recipe.OwnerId != userId) return NotFound();

    await recipeService.UpdateEntityFromDto(recipe, recipeDto);
    recipe.OwnerId = userId;

    await _context.SaveChangesAsync();

    var response = await recipeService.GetRecipesAndFoodsByUserId(userId);
    return Ok(response);
  }

  [HttpGet]
  public async Task<IActionResult> GetMyRecipes()
  {
    var userId = GetUserId();
    var response = await recipeService.GetRecipesAndFoodsByUserId(userId);
    return Ok(response);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetRecipe(int id)
  {
    var userId = GetUserId();

    var recipe = await _context.Recipe.FirstOrDefaultAsync(r => r.Id == id);
    if (recipe is null) return NotFound();
    if (recipe.OwnerId != userId && !recipe.IsPublic) return NotFound();

    var relatedIds = await _context.RecipeRelation
      .AsNoTracking()
      .Where(r => r.RecipeId == id)
      .OrderByDescending(r => r.Weight)
      .Take(5)
      .Select(r => r.RelatedRecipeId)
      .ToListAsync();

    var related = await _context.Recipe
      .AsNoTracking()
      .Where(r => relatedIds.Contains(r.Id) && r.IsPublic)
      .Select(r => new { r.Id, r.Name, r.Image, r.Description })
      .ToListAsync();

    return Ok(new { recipe, related });
  }

  [HttpGet("public/{id}")]
  [AllowAnonymous]
  public async Task<IActionResult> GetPublicRecipe(int id)
  {
    var recipe = await _context.Recipe
      .Include(r => r.Food)
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .FirstOrDefaultAsync(r => r.Id == id);

    if (recipe is null || !recipe.IsPublic) return NotFound();

    var relatedIds = await _context.RecipeRelation
      .AsNoTracking()
      .Where(r => r.RecipeId == id)
      .OrderByDescending(r => r.Weight)
      .Take(5)
      .Select(r => r.RelatedRecipeId)
      .ToListAsync();

    var related = await _context.Recipe
      .AsNoTracking()
      .Where(r => relatedIds.Contains(r.Id) && r.IsPublic)
      .Select(r => new { r.Id, r.Name, r.Image, r.Description })
      .ToListAsync();

    return Ok(new { recipe, related });
  }

  private static Language? TryMapLanguage(string? value)
  {
    if (string.IsNullOrWhiteSpace(value)) return null;
    if (Enum.TryParse<Language>(value, true, out var parsed)) return parsed;

    return value.ToLowerInvariant() switch
    {
      "en" or "eng" or "english" => Language.En,
      "pt" or "por" or "pt-br" or "portuguese" => Language.Pt,
      _ => null
    };
  }

  private async Task<IActionResult> CreateRecipeInternalAsync(RecipeDto recipeDto, string? temporaryOwnerId, bool? isPublic)
  {
    if (!TryResolveOwnerId(temporaryOwnerId, out string ownerId, out IActionResult? errorResult)) return errorResult!;

    var recipe = await recipeService.DtoToEntity(recipeDto);
    recipe.OwnerId = ownerId;

    if (isPublic.HasValue) recipe.IsPublic = isPublic.Value;

    _context.Recipe.Add(recipe);
    await _context.SaveChangesAsync();

    var response = await recipeService.GetRecipesAndFoodsByUserId(ownerId);
    return Ok(response);
  }

  private bool TryResolveOwnerId(string? temporaryOwnerId, out string ownerId, out IActionResult? errorResult)
  {
    string userId = GetUserId();

    if (!string.IsNullOrWhiteSpace(userId))
    {
      ownerId = userId.Trim();
      errorResult = null;
      return true;
    }

    if (!string.IsNullOrWhiteSpace(temporaryOwnerId))
    {
      ownerId = temporaryOwnerId.Trim();
      errorResult = null;
      return true;
    }

    ownerId = string.Empty;
    errorResult = BadRequest("Temporary owner id must be provided for anonymous requests.");
    return false;
  }
}

public class ClaimOwnerRequest
{
  public string TemporaryOwnerId { get; set; } = string.Empty;
}
