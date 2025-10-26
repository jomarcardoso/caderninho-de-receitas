using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Models;

namespace Server.Controllers;

[ApiController]
[Route("api/food-icons")]
  public class FoodIconsController : ControllerBase
  {
    private readonly AppDbContext _context;

  public FoodIconsController(AppDbContext context)
  {
    _context = context;
  }

  [HttpPost]
  public async Task<IActionResult> Create([FromBody] FoodIconDto icon)
  {
    if (icon is null || string.IsNullOrWhiteSpace(icon.Name))
      return BadRequest("Icon payload must include a name.");

    var normalizedName = icon.Name.Trim();
    var existing = await _context.FoodIcon.FirstOrDefaultAsync(i => i.Name == normalizedName);
    if (existing is null)
    {
      _context.FoodIcon.Add(new FoodIcon
      {
        Name = normalizedName,
        MediaType = icon.MediaType?.Trim() ?? string.Empty,
        Content = icon.Content ?? string.Empty,
      });
    }
    else
    {
      existing.MediaType = icon.MediaType?.Trim() ?? existing.MediaType;
      existing.Content = icon.Content ?? existing.Content;
    }

    await _context.SaveChangesAsync();
    return Ok();
  }

  [HttpPost("many")]
  public async Task<IActionResult> CreateMany([FromBody] List<FoodIconDto> icons)
  {
    if (icons is null || icons.Count == 0) return Ok();

    var names = icons.Select(i => i.Name.Trim()).ToHashSet(StringComparer.OrdinalIgnoreCase);
    var existing = await _context.FoodIcon.Where(i => names.Contains(i.Name)).ToListAsync();
    var map = existing.ToDictionary(i => i.Name, StringComparer.OrdinalIgnoreCase);

    foreach (var icon in icons)
    {
      var name = icon.Name?.Trim();
      if (string.IsNullOrWhiteSpace(name)) continue;

      if (!map.TryGetValue(name, out var item))
      {
        item = new FoodIcon { Name = name };
        _context.FoodIcon.Add(item);
        map[name] = item;
      }

      item.MediaType = icon.MediaType?.Trim() ?? item.MediaType;
      item.Content = icon.Content ?? item.Content;
    }

    await _context.SaveChangesAsync();
    return Ok();
  }

  [HttpGet]
  public async Task<IActionResult> GetAllNames()
  {
    var names = await _context.FoodIcon
      .AsNoTracking()
      .Select(i => i.Name)
      .OrderBy(n => n)
      .ToListAsync();
    return Ok(names);
  }

  [HttpGet("map")]
  public async Task<IActionResult> GetMap([FromQuery] string? names = null)
  {
    IQueryable<FoodIcon> query = _context.FoodIcon.AsNoTracking();
    if (!string.IsNullOrWhiteSpace(names))
    {
      var set = new HashSet<string>(names.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()), StringComparer.OrdinalIgnoreCase);
      query = query.Where(i => set.Contains(i.Name));
    }

    var map = await query.ToDictionaryAsync(i => i.Name, i => i.Content);
    return Ok(map);
  }

  // GET: api/food-icons/search?q=app&limit=25
  [HttpGet("search")]
  public async Task<IActionResult> Search([FromQuery] string? q = null, [FromQuery] int limit = 25)
  {
    limit = Math.Clamp(limit, 1, 200);
    IQueryable<FoodIcon> query = _context.FoodIcon.AsNoTracking();

    if (!string.IsNullOrWhiteSpace(q))
    {
      var term = q.Trim();
      query = query.Where(i => i.Name.Contains(term));
    }

    var results = await query
      .OrderBy(i => i.Name)
      .Take(limit)
      .Select(i => new { i.Name, i.MediaType, i.Content })
      .ToListAsync();

    return Ok(results);
  }
}
