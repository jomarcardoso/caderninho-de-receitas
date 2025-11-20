using Server.Shared;

namespace Server.Models;

public class Recipe
{
  // Former RecipeContract<TRecipeStep>
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string Keys { get; set; } = string.Empty;
  public string? Description { get; set; }
  public string? Additional { get; set; }
  public List<RecipeStep> Steps { get; set; } = new List<RecipeStep>();
  public Language Language { get; set; } = Language.En;
  public List<RecipeCategory> Categories { get; set; } = new();

  // Former RecipeBase<TRecipeStep, TFood>
  public Food Food { get; set; }
  public List<string> Imgs { get; set; } = new();
  public int SavedByOthersCount { get; set; } = 0;
  public bool IsPublic { get; set; } = false;
  public bool Verified { get; set; } = false;
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public MineralsBase Minerals { get; set; } = new();
  public VitaminsBase Vitamins { get; set; } = new();
  public AminoAcidsBase AminoAcids { get; set; } = new();
  public EssentialAminoAcidsBase EssentialAminoAcids { get; set; } = new();

  public string OwnerId { get; set; } = string.Empty;
  public int CopiedFromRecipeId { get; set; } = 0;
  // Navigation to profile of the owner/author
  public UserProfile? Owner { get; set; }

  public Recipe() { }

  public Recipe(
    int? id,
    string name,
    string keys,
    Food food,
    string? description,
    string? additional,
    List<RecipeStep> steps
  )
  {
    Id = id ?? 0;
    Name = name;
    Keys = keys;
    Food = food;
    Description = description;
    Additional = additional;
    Steps = steps;
    CreatedAt = DateTime.UtcNow;
    UpdatedAt = DateTime.UtcNow;

    NutritionalInformation = new NutritionalInformationBase();
    Minerals = new MineralsBase();
    Vitamins = new VitaminsBase();
    AminoAcids = new AminoAcidsBase();
    EssentialAminoAcids = new EssentialAminoAcidsBase();

    steps.ForEach(s =>
    {
      NutritionalInformation.Add(s.NutritionalInformation);
      Minerals.Add(s.Minerals);
      Vitamins.Add(s.Vitamins);
      AminoAcids.Add(s.AminoAcids);
      EssentialAminoAcids.Add(s.EssentialAminoAcids);
    });
  }

  public Recipe(
    int? id,
    string name,
    string keys,
    Food food,
    string? description,
    string? additional,
    List<RecipeStep> steps,
    string? ownerId
  ) : this(id, name, keys, food, description, additional, steps)
  {
    OwnerId = ownerId ?? string.Empty;
  }
}
