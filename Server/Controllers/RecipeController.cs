using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Server.Models;

using System.Security.Claims;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // garante que só usuários logados podem acessar
public class RecipeController : ControllerBase
{
  private readonly AppDbContext _context;

  public RecipeController(AppDbContext context)
  {
    _context = context;
  }

  // Helper para pegar o sub (Google UserId)
  private string GetUserId() =>
      User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

  // POST api/recipes
  [HttpPost]
  public async Task<IActionResult> CreateRecipe([FromBody] Recipe recipe)
  {
    var userId = GetUserId();
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
  public IActionResult GetRecipe(int id)
  {
    var userId = GetUserId();
    var recipe = _context.Recipes
        .FirstOrDefault(r => r.Id == id && r.OwnerId == userId);

    if (recipe == null)
      return NotFound();

    return Ok(recipe);
  }
}
