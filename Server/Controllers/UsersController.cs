using Microsoft.AspNetCore.Mvc;
using Server.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
  private readonly UserProfileService _profiles;

  public UsersController(UserProfileService profiles)
  {
    _profiles = profiles;
  }

  [HttpGet("me")]
  [Authorize]
  public async Task<IActionResult> Me()
  {
    var profile = await _profiles.UpsertFromClaimsAsync(User);
    if (profile is null) return Unauthorized();
    return Ok(profile);
  }

  [HttpGet("featured")]
  [AllowAnonymous]
  public async Task<IActionResult> Featured([FromQuery] int quantity = 6)
  {
    var list = await _profiles.GetFeaturedAsync(quantity);
    return Ok(list);
  }

  [HttpGet("{ownerId}")]
  [AllowAnonymous]
  public async Task<IActionResult> GetById(string ownerId)
  {
    if (string.IsNullOrWhiteSpace(ownerId)) return BadRequest();
    var profile = await _profiles.GetByOwnerIdAsync(ownerId.Trim());
    if (profile is null) return NotFound();
    return Ok(profile);
  }

  [HttpPost("feature/{ownerId}")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> Feature(string ownerId)
  {
    var ok = await _profiles.SetFeaturedAsync(ownerId, true);
    if (!ok) return NotFound();
    return NoContent();
  }

  [HttpDelete("feature/{ownerId}")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> Unfeature(string ownerId)
  {
    var ok = await _profiles.SetFeaturedAsync(ownerId, false);
    if (!ok) return NotFound();
    return NoContent();
  }
}
