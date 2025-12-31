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
using System.Text.Json;

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
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<ActionResult<FoodResponse>> Create([FromBody] FoodDto foodDto)
  {
    var food = _mapper.Map<Food>(foodDto);
    food.Id = 0;
    food.Process();
    _context.Food.Add(food);
    await _context.SaveChangesAsync();

    var response = _mapper.Map<FoodResponse>(food);
    return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
  }

  // POST: api/food/many
  [HttpPost("many")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<ActionResult<IEnumerable<FoodResponse>>> CreateMany([FromBody] FoodDto[] foods)
  {
    if (foods is null || foods.Length == 0) return Ok();

    var entities = foods.Select(dto =>
    {
      var food = _mapper.Map<Food>(dto);
      food.Id = 0;
      food.Process();
      return food;
    }).ToArray();

    _context.Food.AddRange(entities);
    await _context.SaveChangesAsync();

    var response = entities.Select(_mapper.Map<FoodResponse>).ToList();
    return Ok(response);
  }

  // PUT: api/food/{id}
  [HttpPut("{id}")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<ActionResult<FoodResponse>> Update(int id, [FromBody] FoodDto foodDto)
  {
    var existing = await _context.Food.FindAsync(id);
    if (existing == null)
      return NotFound();

    _mapper.Map(foodDto, existing);
    existing.Id = id;
    existing.Process();

    await _context.SaveChangesAsync();
    return Ok(_mapper.Map<FoodResponse>(existing));
  }

  // DELETE: api/food/{id}
  [HttpDelete("{id}")]
  [Authorize(Policy = "AdminOrHigher")]
  public async Task<IActionResult> Delete(int id)
  {
    var existing = await _context.Food.FindAsync(id);
    if (existing == null)
      return NotFound();

    _context.Food.Remove(existing);
    await _context.SaveChangesAsync();

    return Ok(new { id, deleted = true });
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
