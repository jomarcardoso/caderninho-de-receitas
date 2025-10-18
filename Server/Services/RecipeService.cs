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
    // Propagate language preference when resolving foods and ingredients
    var lang = recipeDto.Language;
    ingredientService.LanguagePreference = lang;
    foodService.LanguagePreference = lang;

    var steps = await BuildStepsAsync(recipeDto);
    var food = await foodService.FindFoodByPossibleName(recipeDto.Name, lang);

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
      Imgs = source.Imgs,
      Language = source.Language,
      CopiedFromRecipeId = source.Id,
      IsPublic = source.IsPublic
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
    // Update language preference for this update scope
    var lang = recipeDto.Language;
    ingredientService.LanguagePreference = lang;
    foodService.LanguagePreference = lang;

    recipe.Food = await foodService.FindFoodByPossibleName(recipeDto.Name, lang);

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
        ingredientService.LanguagePreference = recipeDto.Language;
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

  public async Task<List<Recipe>> GetMostCopiedRecipesAsync(int quantity, string? userId = null)
  {
    if (quantity <= 0)
    {
      return new List<Recipe>();
    }

    bool includePrivate = !string.IsNullOrWhiteSpace(userId);

    return await _context.Recipe
      .AsNoTracking()
      .Include(r => r.Food)
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .Where(r => r.IsPublic || (includePrivate && r.OwnerId == userId))
      .OrderByDescending(r => r.SavedByOthersCount)
      .ThenBy(r => r.Id)
      .Take(quantity)
      .ToListAsync();
  }

  public async Task<List<Recipe>> SearchRecipesByTextAsync(string searchText, int quantity, string? userId = null)
  {
    if (string.IsNullOrWhiteSpace(searchText) || quantity <= 0)
    {
      return new List<Recipe>();
    }

    bool includePrivate = !string.IsNullOrWhiteSpace(userId);

    string pattern = $"%{searchText.Trim()}%";

    quantity = Math.Min(quantity, 64);

    return await _context.Recipe
      .AsNoTracking()
      .Include(r => r.Food)
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .Where(r => (EF.Functions.Like(r.Name, pattern) || EF.Functions.Like(r.Keys, pattern))
        && (r.IsPublic || (includePrivate && r.OwnerId == userId)))
      .OrderBy(r => r.Id)
      .Take(quantity)
      .ToListAsync();
  }

  public async Task<int> ClaimRecipesAsync(string temporaryOwnerId, string newOwnerId)
  {
    if (string.IsNullOrWhiteSpace(temporaryOwnerId))
    {
      throw new ArgumentException("Temporary owner id must be provided.", nameof(temporaryOwnerId));
    }

    if (string.IsNullOrWhiteSpace(newOwnerId))
    {
      throw new ArgumentException("New owner id must be provided.", nameof(newOwnerId));
    }

    temporaryOwnerId = temporaryOwnerId.Trim();
    newOwnerId = newOwnerId.Trim();

    List<Recipe> recipes = await _context.Recipe
      .Where(r => r.OwnerId == temporaryOwnerId)
      .ToListAsync();

    if (recipes.Count == 0)
    {
      return 0;
    }

    foreach (Recipe recipe in recipes)
    {
      recipe.OwnerId = newOwnerId;
    }

    await _context.SaveChangesAsync();

    return recipes.Count;
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

    // Attach referenced food icons
    var iconNames = foods
      .Select(f => f.Icon)
      .Where(s => !string.IsNullOrWhiteSpace(s))
      .Select(s => s.Trim())
      .Distinct()
      .ToList();

    var icons = await _context.FoodIcon
      .AsNoTracking()
      .Where(i => iconNames.Contains(i.Name))
      .ToListAsync();

    var response = new RecipesDto
    {
      Recipes = recipeDtos,
      Foods = _mapper.Map<List<Food>>(foods)
    };

    response.FoodIcons = icons.ToDictionary(i => i.Name, i => i.Content);

    return response;
  }

  public async Task DeleteStepsAsync(Recipe recipe)
  {
    recipe.Steps.Clear();

    await _context.SaveChangesAsync();
  }
}

