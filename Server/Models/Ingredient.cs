using Server.Shared;

namespace Server.Models;

public class Ingredient : IngredientBase<Food>
{
  public int Id { get; set; }

  public Ingredient() { }

  public Ingredient(string text, Food food, double quantity, Measure measure)
  {
    Text = text;
    Food = food;
    Quantity = quantity;
    Measure = measure;
    NutritionalInformation = new NutritionalInformation(food.NutritionalInformation, quantity);
    Minerals = new Minerals(food.Minerals, quantity);
    Console.WriteLine("vai vita");
    Vitamins = new Vitamins(food.Vitamins, quantity);
    AminoAcids = new AminoAcids(food.AminoAcids, quantity);
  }
}