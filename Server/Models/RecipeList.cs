using Server.Shared;

namespace Server.Models;

public class RecipeList
{
  public int Id { get; set; }
  public string OwnerId { get; set; } = string.Empty;
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public Visibility Visibility { get; set; } = Visibility.Private;
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

  public ICollection<RecipeListItem> Items { get; set; } = new List<RecipeListItem>();
}

public class RecipeListItem
{
  public int RecipeListId { get; set; }
  public RecipeList? RecipeList { get; set; }

  public int RecipeId { get; set; }
  public Recipe? Recipe { get; set; }

  public int Position { get; set; } = 0;
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
