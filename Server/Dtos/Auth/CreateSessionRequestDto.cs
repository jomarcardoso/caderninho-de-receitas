using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Auth;

public class CreateSessionRequestDto
{
  [Required]
  public string IdToken { get; set; } = string.Empty;
}
