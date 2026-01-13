using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Server.Shared;

namespace Server.Models;

public class RecipeRevision
{
  public Guid Id { get; set; } = Guid.NewGuid();

  public int RecipeId { get; set; }
  public Recipe Recipe { get; set; } = default!;

  // Campos indexáveis (fora do JSON para busca/ordenar)
  public string Name { get; set; } = string.Empty;
  public string Keys { get; set; } = string.Empty;
  public Language Language { get; set; } = Language.En;

  // Snapshot estruturado para buscas/joins rápidos (foods/ingredients/steps)
  public List<RecipeStep> Steps { get; set; } = new();

  [MaxLength(80)]
  public string CreatedByUserId { get; set; } = string.Empty;

  public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;

  public string? ModerationNotes { get; set; }

  public RecipeRevision() { }

  public RecipeRevision(
    string name,
    string keys,
    Language language,
    List<RecipeStep> steps,
    string createdByUserId)
  {
    Name = name;
    Keys = keys;
    Language = language;
    Steps = steps ?? new List<RecipeStep>();
    CreatedByUserId = createdByUserId;
    CreatedAtUtc = DateTime.UtcNow;
    UpdatedAtUtc = DateTime.UtcNow;
    RecomputeAggregates();
  }

  public void RecomputeAggregates()
  {
    // Aggregate nutrient data from steps/ingredients (if needed for future fields)
    // Placeholder for future aggregate logic; currently nutrients live in ingredients/steps only.
  }
}
