using Server.Shared;

namespace Server.Models;

public class Recipe : RecipeBase<RecipeStep, Food>
{
  public string OwnerId { get; set; } = string.Empty;
  public int CopiedFromRecipeId { get; set; } = 0;
  // Navigation to profile of the owner/author
  public UserProfile? Owner { get; set; }

  public Recipe() : base() { }

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
