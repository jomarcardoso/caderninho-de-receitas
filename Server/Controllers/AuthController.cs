using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Dtos.Auth;
using Server.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Server.Shared;
using Server.Response;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  private readonly GoogleAuthService googleAuthService;
  private readonly AppDbContext _context;
  private readonly JwtTokenService _tokenService;
  private readonly IClaimsTransformation _claimsTransformation;
  private readonly UserProfileService _userProfileService;

  public AuthController(GoogleAuthService googleAuthService, AppDbContext context, JwtTokenService tokenService, IClaimsTransformation claimsTransformation, UserProfileService userProfileService)
  {
    this.googleAuthService = googleAuthService;
    _context = context;
    _tokenService = tokenService;
    _claimsTransformation = claimsTransformation;
    _userProfileService = userProfileService;
  }

  [HttpPost("google")]
  [ProducesResponseType(typeof(UserProfileOwnerResponse), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status401Unauthorized)]
  public async Task<IActionResult> GoogleLogin(
    [FromBody] GoogleLoginRequestDto request,
    CancellationToken cancellationToken)
  {
    if (!ModelState.IsValid)
    {
      return Unauthorized(new { error = "Invalid token" });
    }

    // Verify token and get Google user info
    GoogleJsonWebSignature.Payload? googleUserInfo =
      await googleAuthService.ValidateAsync(request.IdToken, cancellationToken);

    if (googleUserInfo is null)
    {
      return Unauthorized(new { error = "Invalid token" });
    }

    var googleUserId = googleUserInfo.Subject?.Trim() ?? string.Empty;

    UserProfile googleUserProfile = UserProfileFactory.FromGooglePayload(googleUserInfo);

    List<Role> roles = await _userProfileService.GetRolesAsync(googleUserProfile, cancellationToken);
    var isAdmin = roles.Contains(Role.Admin);

    googleUserProfile.Roles = roles;

    UserProfile? persistedProfile = null;

    // Upsert UserProfile with data from Google
    try
    {
      var ownerIdValue = googleUserProfile.Id;

      if (!string.IsNullOrWhiteSpace(googleUserProfile.Id))
      {
        UserProfile? profile = await _userProfileService.GetByOwnerIdAsync(googleUserProfile.Id, cancellationToken);

        if (profile is null)
        {
          profile = googleUserProfile;
          _context.UserProfile.Add(profile);
        }
        else
        {
          profile = UserProfileFactory.Update(profile, googleUserProfile);
        }

        persistedProfile = profile;
        await _context.SaveChangesAsync(cancellationToken);
      }
    }
    catch { /* ignore profile upsert issues during login */ }

    if (persistedProfile is null)
    {
      var error = new ApiError
      {
        Status = StatusCodes.Status500InternalServerError,
        Title = "Login failed",
        Detail = "Unable to load or update user profile",
        Code = "auth.profile_upsert_failed",
        CorrelationId = HttpContext.TraceIdentifier
      };

      return StatusCode(StatusCodes.Status500InternalServerError, error);
    }

    var token = _tokenService.GenerateToken(
      googleUserId,
      googleUserInfo.Email ?? string.Empty,
      googleUserInfo.Name ?? googleUserInfo.Email ?? googleUserId);

    UserProfileOwnerResponse response = UserProfileResponseBuilder.BuildOwnerResponse(persistedProfile);

    return Ok(new UserResponse { token = token, profile = response });
  }

  [HttpPost("logout")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public IActionResult Logout()
  {
    return Ok();
  }

  [HttpPost("refresh")]
  [Authorize]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status401Unauthorized)]
  public IActionResult RefreshToken()
  {
    var ownerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrWhiteSpace(ownerId)) return Unauthorized();

    var email = User.FindFirstValue(ClaimTypes.Email) ?? string.Empty;
    var name = User.FindFirstValue(ClaimTypes.Name) ?? email;

    var token = _tokenService.GenerateToken(ownerId, email, name);
    return Ok(new { token });
  }
}
