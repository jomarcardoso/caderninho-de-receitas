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
    var existing = await _context.FoodIcon.FirstOrDefaultAsync(i => i.Name.En == normalizedName);
    if (existing is null)
    {
      var item = new FoodIcon
      {
        Name = new Server.Models.LanguageText { En = normalizedName, Pt = string.Empty },
        Url = icon.Url ?? string.Empty,
      };
      if (icon.Keys is not null)
      {
        item.Keys = new Server.Models.LanguageText { Pt = icon.Keys.Pt?.Trim() ?? string.Empty, En = icon.Keys.En?.Trim() ?? string.Empty };
      }
      _context.FoodIcon.Add(item);
    }
    else
    {
      existing.Url = icon.Url ?? existing.Url;
      if (icon.Keys is not null)
      {
        existing.Keys ??= new Server.Models.LanguageText();
        existing.Keys.Pt = icon.Keys.Pt?.Trim() ?? existing.Keys.Pt;
        existing.Keys.En = icon.Keys.En?.Trim() ?? existing.Keys.En;
      }
    }

    await _context.SaveChangesAsync();
    return Ok();
  }

  [HttpPost("many")]
  public async Task<IActionResult> CreateMany([FromBody] List<FoodIconDto> icons)
  {
    if (icons is null || icons.Count == 0) return Ok();

    var names = icons.Select(i => i.Name.Trim()).ToHashSet(StringComparer.OrdinalIgnoreCase);
    var existing = await _context.FoodIcon.Where(i => names.Contains(i.Name.En)).ToListAsync();
    var map = existing.ToDictionary(i => i.Name.En, StringComparer.OrdinalIgnoreCase);

    foreach (var icon in icons)
    {
      var name = icon.Name?.Trim();
      if (string.IsNullOrWhiteSpace(name)) continue;

      if (!map.TryGetValue(name, out var item))
      {
        item = new FoodIcon { Name = new Server.Models.LanguageText { En = name, Pt = string.Empty } };
        _context.FoodIcon.Add(item);
        map[name] = item;
      }

      item.Url = icon.Url ?? item.Url;
      if (icon.Keys is not null)
      {
        item.Keys ??= new Server.Models.LanguageText();
        item.Keys.Pt = icon.Keys.Pt?.Trim() ?? item.Keys.Pt;
        item.Keys.En = icon.Keys.En?.Trim() ?? item.Keys.En;
      }
    }

    await _context.SaveChangesAsync();
    return Ok();
  }

  [HttpGet]
  public async Task<IActionResult> GetAllNames()
  {
    var names = await _context.FoodIcon
      .AsNoTracking()
      .Select(i => i.Name.En)
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
      query = query.Where(i => set.Contains(i.Name.En));
    }

    var map = await query.ToDictionaryAsync(i => i.Name.En, i => i.Url);
    return Ok(map);
  }

  // GET: api/food-icons/map-by-id?ids=1,2,3
  [HttpGet("map-by-id")]
  public async Task<IActionResult> GetMapById([FromQuery] string? ids = null)
  {
    IQueryable<FoodIcon> query = _context.FoodIcon.AsNoTracking();
    if (!string.IsNullOrWhiteSpace(ids))
    {
      var set = new HashSet<int>(ids
        .Split(',', StringSplitOptions.RemoveEmptyEntries)
        .Select(s => int.TryParse(s.Trim(), out var n) ? n : 0)
        .Where(n => n > 0));
      if (set.Count > 0)
      {
        query = query.Where(i => set.Contains(i.Id));
      }
    }

    var map = await query.ToDictionaryAsync(i => i.Id, i => new { i.Url });
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
      var pattern = $"%{term}%";
      // Case-insensitive search in Postgres using ILIKE on name and keys (pt/en)
      query = query.Where(i =>
        EF.Functions.ILike(i.Name.En, pattern) ||
        EF.Functions.ILike(i.Keys.Pt, pattern) ||
        EF.Functions.ILike(i.Keys.En, pattern)
      );
    }

    var results = await query
      .OrderBy(i => i.Name.En)
      .Take(limit)
      .Select(i => new { i.Id, Name = i.Name.En, i.Url })
      .ToListAsync();

    return Ok(results);
  }
}
