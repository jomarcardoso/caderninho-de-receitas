using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System.Security.Claims;
using System.Text.Json;

namespace Server.Controllers;

[ApiController]
[Route("api/food-edits")]
public class FoodEditsController : ControllerBase
{
  private readonly AppDbContext _context;

  public FoodEditsController(AppDbContext context)
  {
    _context = context;
  }

  public class CreateEditDto
  {
    public int FoodId { get; set; }
    public JsonElement Payload { get; set; }
  }

  [HttpPost]
  [Authorize(Roles = "Keeper,Admin,Owner")]
  public async Task<IActionResult> Create([FromBody] CreateEditDto dto)
  {
    if (dto.FoodId <= 0) return BadRequest("FoodId is required");
    var proposedBy = User.FindFirstValue(ClaimTypes.Email) ?? User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "unknown";

    var req = new FoodEditRequest
    {
      FoodId = dto.FoodId,
      ProposedBy = proposedBy,
      Payload = dto.Payload.GetRawText(),
      CreatedAt = DateTime.UtcNow,
      Status = FoodEditStatus.Pending,
    };

    _context.FoodEditRequest.Add(req);
    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(GetById), new { id = req.Id }, new { req.Id });
  }

  [HttpGet("{id}")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> GetById(int id)
  {
    var item = await _context.FoodEditRequest.FindAsync(id);
    if (item == null) return NotFound();
    return Ok(item);
  }

  [HttpGet("pending")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> GetPending([FromQuery] int foodId = 0)
  {
    IQueryable<FoodEditRequest> q = _context.FoodEditRequest.AsNoTracking().Where(e => e.Status == FoodEditStatus.Pending);
    if (foodId > 0) q = q.Where(e => e.FoodId == foodId);
    var list = await q.OrderByDescending(e => e.CreatedAt).Take(200).ToListAsync();
    return Ok(list);
  }

  [HttpPost("{id}/approve")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> Approve(int id)
  {
    var item = await _context.FoodEditRequest.FindAsync(id);
    if (item == null) return NotFound();
    if (item.Status != FoodEditStatus.Pending) return BadRequest("Already processed");

    // Apply minimal fields when present
    var food = await _context.Food.FindAsync(item.FoodId);
    if (food is null) return NotFound("Food not found");

    try
    {
      static string KeepIfNotBlank(JsonElement el, string current)
      {
        var s = el.GetString();
        return string.IsNullOrWhiteSpace(s) ? current : s!;
      }

      using var doc = JsonDocument.Parse(item.Payload);
      var root = doc.RootElement;
      if (root.TryGetProperty("name", out var nameEl))
      {
        if (nameEl.TryGetProperty("pt", out var pt)) food.Name.Pt = KeepIfNotBlank(pt, food.Name.Pt);
        if (nameEl.TryGetProperty("en", out var en)) food.Name.En = KeepIfNotBlank(en, food.Name.En);
      }
      if (root.TryGetProperty("description", out var descEl))
      {
        if (descEl.TryGetProperty("pt", out var pt)) food.Description.Pt = KeepIfNotBlank(pt, food.Description.Pt);
        if (descEl.TryGetProperty("en", out var en)) food.Description.En = KeepIfNotBlank(en, food.Description.En);
      }
      if (root.TryGetProperty("keys", out var keysEl))
      {
        if (keysEl.TryGetProperty("pt", out var pt)) food.Keys.Pt = KeepIfNotBlank(pt, food.Keys.Pt);
        if (keysEl.TryGetProperty("en", out var en)) food.Keys.En = KeepIfNotBlank(en, food.Keys.En);
      }

      // Icon updates: only apply when a valid iconId was explicitly provided, or when we have no iconId at all
      // (text-only icons). This prevents untouched forms from overwriting existing icons with defaults.
      string? incomingIcon = null;
      if (root.TryGetProperty("icon", out var iconEl))
      {
        incomingIcon = iconEl.GetString();
      }

      bool iconUpdated = false;
      if (root.TryGetProperty("iconId", out var iconIdEl) && iconIdEl.TryGetInt32(out var iconId))
      {
        // Only persist positive icon ids; ignore zero/negative values coming from partial payloads
        if (iconId > 0)
        {
          food.IconId = iconId;
          if (!string.IsNullOrWhiteSpace(incomingIcon))
          {
            food.Icon = incomingIcon;
          }
          iconUpdated = true;
        }
      }

      // If there is no iconId yet (text/icon-only foods), allow setting a textual icon when provided.
      if (!iconUpdated && food.IconId is null && !string.IsNullOrWhiteSpace(incomingIcon))
      {
        food.Icon = incomingIcon;
      }

      if (root.TryGetProperty("imgs", out var imgsEl) && imgsEl.ValueKind == JsonValueKind.Array)
      {
        var list = new List<string>();
        foreach (var el in imgsEl.EnumerateArray())
        {
          var s = el.GetString();
          if (!string.IsNullOrWhiteSpace(s)) list.Add(s!);
        }
        food.Imgs = list;
      }

      // NutritionalInformation
      if (root.TryGetProperty("nutritionalInformation", out var niEl))
      {
        if (niEl.TryGetProperty(nameof(food.NutritionalInformation.Calories), out var c0) && c0.TryGetDouble(out var d0)) food.NutritionalInformation.Calories = d0;
        if (niEl.TryGetProperty(nameof(food.NutritionalInformation.DietaryFiber), out var c1) && c1.TryGetDouble(out var d1)) food.NutritionalInformation.DietaryFiber = d1;
        if (niEl.TryGetProperty(nameof(food.NutritionalInformation.Gi), out var c2) && c2.TryGetDouble(out var d2)) food.NutritionalInformation.Gi = d2;
        if (niEl.TryGetProperty(nameof(food.NutritionalInformation.MonounsaturatedFats), out var c3) && c3.TryGetDouble(out var d3)) food.NutritionalInformation.MonounsaturatedFats = d3;
        if (niEl.TryGetProperty(nameof(food.NutritionalInformation.PolyunsaturatedFats), out var c4) && c4.TryGetDouble(out var d4)) food.NutritionalInformation.PolyunsaturatedFats = d4;
        if (niEl.TryGetProperty(nameof(food.NutritionalInformation.Proteins), out var c5) && c5.TryGetDouble(out var d5)) food.NutritionalInformation.Proteins = d5;
        if (niEl.TryGetProperty(nameof(food.NutritionalInformation.SaturedFats), out var c6) && c6.TryGetDouble(out var d6)) food.NutritionalInformation.SaturedFats = d6;
        if (niEl.TryGetProperty(nameof(food.NutritionalInformation.Sugar), out var c7) && c7.TryGetDouble(out var d7)) food.NutritionalInformation.Sugar = d7;
        if (niEl.TryGetProperty(nameof(food.NutritionalInformation.TotalFat), out var c8) && c8.TryGetDouble(out var d8)) food.NutritionalInformation.TotalFat = d8;
      }

      // Minerals
      if (root.TryGetProperty("minerals", out var miEl))
      {
        if (miEl.TryGetProperty(nameof(food.Minerals.Calcium), out var m0) && m0.TryGetDouble(out var md0)) food.Minerals.Calcium = md0;
        if (miEl.TryGetProperty(nameof(food.Minerals.Copper), out var m1) && m1.TryGetDouble(out var md1)) food.Minerals.Copper = md1;
        if (miEl.TryGetProperty(nameof(food.Minerals.Fluoride), out var m2) && m2.TryGetDouble(out var md2)) food.Minerals.Fluoride = md2;
        if (miEl.TryGetProperty(nameof(food.Minerals.Iron), out var m3) && m3.TryGetDouble(out var md3)) food.Minerals.Iron = md3;
        if (miEl.TryGetProperty(nameof(food.Minerals.Magnesium), out var m4) && m4.TryGetDouble(out var md4)) food.Minerals.Magnesium = md4;
        if (miEl.TryGetProperty(nameof(food.Minerals.Manganese), out var m5) && m5.TryGetDouble(out var md5)) food.Minerals.Manganese = md5;
        if (miEl.TryGetProperty(nameof(food.Minerals.Phosphorus), out var m6) && m6.TryGetDouble(out var md6)) food.Minerals.Phosphorus = md6;
        if (miEl.TryGetProperty(nameof(food.Minerals.Potassium), out var m7) && m7.TryGetDouble(out var md7)) food.Minerals.Potassium = md7;
        if (miEl.TryGetProperty(nameof(food.Minerals.Sodium), out var m8) && m8.TryGetDouble(out var md8)) food.Minerals.Sodium = md8;
        if (miEl.TryGetProperty(nameof(food.Minerals.Zinc), out var m9) && m9.TryGetDouble(out var md9)) food.Minerals.Zinc = md9;
        if (miEl.TryGetProperty(nameof(food.Minerals.Selenium), out var m10) && m10.TryGetDouble(out var md10)) food.Minerals.Selenium = md10;
      }

      // AminoAcids
      if (root.TryGetProperty("aminoAcids", out var aaEl))
      {
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Alanine), out var a0) && a0.TryGetDouble(out var ad0)) food.AminoAcids.Alanine = ad0;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Arginine), out var a1) && a1.TryGetDouble(out var ad1)) food.AminoAcids.Arginine = ad1;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.AsparticAcid), out var a2) && a2.TryGetDouble(out var ad2)) food.AminoAcids.AsparticAcid = ad2;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Cystine), out var a3) && a3.TryGetDouble(out var ad3)) food.AminoAcids.Cystine = ad3;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.GlutamicAcid), out var a4) && a4.TryGetDouble(out var ad4)) food.AminoAcids.GlutamicAcid = ad4;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Glutamine), out var a5) && a5.TryGetDouble(out var ad5)) food.AminoAcids.Glutamine = ad5;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Glycine), out var a6) && a6.TryGetDouble(out var ad6)) food.AminoAcids.Glycine = ad6;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Histidine), out var a7) && a7.TryGetDouble(out var ad7)) food.AminoAcids.Histidine = ad7;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Isoleucine), out var a8) && a8.TryGetDouble(out var ad8)) food.AminoAcids.Isoleucine = ad8;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Leucine), out var a9) && a9.TryGetDouble(out var ad9)) food.AminoAcids.Leucine = ad9;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Lysine), out var a10) && a10.TryGetDouble(out var ad10)) food.AminoAcids.Lysine = ad10;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Methionine), out var a11) && a11.TryGetDouble(out var ad11)) food.AminoAcids.Methionine = ad11;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Phenylalanine), out var a12) && a12.TryGetDouble(out var ad12)) food.AminoAcids.Phenylalanine = ad12;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Proline), out var a13) && a13.TryGetDouble(out var ad13)) food.AminoAcids.Proline = ad13;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Serine), out var a14) && a14.TryGetDouble(out var ad14)) food.AminoAcids.Serine = ad14;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Threonine), out var a15) && a15.TryGetDouble(out var ad15)) food.AminoAcids.Threonine = ad15;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Tryptophan), out var a16) && a16.TryGetDouble(out var ad16)) food.AminoAcids.Tryptophan = ad16;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Tyrosine), out var a17) && a17.TryGetDouble(out var ad17)) food.AminoAcids.Tyrosine = ad17;
        if (aaEl.TryGetProperty(nameof(food.AminoAcids.Valine), out var a18) && a18.TryGetDouble(out var ad18)) food.AminoAcids.Valine = ad18;
      }

      item.Status = FoodEditStatus.Approved;
      item.ApprovedBy = User.FindFirstValue(ClaimTypes.Email) ?? "admin";
      item.ApprovedAt = DateTime.UtcNow;

      await _context.SaveChangesAsync();
      return Ok();
    }
    catch
    {
      return BadRequest("Invalid payload");
    }
  }

  [HttpPost("{id}/reject")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> Reject(int id)
  {
    var item = await _context.FoodEditRequest.FindAsync(id);
    if (item == null) return NotFound();
    if (item.Status != FoodEditStatus.Pending) return BadRequest("Already processed");

    item.Status = FoodEditStatus.Rejected;
    item.ApprovedBy = User.FindFirstValue(ClaimTypes.Email) ?? "admin";
    item.ApprovedAt = DateTime.UtcNow;
    await _context.SaveChangesAsync();
    return Ok();
  }
}

