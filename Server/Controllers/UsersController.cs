using Microsoft.AspNetCore.Mvc;
using Server.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Server.Models;
using Server.Dtos;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
  private readonly UserProfileService _profiles;
  private readonly AppDbContext _context;
  private readonly IMapper _mapper;

  public UsersController(UserProfileService profiles, AppDbContext context, IMapper mapper)
  {
    _profiles = profiles;
    _context = context;
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

    // Collect recipes the caller can see (public only, unless the caller is the owner)
    bool includePrivate = isOwner;
    var recipes = await _context.Recipe
      .AsNoTracking()
      .Include(r => r.Owner)
      .Include(r => r.Food)
      .Where(r => r.OwnerId == ownerId && (r.IsPublic || includePrivate))
      .ToListAsync();

    var recipeDtos = _mapper.Map<List<RecipeResponse>>(recipes);
    foreach (var r in recipeDtos)
    {
      try { r.IsOwner = isOwner && string.Equals(r.Author?.Id, ownerId, StringComparison.Ordinal); } catch { r.IsOwner = false; }
    }

    var recipeMap = recipeDtos.ToDictionary(r => r.Id, r => r);

    // Collect public (or own) lists with only allowed recipes
    var lists = await _context.RecipeList
      .AsNoTracking()
      .Where(l => l.OwnerId == ownerId && (l.IsPublic || includePrivate))
      .Include(l => l.Items)
      .ThenInclude(i => i.Recipe)
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
        .Where(i => i.Recipe is not null && (i.Recipe!.IsPublic || includePrivate))
        .OrderBy(i => i.Position)
        .Select(i =>
        {
          recipeMap.TryGetValue(i.RecipeId, out var recipe);
          return new PublicRecipeListItemResponse
          {
            RecipeListId = i.RecipeListId,
            Position = i.Position,
            CreatedAt = i.CreatedAt,
            Recipe = recipe
          };
        })
        .Where(i => i.Recipe is not null)
        .ToList()
    }).ToList();

    var response = new PublicUserResponse
    {
      Profile = new UserProfileDto
      {
        OwnerId = profile.OwnerId,
        DisplayName = profile.DisplayName,
        PictureUrl = profile.PictureUrl,
        Bio = profile.Bio,
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
      Recipes = recipeDtos.Where(r => includePrivate || r.IsPublic).ToList(),
      RecipeLists = listDtos,
      IsOwner = isOwner
    };

    return Ok(response);
  }

  [HttpPost("feature/{ownerId}")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> Feature(string ownerId)
  {
    var ok = await _profiles.SetFeaturedAsync(ownerId, true);
    if (!ok) return NotFound();
    return NoContent();
  }

  [HttpDelete("feature/{ownerId}")]
  [Authorize(Roles = "Admin")]
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
