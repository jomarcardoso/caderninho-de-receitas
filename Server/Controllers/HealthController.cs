using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
  private readonly AppDbContext _context;

  public HealthController(AppDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  [AllowAnonymous]
  public async Task<IActionResult> Get()
  {
    try
    {
      var canConnect = await _context.Database.CanConnectAsync();
      if (!canConnect) return StatusCode(StatusCodes.Status503ServiceUnavailable, new { status = "down" });
      return Ok(new { status = "up" });
    }
    catch
    {
      return StatusCode(StatusCodes.Status503ServiceUnavailable, new { status = "down" });
    }
  }

  [HttpGet("ping")]
  [AllowAnonymous]
  public IActionResult Ping()
  {
    return Ok(new { status = "up", serverTime = DateTime.UtcNow });
  }
}

