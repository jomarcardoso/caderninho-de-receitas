using Server.Shared;

namespace Server.Models;

public class FoodIcon : ISearchable
{
  public int Id { get; set; }

  // Localized name (En used as the canonical string previously stored in Name)
  public LanguageText Name { get; set; } = new();

  // Public URL to the icon file
  public string Url { get; set; } = string.Empty;

  // Search support (similar to Food): optional keys in multiple languages
  public LanguageText Keys { get; set; } = new();

  // Explicit interface implementation to satisfy ISearchable contract
  LanguageTextBase ISearchable.Name
  {
    get => Name;
    set => Name = new LanguageText { En = value.En, Pt = value.Pt };
  }

  LanguageTextBase ISearchable.Keys
  {
    get => Keys;
    set => Keys = new LanguageText { En = value.En, Pt = value.Pt };
  }
}
