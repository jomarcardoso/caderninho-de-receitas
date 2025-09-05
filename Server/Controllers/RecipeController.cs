using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Server.Dtos;
using Server.Models;
using Server.Models.Food;
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

    _context.Recipes.Add(recipe);
    await _context.SaveChangesAsync();

    return Ok(await GetMyRecipes());
  }

  // GET api/recipes
  [HttpGet]
  public async Task<IActionResult> GetMyRecipes()
  {
    var userId = GetUserId();

    List<Recipe> recipes = await _context.Recipes
      .Where(r => r.OwnerId == userId)
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .ToListAsync();

    List<RecipeResponseDto> recipeDtos = _mapper.Map<List<RecipeResponseDto>>(recipes);

    var foods = recipes
      .SelectMany(r => r.Steps)
      .SelectMany(s => s.Ingredients)
      .Select(i => i.Food)
      .DistinctBy(f => f.Id)
      .ToList();

    var response = new RecipeAndFoodResponseDto
    {
      Recipes = recipeDtos,
      Foods = _mapper.Map<List<Food>>(foods)
    };

    return Ok(response);
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
