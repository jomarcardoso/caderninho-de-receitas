namespace Server.Shared;

public interface ISearchable
{
  public LanguageTextBase Name { get; set; }
  public LanguageTextBase Keys { get; set; }
}