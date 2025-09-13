using Server.Shared;

namespace Server.Models;

public class Recipe : RecipeBase<RecipeStep>
{
  public string OwnerId { get; set; } = string.Empty;

  public Recipe() : base() { }

  public Recipe(int? id, string name, string? description, string? additional, List<RecipeStep> steps)
  {
    Id = id ?? 0;
    Name = name;
    Description = description;
    Additional = additional;
    Steps = steps;

    NutritionalInformation = new NutritionalInformationBase();
    Minerals = new Minerals();
    Vitamins = new VitaminsBase();
    AminoAcids = new AminoAcidsBase();

    steps.ForEach(s =>
    {
      NutritionalInformation.Add(s.NutritionalInformation);
      Minerals.Add(s.Minerals);
      Vitamins.Add(s.Vitamins);
      AminoAcids.Add(s.AminoAcids);
    });
  }

  public Recipe(int? id, string name, string? description, string? additional, List<RecipeStep> steps, string? ownerId)
    : this(id, name, description, additional, steps)
  {
    OwnerId = ownerId ?? string.Empty;
  }
}