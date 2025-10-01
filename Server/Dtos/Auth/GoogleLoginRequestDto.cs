using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Auth;

public class GoogleLoginRequestDto
{
  [Required]
  public string IdToken { get; set; } = string.Empty;
}
