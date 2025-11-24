namespace Server.Dtos.Auth;

public class GoogleLoginResponseDto
{
  public string DisplayName { get; init; } = string.Empty;
  public string Email { get; init; } = string.Empty;
  public string Picture { get; init; } = string.Empty;
  public string GoogleId { get; init; } = string.Empty;
  public bool EmailVerified { get; init; }
  public string[] Roles { get; set; } = Array.Empty<string>();
}
