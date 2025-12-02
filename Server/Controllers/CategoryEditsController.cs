using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json;
using Server.Models;

namespace Server.Controllers;

[ApiController]
[Route("api/category-edits")]
public class CategoryEditsController : ControllerBase
{
  private readonly AppDbContext _context;

  public CategoryEditsController(AppDbContext context)
  {
    _context = context;
  }

  public class CreateEditDto
  {
    public int CategoryId { get; set; }
    public JsonElement Payload { get; set; }
  }

  [HttpPost]
  [Authorize(Roles = "Keeper,Admin,Owner")]
  public async Task<IActionResult> Create([FromBody] CreateEditDto dto)
  {
    if (dto.CategoryId <= 0) return BadRequest("CategoryId is required");
    var proposedBy = User.FindFirstValue(ClaimTypes.Email) ?? User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "unknown";

    var req = new CategoryEditRequest
    {
      CategoryId = dto.CategoryId,
      ProposedBy = proposedBy,
      Payload = dto.Payload.GetRawText(),
      CreatedAt = DateTime.UtcNow,
      Status = CategoryEditStatus.Pending,
    };

    _context.CategoryEditRequest.Add(req);
    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(GetById), new { id = req.Id }, new { req.Id });
  }

  [HttpGet("{id}")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> GetById(int id)
  {
    var item = await _context.CategoryEditRequest.FindAsync(id);
    if (item == null) return NotFound();
    return Ok(item);
  }

  [HttpGet("pending")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> GetPending([FromQuery] int categoryId = 0)
  {
    IQueryable<CategoryEditRequest> q = _context.CategoryEditRequest.AsNoTracking().Where(e => e.Status == CategoryEditStatus.Pending);
    if (categoryId > 0) q = q.Where(e => e.CategoryId == categoryId);
    var list = await q.OrderByDescending(e => e.CreatedAt).Take(200).ToListAsync();
    return Ok(list);
  }

  [HttpPost("{id}/approve")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> Approve(int id)
  {
    var item = await _context.CategoryEditRequest.FindAsync(id);
    if (item == null) return NotFound();
    if (item.Status != CategoryEditStatus.Pending) return BadRequest("Already processed");

    var category = await _context.RecipeCategoryOpen.FindAsync(item.CategoryId);
    if (category is null) return NotFound("Category not found");

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
        if (nameEl.TryGetProperty("pt", out var pt)) category.Name.Pt = KeepIfNotBlank(pt, category.Name.Pt);
        if (nameEl.TryGetProperty("en", out var en)) category.Name.En = KeepIfNotBlank(en, category.Name.En);
      }

      if (root.TryGetProperty("description", out var descEl))
      {
        if (descEl.TryGetProperty("pt", out var pt)) category.Description.Pt = KeepIfNotBlank(pt, category.Description.Pt);
        if (descEl.TryGetProperty("en", out var en)) category.Description.En = KeepIfNotBlank(en, category.Description.En);
      }

      if (root.TryGetProperty("bannerImg", out var bannerEl))
      {
        var b = bannerEl.GetString();
        if (!string.IsNullOrWhiteSpace(b)) category.BannerImg = b!;
      }

      item.Status = CategoryEditStatus.Approved;
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
    var item = await _context.CategoryEditRequest.FindAsync(id);
    if (item == null) return NotFound();
    if (item.Status != CategoryEditStatus.Pending) return BadRequest("Already processed");

    item.Status = CategoryEditStatus.Rejected;
    item.ApprovedBy = User.FindFirstValue(ClaimTypes.Email) ?? "admin";
    item.ApprovedAt = DateTime.UtcNow;
    await _context.SaveChangesAsync();
    return Ok();
  }
}
