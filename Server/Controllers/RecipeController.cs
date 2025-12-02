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


  // Unified owner uses authenticated claim or cookie only

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
    return string.IsNullOrWhiteSpace(authId) ? string.Empty : authId!.Trim();
  }

  [HttpPost]
  public async Task<IActionResult> CreateRecipe(
    [FromBody] RecipeDto recipeDto)
  {
    if (recipeDto is null) return BadRequest("Recipe payload must be provided.");
    var ownerId = GetUserId();
    if (string.IsNullOrWhiteSpace(ownerId)) return Unauthorized();
    return await CreateRecipeInternalAsync(recipeDto, ownerId, null);
  }

  [HttpPost("many")]
  public async Task<IActionResult> CreateRecipes(
    [FromBody] List<RecipeDto> recipesDto)
  {
    if (recipesDto is null || recipesDto.Count == 0) return BadRequest("At least one recipe must be provided.");
    var ownerId = GetUserId();
    if (string.IsNullOrWhiteSpace(ownerId)) return Unauthorized();

    var recipesToAdd = new List<Recipe>();
    foreach (var dto in recipesDto)
    {
      var recipe = await recipeService.DtoToEntity(dto);
      recipe.OwnerId = ownerId;
      recipe.IsPublic = false;
      recipe.Verified = false;
      recipesToAdd.Add(recipe);
    }

    _context.Recipe.AddRange(recipesToAdd);
    await _context.SaveChangesAsync();

    var response = await recipeService.GetRecipesAndFoodsByUserId(ownerId);
    return Ok(response);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateRecipe(
    int id,
    [FromBody] RecipeDto recipeDto)
  {
    if (recipeDto is null) return BadRequest("Recipe payload must be provided.");
    var ownerId = GetUserId();
    if (string.IsNullOrWhiteSpace(ownerId)) return Unauthorized();

    var recipe = await _context.Recipe
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .FirstOrDefaultAsync(r => r.Id == id);

    if (recipe is null) return NotFound();
    if (!string.Equals(recipe.OwnerId, ownerId, StringComparison.Ordinal))
      return Forbid();

    await recipeService.UpdateEntityFromDto(recipe, recipeDto);
    // Keep ownership as resolved ownerId; do not override on update
    recipe.OwnerId = ownerId;
    // Any change requires re-approval
    recipe.IsPublic = false;
    recipe.Verified = false;

    await _context.SaveChangesAsync();

    var response = await recipeService.GetRecipesAndFoodsByUserId(ownerId);
    return Ok(response);
  }

  // Admin moderation: list unverified recipes
  [HttpGet("pending")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> GetPendingRecipes()
  {
    var pending = await _context.Recipe
      .AsNoTracking()
      .Where(r => !r.Verified)
      .OrderByDescending(r => r.CreatedAt)
      .Select(r => new { r.Id, r.Name, r.Imgs, r.Description, r.OwnerId, r.IsPublic, r.Verified, r.CreatedAt })
      .ToListAsync();
    return Ok(pending);
  }

  // Admin moderation: approve
  [HttpPost("{id}/approve")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> ApproveRecipe(int id)
  {
    var recipe = await _context.Recipe.FirstOrDefaultAsync(r => r.Id == id);
    if (recipe is null) return NotFound();
    recipe.IsPublic = true;
    recipe.Verified = true;
    recipe.UpdatedAt = DateTime.UtcNow;
    await _context.SaveChangesAsync();
    return Ok(new { id = recipe.Id, isPublic = recipe.IsPublic, verified = recipe.Verified });
  }

  // Admin moderation: deny
  [HttpPost("{id}/deny")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> DenyRecipe(int id)
  {
    var recipe = await _context.Recipe.FirstOrDefaultAsync(r => r.Id == id);
    if (recipe is null) return NotFound();
    recipe.IsPublic = false;
    recipe.Verified = true;
    recipe.UpdatedAt = DateTime.UtcNow;
    await _context.SaveChangesAsync();
    return Ok(new { id = recipe.Id, isPublic = recipe.IsPublic, verified = recipe.Verified });
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteRecipe(
    int id)
  {
    var claimedUserId = GetUserId();

    var recipe = await _context.Recipe
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .FirstOrDefaultAsync(r => r.Id == id);

    if (recipe is null) return NotFound();
    if (!string.Equals(recipe.OwnerId, claimedUserId, StringComparison.Ordinal)) return NotFound();

    _context.Recipe.Remove(recipe);
    await _context.SaveChangesAsync();

    var response = await recipeService.GetRecipesAndFoodsByUserId(claimedUserId);
    return Ok(response);
  }

  [HttpGet]
  public async Task<IActionResult> GetMyRecipes()
  {
    var ownerId = GetUserId();
    if (string.IsNullOrWhiteSpace(ownerId)) return Unauthorized();

    RecipesDataResponse response = await recipeService.GetRecipesAndFoodsByUserId(ownerId);
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
          .Where(s => !string.IsNullOrWhiteSpace(s))
          .ToList();

    var recipes = await recipeService.SearchRecipesAsync(text, categoryKeys, quantity, string.IsNullOrWhiteSpace(userId) ? null : userId);

    // Map to API responses
    var recipeResponses = _mapper.Map<List<RecipeResponse>>(recipes);
    // Enrich with ownership flag for UI
    foreach (var r in recipeResponses)
    {
      try { r.IsOwner = string.Equals(r.Author?.Id, userId, StringComparison.Ordinal); } catch { r.IsOwner = false; }
    }

    // Collect Foods referenced by the recipes (including steps/ingredients)
    var foods = FoodService.GetFoodsFromRecipes(recipes);

    // Attach referenced FoodIcons (prefer IconId when present; fallback to name-based)
    var iconIds = foods
      .Select(f => f.IconId)
      .Where(id => id.HasValue && id.Value > 0)
      .Select(id => id!.Value)
      .Distinct()
      .ToList();

    List<FoodIcon> foodIcons;
    if (iconIds.Count > 0)
    {
      foodIcons = await _context.FoodIcon
        .AsNoTracking()
        .Where(i => iconIds.Contains(i.Id))
        .ToListAsync();
    }
    else
    {
      var iconNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
      foreach (var f in foods)
      {
        if (!string.IsNullOrWhiteSpace(f.Icon))
        {
          var n = f.Icon.Trim();
          try { n = System.IO.Path.GetFileName(n); } catch { }
          if (!string.IsNullOrWhiteSpace(n)) iconNames.Add(n);
        }
      }

      foodIcons = await _context.FoodIcon
        .AsNoTracking()
        .Where(i => iconNames.Contains(i.Name.En))
        .ToListAsync();
    }

    // Build full response including common dictionaries (via FoodsDataResponse inheritance)
    var response = new RecipesDataResponse
    {
      Recipes = recipeResponses,
      Foods = foods,
      FoodIcons = foodIcons,
      RecipeCategories = await recipeService.BuildCategoryMapAsync()
    };

    return Ok(response);
  }

  [HttpGet("categories")]
  [AllowAnonymous]
  public async Task<IActionResult> GetCategories()
  {
    var map = await recipeService.BuildCategoryMapAsync();
    // Retorna a lista de categorias com metadados (key, url, textos e imagem)
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
      .Include(r => r.Food)
      .Include(r => r.Owner)
      .Include(r => r.Steps)
        .ThenInclude(s => s.Ingredients)
        .ThenInclude(i => i.Food)
      .FirstOrDefaultAsync(r => r.Id == id);

    if (recipe is null) return NotFound();
    var userId = GetUserId();
    if (!recipe.IsPublic && !string.Equals(recipe.OwnerId, userId, StringComparison.Ordinal)) return NotFound();

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

    // Prefer lookup by IconId; fallback to name-based matching
    var iconIds = new List<int>();
    if (recipe.Food?.IconId is int rid && rid > 0) iconIds.Add(rid);
    foreach (var s in recipe.Steps ?? new List<RecipeStep>())
    {
      foreach (var i in s.Ingredients ?? new List<Ingredient>())
      {
        if (i.Food?.IconId is int iid && iid > 0) iconIds.Add(iid);
      }
    }
    iconIds = iconIds.Distinct().ToList();

    List<FoodIcon> icons;
    if (iconIds.Count > 0)
    {
      icons = await _context.FoodIcon
        .AsNoTracking()
        .Where(i => iconIds.Contains(i.Id))
        .ToListAsync();
    }
    else
    {
      icons = await _context.FoodIcon
        .AsNoTracking()
        .Where(i => iconNames.Contains(i.Name.En))
        .ToListAsync();
    }

    // Map recipe and related to responses with AutoMapper
    var recipeResponse = _mapper.Map<RecipeResponse>(recipe);
    // Ownership flag for UI
    try { recipeResponse.IsOwner = string.Equals(recipe.OwnerId, userId, StringComparison.Ordinal); } catch { recipeResponse.IsOwner = false; }

    var relatedIds = filtered.Select(r => r.Id).ToList();
    var relatedEntities = await _context.Recipe
      .AsNoTracking()
      .Include(r => r.Owner)
      .Where(r => relatedIds.Contains(r.Id))
      .ToListAsync();
    var relatedResponses = _mapper.Map<List<RecipeResponse>>(relatedEntities);

    // Build full response including common dictionaries (via FoodsDataResponse inheritance)
    var response = new RecipeDataResponse
    {
      Recipes = recipeResponse,
      RelatedRecipes = relatedResponses,
      Foods = new List<Food> { recipe.Food! }
        .Concat(recipe.Steps.SelectMany(s => s.Ingredients).Select(i => i.Food))
        .Where(f => f is not null)
        .DistinctBy(f => f!.Id)
        .ToList()!,
      FoodIcons = icons
    };

    return Ok(response);
  }

  // Removed legacy public endpoint to unify access under GetRecipe

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

  private async Task<IActionResult> CreateRecipeInternalAsync(RecipeDto recipeDto, string ownerId, bool? isPublic)
  {
    var recipe = await recipeService.DtoToEntity(recipeDto);
    recipe.OwnerId = ownerId;

    if (isPublic.HasValue) recipe.IsPublic = isPublic.Value;

    _context.Recipe.Add(recipe);
    await _context.SaveChangesAsync();

    var response = await recipeService.GetRecipesAndFoodsByUserId(ownerId);
    return Ok(response);
  }

  // Legacy owner resolution removed; unified GetUserId() now handles auth/cookie/header

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

    // Return mapped RecipeResponse including Author information
    var responses = _mapper.Map<List<RecipeResponse>>(recipes);
    foreach (var r in responses)
    {
      try { r.IsOwner = string.Equals(r.Author?.Id, userId, StringComparison.Ordinal); } catch { r.IsOwner = false; }
    }
    return Ok(responses);
  }
}

// Removed legacy ClaimOwnerRequest used for temporary owner flows
