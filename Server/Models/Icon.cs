using Server.Shared;

namespace Server.Models;

public class Icon : ISearchable
{
  public int Id { get; set; }
  public LanguageText Name { get; set; } = new();
  public string Url { get; set; } = string.Empty;
  public LanguageText Keys { get; set; } = new();

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
