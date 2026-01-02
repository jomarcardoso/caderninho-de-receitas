using System;
using Server.Shared;
using System.Linq;
using System.Collections.Generic;

namespace Server.Models;

public class Recipe
{
  public int Id { get; set; }
  public string Slug { get; set; } = string.Empty;

  // Dono
  public string OwnerId { get; set; } = string.Empty;
  public UserProfile? Owner { get; set; }

  // Métricas / dados não versionáveis
  public int SavedByOthersCount { get; set; } = 0;

  // Legacy flag (mantida apenas para compatibilidade/migração)
  public bool IsPublic { get; set; } = false;

  public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;

  // Compartilhamento
  public string? ShareToken { get; set; }
  public DateTime? ShareTokenCreatedAt { get; set; }
  public DateTime? ShareTokenRevokedAt { get; set; }

  // Versionamento
  public RecipeVisibility Visibility { get; set; } = RecipeVisibility.Private;
  public RecipeTombstoneStatus TombstoneStatus { get; set; } = RecipeTombstoneStatus.Active;

  public Guid? PublishedRevisionId { get; set; }
  public RecipeRevision? PublishedRevision { get; set; }

  public Guid? LatestRevisionId { get; set; }
  public RecipeRevision? LatestRevision { get; set; }

  // used to retire a recipe and point to another one
  public int? MergedIntoRecipeId { get; set; }
  public Recipe? MergedIntoRecipe { get; set; }

  public List<RecipeRevision> Revisions { get; set; } = new();

  // Para rastrear cópias, se aplicável
  public int? CopiedFromRecipeId { get; set; }

  // ---- Legacy compatibility helpers (read-only proxies to the active revision) ----
  private RecipeRevision? ActiveRevision => LatestRevision ?? PublishedRevision;

  public Recipe() { }

  // Construtor de compatibilidade com a API antiga (RecipeStep -> RecipeRevisionStep)
  public Recipe(
    int? id,
    string name,
    string keys,
    Food? food,
    string? description,
    string? additional,
    List<RecipeStep> steps,
    string? ownerId = null)
  {
    Id = id ?? 0;
    OwnerId = ownerId ?? OwnerId;
    Description = description;
    Additional = additional;

    var revSteps = ConvertLegacySteps(steps);
    var revision = new RecipeRevision(
      name,
      keys,
      Language,
      revSteps,
      ownerId ?? string.Empty
    )
    {
      ContentJson = "{}"
    };

    LatestRevision = revision;
    LatestRevisionId = revision.Id;
    Revisions.Add(revision);
  }

  private static List<RecipeRevisionStep> ConvertLegacySteps(IEnumerable<RecipeStep> steps)
  {
    var result = new List<RecipeRevisionStep>();
    foreach (var step in steps ?? Enumerable.Empty<RecipeStep>())
    {
      var ingredients = new List<RecipeRevisionIngredient>();
      foreach (var ing in step.Ingredients ?? new List<Ingredient>())
      {
        if (ing.Food is null) continue;
        ingredients.Add(new RecipeRevisionIngredient(
          ing.Text ?? string.Empty,
          ing.Food,
          ing.Quantity,
          ing.MeasureType,
          ing.MeasureQuantity
        ));
      }

      var newStep = new RecipeRevisionStep(
        step.Title ?? string.Empty,
        step.Preparation ?? string.Empty,
        step.Additional ?? string.Empty,
        step.IngredientsText ?? string.Empty,
        ingredients
      );
      result.Add(newStep);
    }
    return result;
  }

  // Campos indexáveis
  public string Name => ActiveRevision?.Name ?? string.Empty;
  public string Keys => ActiveRevision?.Keys ?? string.Empty;
  public Language Language => ActiveRevision?.Language ?? Language.En;

  // Conteúdo não indexável (mantido para compatibilidade; origem real no ContentJson)
  // Esses campos não são persistidos diretamente e servem apenas para evitar que
  // código legível dependa de propriedades removidas.
  public string? Description { get; set; }
  public string? Additional { get; set; }
  public List<string> Imgs { get; set; } = new();
  public List<string> Categories { get; set; } = new();

  // Snapshot de passos/ingredientes derivados da revisão ativa convertidos para o modelo legado
  public List<RecipeStep> Steps
  {
    get
    {
      var steps = new List<RecipeStep>();
      var revSteps = ActiveRevision?.Steps ?? new List<RecipeRevisionStep>();
      foreach (var s in revSteps)
      {
        var ingredients = (s.Ingredients ?? new List<RecipeRevisionIngredient>())
          .Where(i => i.Food is not null)
          .Select(i => new Ingredient(
            i.Text ?? string.Empty,
            i.Food!,
            i.Quantity,
            i.MeasureType,
            i.MeasureQuantity))
          .ToList();

        var legacyStep = new RecipeStep(
          s.Title ?? string.Empty,
          s.Preparation ?? string.Empty,
          s.Additional ?? string.Empty,
          s.IngredientsText ?? string.Empty,
          ingredients)
        {
          NutritionalInformation = s.NutritionalInformation,
          Minerals = s.Minerals,
          Vitamins = s.Vitamins,
          AminoAcids = s.AminoAcids,
          EssentialAminoAcids = s.EssentialAminoAcids
        };
        steps.Add(legacyStep);
      }
      return steps;
    }
  }

  // Compat: tenta expor um "Food" principal (primeiro ingrediente do primeiro passo)
  public Food? Food => Steps
    .SelectMany(s => s.Ingredients ?? Enumerable.Empty<Ingredient>())
    .Select(i => i.Food)
    .FirstOrDefault();

  // Agregados nutricionais calculados on-demand para compatibilidade
  public NutritionalInformationBase NutritionalInformation
  {
    get
    {
      var agg = new NutritionalInformationBase();
      foreach (var step in Steps)
      {
        agg.Add(step.NutritionalInformation);
      }
      return agg;
    }
    set { /* setter mantido apenas para serialização antiga */ }
  }

  public MineralsBase Minerals
  {
    get
    {
      var agg = new MineralsBase();
      foreach (var step in Steps)
      {
        agg.Add(step.Minerals);
      }
      return agg;
    }
    set { }
  }

  public VitaminsBase Vitamins
  {
    get
    {
      var agg = new VitaminsBase();
      foreach (var step in Steps)
      {
        agg.Add(step.Vitamins);
      }
      return agg;
    }
    set { }
  }

  public AminoAcidsBase AminoAcids
  {
    get
    {
      var agg = new AminoAcidsBase();
      foreach (var step in Steps)
      {
        agg.Add(step.AminoAcids);
      }
      return agg;
    }
    set { }
  }

  public EssentialAminoAcidsBase EssentialAminoAcids
  {
    get
    {
      var agg = new EssentialAminoAcidsBase();
      foreach (var step in Steps)
      {
        agg.Add(step.EssentialAminoAcids);
      }
      return agg;
    }
    set { }
  }

  public double AminoAcidsScore => 0;

  // Compatibilidade
  public bool Verified { get; set; } = false;
  public DateTime UpdatedAt { get => UpdatedAtUtc; set => UpdatedAtUtc = value; }
  public DateTime CreatedAt { get => CreatedAtUtc; set => CreatedAtUtc = value; }

  public void RecomputeAggregatesFromRevisions()
  {
    // Placeholder para futuras agregações a partir das revisões (nutrientes, etc.)
    // Atualmente os agregados ficam na revisão/ingredientes.
  }
}
