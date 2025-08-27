using Server.Models;

namespace Server.Dtos;

public class RecipeDto
{
  public string Title { get; set; }
  public string Description { get; set; }

  // public Recipe ToEntity(string ownerId)
  // {
  //   return new Recipe
  //   {
  //     Title = Title.Trim(),
  //     Description = StripHtml(Description),
  //     OwnerId = ownerId,
  //     CreatedAt = DateTime.UtcNow
  //   };
  // }

  private string StripHtml(string input)
  {
    // limpeza de HTML (exemplo simples)
    return input.Replace("<", "").Replace(">", "");
  }
}
