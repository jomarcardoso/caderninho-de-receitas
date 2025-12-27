using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Server.Shared;
using Microsoft.EntityFrameworkCore;

namespace Server.Models;

public enum RecipeVisibility
{
  Private = 0,
  Unlisted = 1,
  Public = 2,
}

public enum RecipeTombstoneStatus
{
  Active = 0,
  RemovedByAuthor = 1,
  Merged = 2,
  PolicyRemoved = 3,
}

public enum RevisionStatus
{
  Draft = 0,
  PendingReview = 1,
  Approved = 2,
  Rejected = 3,
}

public class RecipeRevision
{
  public Guid Id { get; set; } = Guid.NewGuid();

  public int RecipeId { get; set; }
  public Recipe Recipe { get; set; } = default!;

  public RevisionStatus Status { get; set; } = RevisionStatus.Draft;

  public Guid? BaseRevisionId { get; set; }
  public RecipeRevision? BaseRevision { get; set; }

  // Campos indexáveis (fora do JSON para busca/ordenar)
  public string Name { get; set; } = string.Empty;
  public string Keys { get; set; } = string.Empty;
  public Language Language { get; set; } = Language.En;

  // Snapshot estruturado para buscas/joins rápidos (foods/ingredients/steps)
  public List<RecipeRevisionStep> Steps { get; set; } = new();

  // Conteúdo completo versionável
  public string ContentJson { get; set; } = "{}";

  [MaxLength(80)]
  public string CreatedByUserId { get; set; } = string.Empty;

  public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;

  [MaxLength(200)]
  public string? ChangeSummary { get; set; }

  [MaxLength(80)]
  public string? ReviewedByUserId { get; set; }
  public DateTime? ReviewedAtUtc { get; set; }
  public string? ModerationNotes { get; set; }

  public RecipeRevision() { }

  public RecipeRevision(
    string name,
    string keys,
    Language language,
    List<RecipeRevisionStep> steps,
    string createdByUserId)
  {
    Name = name;
    Keys = keys;
    Language = language;
    Steps = steps ?? new List<RecipeRevisionStep>();
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

[Owned]
public class RecipeRevisionStep : RecipeStepBase<RecipeRevisionIngredient>
{
  public RecipeRevisionStep() { }

  public RecipeRevisionStep(
    string title,
    string preparation,
    string additional,
    string ingredientsText,
    List<RecipeRevisionIngredient> ingredients)
    : base(title, preparation, additional, ingredientsText)
  {
    NutritionalInformation = new NutritionalInformationBase();
    Minerals = new MineralsBase();
    Vitamins = new VitaminsBase();
    AminoAcids = new AminoAcidsBase();
    EssentialAminoAcids = new EssentialAminoAcidsBase();

    Ingredients = ingredients ?? new List<RecipeRevisionIngredient>();

    RecomputeAggregates();
  }

  public void RecomputeAggregates()
  {
    NutritionalInformation ??= new NutritionalInformationBase();
    Minerals ??= new MineralsBase();
    Vitamins ??= new VitaminsBase();
    AminoAcids ??= new AminoAcidsBase();
    EssentialAminoAcids ??= new EssentialAminoAcidsBase();
    AminoAcidsScore = 0;

    foreach (var ingredient in Ingredients ?? new List<RecipeRevisionIngredient>())
    {
      NutritionalInformation.Add(ingredient.NutritionalInformation);
      Minerals.Add(ingredient.Minerals);
      Vitamins.Add(ingredient.Vitamins);
      AminoAcids.Add(ingredient.AminoAcids);
      EssentialAminoAcids.Add(ingredient.EssentialAminoAcids);
    }

    AminoAcidsScore = EssentialAminoAcids.GetScore();
  }
}

[Owned]
public class RecipeRevisionIngredient : INutrientsBase
{
  public string Text { get; set; } = string.Empty;
  public Food Food { get; set; } = default!;
  public double Quantity { get; set; } = 0;
  public MeasureType MeasureType { get; set; } = MeasureType.Unity;
  public double MeasureQuantity { get; set; } = 0;
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public MineralsBase Minerals { get; set; } = new();
  public VitaminsBase Vitamins { get; set; } = new();
  public AminoAcidsBase AminoAcids { get; set; } = new();
  public EssentialAminoAcidsBase EssentialAminoAcids { get; set; } = new();

  public RecipeRevisionIngredient() { }

  public RecipeRevisionIngredient(
    string text,
    Food food,
    double quantity,
    MeasureType measureType,
    double measureQuantity)
  {
    Text = text;
    Food = food;
    Quantity = quantity;
    MeasureType = measureType;
    MeasureQuantity = measureQuantity;
    NutritionalInformation = new NutritionalInformationBase(food.NutritionalInformation, quantity);
    Minerals = new MineralsBase(food.Minerals, quantity);
    Vitamins = new VitaminsBase(food.Vitamins, quantity);
    AminoAcids = new AminoAcidsBase(food.AminoAcids, quantity);
    EssentialAminoAcids = new EssentialAminoAcidsBase(food.EssentialAminoAcids, quantity);
  }
}
