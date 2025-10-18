namespace Server.Models;

public class FoodIcon
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty; // e.g., wheat-flour.svg
  public string MediaType { get; set; } = string.Empty; // e.g., image/svg+xml or image/png
  public string Content { get; set; } = string.Empty; // raw SVG or base64 PNG
}

