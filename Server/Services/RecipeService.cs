using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Models;
using Server.Models.Food;

namespace Server.Services;

public class RecipeService
{
  private readonly AppDbContext _context;
  private readonly IMapper _mapper;
  private readonly IngredientService ingredientService;

  public RecipeService(IngredientService _ingredientService, IMapper mapper, AppDbContext context)
  {
    ingredientService = _ingredientService ?? throw new ArgumentNullException(nameof(ingredientService));
    _mapper = mapper;
    _context = context;
  }
  public async Task<Recipe> DtoToEntity(RecipeDto recipeDto)
  {
    var steps = new List<RecipeStep>();

    foreach (var stepDto in recipeDto.Steps)
    {
      var ingredients = new List<Ingredient>();
      foreach (var text in stepDto.Ingredients.Split("\n"))
      {
        ingredientService.Text = text;
        var ingredient = await ingredientService.ToEntity();
        ingredients.Add(ingredient);
      }

      steps.Add(new RecipeStep
      {
        Name = stepDto.Name,
        IngredientsText = stepDto.Ingredients,
        Preparation = stepDto.Preparation,
        Additional = stepDto.Additional,
        Ingredients = ingredients
      });
    }

    return new Recipe
    {
      Name = recipeDto.Name ?? string.Empty,
      Description = recipeDto.Description,
      Additional = recipeDto.Additional,
      Steps = steps
    };
  }

  public async Task<List<Recipe>> GetAllRecipesByUserId(string userId)
  {
    List<Recipe> recipes = await _context.Recipes
      .Where(r => r.OwnerId == userId)
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .ToListAsync();

    return recipes;
  }

  public async Task<RecipeAndFoodResponseDto> GetRecipesAndFoodsByUserId(string userId)
  {
    List<Recipe> recipes = await GetAllRecipesByUserId(userId);
    List<RecipeResponseDto> recipeDtos = _mapper.Map<List<RecipeResponseDto>>(recipes);
    List<Food> foods = FoodService.GetFoodsFromRecipes(recipes);

    return new RecipeAndFoodResponseDto
    {
      Recipes = recipeDtos,
      Foods = _mapper.Map<List<Food>>(foods)
    };
  }
}
