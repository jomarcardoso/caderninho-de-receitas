using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Server.Dtos;
using Server.Models;
using Server.Services;
using Server.Serialization;
using Server.PreProcessing;
using Server.Shared;
using System.Security.Claims;
using System.IO;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // garante que s� usu�rios logados podem acessar
public class RecipeController : ControllerBase
{
  private readonly AppDbContext _context;
  private readonly IMapper _mapper;
  private readonly RecipeService recipeService;
  private readonly PlainTextRecipeParser plainTextRecipeParser;
  private readonly PlainTextRecipePreProcessor plainTextRecipePreProcessor;
  private readonly RecipeImageOcrService recipeImageOcrService;
  private const string TemporaryOwnerHeaderName = "X-Temporary-Owner";

  public RecipeController(
    AppDbContext context,
    IMapper mapper,
    RecipeService recipeService,
    PlainTextRecipeParser plainTextRecipeParser,
    PlainTextRecipePreProcessor plainTextRecipePreProcessor,
    RecipeImageOcrService recipeImageOcrService)
  {
    _context = context;
    _mapper = mapper;
    this.recipeService = recipeService ?? throw new ArgumentNullException(nameof(recipeService));
    this.plainTextRecipeParser = plainTextRecipeParser ?? throw new ArgumentNullException(nameof(plainTextRecipeParser));
    this.plainTextRecipePreProcessor = plainTextRecipePreProcessor ?? throw new ArgumentNullException(nameof(plainTextRecipePreProcessor));
    this.recipeImageOcrService = recipeImageOcrService ?? throw new ArgumentNullException(nameof(recipeImageOcrService));
  }

  // Helper para pegar o sub (Google UserId)
  private string GetUserId() =>
      User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

  [HttpPost]
  [AllowAnonymous]
  public async Task<IActionResult> CreateRecipe(
    [FromBody] RecipeDto recipeDto,
    [FromHeader(Name = TemporaryOwnerHeaderName)] string? temporaryOwnerId = null)
  {
    if (recipeDto is null)
    {
      return BadRequest("Recipe payload must be provided.");
    }

    return await CreateRecipeInternalAsync(recipeDto, temporaryOwnerId, null);
  }
  [HttpPost("{id}/save")]
  public async Task<IActionResult> SaveRecipeFromAnotherUser(int id)
  {
    var userId = GetUserId();

    Recipe? sourceRecipe = await recipeService.FindRecipeWithDetailsById(id);

    if (sourceRecipe == null)
    {
      return NotFound();
    }

    if (sourceRecipe.OwnerId == userId)
    {
      return BadRequest("N�o � poss�vel adicionar uma receita que j� pertence a voc�.");
    }

    Recipe clonedRecipe = recipeService.CloneRecipeForUser(sourceRecipe, userId);

    _context.Recipe.Add(clonedRecipe);
    sourceRecipe.SavedByOthersCount += 1;

    await _context.SaveChangesAsync();

    RecipesDto response = await recipeService.GetRecipesAndFoodsByUserId(userId);
    return Ok(response);
  }

