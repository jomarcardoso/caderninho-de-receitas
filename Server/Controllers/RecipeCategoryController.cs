using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Models;
using Server.Response;
using Server.Services;
using Server.Shared;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Server.Controllers;

[ApiController]
[Route("api/recipe-category")]
public class RecipeCategoryController : ControllerBase
{
  private readonly AppDbContext _context;

  public RecipeCategoryController(AppDbContext context)
  {
    _context = context;
  }

  private readonly JsonSerializerOptions _payloadJsonOptions = new()
  {
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
  };

  private string? GetUserId()
    => User.FindFirstValue(ClaimTypes.NameIdentifier)?.Trim();

  private bool IsAdmin()
    => User.IsInRole(Role.Admin.ToString()) || User.IsInRole(Role.Owner.ToString());

  private string SerializePayload(RecipeCategoryDto dto)
    => JsonSerializer.Serialize(dto, _payloadJsonOptions);

  private RecipeCategoryDto? DeserializePayload(string payload)
  {
    try
    {
      return JsonSerializer.Deserialize<RecipeCategoryDto>(payload, _payloadJsonOptions);
    }
    catch
    {
      return null;
    }
  }

  private static string NormalizeSlug(string key)
  {
    if (string.IsNullOrWhiteSpace(key)) return string.Empty;
    var normalized = key.Trim().ToLowerInvariant().Normalize(NormalizationForm.FormD);
    var sb = new StringBuilder();
    foreach (var ch in normalized)
    {
      var uc = CharUnicodeInfo.GetUnicodeCategory(ch);
      if (uc == UnicodeCategory.NonSpacingMark) continue;
      if (char.IsLetterOrDigit(ch)) sb.Append(ch);
      else sb.Append('-');
    }
    var slug = sb.ToString();
    while (slug.Contains("--")) slug = slug.Replace("--", "-");
    slug = slug.Trim('-');
    return slug;
  }

  private static string PickLabel(RecipeCategoryDto dto)
  {
    var candidates = new[]
    {
      dto.Name?.Pt,
      dto.Name?.En
    };
    return candidates.FirstOrDefault(v => !string.IsNullOrWhiteSpace(v))?.Trim() ?? string.Empty;
  }

  private static RecipeCategoryDto MergeDto(RecipeCategory existing, RecipeCategoryDto incoming)
  {
    return new RecipeCategoryDto
    {
      Name = incoming.Name ?? existing.Name,
      NamePlural = incoming.NamePlural ?? existing.NamePlural,
      Description = incoming.Description ?? existing.Description,
      Img = incoming.Img ?? existing.Img,
      BannerImg = incoming.BannerImg ?? existing.BannerImg,
      Featured = incoming.Featured ?? existing.Featured
    };
  }

  private static void ApplyDto(RecipeCategory target, RecipeCategoryDto dto)
  {
    target.Name = dto.Name ?? target.Name;
    target.NamePlural = dto.NamePlural ?? target.NamePlural;
    target.Description = dto.Description ?? target.Description;
    if (dto.Img != null) target.Img = dto.Img;
    if (dto.BannerImg != null) target.BannerImg = dto.BannerImg;
    if (dto.Featured.HasValue) target.Featured = dto.Featured.Value;
  }

  private static LanguageTextBase ToBase(LanguageText text)
    => new LanguageTextBase { En = text.En, Pt = text.Pt };

  private static RecipeCategoryResponse ToResponse(RecipeCategory entity, int? overrideId = null)
  {
    return new RecipeCategoryResponse
    {
      Id = overrideId ?? entity.Id,
      Key = entity.Slug,
      Url = entity.Slug,
      Name = ToBase(entity.Name),
      NamePlural = ToBase(entity.NamePlural),
      Description = ToBase(entity.Description),
      Img = entity.Img,
      BannerImg = entity.BannerImg,
      Featured = entity.Featured
    };
  }

