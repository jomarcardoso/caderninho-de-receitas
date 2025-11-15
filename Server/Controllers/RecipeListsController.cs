using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RecipeListsController : ControllerBase
{
  private readonly AppDbContext _context;
  public RecipeListsController(AppDbContext context)
  {
    _context = context;
  }

  // Unified owner uses authenticated claim or cookie only

  private string GetUserId()
  {
    // Prefer authenticated user when present
    if (User?.Identity?.IsAuthenticated == true)
    {
      var id = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
      if (!string.IsNullOrWhiteSpace(id)) return id!;
    }

    // Else, accept owner from cookie or header (anonymous flow)
    var cookieOwner = Request?.Cookies["ownerId"];
    if (!string.IsNullOrWhiteSpace(cookieOwner)) return cookieOwner!.Trim();

    return string.Empty;
  }

  [HttpGet]
  [AllowAnonymous]
  public async Task<IActionResult> GetMyLists()
  {
    var userId = GetUserId();
    var lists = await _context.RecipeList
      .AsNoTracking()
      .Where(l => l.OwnerId == userId)
      .OrderBy(l => l.Name)
      .ToListAsync();
    return Ok(lists);
  }

  public record UpsertListPayload(string name, string? description);

  [HttpPost]
  [AllowAnonymous]
  public async Task<IActionResult> Create([FromBody] UpsertListPayload payload)
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(payload?.name)) return BadRequest("Name is required");
    var entity = new Server.Models.RecipeList
    {
      OwnerId = userId,
      Name = payload.name.Trim(),
      Description = payload.description?.Trim(),
      CreatedAt = DateTime.UtcNow,
      UpdatedAt = DateTime.UtcNow,
    };
    _context.RecipeList.Add(entity);
    await _context.SaveChangesAsync();
    return Ok(entity);
  }

  [HttpPut("{id}")]
  [AllowAnonymous]
  public async Task<IActionResult> Update(int id, [FromBody] UpsertListPayload payload)
  {
    var userId = GetUserId();
    var list = await _context.RecipeList.FirstOrDefaultAsync(l => l.Id == id && l.OwnerId == userId);
    if (list is null) return NotFound();
    if (!string.IsNullOrWhiteSpace(payload?.name)) list.Name = payload.name.Trim();
    list.Description = payload?.description?.Trim();
    list.UpdatedAt = DateTime.UtcNow;
    await _context.SaveChangesAsync();
    return Ok(list);
  }

  [HttpDelete("{id}")]
  [AllowAnonymous]
  public async Task<IActionResult> Delete(int id)
  {
    var userId = GetUserId();
    var list = await _context.RecipeList.FirstOrDefaultAsync(l => l.Id == id && l.OwnerId == userId);
    if (list is null) return NotFound();
    _context.RecipeList.Remove(list);
    await _context.SaveChangesAsync();
    return Ok(new { deleted = true });
  }

  [HttpGet("{id}")]
  [AllowAnonymous]
  public async Task<IActionResult> Get(int id)
  {
    var userId = GetUserId();
    var list = await _context.RecipeList
      .Include(l => l.Items)
      .ThenInclude(i => i.Recipe!)
      .FirstOrDefaultAsync(l => l.Id == id && l.OwnerId == userId);
    if (list is null) return NotFound();
    return Ok(list);
  }

  [HttpPost("{id}/recipes/{recipeId}")]
  [AllowAnonymous]
  public async Task<IActionResult> AddRecipe(int id, int recipeId)
  {
    var userId = GetUserId();
    var list = await _context.RecipeList.FirstOrDefaultAsync(l => l.Id == id && l.OwnerId == userId);
    if (list is null) return NotFound();
    var recipe = await _context.Recipe.FirstOrDefaultAsync(r => r.Id == recipeId && r.OwnerId == userId);
    if (recipe is null) return NotFound();
    var exists = await _context.RecipeListItem.AnyAsync(i => i.RecipeListId == id && i.RecipeId == recipeId);
    if (exists) return Ok(new { added = false });
    var pos = await _context.RecipeListItem.Where(i => i.RecipeListId == id).MaxAsync(i => (int?)i.Position) ?? 0;
    _context.RecipeListItem.Add(new Server.Models.RecipeListItem { RecipeListId = id, RecipeId = recipeId, Position = pos + 1 });
    await _context.SaveChangesAsync();
    return Ok(new { added = true });
  }

  [HttpDelete("{id}/recipes/{recipeId}")]
  [AllowAnonymous]
  public async Task<IActionResult> RemoveRecipe(int id, int recipeId)
  {
    var userId = GetUserId();
    var list = await _context.RecipeList.FirstOrDefaultAsync(l => l.Id == id && l.OwnerId == userId);
    if (list is null) return NotFound();
    var item = await _context.RecipeListItem.FirstOrDefaultAsync(i => i.RecipeListId == id && i.RecipeId == recipeId);
    if (item is null) return NotFound();
    _context.RecipeListItem.Remove(item);
    await _context.SaveChangesAsync();
    return Ok(new { removed = true });
  }
}

