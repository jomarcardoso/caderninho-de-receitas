using Server.Dtos;

namespace Server.Dtos.Auth;

public class AuthSessionResponseDto
{
  public string Uid { get; set; } = string.Empty;
  public UserProfileOwnerResponse Profile { get; set; } = new();
}
