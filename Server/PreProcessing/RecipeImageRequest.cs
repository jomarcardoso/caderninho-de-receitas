using Microsoft.AspNetCore.Http;

namespace Server.PreProcessing;

public class RecipeImageRequest
{
  public IFormFile? Image { get; set; }
  public string? Language { get; set; }
  public bool? IsPublic { get; set; }
}