  private static RecipeCategoryResponse ToResponse(RecipeCategoryDto dto, string slug, int id)
  {
    var name = dto.Name ?? new LanguageText { En = slug, Pt = slug };
    var plural = dto.NamePlural ?? dto.Name ?? new LanguageText { En = slug, Pt = slug };
    var desc = dto.Description ?? new LanguageText { En = string.Empty, Pt = string.Empty };
    return new RecipeCategoryResponse
    {
      Id = id,
      Key = slug,
      Url = slug,
      Name = ToBase(name),
      NamePlural = ToBase(plural),
      Description = ToBase(desc),
      Img = dto.Img ?? string.Empty,
      BannerImg = dto.BannerImg ?? string.Empty,
      Featured = dto.Featured ?? false
    };
  }

  private UserProfileResponse BuildUserResponse(UserProfile? profile, string fallbackId)
  {
    if (profile is null) return new UserProfileResponse { Id = fallbackId };
    return UserProfileResponseBuilder.Build(profile, new UserProfileViewContext(
      IsOwner: false,
      IsAdmin: false,
      HasShareToken: false));
  }

  private RecipeCategoryRevisionResponse BuildRevisionResponse(
    RecipeCategoryRevision revision,
    RecipeCategoryDto? payload,
    RecipeCategory? category = null)
  {
    var slug = category?.Slug;
    if (string.IsNullOrWhiteSpace(slug))
    {
      slug = payload is null ? string.Empty : NormalizeSlug(PickLabel(payload));
    }

    var id = revision.Type == RevisionType.Create ? 0 : (category?.Id ?? revision.RecipeCategoryId ?? 0);
    var recipeCategory = category is not null
      ? ToResponse(category, id)
      : ToResponse(payload ?? new RecipeCategoryDto { Name = new LanguageText { En = slug, Pt = slug } }, slug ?? string.Empty, id);

    return new RecipeCategoryRevisionResponse
    {
      Id = revision.Id,
      RecipeCategory = recipeCategory,
      CreatedAt = revision.CreatedAtUtc,
      UpdatedAt = revision.UpdatedAtUtc,
      CreatedByUser = BuildUserResponse(revision.CreatedByUser, revision.CreatedByUserId),
      Status = revision.Status,
      Type = revision.Type
    };
  }

  [HttpGet]
  [AllowAnonymous]
  public async Task<ActionResult<IEnumerable<RecipeCategoryResponse>>> GetAll([FromQuery] bool? featured = null)
  {
    var query = _context.RecipeCategory
      .AsNoTracking()
      .Where(c => c.Visibility == Visibility.Public);

    if (featured.HasValue)
    {
      query = query.Where(c => c.Featured == featured.Value);
    }

    var list = await query
      .OrderBy(c => c.Name.Pt ?? c.Name.En)
      .ToListAsync();

    var response = list.Select(item => ToResponse(item)).ToList();
    return Ok(response);
  }

  [HttpPost]
  [Authorize(Policy = "KeeperOrHigher")]
  public async Task<ActionResult<RecipeCategoryRevisionResponse>> Create([FromBody] RecipeCategoryDto dto)
  {
    if (dto is null) return BadRequest();
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();

    var label = PickLabel(dto);
    var slug = NormalizeSlug(label);
    if (string.IsNullOrWhiteSpace(slug)) return BadRequest("Invalid name");

    var now = DateTime.UtcNow;
    var revision = new RecipeCategoryRevision
    {
      RecipeCategoryId = null,
      Payload = SerializePayload(dto),
      CreatedByUserId = userId,
      CreatedAtUtc = now,
      UpdatedAtUtc = now,
      Status = IsAdmin() ? RevisionStatus.Approved : RevisionStatus.PendingReview,
      Type = RevisionType.Create
    };

    RecipeCategory? category = await _context.RecipeCategory.FirstOrDefaultAsync(c => c.Slug == slug);
    if (IsAdmin())
    {
      if (category is null)
      {
        category = new RecipeCategory
        {
          Slug = slug,
          Name = dto.Name,
          NamePlural = dto.NamePlural ?? dto.Name,
          Description = dto.Description ?? new LanguageText { En = string.Empty, Pt = string.Empty },
          Img = dto.Img ?? string.Empty,
          BannerImg = dto.BannerImg ?? string.Empty,
          Visibility = Visibility.Public,
          Featured = dto.Featured ?? false,
          CreatedAt = DateTime.UtcNow
        };
        _context.RecipeCategory.Add(category);
        await _context.SaveChangesAsync();
      }
      else
      {
        var merged = MergeDto(category, dto);
        ApplyDto(category, merged);
        category.Visibility = Visibility.Public;
      }

      revision.RecipeCategoryId = category.Id;
      revision.ReviewedByUserId = userId;
      revision.ReviewedAtUtc = now;
    }

    _context.RecipeCategoryRevision.Add(revision);
    await _context.SaveChangesAsync();

    revision.CreatedByUser = await _context.UserProfile.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
    return Ok(BuildRevisionResponse(revision, dto, category));
  }

