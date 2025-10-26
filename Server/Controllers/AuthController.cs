using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Auth;
using Server.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  private readonly GoogleAuthService googleAuthService;

  public AuthController(GoogleAuthService googleAuthService)
  {
    this.googleAuthService = googleAuthService;
  }

  [HttpPost("google")]
  [ProducesResponseType(typeof(GoogleLoginResponseDto), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status401Unauthorized)]
  public async Task<IActionResult> GoogleLogin(
    [FromBody] GoogleLoginRequestDto request,
    CancellationToken cancellationToken)
  {
    if (!ModelState.IsValid)
    {
      return Unauthorized(new { error = "Invalid token" });
    }

    var user = await googleAuthService.ValidateAsync(request.IdToken, cancellationToken);
    if (user is null)
    {
      return Unauthorized(new { error = "Invalid token" });
    }

    var response = new GoogleLoginResponseDto
    {
      DisplayName = user.Name,
      Email = user.Email,
      Picture = user.Picture,
      GoogleId = user.GoogleId,
      EmailVerified = user.EmailVerified,
    };

    return Ok(response);
  }

  [HttpGet("me")]
  [Authorize]
  [ProducesResponseType(typeof(GoogleLoginResponseDto), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status401Unauthorized)]
  public IActionResult Me()
  {
    var name = User.FindFirstValue(ClaimTypes.Name) ?? string.Empty;
    var email = User.FindFirstValue(ClaimTypes.Email) ?? string.Empty;
    var picture = User.FindFirst("urn:tiktok:avatar_url")?.Value ?? string.Empty;
    var roles = User.FindAll(ClaimTypes.Role).Select(c => c.Value).Distinct().ToArray();

    return Ok(new
    {
      displayName = name,
      email,
      picture,
      roles,
    });
  }
}
