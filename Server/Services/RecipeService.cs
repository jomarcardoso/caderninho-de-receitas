using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Models;
using Server.Shared;
using System.Linq;

namespace Server.Services;

public class RecipeService
{
  private readonly AppDbContext _context;
  private readonly IMapper _mapper;
  private readonly IngredientService ingredientService;
  private readonly FoodService foodService;

  public RecipeService(
    IngredientService _ingredientService,
    FoodService _foodService,
    IMapper mapper,
    AppDbContext context
  )
  {
    ingredientService = _ingredientService ?? throw new ArgumentNullException(nameof(ingredientService));
    foodService = _foodService ?? throw new ArgumentNullException(nameof(foodService));
    _mapper = mapper;
    _context = context;
  }

  public async Task<Recipe> DtoToEntity(RecipeDto recipeDto)
  {
    var steps = await BuildStepsAsync(recipeDto);
    var food = await foodService.FindFoodByPossibleName(recipeDto.Name);

    return new Recipe(
      recipeDto.Id,
      recipeDto.Name,
      recipeDto.Keys,
      food,
      recipeDto.Description,
      recipeDto.Additional,
      steps
    );
  }

  public async Task<Recipe?> FindRecipeWithDetailsById(int recipeId)
  {
    return await _context.Recipe
      .Include(r => r.Food)
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .FirstOrDefaultAsync(r => r.Id == recipeId);
  }

  public Recipe CloneRecipeForUser(Recipe source, string ownerId)
  {
    if (source is null)
    {
      throw new ArgumentNullException(nameof(source));
    }

    if (string.IsNullOrWhiteSpace(ownerId))
    {
      throw new ArgumentException("Owner id must be provided.", nameof(ownerId));
    }

    var food = source.Food ?? throw new InvalidOperationException("Recipe must have a food to be cloned.");

    var clonedSteps = (source.Steps ?? new List<RecipeStep>())
      .Select(CloneStep)
      .ToList();

    var clone = new Recipe(
      null,
      source.Name,
      source.Keys,
      food,
      source.Description,
      source.Additional,
      clonedSteps,
      ownerId
    )
    {
      Image = source.Image,
      Language = source.Language
    };

    return clone;
  }

  private static RecipeStep CloneStep(RecipeStep step)
  {
    if (step is null)
    {
      throw new ArgumentNullException(nameof(step));
    }

    var clonedIngredients = (step.Ingredients ?? new List<Ingredient>())
      .Select(ingredient => new Ingredient(
        ingredient.Text,
        ingredient.Food,
        ingredient.Quantity,
        ingredient.MeasureType,
        ingredient.MeasureQuantity
      ))
      .ToList();

    return new RecipeStep(
      step.Title ?? string.Empty,
      step.Preparation ?? string.Empty,
      step.Additional ?? string.Empty,
      step.IngredientsText ?? string.Empty,
      clonedIngredients
    );
  }

  public async Task UpdateEntityFromDto(Recipe recipe, RecipeDto recipeDto)
  {
    if (recipe is null)
    {
      throw new ArgumentNullException(nameof(recipe));
    }

    if (recipeDto is null)
    {
      throw new ArgumentNullException(nameof(recipeDto));
    }

    recipe.Name = recipeDto.Name;
    recipe.Keys = recipeDto.Keys;
    recipe.Description = recipeDto.Description;
    recipe.Additional = recipeDto.Additional;
    recipe.Language = recipeDto.Language;
    recipe.Food = await foodService.FindFoodByPossibleName(recipeDto.Name);

    var steps = await BuildStepsAsync(recipeDto);

    recipe.Steps.Clear();
    foreach (var step in steps)
    {
      recipe.Steps.Add(step);
    }

    RecalculateRecipeNutrition(recipe);
  }

  private async Task<List<RecipeStep>> BuildStepsAsync(RecipeDto recipeDto)
  {
    var steps = new List<RecipeStep>();

    foreach (RecipeStepDto stepDto in recipeDto.Steps)
    {
      var ingredients = new List<Ingredient>();
      var lines = (stepDto.IngredientsText ?? string.Empty)
        .Split('\n', StringSplitOptions.RemoveEmptyEntries);

      foreach (var line in lines)
      {
        var normalizedText = line.Trim();

        if (string.IsNullOrWhiteSpace(normalizedText))
        {
          continue;
        }

        ingredientService.Text = normalizedText;
        var ingredient = await ingredientService.ToEntity();
        ingredients.Add(ingredient);
      }

      steps.Add(new RecipeStep(
        stepDto.Title,
        stepDto.Preparation,
        stepDto.Additional,
        ingredientsText: stepDto.IngredientsText ?? string.Empty,
        ingredients: ingredients
      ));
    }

    return steps;
  }
  private static void RecalculateRecipeNutrition(Recipe recipe)
  {
    recipe.NutritionalInformation = new NutritionalInformationBase();
    recipe.Minerals = new MineralsBase();
    recipe.Vitamins = new VitaminsBase();
    recipe.AminoAcids = new AminoAcidsBase();
    recipe.EssentialAminoAcids = new EssentialAminoAcidsBase();

    foreach (var step in recipe.Steps)
    {
      recipe.NutritionalInformation.Add(step.NutritionalInformation);
      recipe.Minerals.Add(step.Minerals);
      recipe.Vitamins.Add(step.Vitamins);
      recipe.AminoAcids.Add(step.AminoAcids);
      recipe.EssentialAminoAcids.Add(step.EssentialAminoAcids);
    }
  }

  public async Task<List<Recipe>> GetAllRecipesByUserId(string userId)
  {
    List<Recipe> recipes = await _context.Recipe
      .Where(r => r.OwnerId == userId)
      .Include(r => r.Food)
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .ToListAsync();

    return recipes;
  }

  public async Task<List<Recipe>> GetMostCopiedRecipesAsync(int quantity)
  {
    if (quantity <= 0)
    {
      return new List<Recipe>();
    }

    return await _context.Recipe
      .AsNoTracking()
      .Include(r => r.Food)
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .OrderByDescending(r => r.SavedByOthersCount)
      .ThenBy(r => r.Id)
      .Take(quantity)
      .ToListAsync();
  }
  public async Task<RecipesDto> GetRecipesAndFoodsByUserId(string userId)
  {
    List<Recipe> recipes = await GetAllRecipesByUserId(userId);
    List<RecipeResponseDto> recipeDtos = _mapper.Map<List<RecipeResponseDto>>(recipes);
    List<Food> foods = FoodService.GetFoodsFromRecipes(recipes);

    if (foods.Count == 0)
    {
      var fallbackFoods = await foodService.GetAllAsync();

      foods = fallbackFoods
        .OrderBy(_ => System.Random.Shared.NextDouble())
        .Take(30)
        .ToList();
    }

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
