namespace Server.Dtos;

public class FoodIconDto
{
  public string Name { get; set; } = string.Empty; // filename with extension
  public string MediaType { get; set; } = string.Empty; // image/svg+xml or image/png
  public string Content { get; set; } = string.Empty; // raw svg or base64 for png
}

