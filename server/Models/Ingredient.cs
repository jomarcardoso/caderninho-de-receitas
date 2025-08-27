namespace server.Models;

public class Ingredient
{
  public int Id { get; set; }
  public string Text { get; set; } = string.Empty;

  public required Food Food { get; set; }
  // literal quantity, in liters or grams
  public double Quantity { get; set; } = 0;
  // quantity described, cups, spoons...
  public required Measure Measure { get; set; }
}