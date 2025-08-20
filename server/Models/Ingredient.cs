namespace server.Models
{
  public class DetailedIngredient
  {
    // food detected
    public Food? Food { get; set; } = null;
    // literal quantity, in liters or grams
    public double Quantity { get; set; } = 0;
    // quantity described, cups, spoons...
    public Measure? Measure { get; set; } = null;
  }

  public class Ingredient : DetailedIngredient
  {
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;

    // it processes the information based on the text
    public Ingredient(string text)
    {
      Text = text;
    }

    public Ingredient(string text, Food food, double quantity, Measure measure)
    {
      Text = text;
      Food = food;
      Quantity = quantity;
      Measure = measure;
    }
  }

    //   protected DetailedIngredient ProcessIngredientByDescription()
    // {

    // }
}