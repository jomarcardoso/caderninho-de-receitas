using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Shared;
using Server.Models;
using Server.Response;

namespace Server.Controllers;

[ApiController]
[Route("api/icon")]
[Authorize(Policy = "AdminOrHigher")]
public class IconController : ControllerBase
{
  private readonly AppDbContext _context;

  public IconController(AppDbContext context)
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

  [HttpGet("{id:int}")]
  public async Task<ActionResult<IconDto>> GetById(int id)
  {
    var icon = await _context.FoodIcon.AsNoTracking().FirstOrDefaultAsync(i => i.Id == id);
    if (icon is null)
    {
      return NotFound(new ApiError
      {
        Status = StatusCodes.Status404NotFound,
        Title = "Icon not found",
        Code = "icon.not_found"
      });
    }

    var dto = new IconDto
    {
      Name = icon.Name.En ?? string.Empty,
      Url = icon.Url,
      Keys = new Server.Shared.LanguageTextBase { En = icon.Keys.En, Pt = icon.Keys.Pt }
    };
    return Ok(dto);
  }

  [HttpPost]
  public async Task<IActionResult> Create([FromBody] IconDto dto)
  {
    if (dto == null || string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Url))
    {
      return BadRequest(new ApiError
      {
        Status = StatusCodes.Status400BadRequest,
        Title = "Invalid icon payload",
        Code = "icon.invalid_payload"
      });
    }

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
    if (dtos == null || dtos.Count == 0)
    {
      return BadRequest(new ApiError
      {
        Status = StatusCodes.Status400BadRequest,
        Title = "Invalid icon payload",
        Code = "icon.invalid_payload"
      });
    }

    if (dtos.Any(d => d == null || string.IsNullOrWhiteSpace(d.Name) || string.IsNullOrWhiteSpace(d.Url)))
    {
      return BadRequest(new ApiError
      {
        Status = StatusCodes.Status400BadRequest,
        Title = "Invalid icon payload",
        Code = "icon.invalid_payload"
      });
    }

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
    if (dto == null || string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Url))
    {
      return BadRequest(new ApiError
      {
        Status = StatusCodes.Status400BadRequest,
        Title = "Invalid icon payload",
        Code = "icon.invalid_payload"
      });
    }

    var icon = await _context.FoodIcon.FirstOrDefaultAsync(i => i.Id == id);
    if (icon == null)
    {
      return NotFound(new ApiError
      {
        Status = StatusCodes.Status404NotFound,
        Title = "Icon not found",
        Code = "icon.not_found"
      });
    }

    icon.Name.En = dto.Name;
    icon.Url = dto.Url;
    icon.Keys = dto.Keys == null ? new LanguageText() : new LanguageText { En = dto.Keys.En, Pt = dto.Keys.Pt };

    await _context.SaveChangesAsync();
    return NoContent();
  }

  [HttpDelete("{id:int}")]
  public async Task<IActionResult> Delete(int id)
  {
    var icon = await _context.FoodIcon.FirstOrDefaultAsync(i => i.Id == id);
    if (icon == null)
    {
      return NotFound(new ApiError
      {
        Status = StatusCodes.Status404NotFound,
        Title = "Icon not found",
        Code = "icon.not_found"
      });
    }

    _context.FoodIcon.Remove(icon);
    await _context.SaveChangesAsync();
    return NoContent();
  }
}
