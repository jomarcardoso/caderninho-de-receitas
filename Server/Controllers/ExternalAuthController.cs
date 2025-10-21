using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[ApiController]
[Route("auth")] // e.g., GET /auth/tiktok => inicia o fluxo de login via TikTok
public class ExternalAuthController : ControllerBase
{
  [HttpGet("tiktok")]
  [AllowAnonymous]
  public IActionResult SignInWithTikTok([FromQuery] string? redirect = "/")
  {
    var props = new AuthenticationProperties { RedirectUri = string.IsNullOrWhiteSpace(redirect) ? "/" : redirect };
    return Challenge(props, "TikTok");
  }

  [HttpPost("signout")]
  public IActionResult SignOutCookie([FromQuery] string? redirect = "/")
  {
    var props = new AuthenticationProperties { RedirectUri = string.IsNullOrWhiteSpace(redirect) ? "/" : redirect };
    return SignOut(props, Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme);
  }
}

