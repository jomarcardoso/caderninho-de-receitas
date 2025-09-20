// using Google.Apis.Auth;
// using Microsoft.AspNetCore.Mvc;

// namespace SeuProjeto.Controllers;

// [ApiController]
// [Route("api/[controller]")]
// public class AuthController : ControllerBase
// {
//   [HttpPost("google")]
//   public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
//   {
//     try
//     {
//       var payload = await GoogleJsonWebSignature.ValidateAsync(request.IdToken, new GoogleJsonWebSignature.ValidationSettings
//       {
//         Audience = new[] { "SEU_CLIENT_ID.apps.googleusercontent.com" } // importante validar o clientId!
//       });

//       // Aqui você já tem os dados do usuário validados
//       var user = new
//       {
//         payload.Name,
//         payload.Email,
//         payload.Picture,
//         payload.Subject // ID único do Google
//       };

//       // 👉 Aqui você pode criar um JWT da sua aplicação e devolver pro front
//       return Ok(user);
//     }
//     catch (Exception ex)
//     {
//       return Unauthorized(new { error = ex.Message });
//     }
//   }
// }

// public class GoogleLoginRequest
// {
//   public string IdToken { get; set; }
// }
