using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
  private readonly RecipeService recipeService;


  public RecipeController(AppDbContext context, RecipeService _recipeService)
  {
    _context = context;
    recipeService = _recipeService ?? throw new ArgumentNullException(nameof(recipeService));
  }

  // Helper para pegar o sub (Google UserId)
  private string GetUserId() =>
      User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

  [HttpPost]
  public async Task<IActionResult> CreateRecipe([FromBody] RecipeDto recipeDto)
  {
    var userId = GetUserId();
    Recipe recipe = recipeService.DtoToEntity(recipeDto);

    recipe.OwnerId = userId;

    _context.Recipes.Add(recipe);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipe);
  }

  // GET api/recipes
  [HttpGet]
  public IActionResult GetMyRecipes()
  {
    var userId = GetUserId();
    var myRecipes = _context.Recipes
        .Where(r => r.OwnerId == userId)
        .ToList();

    return Ok(myRecipes);
  }

  // GET api/recipes/5
  [HttpGet("{id}")]
  public async Task<IActionResult> GetRecipe(int id)
  {
    var userId = GetUserId();

    Recipe? recipe = await _context.Recipes
      .FirstOrDefaultAsync(r => r.Id == id && r.OwnerId == userId);

    if (recipe == null)
      return NotFound();

    return Ok(recipe);
  }
}
