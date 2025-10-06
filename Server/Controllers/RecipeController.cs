using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Server.Dtos;
using Server.Models;
using Server.Services;
using System.Security.Claims;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // garante que só usuários logados podem acessar
public class RecipeController : ControllerBase
{
  private readonly AppDbContext _context;
  private readonly IMapper _mapper;
  private readonly RecipeService recipeService;

  public RecipeController(AppDbContext context, IMapper mapper, RecipeService _recipeService)
  {
    _context = context;
    _mapper = mapper;
    recipeService = _recipeService ?? throw new ArgumentNullException(nameof(recipeService));
  }

  // Helper para pegar o sub (Google UserId)
  private string GetUserId() =>
      User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

  [HttpPost]
  public async Task<IActionResult> CreateRecipe([FromBody] RecipeDto recipeDto)
  {
    var userId = GetUserId();

    Recipe recipe = await recipeService.DtoToEntity(recipeDto);
    recipe.OwnerId = userId;

    _context.Recipe.Add(recipe);
    await _context.SaveChangesAsync();

    RecipesDto response = await recipeService.GetRecipesAndFoodsByUserId(userId);
    return Ok(response);
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
      return BadRequest("Não é possível adicionar uma receita que já pertence a você.");
    }

    Recipe clonedRecipe = recipeService.CloneRecipeForUser(sourceRecipe, userId);

    _context.Recipe.Add(clonedRecipe);
    sourceRecipe.SavedByOthersCount += 1;

    await _context.SaveChangesAsync();

    RecipesDto response = await recipeService.GetRecipesAndFoodsByUserId(userId);
    return Ok(response);
  }

  [HttpPost("many")]
  public async Task<IActionResult> CreateRecipes([FromBody] List<RecipeDto> recipesDto)
  {
    var userId = GetUserId();
    var recipesToAdd = new List<Recipe>();

    foreach (RecipeDto dto in recipesDto)
    {
      Recipe recipe = await recipeService.DtoToEntity(dto);
      recipe.OwnerId = userId;
      recipesToAdd.Add(recipe);
    }

    _context.Recipe.AddRange(recipesToAdd);
    await _context.SaveChangesAsync();

    // Retorna todas as receitas do usuário, incluindo as novas
    RecipesDto response = await recipeService.GetRecipesAndFoodsByUserId(userId);
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

    _context.Recipe.Remove(recipe);
    await _context.SaveChangesAsync();

    RecipesDto response = await recipeService.GetRecipesAndFoodsByUserId(userId);
    return Ok(response);
  }

  [HttpGet("most-copied")]
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

    List<Recipe> recipes = await recipeService.GetMostCopiedRecipesAsync(quantity);
    List<RecipeResponseDto> response = _mapper.Map<List<RecipeResponseDto>>(recipes);

    return Ok(response);
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
      .FirstOrDefaultAsync(r => r.Id == id && r.OwnerId == userId);

    if (recipe == null)
      return NotFound();

    return Ok(recipe);
  }
}
