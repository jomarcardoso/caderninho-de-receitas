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
    RecipesDataResponse response = await recipeService.GetRecipesAndFoodsByUserId(userId);
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
    // accept either comma-separated 'categories' or repeated ?categories= key
    var categoryKeys = Request.Query.ContainsKey("categories") && Request.Query["categories"].Count > 1
      ? Request.Query["categories"].ToList()
      : (categories ?? string.Empty)
          .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
          .ToList();

    var recipes = await recipeService.SearchRecipesAsync(text, categoryKeys, quantity, string.IsNullOrWhiteSpace(userId) ? null : userId);

    var recipeDtos = recipes.Select(r => new RecipeDto
    {
      Id = r.Id,
      Name = r.Name,
      Keys = r.Keys,
      Description = r.Description,
      Additional = r.Additional,
      Language = r.Language,
      Steps = r.Steps.Select(s => new RecipeStepDto
      {
        Title = s.Title,
        Preparation = s.Preparation,
        Additional = s.Additional,
        IngredientsText = s.IngredientsText,
      }).ToList(),
      Imgs = r.Imgs,
      Categories = r.Categories,
    }).ToList();

    return Ok(new { recipes = recipeDtos });
  }

  [HttpGet("categories")]
  [AllowAnonymous]
  public IActionResult GetCategories()
  {
    // Return dictionary with camelCase enum keys
    static string ToCamel(string s) => string.IsNullOrEmpty(s) ? s : char.ToLowerInvariant(s[0]) + (s.Length > 1 ? s.Substring(1) : string.Empty);
    var map = RecipeCategoryData.Map
      .ToDictionary(kv => ToCamel(kv.Key.ToString()), kv => kv.Value);
    return Ok(map);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetRecipe(
  int id,
  [FromQuery] int count = 5,
  [FromQuery] string? excludeIds = null,
  [FromQuery] bool excludeSameOwner = true)
  {
    var userId = GetUserId();
    var recipe = await _context.Recipe.FirstOrDefaultAsync(r => r.Id == id);
    if (recipe is null) return NotFound();
    if (recipe.OwnerId != userId && !recipe.IsPublic) return NotFound();

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
      .Where(r => candidateIds.Select(x => x.RelatedRecipeId).Contains(r.Id))
      .Select(r => new { r.Id, r.Name, r.Imgs, r.Description, r.OwnerId, r.IsPublic })
      .ToListAsync();

    var candidateMap = candidateIds.ToDictionary(x => x.RelatedRecipeId, x => x.Score);
    var filtered = candidates
      .Where(r => r.IsPublic)
      .Where(r => !excludeSameOwner || r.OwnerId != recipe.OwnerId)
      .OrderByDescending(r => candidateMap.GetValueOrDefault(r.Id, 0))
      .Take(count)
      .Select(r => new { r.Id, r.Name, r.Imgs, r.Description })
      .ToList();

    return Ok(new { recipe, related = filtered });
  }

  [HttpGet("public/{id}")]
  [AllowAnonymous]
  public async Task<IActionResult> GetPublicRecipe(
  int id,
  [FromQuery] int count = 5,
  [FromQuery] string? excludeIds = null,
  [FromQuery] bool excludeSameOwner = true)
  {
    var recipe = await _context.Recipe
      .Include(r => r.Food)
      .Include(r => r.Steps)
        .ThenInclude(s => s.Ingredients)
        .ThenInclude(i => i.Food)
      .FirstOrDefaultAsync(r => r.Id == id);

    if (recipe is null || !recipe.IsPublic) return NotFound();

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
      .Where(r => candidateIds.Select(x => x.RelatedRecipeId).Contains(r.Id))
      .Select(r => new { r.Id, r.Name, r.Imgs, r.Description, r.OwnerId, r.IsPublic })
      .ToListAsync();

    var candidateMap = candidateIds.ToDictionary(x => x.RelatedRecipeId, x => x.Score);
    var filtered = candidates
      .Where(r => r.IsPublic)
      .Where(r => !excludeSameOwner || r.OwnerId != recipe.OwnerId)
      .OrderByDescending(r => candidateMap.GetValueOrDefault(r.Id, 0))
      .Take(count)
      .Select(r => new { r.Id, r.Name, r.Imgs, r.Description })
      .ToList();

    // Build icons dictionary for foods referenced in this recipe (and its steps)
    var iconNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
    if (!string.IsNullOrWhiteSpace(recipe.Food?.Icon))
    {
      var name = recipe.Food.Icon.Trim();
      try { name = System.IO.Path.GetFileName(name); } catch { }
      if (!string.IsNullOrWhiteSpace(name)) iconNames.Add(name);
    }

    foreach (var s in recipe.Steps ?? new List<RecipeStep>())
    {
      foreach (var i in s.Ingredients ?? new List<Ingredient>())
      {
        var name = i.Food?.Icon;
        if (!string.IsNullOrWhiteSpace(name))
        {
          var n = name.Trim();
          try { n = System.IO.Path.GetFileName(n); } catch { }
          if (!string.IsNullOrWhiteSpace(n)) iconNames.Add(n);
        }
      }
    }

    var icons = await _context.FoodIcon
      .AsNoTracking()
      .Where(i => iconNames.Contains(i.Name.En))
      .ToListAsync();

    var foodIcons = icons.ToDictionary(i => i.Name.En, i => i.Content);

    return Ok(new { recipe, related = filtered, foodIcons });
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

  // Admin/maintenance: rebuild precomputed recipe relations
  // POST api/Recipe/relations/rebuild?topPerRecipe=10
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

    var response = recipes
      .Select(r => new
      {
        id = r.Id,
        name = r.Name,
        description = r.Description,
        additional = r.Additional,
        language = r.Language.ToString().ToLowerInvariant(),
        steps = new object[0]
      })
      .ToList();

    return Ok(response);
  }
}

public class ClaimOwnerRequest
{
  public string TemporaryOwnerId { get; set; } = string.Empty;
}

