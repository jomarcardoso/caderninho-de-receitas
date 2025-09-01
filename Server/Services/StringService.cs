namespace Server.Services;

public class StringService
{
  public static string ReplaceEnding(string text, string ending, string replacement)
  {
    if (text.EndsWith(ending, StringComparison.OrdinalIgnoreCase))
    {
      return text.Substring(0, text.Length - ending.Length) + replacement;
    }

    return text;
  }
}