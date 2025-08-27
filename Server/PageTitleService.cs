namespace Server;

public class PageTitleService
{
  public event Action<string>? OnTitleChanged;

  public void SetTitle(string title)
  {
    OnTitleChanged?.Invoke(title);
  }
}
