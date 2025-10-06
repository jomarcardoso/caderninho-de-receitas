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
    NutritionalInformation = new NutritionalInformationBase(food.NutritionalInformation, quantity);
    Minerals = new MineralsBase(food.Minerals, quantity);
    Vitamins = new VitaminsBase(food.Vitamins, quantity);
    AminoAcids = new AminoAcidsBase(food.AminoAcids, quantity);
    EssentialAminoAcids = new EssentialAminoAcidsBase(food.EssentialAminoAcids, quantity);
  }
}
