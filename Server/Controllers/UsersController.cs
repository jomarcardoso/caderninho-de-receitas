using Microsoft.AspNetCore.Mvc;
using Server.Services;
using AutoMapper;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Server.Models;
using Server.Dtos;

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

  [HttpGet("me")]
  [Authorize]
  public async Task<IActionResult> Me()
  {
    var profile = await _profiles.UpsertFromClaimsAsync(User);
    if (profile is null) return Unauthorized();
    return Ok(profile);
  }

  [HttpGet("featured")]
  [AllowAnonymous]
  public async Task<IActionResult> Featured([FromQuery] int quantity = 6)
  {
    var list = await _profiles.GetFeaturedAsync(quantity);
    return Ok(list);
  }

  [HttpGet("{ownerId}")]
  [AllowAnonymous]
  public async Task<IActionResult> GetById(string ownerId)
  {
    if (string.IsNullOrWhiteSpace(ownerId)) return BadRequest();
    ownerId = ownerId.Trim();

    var callerId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value?.Trim();
    var isOwner = !string.IsNullOrWhiteSpace(callerId) && string.Equals(ownerId, callerId, StringComparison.Ordinal);

    var profile = await _profiles.GetByOwnerIdAsync(ownerId);
    if (profile is null) return NotFound();

    // Public profile should always surface only published/active content.
    var recipes = await _context.Recipe
      .AsNoTracking()
      .Include(r => r.Owner)
      .Include(r => r.PublishedRevision)
        .ThenInclude(rv => rv.Steps)
        .ThenInclude(s => s.Ingredients)
        .ThenInclude(i => i.Food)
      .Include(r => r.Revisions)
      .Where(r =>
        r.OwnerId == ownerId &&
        r.Visibility == RecipeVisibility.Public &&
        r.TombstoneStatus == RecipeTombstoneStatus.Active &&
        r.PublishedRevisionId != null)
      .ToListAsync();

    var recipeDtos = recipes
      .Select(r => _recipeService.BuildRecipeResponse(r, RecipeService.RevisionView.PublishedPreferred, callerId))
      .ToList();

    // Collect only public lists and keep only items pointing to public recipes with published revisions
    var lists = await _context.RecipeList
      .AsNoTracking()
      .Where(l => l.OwnerId == ownerId && l.IsPublic)
      .Include(l => l.Items)
      .ThenInclude(i => i.Recipe)
      .ThenInclude(r => r.Owner)
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
      Description = l.Description,
      IsPublic = l.IsPublic,
      CreatedAt = l.CreatedAt,
      UpdatedAt = l.UpdatedAt,
      Items = l.Items
        .Where(i => i.Recipe is not null)
        .OrderBy(i => i.Position)
        .Select(i =>
        {
          var recipe = i.Recipe!;
          if (recipe.Visibility != RecipeVisibility.Public || recipe.TombstoneStatus != RecipeTombstoneStatus.Active)
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
      Profile = new UserProfileDto
      {
        Id = profile.Id,
        DisplayName = profile.DisplayName,
        PictureUrl = profile.PictureUrl,
        Description = profile.Description,
        Theme = profile.Theme,
        IsPublic = profile.IsPublic,
        Verified = profile.Verified,
        Allergies = profile.Allergies,
        Intolerances = profile.Intolerances,
        MedicalRestrictions = profile.MedicalRestrictions,
        DietStyles = profile.DietStyles,
        CulturalRestrictions = profile.CulturalRestrictions,
        PersonalPreferences = profile.PersonalPreferences
      },
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
  public UserProfileDto Profile { get; set; } = new();
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
  public bool IsPublic { get; set; } = false;
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
