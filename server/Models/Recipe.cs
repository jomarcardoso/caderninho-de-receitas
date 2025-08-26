namespace server.Models
{
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
        public string OwnerId { get; set; } = string.Empty;
    }
}