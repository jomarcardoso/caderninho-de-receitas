using Server.Shared;
using Server.Response;

namespace Server.Dtos;

// Transport DTO para criar/editar receita (categorias como strings)
public class RecipeDto
{
  public string Name { get; set; } = string.Empty;
  public string Keys { get; set; } = string.Empty;
  public string? Description { get; set; }
  public string? Additional { get; set; }
  public List<RecipeStepDto> Steps { get; set; } = new();
  public Language Language { get; set; } = Language.En;
  public List<string> Categories { get; set; } = new();
  public List<string> Imgs { get; set; } = new();
}

public class RecipeSummaryResponse
{
  public int Id { get; set; }
  public string OwnerId { get; set; } = string.Empty;
  public string Name { get; set; } = string.Empty;
  public List<string> Imgs { get; set; } = new();
  public UserProfileSummaryResponse? Owner { get; set; }
  public int SavedByOthersCount { get; set; } = 0;
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public bool IsOwner { get; set; }
}

// Item de lista (sem owner, pois a lista já tem contexto de dono)
public class RecipeItemSummaryResponse
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public List<string> Imgs { get; set; } = new();
  public int SavedByOthersCount { get; set; } = 0;
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public bool IsOwner { get; set; }
}

// Transport response (categorias como strings)
public class RecipeResponse
{
  public int Id { get; set; }
  public string OwnerId { get; set; } = string.Empty;
  public string Name { get; set; } = string.Empty;
  public string Keys { get; set; } = string.Empty;
  public string? Description { get; set; }
  public string? Additional { get; set; }
  public List<RecipeStepResponse> Steps { get; set; } = new();
  public Language Language { get; set; } = Language.En;
  public List<string> Categories { get; set; } = new(); // slugs
  public FoodSummaryResponse Food { get; set; } = new();
  public List<string> Imgs { get; set; } = new();
  public int SavedByOthersCount { get; set; } = 0;
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
  // Nutrients (kept for transport as objects keyed by nutrient name)
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public MineralsBase Minerals { get; set; } = new();
  public VitaminsBase Vitamins { get; set; } = new();
  public AminoAcidsBase AminoAcids { get; set; } = new();
  public EssentialAminoAcidsBase EssentialAminoAcids { get; set; } = new();
  public double AminoAcidsScore { get; set; } = 0;
  public UserProfileSummaryResponse? Owner { get; set; }
  public bool IsOwner { get; set; } = false;
  public string? ShareToken { get; set; }
  public DateTime? ShareTokenCreatedAt { get; set; }
  public DateTime? ShareTokenRevokedAt { get; set; }
  public List<RecipeSummaryResponse> RelatedRecipes { get; set; } = new();
}

public class RecipeListDto
{
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public bool? IsPublic { get; set; }
}

public class RecipeListResponse
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public bool IsPublic { get; set; } = false;
  public DateTime CreatedAt { get; set; }
  public DateTime UpdatedAt { get; set; }
  public UserProfileSummaryResponse? Owner { get; set; }
  public List<RecipeItemSummaryResponse> Items { get; set; } = new();
}

public class RecipeListSummaryResponse
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public bool IsPublic { get; set; }
  public List<RecipeItemSummaryResponse> Items { get; set; } = new();
}

public class RecipeIndexResponse
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
}

public class RecipeListIndexResponse
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public List<RecipeIndexResponse> Items { get; set; } = new();
}
