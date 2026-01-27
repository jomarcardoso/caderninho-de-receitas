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

  // Estado de publicação/aprovação
  public RevisionStatus Status { get; set; } = RevisionStatus.Draft;

  // Flag de publicação
  public Visibility Visibility { get; set; } = Visibility.Private;

  public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;

  // Compartilhamento
  public string? ShareToken { get; set; }
  public DateTime? ShareTokenCreatedAt { get; set; }
  public DateTime? ShareTokenRevokedAt { get; set; }

  // Versionamento
  public TombstoneStatus TombstoneStatus { get; set; } = TombstoneStatus.Active;

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

  // Construtor de compatibilidade com a API antiga (RecipeStep -> revision)
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
    Food = food;
    FoodId = food?.Id;

    var revision = new RecipeRevision(
      name,
      keys,
      Language,
      steps ?? new(),
      ownerId ?? string.Empty
    );

    LatestRevision = revision;
    LatestRevisionId = revision.Id;
    Revisions.Add(revision);
  }

  // Campos indexáveis
  public string Name => ActiveRevision?.Name ?? string.Empty;
  public string Keys => ActiveRevision?.Keys ?? string.Empty;
  public Language Language => ActiveRevision?.Language ?? Language.En;

  // Conteúdo não indexável (compatibilidade)
  public string? Description { get; set; }
  public string? Additional { get; set; }
  public List<int> CategoryIds { get; set; } = new();
  public int? FoodId { get; set; }
  public Food? Food { get; set; }

  // Snapshot de passos/ingredientes derivados da revisão ativa convertidos para o modelo legado
  public List<RecipeStep> Steps
  {
    get
    {
      return ActiveRevision?.Steps ?? new List<RecipeStep>();
    }
  }

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
