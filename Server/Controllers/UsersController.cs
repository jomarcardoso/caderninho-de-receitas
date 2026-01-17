using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Server.Models;
using Server.Dtos;
using Server.Services;
using Server.Shared;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
  private readonly UserProfileService _profiles;
  private readonly AppDbContext _context;
  private readonly RecipeService _recipeService;
  private readonly IMapper _mapper;

  public UsersController(UserProfileService profiles, AppDbContext context, RecipeService recipeService, IMapper mapper)
  {
    _profiles = profiles;
    _context = context;
    _recipeService = recipeService;
    _mapper = mapper;
  }

  private bool IsAdmin() => User.IsInRole("admin");

  [HttpGet("me")]
  [Authorize]
  public async Task<IActionResult> Me()
  {
    var profile = await _profiles.UpsertFromClaimsAsync(User);
    if (profile is null) return Unauthorized();
    var ctx = new UserProfileViewContext(true, IsAdmin(), false);
    return Ok(UserProfileResponseBuilder.Build(profile, ctx));
  }

  [HttpGet("featured")]
  [AllowAnonymous]
  public async Task<IActionResult> Featured([FromQuery] int quantity = 6)
  {
    var list = await _profiles.GetFeaturedAsync(quantity);
    var ctx = new UserProfileViewContext(false, false, false);
    return Ok(list.Select(p => UserProfileResponseBuilder.Build(p, ctx)).ToList());
  }

  [HttpGet("{ownerId}")]
  [AllowAnonymous]
  public async Task<IActionResult> GetById(string ownerId, [FromQuery] string? shareToken = null)
  {
    if (string.IsNullOrWhiteSpace(ownerId)) return BadRequest();
    ownerId = ownerId.Trim();

    var callerId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value?.Trim();
    var isOwner = !string.IsNullOrWhiteSpace(callerId) && string.Equals(ownerId, callerId, StringComparison.Ordinal);
    var isAdmin = IsAdmin();

    var profile = await _profiles.GetByOwnerIdAsync(ownerId);
    if (profile is null) return NotFound();

    var hasValidShareToken = !string.IsNullOrWhiteSpace(shareToken)
      && !string.IsNullOrWhiteSpace(profile.ShareToken)
      && string.Equals(profile.ShareToken, shareToken, StringComparison.Ordinal)
      && (profile.ShareTokenRevokedAt is null);

    if (!isOwner && !isAdmin && !hasValidShareToken && (profile.Visibility != Visibility.Public || profile.TombstoneStatus != TombstoneStatus.Active))
    {
      return NotFound();
    }

    var profileCtx = new UserProfileViewContext(isOwner, isAdmin, hasValidShareToken);
    var profilePayload = UserProfileResponseBuilder.Build(profile, profileCtx);

    // Public profile should always surface only published/active content.
    var recipes = await _context.Recipe
      .AsNoTracking()
      .Include(r => r.Owner)
      .Include(r => r.Food)
      .Include(r => r.PublishedRevision)
        .ThenInclude(rv => rv.Steps)
        .ThenInclude(s => s.Ingredients)
        .ThenInclude(i => i.Food)
      .Include(r => r.Revisions)
      .Where(r =>
        r.OwnerId == ownerId &&
        r.Visibility == Visibility.Public &&
        r.TombstoneStatus == TombstoneStatus.Active &&
        r.PublishedRevisionId != null)
      .ToListAsync();

    var recipeDtos = recipes
      .Select(r => _recipeService.BuildRecipeResponse(r, RecipeService.RevisionView.PublishedPreferred, callerId))
      .ToList();

    // Collect only public lists and keep only items pointing to public recipes with published revisions
    var lists = await _context.RecipeList
      .AsNoTracking()
      .Where(l => l.OwnerId == ownerId && l.Visibility == Visibility.Public)
      .Include(l => l.Items)
      .ThenInclude(i => i.Recipe)
      .ThenInclude(r => r.Owner)
      .Include(l => l.Items)
      .ThenInclude(i => i.Recipe)
      .ThenInclude(r => r.Food)
      .Include(l => l.Items)
      .ThenInclude(i => i.Recipe)
      .ThenInclude(r => r.PublishedRevision)
      .ThenInclude(rv => rv.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .ToListAsync();

    var listDtos = lists.Select(l => new PublicRecipeListResponse
    {
      Id = l.Id,
      OwnerId = l.OwnerId,
      Name = l.Name,
      Visibility = l.Visibility,
      CreatedAt = l.CreatedAt,
      UpdatedAt = l.UpdatedAt,
      Items = l.Items
        .Where(i => i.Recipe is not null)
        .OrderBy(i => i.Position)
        .Select(i =>
        {
          var recipe = i.Recipe!;
          if (recipe.Visibility != Visibility.Public || recipe.TombstoneStatus != TombstoneStatus.Active)
          {
            return null;
          }
          var recipePayload = _recipeService.BuildRecipeResponse(recipe, RecipeService.RevisionView.PublishedPreferred, callerId);
          return new PublicRecipeListItemResponse
          {
            RecipeListId = i.RecipeListId,
            Position = i.Position,
            CreatedAt = i.CreatedAt,
            Recipe = recipePayload
          };
        })
        .Where(i => i is not null)
        .Select(i => i!)
        .ToList()
    }).ToList();

    var response = new PublicUserResponse
    {
      Profile = profilePayload,
      Recipes = recipeDtos,
      RecipeLists = listDtos,
      IsOwner = isOwner
    };

    return Ok(response);
  }

  [HttpPost("feature/{ownerId}")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> Feature(string ownerId)
  {
    var ok = await _profiles.SetFeaturedAsync(ownerId, true);
    if (!ok) return NotFound();
    return NoContent();
  }

  [HttpDelete("feature/{ownerId}")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> Unfeature(string ownerId)
  {
    var ok = await _profiles.SetFeaturedAsync(ownerId, false);
    if (!ok) return NotFound();
    return NoContent();
  }

}

public class PublicUserResponse
{
  public UserProfileResponse Profile { get; set; } = new();
  public List<RecipeResponse> Recipes { get; set; } = new();
  public List<PublicRecipeListResponse> RecipeLists { get; set; } = new();
  public bool IsOwner { get; set; } = false;
}

public class PublicRecipeListResponse
{
  public int Id { get; set; }
  public string OwnerId { get; set; } = string.Empty;
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public Visibility Visibility { get; set; } = Visibility.Private;
  public DateTime CreatedAt { get; set; }
  public DateTime UpdatedAt { get; set; }
  public List<PublicRecipeListItemResponse> Items { get; set; } = new();
}

public class PublicRecipeListItemResponse
{
  public int RecipeListId { get; set; }
  public int Position { get; set; }
  public DateTime CreatedAt { get; set; }
  public RecipeResponse? Recipe { get; set; }
}
