using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController : ControllerBase
{
  private readonly RecipeService _recipeService;

  public CategoryController(RecipeService recipeService)
  {
    _recipeService = recipeService;
  }

  [HttpGet]
  [AllowAnonymous]
  public async Task<IActionResult> GetAll()
  {
    var map = await _recipeService.BuildCategoryMapAsync();
    return Ok(map.Values.ToList());
  }
}
