using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShareController : ControllerBase
{
  private readonly AppDbContext _context;
  private readonly RecipeService _recipeService;

  public ShareController(AppDbContext context, RecipeService recipeService)
  {
    _context = context;
    _recipeService = recipeService;
  }

  private string GetUserId() => User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

  // GET api/share/recipe/{slug}
  [HttpGet("recipe/{slug}")]
  public async Task<IActionResult> GetSharedRecipe(string slug)
  {
    if (string.IsNullOrWhiteSpace(slug)) return NotFound();

    var share = await _context.RecipeShare.AsNoTracking().FirstOrDefaultAsync(s => s.Slug == slug);
    if (share is null || !share.IsPublic) return NotFound();

    // Redirect to public preview page with OpenGraph meta
    var target = Url.RouteUrl(null, new { }, Request.Scheme) ?? string.Empty;
    var baseUrl = string.IsNullOrWhiteSpace(target) ? $"{Request.Scheme}://{Request.Host}" : target.TrimEnd('/');
    var url = $"{baseUrl}/recipe/{share.RecipeId}";
    return Redirect(url);
  }

  public class RecipeShareCreateRequest
  {
    public int RecipeId { get; set; }
    public bool? IsPublic { get; set; }
  }

  public record RecipeShareResponse(string Slug, string Url, string PublicUrl, int RecipeId, DateTime CreatedAt, bool IsPublic);

  [HttpPost("recipe")]
  [Authorize]
  public async Task<IActionResult> CreateShare([FromBody] RecipeShareCreateRequest request)
  {
    if (request is null || request.RecipeId <= 0) return BadRequest();

    var recipe = await _context.Recipe.AsNoTracking().FirstOrDefaultAsync(r => r.Id == request.RecipeId);
    if (recipe is null) return NotFound();

    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId) || recipe.OwnerId != userId) return Forbid();

    // find existing share for this recipe/owner if any (single-per-recipe strategy)
    var existing = await _context.RecipeShare.AsNoTracking().FirstOrDefaultAsync(s => s.RecipeId == recipe.Id);
    var baseUrl = $"{Request.Scheme}://{Request.Host}".TrimEnd('/');

    if (existing is not null)
    {
      var existingUrl = $"{baseUrl}/api/share/recipe/{existing.Slug}";
      var publicUrlExisting = $"{baseUrl}/recipe/{recipe.Id}?ref={recipe.OwnerId}";
      return Ok(new RecipeShareResponse(existing.Slug, existingUrl, publicUrlExisting, recipe.Id, existing.CreatedAt, existing.IsPublic));
    }

    string slug = GenerateSlug();
    while (await _context.RecipeShare.AnyAsync(s => s.Slug == slug))
    {
      slug = GenerateSlug();
    }

    var share = new Models.RecipeShare
    {
      Id = Guid.NewGuid(),
      RecipeId = recipe.Id,
      Slug = slug,
      OwnerId = recipe.OwnerId ?? string.Empty,
      CreatedAt = DateTime.UtcNow,
      IsPublic = request.IsPublic ?? true,
    };

    _context.RecipeShare.Add(share);
    await _context.SaveChangesAsync();

    var url = $"{baseUrl}/api/share/recipe/{slug}";
    var publicUrl = $"{baseUrl}/recipe/{recipe.Id}?ref={recipe.OwnerId}";
    return Ok(new RecipeShareResponse(slug, url, publicUrl, recipe.Id, share.CreatedAt, share.IsPublic));
  }

  public record CopyRecipeResponse(int NewRecipeId);

  [HttpPost("recipe/{slug}/copy")]
  [Authorize]
  public async Task<IActionResult> CopyFromShare(string slug)
  {
    var share = await _context.RecipeShare.AsNoTracking().FirstOrDefaultAsync(s => s.Slug == slug && s.IsPublic);
    if (share is null) return NotFound();

    var source = await _context.Recipe
      .Include(r => r.Steps)
        .ThenInclude(s => s.Ingredients)
          .ThenInclude(i => i.Food)
      .Include(r => r.Food)
      .FirstOrDefaultAsync(r => r.Id == share.RecipeId);

    if (source is null) return NotFound();

    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Forbid();

    var clone = _recipeService.CloneRecipeForUser(source, userId);
    _context.Recipe.Add(clone);
    await _context.SaveChangesAsync();

    return Ok(new CopyRecipeResponse(clone.Id));
  }

  private static string GenerateSlug()
  {
    // simple 10-char base62 slug
    const string alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var rnd = System.Security.Cryptography.RandomNumberGenerator.Create();
    Span<byte> buffer = stackalloc byte[10];
    rnd.GetBytes(buffer);
    char[] chars = new char[10];
    for (int i = 0; i < buffer.Length; i++)
    {
      chars[i] = alphabet[buffer[i] % alphabet.Length];
    }
    return new string(chars);
  }
}
