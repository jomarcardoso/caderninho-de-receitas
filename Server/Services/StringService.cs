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

  public static string ReplaceStarting(string text, string starting, string replacement)
  {
    if (text.StartsWith(starting, StringComparison.OrdinalIgnoreCase))
    {
      return replacement + text.Substring(starting.Length, text.Length - starting.Length);
    }

    return text;
  }
}