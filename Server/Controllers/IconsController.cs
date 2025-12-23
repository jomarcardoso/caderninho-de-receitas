using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Shared;
using Server.Models;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IconsController : ControllerBase
{
  private readonly AppDbContext _context;

  public IconsController(AppDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<IconDto>>> GetAll()
  {
    var icons = await _context.FoodIcon.AsNoTracking()
      .Select(i => new IconDto
      {
        Name = i.Name.En ?? string.Empty,
        Url = i.Url,
        Keys = new Server.Shared.LanguageTextBase { En = i.Keys.En, Pt = i.Keys.Pt }
      })
      .ToListAsync();
    return Ok(icons);
  }

  [HttpPost]
  public async Task<IActionResult> Create([FromBody] IconDto dto)
  {
    var icon = new Icon
    {
      Name = new LanguageText { En = dto.Name, Pt = string.Empty },
      Url = dto.Url,
      Keys = dto.Keys == null ? new LanguageText() : new LanguageText { En = dto.Keys.En, Pt = dto.Keys.Pt }
    };

    _context.FoodIcon.Add(icon);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetAll), new { id = icon.Id }, dto);
  }

  [HttpPost("bulk")]
  public async Task<IActionResult> CreateMany([FromBody] List<IconDto> dtos)
  {
    var entities = dtos.Select(dto => new Icon
    {
      Name = new LanguageText { En = dto.Name, Pt = string.Empty },
      Url = dto.Url,
      Keys = dto.Keys == null ? new LanguageText() : new LanguageText { En = dto.Keys.En, Pt = dto.Keys.Pt }
    }).ToList();

    _context.FoodIcon.AddRange(entities);
    await _context.SaveChangesAsync();

    return Ok();
  }

  [HttpPut("{id:int}")]
  public async Task<IActionResult> Update(int id, [FromBody] IconDto dto)
  {
    var icon = await _context.FoodIcon.FirstOrDefaultAsync(i => i.Id == id);
    if (icon == null) return NotFound();

    icon.Name.En = dto.Name;
    icon.Url = dto.Url;
    icon.Keys = dto.Keys == null ? new LanguageText() : new LanguageText { En = dto.Keys.En, Pt = dto.Keys.Pt };

    await _context.SaveChangesAsync();
    return NoContent();
  }
}
