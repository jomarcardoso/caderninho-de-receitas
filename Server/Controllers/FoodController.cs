using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;

namespace Server.Controllers;

[ApiController]
[Route("api/food")]
  public class FoodController : ControllerBase
  {
    private readonly AppDbContext _context;

    public FoodController(AppDbContext context)
    {
      _context = context;
    }
  public class FoodImageSearchResult
  {
    public int FoodId { get; set; }
    public string? Name { get; set; }
    public List<string> Imgs { get; set; } = new();
  }

  // GET: api/food
  [HttpGet]
  public async Task<ActionResult<IEnumerable<Food>>> GetAll()
  {
    var foods = await _context.Food.ToListAsync();
    return Ok(foods);
  }

  // GET: api/food/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<Food>> GetById(int id)
  {
    var food = await _context.Food.FindAsync(id);
    if (food == null)
      return NotFound();
    return Ok(food);
  }

  // POST: api/food
  [HttpPost]
  public async Task<ActionResult<Food>> Create([FromBody] Food food)
  {
    // Ignore any incoming Id to avoid PK conflicts
    food.Id = 0;
    food.Process();
    _context.Food.Add(food);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetById), new { id = food.Id }, food);
  }

  // POST: api/food/many
  [HttpPost("many")]
  public async Task<ActionResult<Food>> CreateMany([FromBody] Food[] foods)
  {
    if (foods is null || foods.Length == 0) return Ok();

    foreach (var food in foods)
    {
      // Ignore any incoming Id to avoid PK conflicts
      food.Id = 0;
      food.Process();
    }

    _context.Food.AddRange(foods);
    await _context.SaveChangesAsync();

    return Ok();
  }

  // POST: api/food/{id}
  [HttpPost("{id}")]
  public async Task<IActionResult> Update(int id, [FromForm] Food food)
  {
    if (id != food.Id)
      return BadRequest();

    var existing = await _context.Food.FindAsync(id);
    if (existing == null)
      return NotFound();

    // Update properties
    existing.Name.Pt = food.Name.Pt;
    // Add other properties as needed

    await _context.SaveChangesAsync();
    return NoContent();
  }

  // GET: api/food/search?text=banana&limit=20
  [HttpGet("search")]
  public async Task<ActionResult<IEnumerable<Food>>> Search(
    [FromQuery] string text = "",
    [FromQuery] int limit = 25)
  {
    var query = (text ?? string.Empty).Trim();
    if (string.IsNullOrWhiteSpace(query))
      return Ok(new List<Food>());

    limit = Math.Clamp(limit, 1, 100);
    var lowered = query.ToLowerInvariant();

    // Busca por nome ou key em ambos idiomas, sem tracking para economizar memória
    var foods = await _context.Food
      .AsNoTracking()
      .Where(f =>
        (f.Name.En != null && f.Name.En.ToLower().Contains(lowered)) ||
        (f.Name.Pt != null && f.Name.Pt.ToLower().Contains(lowered)) ||
        (f.Keys.En != null && f.Keys.En.ToLower().Contains(lowered)) ||
        (f.Keys.Pt != null && f.Keys.Pt.ToLower().Contains(lowered)))
      .OrderBy(f => f.Name.Pt ?? f.Name.En)
      .Take(limit)
      .ToListAsync();

    return Ok(foods);
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
}