  [HttpPut("{id}")]
  [Authorize(Policy = "KeeperOrHigher")]
  public async Task<ActionResult<RecipeCategoryRevisionResponse>> Update(int id, [FromBody] RecipeCategoryDto dto)
  {
    if (dto is null) return BadRequest();
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();

    var category = await _context.RecipeCategory.FindAsync(id);
    if (category is null) return NotFound();

    var merged = MergeDto(category, dto);
    var now = DateTime.UtcNow;
    var revision = new RecipeCategoryRevision
    {
      RecipeCategoryId = id,
      Payload = SerializePayload(merged),
      CreatedByUserId = userId,
      CreatedAtUtc = now,
      UpdatedAtUtc = now,
      Status = IsAdmin() ? RevisionStatus.Approved : RevisionStatus.PendingReview,
      Type = RevisionType.Update
    };

    if (IsAdmin())
    {
      ApplyDto(category, merged);
      revision.ReviewedByUserId = userId;
      revision.ReviewedAtUtc = now;
    }

    _context.RecipeCategoryRevision.Add(revision);
    await _context.SaveChangesAsync();

    revision.CreatedByUser = await _context.UserProfile.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
    return Ok(BuildRevisionResponse(revision, merged, category));
  }

  [HttpDelete("{id}")]
  [Authorize(Policy = "KeeperOrHigher")]
  public async Task<ActionResult<RecipeCategoryRevisionResponse>> Delete(int id)
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();

    var category = await _context.RecipeCategory.FindAsync(id);
    if (category is null) return NotFound();

    var payload = new RecipeCategoryDto
    {
      Name = category.Name,
      NamePlural = category.NamePlural,
      Description = category.Description,
      Img = category.Img,
      BannerImg = category.BannerImg
    };

    var now = DateTime.UtcNow;
    var revision = new RecipeCategoryRevision
    {
      RecipeCategoryId = id,
      Payload = SerializePayload(payload),
      CreatedByUserId = userId,
      CreatedAtUtc = now,
      UpdatedAtUtc = now,
      Status = IsAdmin() ? RevisionStatus.Approved : RevisionStatus.PendingReview,
      Type = RevisionType.Delete
    };

    if (IsAdmin())
    {
      _context.RecipeCategory.Remove(category);
      revision.ReviewedByUserId = userId;
      revision.ReviewedAtUtc = now;
    }

    _context.RecipeCategoryRevision.Add(revision);
    await _context.SaveChangesAsync();

