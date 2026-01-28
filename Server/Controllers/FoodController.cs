using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Models;
using Server.Response;
using Server.Shared;
using System;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/food")]
public class FoodController : ControllerBase
{
  private readonly AppDbContext _context;
  private readonly IMapper _mapper;

  public FoodController(AppDbContext context, IMapper mapper)
  {
    _context = context;
    _mapper = mapper;
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

  private string SerializePayload(FoodDto dto)
    => JsonSerializer.Serialize(dto, _payloadJsonOptions);

  private FoodDto? DeserializePayload(string payload)
  {
    try
    {
      return JsonSerializer.Deserialize<FoodDto>(payload, _payloadJsonOptions);
    }
    catch
    {
      return null;
    }
  }

  private Food BuildFoodSnapshot(FoodDto dto)
  {
    var food = _mapper.Map<Food>(dto);
    food.Process();
    return food;
  }

  private FoodResponse? MapFoodResponse(Food? entity)
    => entity is null ? null : _mapper.Map<FoodResponse>(entity);

  private UserProfileResponse BuildUserResponse(UserProfile? profile, string fallbackId)
  {
    if (profile is null)
    {
      return new UserProfileResponse { Id = fallbackId };
    }

    return UserProfileResponseBuilder.Build(profile, new UserProfileViewContext(
      IsOwner: false,
      IsAdmin: false,
      HasShareToken: false));
  }

  private FoodRevisionResponse BuildFoodRevisionResponse(
    FoodRevision revision,
    FoodDto? payloadOverride = null,
    FoodResponse? originalOverride = null)
  {
    FoodResponse? original = revision.Type == RevisionType.Create ? null : originalOverride;
    FoodResponse? proposed = null;

    if (revision.Type != RevisionType.Delete)
    {
      var dto = payloadOverride ?? DeserializePayload(revision.Payload);
      if (dto is not null)
      {
        var snapshot = BuildFoodSnapshot(dto);
        proposed = _mapper.Map<FoodResponse>(snapshot);
        if (revision.Type == RevisionType.Create)
        {
          proposed.Id = 0;
        }
      }
    }

    return new FoodRevisionResponse
    {
      Id = revision.Id,
      Original = original,
      Proposed = proposed,
      CreatedAt = revision.CreatedAtUtc,
      UpdatedAt = revision.UpdatedAtUtc,
      CreatedByUser = BuildUserResponse(revision.CreatedByUser, revision.CreatedByUserId),
      Status = revision.Status,
      Type = revision.Type
    };
  }

  public class FoodImageSearchResult
  {
    public int FoodId { get; set; }
    public string? Name { get; set; }
    public List<string> Imgs { get; set; } = new();
  }

  // GET: api/food
  [HttpGet]
  public async Task<ActionResult<IEnumerable<FoodSummaryResponse>>> GetAll(
    [FromQuery] string? text = null,
    [FromQuery] string? categories = null,
    [FromQuery] int quantity = 20)
  {
    quantity = Math.Clamp(quantity <= 0 ? 20 : quantity, 1, 64);
    var lowered = (text ?? string.Empty).Trim().ToLowerInvariant();
    var categoryFilters = (categories ?? string.Empty)
      .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
      .Where(s => !string.IsNullOrWhiteSpace(s))
      .Select(s => s.ToLowerInvariant())
      .ToList();

    var query = _context.Food.AsNoTracking().AsQueryable();

    if (!string.IsNullOrWhiteSpace(lowered))
    {
      query = query.Where(f =>
        (f.Name.En != null && f.Name.En.ToLower().Contains(lowered)) ||
        (f.Name.Pt != null && f.Name.Pt.ToLower().Contains(lowered)) ||
        (f.Keys.En != null && f.Keys.En.ToLower().Contains(lowered)) ||
        (f.Keys.Pt != null && f.Keys.Pt.ToLower().Contains(lowered)));
    }

    if (categoryFilters.Any())
    {
      query = query.Where(f => (f.Categories ?? new List<string>())
        .Any(c => categoryFilters.Contains((c ?? string.Empty).ToLowerInvariant())));
    }

    var foods = await query
      .OrderBy(f => f.Name.Pt ?? f.Name.En)
      .Take(quantity)
      .Select(f => new FoodSummaryResponse
      {
        Id = f.Id,
        Name = f.Name,
        Icon = f.Icon != null ? f.Icon.Url : string.Empty,
        Imgs = f.Imgs.ToArray()
      })
      .ToListAsync();

    return Ok(foods);
  }

  // GET: api/food/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<FoodResponse>> GetById(int id)
  {
    var food = await _context.Food.AsNoTracking().FirstOrDefaultAsync(f => f.Id == id);
    if (food == null)
      return NotFound();
    return Ok(_mapper.Map<FoodResponse>(food));
  }

  // POST: api/food
  [HttpPost]
  [Authorize(Policy = "KeeperOrHigher")]
  public async Task<ActionResult<FoodRevisionResponse>> Create([FromBody] FoodDto foodDto)
  {
    if (foodDto is null) return BadRequest();
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();

    foodDto.Id = 0;
    var now = DateTime.UtcNow;
    var payload = SerializePayload(foodDto);
    var revision = new FoodRevision
    {
      FoodId = null,
      Payload = payload,
      CreatedByUserId = userId,
      CreatedAtUtc = now,
      UpdatedAtUtc = now,
      Status = IsAdmin() ? RevisionStatus.Approved : RevisionStatus.PendingReview,
      Type = RevisionType.Create
    };

    if (IsAdmin())
    {
      var entity = BuildFoodSnapshot(foodDto);
      entity.Id = 0;
      _context.Food.Add(entity);
      await _context.SaveChangesAsync();
      revision.FoodId = entity.Id;
      revision.ReviewedByUserId = userId;
      revision.ReviewedAtUtc = now;
    }

    _context.FoodRevision.Add(revision);
    await _context.SaveChangesAsync();

    revision.CreatedByUser = await _context.UserProfile.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
    var response = BuildFoodRevisionResponse(revision, foodDto);
    return Ok(response);
  }

  // POST: api/food/bulk
  [HttpPost("bulk")]
  [HttpPost("many")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<ActionResult<IEnumerable<FoodRevisionResponse>>> CreateMany([FromBody] FoodDto[] foods)
  {
    if (foods is null || foods.Length == 0) return Ok(Array.Empty<FoodRevisionResponse>());

    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();

    var now = DateTime.UtcNow;
    var entities = new List<Food>();
    var payloads = new List<FoodDto>();

    foreach (var dto in foods)
    {
      var safeDto = dto ?? new FoodDto();
      safeDto.Id = 0;
      payloads.Add(safeDto);

      var food = BuildFoodSnapshot(safeDto);
      food.Id = 0;
      entities.Add(food);
    }

    _context.Food.AddRange(entities);
    await _context.SaveChangesAsync();

    var revisions = new List<FoodRevision>();
    for (int i = 0; i < entities.Count; i++)
    {
      var payloadDto = payloads[i];
      var revision = new FoodRevision
      {
        FoodId = entities[i].Id,
        Payload = SerializePayload(payloadDto),
        CreatedByUserId = userId,
        CreatedAtUtc = now,
        UpdatedAtUtc = now,
        Status = RevisionStatus.Approved,
        Type = RevisionType.Create,
        ReviewedByUserId = userId,
        ReviewedAtUtc = now
      };
      revisions.Add(revision);
    }

    _context.FoodRevision.AddRange(revisions);
    await _context.SaveChangesAsync();

    var userProfile = await _context.UserProfile.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
    for (int i = 0; i < revisions.Count; i++)
    {
      revisions[i].CreatedByUser = userProfile;
    }

    var response = revisions.Select((revision, idx) => BuildFoodRevisionResponse(revision, payloads[idx])).ToList();
    return Ok(response);
  }

  // PUT: api/food/{id}
  [HttpPut("{id}")]
  [Authorize(Policy = "KeeperOrHigher")]
  public async Task<ActionResult<FoodRevisionResponse>> Update(int id, [FromBody] FoodDto foodDto)
  {
    if (foodDto is null) return BadRequest();
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();

    var existing = await _context.Food.FindAsync(id);
    if (existing == null)
      return NotFound();

    var originalSnapshot = MapFoodResponse(existing);
    foodDto.Id = id;
    var now = DateTime.UtcNow;
    var revision = new FoodRevision
    {
      FoodId = id,
      Payload = SerializePayload(foodDto),
      CreatedByUserId = userId,
      CreatedAtUtc = now,
      UpdatedAtUtc = now,
      Status = IsAdmin() ? RevisionStatus.Approved : RevisionStatus.PendingReview,
      Type = RevisionType.Update
    };

    if (IsAdmin())
    {
      _mapper.Map(foodDto, existing);
      existing.Id = id;
      existing.Process();
      revision.ReviewedByUserId = userId;
      revision.ReviewedAtUtc = now;
    }

    _context.FoodRevision.Add(revision);
    await _context.SaveChangesAsync();

    revision.CreatedByUser = await _context.UserProfile.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
    return Ok(BuildFoodRevisionResponse(revision, foodDto, originalSnapshot));
  }

  // DELETE: api/food/{id}
  [HttpDelete("{id}")]
  [Authorize(Policy = "KeeperOrHigher")]
  public async Task<ActionResult<FoodRevisionResponse>> Delete(int id)
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();

    var existing = await _context.Food.FindAsync(id);
    if (existing == null)
      return NotFound();

    var originalSnapshot = MapFoodResponse(existing);
    var payloadDto = _mapper.Map<FoodDto>(existing);
    payloadDto.Id = id;

    var now = DateTime.UtcNow;
    var revision = new FoodRevision
    {
      FoodId = id,
      Payload = SerializePayload(payloadDto),
      CreatedByUserId = userId,
      CreatedAtUtc = now,
      UpdatedAtUtc = now,
      Status = IsAdmin() ? RevisionStatus.Approved : RevisionStatus.PendingReview,
      Type = RevisionType.Delete
    };

    if (IsAdmin())
    {
      _context.Food.Remove(existing);
      revision.ReviewedByUserId = userId;
      revision.ReviewedAtUtc = now;
    }

    _context.FoodRevision.Add(revision);
    await _context.SaveChangesAsync();

    revision.CreatedByUser = await _context.UserProfile.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
    return Ok(BuildFoodRevisionResponse(revision, payloadDto, originalSnapshot));
  }

  // GET: api/food/revisions
  [HttpGet("revisions")]
  [Authorize(Policy = "KeeperOrHigher")]
  public async Task<ActionResult<IEnumerable<FoodRevisionResponse>>> GetRevisions()
  {
    var userId = GetUserId();
    if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();

    var list = await _context.FoodRevision
      .AsNoTracking()
      .Include(r => r.CreatedByUser)
      .Where(r => r.CreatedByUserId == userId)
      .OrderByDescending(r => r.CreatedAtUtc)
      .Take(200)
      .ToListAsync();

    var ids = list.Where(r => r.FoodId.HasValue).Select(r => r.FoodId!.Value).Distinct().ToList();
    var foods = await _context.Food.AsNoTracking().Where(f => ids.Contains(f.Id)).ToListAsync();
    var foodMap = foods.ToDictionary(f => f.Id, f => _mapper.Map<FoodResponse>(f));

    var response = list.Select(revision =>
    {
      FoodResponse? original = null;
      if (revision.FoodId.HasValue && foodMap.TryGetValue(revision.FoodId.Value, out var mapped))
      {
        original = mapped;
      }
      return BuildFoodRevisionResponse(revision, null, original);
    }).ToList();
    return Ok(response);
  }

  // GET: api/food/pending
  [HttpGet("pending")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<ActionResult<IEnumerable<FoodRevisionResponse>>> GetPending([FromQuery] int foodId = 0)
  {
    var query = _context.FoodRevision
      .AsNoTracking()
      .Include(r => r.CreatedByUser)
      .Where(r => r.Status == RevisionStatus.PendingReview);
    if (foodId > 0) query = query.Where(r => r.FoodId == foodId);

    var list = await query
      .OrderByDescending(r => r.CreatedAtUtc)
      .Take(200)
      .ToListAsync();

    var ids = list.Where(r => r.FoodId.HasValue).Select(r => r.FoodId!.Value).Distinct().ToList();
    var foods = await _context.Food.AsNoTracking().Where(f => ids.Contains(f.Id)).ToListAsync();
    var foodMap = foods.ToDictionary(f => f.Id, f => _mapper.Map<FoodResponse>(f));

    var response = list.Select(revision =>
    {
      FoodResponse? original = null;
      if (revision.FoodId.HasValue && foodMap.TryGetValue(revision.FoodId.Value, out var mapped))
      {
        original = mapped;
      }
      return BuildFoodRevisionResponse(revision, null, original);
    }).ToList();
    return Ok(response);
  }

  // POST: api/food/{revisionId}/approve
  [HttpPost("{revisionId}/approve")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> ApproveRevision(int revisionId)
  {
    var revision = await _context.FoodRevision.FindAsync(revisionId);
    if (revision is null) return NotFound();
    if (revision.Status != RevisionStatus.PendingReview) return BadRequest("Already processed");

    var userId = GetUserId() ?? "admin";
    var now = DateTime.UtcNow;

    var dto = DeserializePayload(revision.Payload);
    if (dto is null) return BadRequest("Invalid payload");

    switch (revision.Type)
    {
      case RevisionType.Create:
        var entity = BuildFoodSnapshot(dto);
        entity.Id = 0;
        _context.Food.Add(entity);
        await _context.SaveChangesAsync();
        revision.FoodId = entity.Id;
        break;
      case RevisionType.Update:
        if (!revision.FoodId.HasValue) return BadRequest("Missing FoodId");
        var existing = await _context.Food.FindAsync(revision.FoodId.Value);
        if (existing is null) return NotFound();
        _mapper.Map(dto, existing);
        existing.Id = revision.FoodId.Value;
        existing.Process();
        break;
      case RevisionType.Delete:
        if (!revision.FoodId.HasValue) return BadRequest("Missing FoodId");
        var target = await _context.Food.FindAsync(revision.FoodId.Value);
        if (target is null) return NotFound();
        _context.Food.Remove(target);
        break;
    }

    revision.Status = RevisionStatus.Approved;
    revision.ReviewedByUserId = userId;
    revision.ReviewedAtUtc = now;
    revision.UpdatedAtUtc = now;
    await _context.SaveChangesAsync();
    return Ok();
  }

  // POST: api/food/{revisionId}/reject
  [HttpPost("{revisionId}/reject")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> RejectRevision(int revisionId)
  {
    var revision = await _context.FoodRevision.FindAsync(revisionId);
    if (revision is null) return NotFound();
    if (revision.Status != RevisionStatus.PendingReview) return BadRequest("Already processed");

    revision.Status = RevisionStatus.Rejected;
    revision.ReviewedByUserId = GetUserId() ?? "admin";
    revision.ReviewedAtUtc = DateTime.UtcNow;
    revision.UpdatedAtUtc = revision.ReviewedAtUtc.Value;
    await _context.SaveChangesAsync();
    return Ok();
  }

  // GET: api/food/search-images?text=banana&limit=20
  [HttpGet("search-images")]
  public async Task<ActionResult<IEnumerable<FoodImageSearchResult>>> SearchImages(
    [FromQuery] string text = "",
    [FromQuery] int limit = 25)
  {
    var query = (text ?? string.Empty).Trim();
    if (string.IsNullOrWhiteSpace(query))
      return Ok(new List<FoodImageSearchResult>());

    limit = Math.Clamp(limit, 1, 100);
    var lowered = query.ToLowerInvariant();

    var foods = await _context.Food
      .AsNoTracking()
      .Where(f =>
        (f.Name.En != null && f.Name.En.ToLower().Contains(lowered)) ||
        (f.Name.Pt != null && f.Name.Pt.ToLower().Contains(lowered)) ||
        (f.Keys.En != null && f.Keys.En.ToLower().Contains(lowered)) ||
        (f.Keys.Pt != null && f.Keys.Pt.ToLower().Contains(lowered)))
      .OrderBy(f => f.Name.Pt ?? f.Name.En)
      .Take(limit)
      .Select(f => new FoodImageSearchResult
      {
        FoodId = f.Id,
        Name = f.Name.Pt ?? f.Name.En,
        Imgs = f.Imgs
      })
      .ToListAsync();

    return Ok(foods);
  }

  // GET: api/food/categories
  [HttpGet("categories")]
  public async Task<ActionResult<IEnumerable<string>>> GetCategories()
  {
    var categories = await _context.Food
      .AsNoTracking()
      .SelectMany(f => f.Categories ?? new List<string>())
      .ToListAsync();

    var camel = categories
      .Where(c => !string.IsNullOrWhiteSpace(c))
      .Select(c => JsonNamingPolicy.CamelCase.ConvertName(c))
      .Distinct()
      .OrderBy(c => c)
      .ToList();

    return Ok(camel);
  }

  // GET: api/food/types
  [HttpGet("types")]
  public ActionResult<IEnumerable<string>> GetTypes()
  {
    var types = Enum.GetNames(typeof(FoodType))
      .Select(n => JsonNamingPolicy.CamelCase.ConvertName(n))
      .ToList();
    return Ok(types);
  }
}
