using Microsoft.EntityFrameworkCore;
using Server.Shared;

namespace Server.Models;

[Owned]
public class Ingredient : IngredientBase<Food>
{
  public Ingredient() { }

  public Ingredient(string text, Food food, double quantity, MeasureType measureType, double measureQuantity)
  {
    Text = text;
    Food = food;
    Quantity = quantity;
    MeasureType = measureType;
    MeasureQuantity = measureQuantity;
    NutritionalInformation = new NutritionalInformation(food.NutritionalInformation, quantity);
    Minerals = new Minerals(food.Minerals, quantity);
    Console.WriteLine("vai vita");
    Vitamins = new Vitamins(food.Vitamins, quantity);
    AminoAcids = new AminoAcids(food.AminoAcids, quantity);
  }
}