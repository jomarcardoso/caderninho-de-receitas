using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;

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
    _context.Food.Add(food);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetById), new { id = food.Id }, food);
  }

  // POST: api/food/many
  [HttpPost("many")]
  public async Task<ActionResult<Food>> CreateMany([FromBody] Food[] foods)
  {
    foreach (Food food in foods)
    {
      _context.Food.Add(food);
      await _context.SaveChangesAsync();
    }

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
    existing.NamePt = food.NamePt;
    // Add other properties as needed

    await _context.SaveChangesAsync();
    return NoContent();
  }
}
