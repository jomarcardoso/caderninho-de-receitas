using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Models;

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

    foreach (RecipeStepDto stepDto in recipeDto.Steps)
    {
      var ingredients = new List<Ingredient>();

      foreach (var text in stepDto.Ingredients.Split("\n"))
      {
        ingredientService.Text = text;
        var ingredient = await ingredientService.ToEntity();
        ingredients.Add(ingredient);
      }

      steps.Add(new RecipeStep(
        stepDto.Title,
        stepDto.Preparation,
        stepDto.Additional,
        ingredients
      ));
    }

    return new Recipe(
      recipeDto.Id,
      recipeDto.Name ?? string.Empty,
      recipeDto.Description,
      recipeDto.Additional,
      steps
    );
  }

  public async Task<List<Recipe>> GetAllRecipesByUserId(string userId)
  {
    List<Recipe> recipes = await _context.Recipe
      .Where(r => r.OwnerId == userId)
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .ToListAsync();

    return recipes;
  }

  public async Task<RecipesDto> GetRecipesAndFoodsByUserId(string userId)
  {
    List<Recipe> recipes = await GetAllRecipesByUserId(userId);
    List<RecipeResponseDto> recipeDtos = _mapper.Map<List<RecipeResponseDto>>(recipes);
    List<Food> foods = FoodService.GetFoodsFromRecipes(recipes);

    return new RecipesDto
    {
      Recipes = recipeDtos,
      Foods = _mapper.Map<List<Food>>(foods)
    };
  }

  public async Task DeleteStepsAsync(Recipe recipe)
  {
    recipe.Steps.Clear();

    await _context.SaveChangesAsync();
  }
}
