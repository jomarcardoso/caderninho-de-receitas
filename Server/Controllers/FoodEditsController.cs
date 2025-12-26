using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Models;
using Server.Response;
using Server.Shared;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace Server.Controllers;

[ApiController]
[Route("api/food-edits")]
public class FoodEditsController : ControllerBase
{
  private readonly AppDbContext _context;
  private readonly IMapper _mapper;
  private readonly JsonSerializerOptions _jsonOptions = new()
  {
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
  };

  public FoodEditsController(AppDbContext context, IMapper mapper)
  {
    _context = context;
    _mapper = mapper;
  }

  [HttpPost("{foodId?}")]
  [Authorize(Policy = "KeeperOrHigher")]
  public async Task<IActionResult> Create(int? foodId, [FromBody] FoodDto dto)
  {
    var targetId = dto?.Id ?? 0;
    if (targetId <= 0 && foodId.HasValue)
      targetId = foodId.Value;
    if (targetId > 0 && dto != null && dto.Id <= 0)
      dto.Id = targetId;

    if (dto is null || targetId <= 0)
      return BadRequest(Error(StatusCodes.Status400BadRequest, "food_edit.missing_id", "Invalid payload", "FoodId is required."));
    var proposedBy = User.FindFirstValue(ClaimTypes.Email) ?? User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "unknown";

    // Snapshot current food and compute a diff
    var food = await _context.Food
      .AsNoTracking()
      .FirstOrDefaultAsync(f => f.Id == targetId);
    if (food is null)
      return NotFound(Error(StatusCodes.Status404NotFound, "food.not_found", "Food not found", $"Food {targetId} was not found."));

    FoodDto currentDto;
    try
    {
      currentDto = _mapper.Map<FoodDto>(food);
    }
    catch (AutoMapperMappingException ex)
    {
      return BadRequest(Error(StatusCodes.Status400BadRequest, "food_edit.map_error", "Mapping failed", ex.Message));
    }
    var diff = BuildDiff(dto, currentDto);
    if (diff is null)
      return BadRequest(Error(StatusCodes.Status400BadRequest, "food_edit.no_changes", "No changes detected", "The submitted payload does not change any field."));

    var payloadJson = diff.ToJsonString(_jsonOptions);

    var req = new FoodEditRequest
    {
      FoodId = targetId,
      ProposedBy = proposedBy,
      Payload = payloadJson,
      CreatedAt = DateTime.UtcNow,
      Status = FoodEditStatus.Pending,
    };

    _context.FoodEditRequest.Add(req);
    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(GetById), new { id = req.Id }, new { req.Id });
  }

  [HttpGet("{id}")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> GetById(int id)
  {
    var item = await _context.FoodEditRequest.FindAsync(id);
    if (item == null)
      return NotFound(Error(StatusCodes.Status404NotFound, "food_edit.not_found", "Food edit not found", $"Edit request {id} not found."));
    return Ok(new FoodEditRequestResponse
    {
      Id = item.Id,
      FoodId = item.FoodId,
      ProposedBy = item.ProposedBy,
      Payload = item.Payload,
      CreatedAt = item.CreatedAt,
      ApprovedAt = item.ApprovedAt,
      ApprovedBy = item.ApprovedBy,
      Status = item.Status
    });
  }

  [HttpGet("pending")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> GetPending([FromQuery] int foodId = 0)
  {
    IQueryable<FoodEditRequest> q = _context.FoodEditRequest.AsNoTracking().Where(e => e.Status == FoodEditStatus.Pending);
    if (foodId > 0) q = q.Where(e => e.FoodId == foodId);
    var list = await q.OrderByDescending(e => e.CreatedAt).Take(200).ToListAsync();
    var mapped = list.Select(item => new FoodEditRequestResponse
    {
      Id = item.Id,
      FoodId = item.FoodId,
      ProposedBy = item.ProposedBy,
      Payload = item.Payload,
      CreatedAt = item.CreatedAt,
      ApprovedAt = item.ApprovedAt,
      ApprovedBy = item.ApprovedBy,
      Status = item.Status
    }).ToList();
    return Ok(mapped);
  }

  [HttpPost("{id}/approve")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> Approve(int id)
  {
    var item = await _context.FoodEditRequest.FindAsync(id);
    if (item == null)
      return NotFound(Error(StatusCodes.Status404NotFound, "food_edit.not_found", "Food edit not found", $"Edit request {id} not found."));
    if (item.Status != FoodEditStatus.Pending)
      return BadRequest(Error(StatusCodes.Status400BadRequest, "food_edit.already_processed", "Already processed", "This edit request has already been processed."));

    var food = await _context.Food.FindAsync(item.FoodId);
    if (food is null)
      return NotFound(Error(StatusCodes.Status404NotFound, "food.not_found", "Food not found", $"Food {item.FoodId} was not found."));

    try
    {
      var diffNode = JsonNode.Parse(item.Payload);
      if (diffNode is null || diffNode is not JsonObject diffObj)
        return BadRequest(Error(StatusCodes.Status400BadRequest, "food_edit.invalid_payload", "Invalid payload", "Could not parse stored diff."));

      ApplyDiff(diffObj, food);

      item.Status = FoodEditStatus.Approved;
      item.ApprovedBy = User.FindFirstValue(ClaimTypes.Email) ?? "admin";
      item.ApprovedAt = DateTime.UtcNow;

      await _context.SaveChangesAsync();
      return Ok();
    }
    catch
    {
      return BadRequest(Error(StatusCodes.Status400BadRequest, "food_edit.invalid_payload", "Invalid payload", "Could not apply stored diff to the food entity."));
    }
  }

  [HttpPost("{id}/reject")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> Reject(int id)
  {
    var item = await _context.FoodEditRequest.FindAsync(id);
    if (item == null)
      return NotFound(Error(StatusCodes.Status404NotFound, "food_edit.not_found", "Food edit not found", $"Edit request {id} not found."));
    if (item.Status != FoodEditStatus.Pending)
      return BadRequest(Error(StatusCodes.Status400BadRequest, "food_edit.already_processed", "Already processed", "This edit request has already been processed."));

    item.Status = FoodEditStatus.Rejected;
    item.ApprovedBy = User.FindFirstValue(ClaimTypes.Email) ?? "admin";
    item.ApprovedAt = DateTime.UtcNow;
    await _context.SaveChangesAsync();
    return Ok();
  }

  private JsonNode? BuildDiff(FoodDto incoming, FoodDto current)
  {
    var incomingNode = JsonSerializer.SerializeToNode(incoming, _jsonOptions);
    var currentNode = JsonSerializer.SerializeToNode(current, _jsonOptions);
    return BuildDiff(incomingNode, currentNode);
  }

  private static JsonNode? BuildDiff(JsonNode? incoming, JsonNode? current)
  {
    if (incoming == null && current == null) return null;
    if (incoming == null || current == null) return incoming?.DeepClone();

    if (incoming is JsonValue iv && current is JsonValue cv)
    {
      if (JsonValueEquals(iv, cv)) return null;
      return iv.DeepClone();
    }

    if (incoming is JsonArray ia && current is JsonArray ca)
    {
      if (ArrayEquals(ia, ca)) return null;
      return ia.DeepClone();
    }

    if (incoming is JsonObject io && current is JsonObject co)
    {
      var result = new JsonObject();
      foreach (var prop in io)
      {
        var cur = co.ContainsKey(prop.Key) ? co[prop.Key] : null;
        var sub = BuildDiff(prop.Value, cur);
        if (sub != null)
          result[prop.Key] = sub;
      }
      return result.Count > 0 ? result : null;
    }

    return incoming.DeepClone();
  }

  private static bool JsonValueEquals(JsonValue a, JsonValue b)
  {
    var ae = a.GetValue<JsonElement>();
    var be = b.GetValue<JsonElement>();
    if (ae.ValueKind != be.ValueKind) return false;
    return ae.ToString() == be.ToString();
  }

  private static bool ArrayEquals(JsonArray a, JsonArray b)
  {
    if (a.Count != b.Count) return false;
    for (int i = 0; i < a.Count; i++)
    {
      if (BuildDiff(a[i], b[i]) != null) return false;
    }
    return true;
  }

  private void ApplyDiff(JsonObject diff, Food food)
  {
    bool updateAmino = false;

    foreach (var kv in diff)
    {
      switch (kv.Key)
      {
        case "name":
          food.Name = kv.Value?.Deserialize<LanguageText>(_jsonOptions) ?? food.Name;
          break;
        case "keys":
          food.Keys = kv.Value?.Deserialize<LanguageText>(_jsonOptions) ?? food.Keys;
          break;
        case "description":
          food.Description = kv.Value?.Deserialize<LanguageText>(_jsonOptions) ?? food.Description;
          break;
        case "imgs":
          if (kv.Value is JsonArray imgs)
            food.Imgs = imgs.Select(x => x?.GetValue<string>() ?? string.Empty)
              .Where(s => !string.IsNullOrWhiteSpace(s))
              .ToList();
          break;
        case "categories":
          if (kv.Value is JsonArray cats)
            food.Categories = cats.Select(x => x?.GetValue<string>() ?? string.Empty)
              .Where(s => !string.IsNullOrWhiteSpace(s))
              .ToList();
          break;
        case "measurementUnit":
          if (kv.Value != null)
            food.MeasurementUnit = kv.Value.Deserialize<MeasurementUnit>(_jsonOptions);
          break;
        case "measures":
          var measure = kv.Value?.Deserialize<Measures>(_jsonOptions);
          if (measure != null) food.Measures = measure;
          break;
        case "iconId":
          if (kv.Value != null)
          {
            food.IconId = kv.Value.GetValue<int?>();
            food.Icon = null;
          }
          break;
        case "type":
          if (kv.Value != null)
            food.Type = kv.Value.Deserialize<FoodType>(_jsonOptions);
          break;
        case "nutritionalInformation":
          var ni = kv.Value?.Deserialize<NutritionalInformation>(_jsonOptions);
          if (ni != null) food.NutritionalInformation = ni;
          break;
        case "minerals":
          var mi = kv.Value?.Deserialize<Minerals>(_jsonOptions);
          if (mi != null) food.Minerals = mi;
          break;
        case "vitamins":
          var vi = kv.Value?.Deserialize<Vitamins>(_jsonOptions);
          if (vi != null) food.Vitamins = vi;
          break;
        case "aminoAcids":
          var aa = kv.Value?.Deserialize<AminoAcids>(_jsonOptions);
          if (aa != null)
          {
            food.AminoAcids = aa;
            updateAmino = true;
          }
          break;
        case "essentialAminoAcids":
          var ea = kv.Value?.Deserialize<EssentialAminoAcids>(_jsonOptions);
          if (ea != null)
          {
            food.EssentialAminoAcids = ea;
            updateAmino = true;
          }
          break;
        case "aminoAcidsScore":
          if (kv.Value != null)
            food.AminoAcidsScore = kv.Value.GetValue<double>();
          break;
      }
    }

    if (updateAmino)
    {
      food.EssentialAminoAcids = new EssentialAminoAcids(food.AminoAcids);
      food.AminoAcidsScore = food.EssentialAminoAcids.GetScore();
    }
  }

  private ApiError Error(int status, string code, string title, string detail) => new ApiError
  {
    Status = status,
    Code = code,
    Title = title,
    Detail = detail,
    CorrelationId = HttpContext.TraceIdentifier
  };
}