  [HttpPost("many")]
  [AllowAnonymous]
  public async Task<IActionResult> CreateRecipes(
    [FromBody] List<RecipeDto> recipesDto,
    [FromHeader(Name = TemporaryOwnerHeaderName)] string? temporaryOwnerId = null)
  {
    if (recipesDto is null || recipesDto.Count == 0)
    {
      return BadRequest("At least one recipe must be provided.");
    }

    if (!TryResolveOwnerId(temporaryOwnerId, out var ownerId, out var errorResult))
    {
      return errorResult!;
    }

    var recipesToAdd = new List<Recipe>();

    foreach (RecipeDto dto in recipesDto)
    {
      Recipe recipe = await recipeService.DtoToEntity(dto);
      recipe.OwnerId = ownerId;
      recipesToAdd.Add(recipe);
    }

    _context.Recipe.AddRange(recipesToAdd);
    await _context.SaveChangesAsync();

    // Retorna todas as receitas do usuario, incluindo as novas
    RecipesDto response = await recipeService.GetRecipesAndFoodsByUserId(ownerId);
    return Ok(response);
  }
  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateRecipe(int id, [FromBody] RecipeDto recipeDto)
  {
    var userId = GetUserId();

    Recipe? recipe = await _context.Recipe
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .FirstOrDefaultAsync(r => r.Id == id && r.OwnerId == userId);

    if (recipe == null)
      return NotFound();

    await recipeService.UpdateEntityFromDto(recipe, recipeDto);
    recipe.OwnerId = userId;

    await _context.SaveChangesAsync();

    RecipesDto response = await recipeService.GetRecipesAndFoodsByUserId(userId);
    return Ok(response);
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteRecipe(int id)
  {
    var userId = GetUserId();

    Recipe? recipe = await _context.Recipe
      .FirstOrDefaultAsync(r => r.Id == id && r.OwnerId == userId);

    if (recipe == null)
      return NotFound();

    if (recipe.CopiedFromRecipeId > 0)
    {
      Recipe? originalRecipe = await _context.Recipe
        .FirstOrDefaultAsync(r => r.Id == recipe.CopiedFromRecipeId);

      if (originalRecipe != null && originalRecipe.SavedByOthersCount > 0)
      {
        originalRecipe.SavedByOthersCount -= 1;
      }
    }

    _context.Recipe.Remove(recipe);
    await _context.SaveChangesAsync();

    RecipesDto response = await recipeService.GetRecipesAndFoodsByUserId(userId);
    return Ok(response);
  }

  [HttpGet("most-copied")]
  [AllowAnonymous]
  public async Task<IActionResult> GetMostCopiedRecipes([FromQuery] int quantity)
  {
    if (quantity < 1)
    {
      return BadRequest("Quantity must be greater than zero.");
    }

    if (quantity > 64)
    {
      return BadRequest("Quantity must not exceed 64.");
    }

    var userId = GetUserId();

    List<Recipe> recipes = await recipeService.GetMostCopiedRecipesAsync(quantity, userId);
    List<RecipeResponseDto> response = _mapper.Map<List<RecipeResponseDto>>(recipes);

    return Ok(response);
  }

  [HttpGet("search")]
  public async Task<IActionResult> SearchRecipes([FromQuery] string text, [FromQuery] int quantity = 10)
  {
    if (string.IsNullOrWhiteSpace(text))
    {
      return BadRequest("Search text must be provided.");
    }

    if (quantity < 1)
    {
      return BadRequest("Quantity must be greater than zero.");
    }

    if (quantity > 64)
    {
      return BadRequest("Quantity must not exceed 64.");
    }

    var userId = GetUserId();

    List<Recipe> recipes = await recipeService.SearchRecipesByTextAsync(text, quantity, userId);
    List<RecipeResponseDto> response = _mapper.Map<List<RecipeResponseDto>>(recipes);

    return Ok(response);
  }

  [HttpPost("plain-text/preprocess")]
  [AllowAnonymous]
  public IActionResult PreprocessPlainTextRecipe([FromBody] PlainTextRecipePreProcessRequest request)
  {
    if (request is null || string.IsNullOrWhiteSpace(request.Content))
    {
      return BadRequest("Recipe content must be provided.");
    }

    string structured;
    try
    {
      structured = plainTextRecipePreProcessor.Normalize(request.Content);
    }
    catch (PlainTextRecipePreProcessorException ex)
    {
      return BadRequest(ex.Message);
    }

    return Ok(new PlainTextRecipePreProcessResponse
    {
      StructuredContent = structured
    });
  }

  [HttpPost("plain-text/from-image")]
  [AllowAnonymous]
  public async Task<IActionResult> CreateRecipeFromImage(
  [FromForm] RecipeImageRequest request,
  [FromHeader(Name = TemporaryOwnerHeaderName)] string? temporaryOwnerId = null)
  {
    if (request is null || request.Image is null || request.Image.Length == 0)
    {
      return BadRequest("A recipe image must be provided.");
    }

    string ocrText;
    try
    {
      using Stream imageStream = request.Image.OpenReadStream();
      ocrText = await recipeImageOcrService.ExtractTextAsync(imageStream, request.Language, HttpContext.RequestAborted);
    }
    catch (RecipeImageOcrException ex)
    {
      return BadRequest(ex.Message);
    }

    if (string.IsNullOrWhiteSpace(ocrText))
    {
      return BadRequest("No text could be extracted from the provided image.");
    }

    string structured;
    try
    {
      structured = plainTextRecipePreProcessor.Normalize(ocrText);
    }
    catch (PlainTextRecipePreProcessorException ex)
    {
      return BadRequest(ex.Message);
    }

    RecipeDto recipeDto;
    try
    {
      recipeDto = plainTextRecipeParser.Parse(structured);
    }
    catch (PlainTextRecipeParserException ex)
    {
      return BadRequest(ex.Message);
    }

    var language = TryMapLanguage(request.Language);
    if (language.HasValue)
    {
      recipeDto.Language = language.Value;
    }

    return await CreateRecipeInternalAsync(recipeDto, temporaryOwnerId, request.IsPublic);
  }

  [HttpPost("plain-text")]
  [AllowAnonymous]
  public async Task<IActionResult> CreateRecipeFromPlainText(
    [FromBody] PlainTextRecipeRequest request,
    [FromHeader(Name = TemporaryOwnerHeaderName)] string? temporaryOwnerId = null)
  {
    if (request is null || string.IsNullOrWhiteSpace(request.Content))
    {
      return BadRequest("Recipe content must be provided.");
    }

    RecipeDto recipeDto;
    try
    {
      recipeDto = plainTextRecipeParser.Parse(request.Content);
    }
    catch (PlainTextRecipeParserException ex)
    {
      return BadRequest(ex.Message);
    }

    return await CreateRecipeInternalAsync(recipeDto, temporaryOwnerId, request.IsPublic);
  }

  [HttpPost("claim-owner")]
  public async Task<IActionResult> ClaimRecipesOwnership([FromBody] ClaimOwnerRequest request)
  {
    if (request is null || string.IsNullOrWhiteSpace(request.TemporaryOwnerId))
    {
      return BadRequest("Temporary owner id must be provided.");
    }

    string userId = GetUserId();

    if (string.IsNullOrWhiteSpace(userId))
    {
      return Unauthorized();
    }

    int updatedCount = await recipeService.ClaimRecipesAsync(request.TemporaryOwnerId.Trim(), userId);

    if (updatedCount == 0)
    {
      return NotFound();
    }

    return Ok(new { updated = updatedCount });
  }

  // GET api/recipes
  [HttpGet]
  public async Task<IActionResult> GetMyRecipes()
  {
    var userId = GetUserId();
    RecipesDto response = await recipeService.GetRecipesAndFoodsByUserId(userId);

    return Ok(response);
  }

  // GET api/recipes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> GetRecipe(int id)
  {
    var userId = GetUserId();

    Recipe? recipe = await _context.Recipe
      .FirstOrDefaultAsync(r => r.Id == id);

    if (recipe == null)
      return NotFound();

    if (recipe.OwnerId != userId && !recipe.IsPublic)
    {
      return NotFound();
    }

    return Ok(recipe);
  }

  [HttpGet("public/{id}")]
  [AllowAnonymous]
  public async Task<IActionResult> GetPublicRecipe(int id)
  {
    Recipe? recipe = await _context.Recipe
      .Include(r => r.Food)
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .FirstOrDefaultAsync(r => r.Id == id);

    if (recipe is null)
      return NotFound();

    if (!recipe.IsPublic)
      return NotFound();

    return Ok(recipe);
  }

  private static Language? TryMapLanguage(string? value)
  {
    if (string.IsNullOrWhiteSpace(value))
    {
      return null;
    }

    if (Enum.TryParse<Language>(value, true, out var parsed))
    {
      return parsed;
    }

    return value.ToLowerInvariant() switch
    {
      "en" or "eng" or "english" => Language.En,
      "pt" or "por" or "pt-br" or "portuguese" => Language.Pt,
      _ => null
    };
  }
  private async Task<IActionResult> CreateRecipeInternalAsync(RecipeDto recipeDto, string? temporaryOwnerId, bool? isPublic)
  {
    if (!TryResolveOwnerId(temporaryOwnerId, out string ownerId, out IActionResult? errorResult))
    {
      return errorResult!;
    }

    Recipe recipe = await recipeService.DtoToEntity(recipeDto);
    recipe.OwnerId = ownerId;

    if (isPublic.HasValue)
    {
      recipe.IsPublic = isPublic.Value;
    }

    _context.Recipe.Add(recipe);
    await _context.SaveChangesAsync();

    RecipesDto response = await recipeService.GetRecipesAndFoodsByUserId(ownerId);
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
