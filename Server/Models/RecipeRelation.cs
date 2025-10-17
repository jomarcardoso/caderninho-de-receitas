using System;

namespace Server.Models;

public class RecipeRelation
{
  public int Id { get; set; }
  public int RecipeId { get; set; }
  public int RelatedRecipeId { get; set; }
  public double Weight { get; set; } = 0;
  public string Source { get; set; } = string.Empty; // e.g., shared-food, shared-ingredient, shared-keys
  public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}

