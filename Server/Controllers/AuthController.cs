using System.Security.Claims;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Dtos.Auth;
using Server.Services;
using Server.Services.Auth;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  private readonly FirebaseSessionCookieService _cookies;
  private readonly FirebaseUserProfileService _profiles;
  private readonly UserProfileService _userProfiles;

  public AuthController(
    FirebaseSessionCookieService cookies,
    FirebaseUserProfileService profiles,
    UserProfileService userProfiles)
  {
    _cookies = cookies;
    _profiles = profiles;
    _userProfiles = userProfiles;
  }

  [HttpPost("session")]
  [AllowAnonymous]
  [ProducesResponseType(typeof(AuthSessionResponseDto), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  public async Task<IActionResult> CreateSession(
    [FromBody] CreateSessionRequestDto request,
    CancellationToken cancellationToken)
  {
    if (!ModelState.IsValid || string.IsNullOrWhiteSpace(request.IdToken))
    {
      return BadRequest(new { error = "id_token_required" });
    }

    FirebaseToken decoded;
    try
    {
      decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(request.IdToken, false, cancellationToken);
    }
    catch
    {
      return Unauthorized(new { error = "invalid_id_token" });
    }

    var sessionCookie = await _cookies.CreateSessionCookieAsync(request.IdToken);
    _cookies.AppendSessionCookie(Response, sessionCookie);

    var profile = await _profiles.UpsertFromFirebaseAsync(decoded, cancellationToken);
    var payload = UserProfileResponseBuilder.BuildOwnerResponse(profile);

    return Ok(new AuthSessionResponseDto
    {
      Uid = decoded.Uid,
      Profile = payload
    });
  }

  [HttpPost("logout")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<IActionResult> Logout(CancellationToken cancellationToken)
  {
    if (Request.Cookies.TryGetValue(_cookies.CookieName, out var sessionCookie))
    {
      var decoded = await _cookies.VerifySessionCookieAsync(sessionCookie, checkRevoked: false);
      if (decoded is not null)
      {
        try
        {
          await FirebaseAuth.DefaultInstance.RevokeRefreshTokensAsync(decoded.Uid, cancellationToken);
        }
        catch
        {
          // best-effort
        }
      }
    }

    _cookies.DeleteSessionCookie(Response);
    return Ok(new { ok = true });
  }

  [HttpGet("me")]
  [Authorize]
  [ProducesResponseType(typeof(UserProfileOwnerResponse), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status401Unauthorized)]
  public async Task<IActionResult> Me(CancellationToken cancellationToken)
  {
    var ownerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrWhiteSpace(ownerId)) return Unauthorized();

    var profile = await _userProfiles.GetByOwnerIdAsync(ownerId, cancellationToken);
    if (profile is null) return Unauthorized();

    return Ok(UserProfileResponseBuilder.BuildOwnerResponse(profile));
  }
}
