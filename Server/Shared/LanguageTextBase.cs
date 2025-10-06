namespace Server.Shared;

public enum Language
{
  En,
  Pt
}

public class LanguageTextBase
{
  public string En { get; set; } = string.Empty;
  public string Pt { get; set; } = string.Empty;
}

public class LanguageTextAndPluralBase
{
  public LanguageTextBase Text { get; set; } = new LanguageTextBase();
  public LanguageTextBase PluralText { get; set; } = new LanguageTextBase();
}