    revision.CreatedByUser = await _context.UserProfile.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
    return Ok(BuildRevisionResponse(revision, payload, category));
  }

  [HttpGet("revisions")]
  [Authorize(Policy = "KeeperOrHigher")]
  public async Task<ActionResult<IEnumerable<RecipeCategoryRevisionResponse>>> GetRevisions()
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();

    var list = await _context.RecipeCategoryRevision
      .AsNoTracking()
      .Include(r => r.CreatedByUser)
      .Where(r => r.CreatedByUserId == userId)
      .OrderByDescending(r => r.CreatedAtUtc)
      .Take(200)
      .ToListAsync();

    var ids = list.Where(r => r.RecipeCategoryId.HasValue).Select(r => r.RecipeCategoryId!.Value).Distinct().ToList();
    var categories = await _context.RecipeCategory.AsNoTracking().Where(c => ids.Contains(c.Id)).ToListAsync();
    var categoryMap = categories.ToDictionary(c => c.Id);

    var responses = list.Select(revision =>
    {
      categoryMap.TryGetValue(revision.RecipeCategoryId ?? 0, out var category);
      var payload = DeserializePayload(revision.Payload);
      return BuildRevisionResponse(revision, payload, category);
    }).ToList();

    return Ok(responses);
  }

  [HttpGet("pending")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<ActionResult<IEnumerable<RecipeCategoryRevisionResponse>>> GetPending()
  {
    var list = await _context.RecipeCategoryRevision
      .AsNoTracking()
      .Include(r => r.CreatedByUser)
      .Where(r => r.Status == RevisionStatus.PendingReview)
      .OrderByDescending(r => r.CreatedAtUtc)
      .Take(200)
      .ToListAsync();

    var ids = list.Where(r => r.RecipeCategoryId.HasValue).Select(r => r.RecipeCategoryId!.Value).Distinct().ToList();
    var categories = await _context.RecipeCategory.AsNoTracking().Where(c => ids.Contains(c.Id)).ToListAsync();
    var categoryMap = categories.ToDictionary(c => c.Id);

    var responses = list.Select(revision =>
    {
      categoryMap.TryGetValue(revision.RecipeCategoryId ?? 0, out var category);
      var payload = DeserializePayload(revision.Payload);
      return BuildRevisionResponse(revision, payload, category);
    }).ToList();

    return Ok(responses);
  }

  [HttpPost("{revisionId}/approve")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> ApproveRevision(int revisionId)
  {
    var revision = await _context.RecipeCategoryRevision.FindAsync(revisionId);
    if (revision is null) return NotFound();
    if (revision.Status != RevisionStatus.PendingReview) return BadRequest("Already processed");

    var userId = GetUserId() ?? "admin";
    var now = DateTime.UtcNow;
    var payload = DeserializePayload(revision.Payload);
    if (payload is null) return BadRequest("Invalid payload");

    RecipeCategory? category = null;
    if (revision.RecipeCategoryId.HasValue)
    {
      category = await _context.RecipeCategory.FindAsync(revision.RecipeCategoryId.Value);
    }

    switch (revision.Type)
    {
      case RevisionType.Create:
        if (category is null)
        {
          var slug = NormalizeSlug(PickLabel(payload));
          if (string.IsNullOrWhiteSpace(slug)) return BadRequest("Invalid payload");
          category = new RecipeCategory
          {
            Slug = slug,
            Name = payload.Name,
            NamePlural = payload.NamePlural ?? payload.Name,
            Description = payload.Description ?? new LanguageText { En = string.Empty, Pt = string.Empty },
            Img = payload.Img ?? string.Empty,
            BannerImg = payload.BannerImg ?? string.Empty,
            Visibility = Visibility.Public,
            Featured = payload.Featured ?? false,
            CreatedAt = DateTime.UtcNow
          };
          _context.RecipeCategory.Add(category);
          await _context.SaveChangesAsync();
        }
        else
        {
          var merged = MergeDto(category, payload);
          ApplyDto(category, merged);
          category.Visibility = Visibility.Public;
        }
        revision.RecipeCategoryId = category.Id;
        break;
      case RevisionType.Update:
        if (category is null) return NotFound();
        var mergedUpdate = MergeDto(category, payload);
        ApplyDto(category, mergedUpdate);
        break;
      case RevisionType.Delete:
        if (category is null) return NotFound();
        _context.RecipeCategory.Remove(category);
        break;
    }

    revision.Status = RevisionStatus.Approved;
    revision.ReviewedByUserId = userId;
    revision.ReviewedAtUtc = now;
    revision.UpdatedAtUtc = now;
    await _context.SaveChangesAsync();
    return Ok();
  }

  [HttpPost("{revisionId}/deny")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> RejectRevision(int revisionId)
  {
    var revision = await _context.RecipeCategoryRevision.FindAsync(revisionId);
    if (revision is null) return NotFound();
    if (revision.Status != RevisionStatus.PendingReview) return BadRequest("Already processed");

    revision.Status = RevisionStatus.Rejected;
    revision.ReviewedByUserId = GetUserId() ?? "admin";
    revision.ReviewedAtUtc = DateTime.UtcNow;
    revision.UpdatedAtUtc = revision.ReviewedAtUtc.Value;
    await _context.SaveChangesAsync();
    return Ok();
  }
}
