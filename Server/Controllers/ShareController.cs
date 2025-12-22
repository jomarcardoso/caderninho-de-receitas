using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Server.Services;
using AutoMapper;
using Server.Dtos;
using Server.Models;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShareController : ControllerBase
{
  private readonly AppDbContext _context;
  private readonly RecipeService _recipeService;
  private readonly IMapper _mapper;

  public ShareController(AppDbContext context, RecipeService recipeService, IMapper mapper)
  {
    _context = context;
    _recipeService = recipeService;
    _mapper = mapper;
  }

  private string GetUserId()
  {
    var authId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    return string.IsNullOrWhiteSpace(authId) ? string.Empty : authId!.Trim();
  }

  // GET api/share/recipe/{slug}
  [HttpGet("recipe/{slug}")]
  public async Task<IActionResult> GetSharedRecipe(string slug)
  {
    if (string.IsNullOrWhiteSpace(slug)) return NotFound();

    var share = await _context.RecipeShare.AsNoTracking().FirstOrDefaultAsync(s => s.Slug == slug);
    if (share is null || !share.IsPublic) return NotFound();

    // Redirect to a public share page handled by the frontend (e.g., /share/{slug})
    var target = Url.RouteUrl(null, new { }, Request.Scheme) ?? string.Empty;
    var baseUrl = string.IsNullOrWhiteSpace(target) ? $"{Request.Scheme}://{Request.Host}" : target.TrimEnd('/');
    var url = $"{baseUrl}/share/{slug}";
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
    if (string.IsNullOrWhiteSpace(userId) || !string.Equals(recipe.OwnerId, userId, StringComparison.Ordinal))
      return Forbid();

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

    var source = await _recipeService.FindRecipeWithDetailsById(share.RecipeId);

    if (source is null) return NotFound();

    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Forbid();

    var clone = _recipeService.CloneRecipeForUser(source, userId);
    _context.Recipe.Add(clone);
    await _context.SaveChangesAsync();

    var latest = clone.Revisions.FirstOrDefault();
    if (latest is not null)
    {
      clone.LatestRevisionId = latest.Id;
      clone.LatestRevision = latest;
      _context.Recipe.Update(clone);
      await _context.SaveChangesAsync();
    }

    return Ok(new CopyRecipeResponse(clone.Id));
  }

  // GET api/share/recipe/{slug}/data
  // Returns recipe details for a share slug, regardless of Recipe.IsPublic.
  // This endpoint is intended for share previews and should be considered a
  // "secret link" access (slug is required).
  [HttpGet("recipe/{slug}/data")]
  public async Task<IActionResult> GetSharedRecipeData(string slug)
  {
    if (string.IsNullOrWhiteSpace(slug)) return NotFound();

    var share = await _context.RecipeShare.AsNoTracking().FirstOrDefaultAsync(s => s.Slug == slug);
    if (share is null) return NotFound();

    var recipe = await _recipeService.FindRecipeWithDetailsById(share.RecipeId);

    if (recipe is null) return NotFound();

    // Map recipe
    var recipeResponse = _recipeService.BuildRecipeResponse(recipe, RecipeService.RevisionView.PublishedPreferred, GetUserId());

    // Collect foods referenced by the recipe (including steps/ingredients)
    var foods = FoodService.GetFoodsFromRecipes(new List<Recipe> { recipe });

    var response = new RecipeDataResponse
    {
      Recipes = recipeResponse,
      RelatedRecipes = new List<RecipeResponse>(),
      Foods = _mapper.Map<List<Food>>(foods),
    };

    return Ok(response);
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
