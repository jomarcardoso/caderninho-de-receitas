using server.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace server.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        // food detected
        public Food? Food { get; set; } = null;
        // literal quantity, in liters or grams
        public double Quantity { get; set; } = 0;
        // quantity described, cups, spoons...
        public Measure? Measure { get; set; } = null;

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

    public class RecipeStep
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string IngredientsText { get; set; } = string.Empty;
        public List<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
        public string Preparation { get; set; } = string.Empty;
        public string Additional { get; set; } = string.Empty;
        // Optional: You can add a constructor for easier initialization
        public RecipeStep(string name, string ingredientsText, string preparation, string additional)
        {
            Name = name;
            IngredientsText = ingredientsText;
            Preparation = preparation;
            Additional = additional;
        }
    }

    public class Recipe
    {
        public int id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Additional { get; set; }
        public List<RecipeStep> steps { get; set; } = new List<RecipeStep>();
        //RecipeCategory category { get; set; }
    }
}