using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Models;
using System.Linq;
using System.Text;
using System.Globalization;
using Server.Shared;

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

    var entity = new Recipe(
      recipeDto.Id,
      recipeDto.Name,
      recipeDto.Keys,
      food,
      recipeDto.Description,
      recipeDto.Additional,
      steps
    );

    entity.Imgs = recipeDto.Imgs ?? new List<string>();
    entity.Language = recipeDto.Language;
    // Convert transport string keys (slugs) to normalized list
    entity.Categories = NormalizeCategorySlugs(recipeDto.Categories);
    await EnsureCategoriesExistAsync(entity.Categories);
    // New recipes require moderation
    entity.IsPublic = false;
    entity.Verified = false;
    return entity;
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

    recipe.Imgs = recipeDto.Imgs ?? new List<string>();
    recipe.UpdatedAt = DateTime.UtcNow;
    // Convert transport string keys (slugs) to normalized list
    recipe.Categories = NormalizeCategorySlugs(recipeDto.Categories);
    await EnsureCategoriesExistAsync(recipe.Categories);
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

  public class RecipesFoodsAndIcons
  {
    public List<Recipe> Recipes { get; set; } = new();
    public List<Food> Foods { get; set; } = new();
  }

  public async Task<RecipesFoodsAndIcons> GetAllRecipesByUserId(string userId)
  {
    var result = new RecipesFoodsAndIcons();

    // Recipes with full details
    result.Recipes = await _context.Recipe
      .Where(r => r.OwnerId == userId)
      .Include(r => r.Owner)
      .Include(r => r.Food)
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .ToListAsync();

    // Distinct foods referenced by recipes (including ingredients)
    result.Foods = FoodService.GetFoodsFromRecipes(result.Recipes);

    return result;
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
      .Include(r => r.Owner)
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

  private static string NormalizeSlug(string key)
  {
    if (string.IsNullOrWhiteSpace(key)) return string.Empty;
    var normalized = key.Trim().ToLowerInvariant().Normalize(NormalizationForm.FormD);
    var sb = new StringBuilder();
    foreach (var ch in normalized)
    {
      var uc = CharUnicodeInfo.GetUnicodeCategory(ch);
      if (uc == UnicodeCategory.NonSpacingMark) continue;
      if (char.IsLetterOrDigit(ch)) sb.Append(ch);
      else sb.Append('-');
    }
    var slug = sb.ToString();
    while (slug.Contains("--")) slug = slug.Replace("--", "-");
    slug = slug.Trim('-');
    return slug;
  }

  private static List<string> NormalizeCategorySlugs(IEnumerable<string>? keys)
  {
    var set = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
    foreach (var key in (keys ?? Array.Empty<string>()))
    {
      var slug = NormalizeSlug(key);
      if (!string.IsNullOrWhiteSpace(slug)) set.Add(slug);
    }
    return set.ToList();
  }

  private async Task EnsureCategoriesExistAsync(IEnumerable<string> slugs, string? createdBy = null)
  {
    var normalized = NormalizeCategorySlugs(slugs);
    if (normalized.Count == 0) return;

    try
    {
      var existing = await _context.RecipeCategoryOpen
        .Where(c => normalized.Contains(c.Slug))
        .Select(c => c.Slug)
        .ToListAsync();

      var missing = normalized.Except(existing, StringComparer.OrdinalIgnoreCase).ToList();
      if (missing.Count == 0) return;

      foreach (var slug in missing)
      {
        _context.RecipeCategoryOpen.Add(new RecipeCategoryOpen
        {
          Slug = slug,
          Name = new LanguageText { Pt = slug, En = slug },
          CreatedAt = DateTime.UtcNow
        });
      }

      await _context.SaveChangesAsync();
    }
    catch
    {
      // Se tabela não existir ou falhar, ignora e deixa seguir com categorias principais
    }
  }

  public async Task<Dictionary<string, CategoryItem>> BuildCategoryMapAsync()
  {
    var dict = new Dictionary<string, CategoryItem>(StringComparer.OrdinalIgnoreCase);

    foreach (var item in RecipeCategoryDefaults.List)
    {
      if (!dict.ContainsKey(item.Key))
        dict[item.Key] = item;
    }

    try
    {
      var open = await _context.RecipeCategoryOpen.AsNoTracking().ToListAsync();

      // Se n�o houver registros (por exemplo, seeds n�o aplicados), crie as categorias padr�o
      if (open.Count == 0)
      {
        foreach (var def in RecipeCategoryDefaults.List)
        {
          _context.RecipeCategoryOpen.Add(new RecipeCategoryOpen
          {
            Slug = def.Key,
            Name = new LanguageText { En = def.Text.En, Pt = def.Text.Pt },
            Description = new LanguageText { En = def.Description.En, Pt = def.Description.Pt },
            BannerImg = def.BannerImg,
            CreatedAt = DateTime.UtcNow,
          });
        }
        await _context.SaveChangesAsync();
        open = await _context.RecipeCategoryOpen.AsNoTracking().ToListAsync();
      }

      foreach (var oc in open)
      {
        var existing = dict.ContainsKey(oc.Slug) ? dict[oc.Slug] : null;
        dict[oc.Slug] = new CategoryItem
        {
          Id = oc.Id,
          Key = oc.Slug,
          Url = existing?.Url ?? oc.Slug,
          Text = new LanguageTextBase
          {
            En = oc.Name.En,
            Pt = oc.Name.Pt
          },
          PluralText = new LanguageTextBase
          {
            En = existing?.PluralText?.En ?? oc.Name.En,
            Pt = existing?.PluralText?.Pt ?? oc.Name.Pt
          },
          Description = new LanguageTextBase
          {
            En = oc.Description.En,
            Pt = oc.Description.Pt
          },
          Img = existing?.Img ?? string.Empty,
          BannerImg = oc.BannerImg ?? existing?.BannerImg ?? string.Empty
        };
      }
    }
    catch
    {
      // fallback apenas com defaults
    }

    return dict;
  }

  public async Task<List<Recipe>> SearchRecipesAsync(string? text, IEnumerable<string>? categoryKeys, int quantity, string? userId = null)
  {
    quantity = Math.Clamp(quantity, 1, 64);

    bool includePrivate = !string.IsNullOrWhiteSpace(userId);

    IQueryable<Recipe> query = _context.Recipe
      .AsNoTracking()
      .Include(r => r.Owner)
      .Include(r => r.Food)
      .Include(r => r.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .Where(r => r.IsPublic || (includePrivate && r.OwnerId == userId));

    var hasText = !string.IsNullOrWhiteSpace(text);
    if (hasText)
    {
      string pattern = $"%{text!.Trim()}%";
      query = query.Where(r =>
        EF.Functions.ILike(r.Name, pattern)
        || EF.Functions.ILike(r.Keys, pattern)
        || EF.Functions.ILike(r.Description ?? string.Empty, pattern)
        || EF.Functions.ILike(r.Additional ?? string.Empty, pattern)
        || r.Steps.Any(s => EF.Functions.ILike(s.Title ?? string.Empty, pattern)
          || EF.Functions.ILike(s.Preparation ?? string.Empty, pattern)
          || EF.Functions.ILike(s.Additional ?? string.Empty, pattern)
          || EF.Functions.ILike(s.IngredientsText ?? string.Empty, pattern))
      );
    }

    var cats = NormalizeCategorySlugs(categoryKeys).ToHashSet(StringComparer.OrdinalIgnoreCase);

    // NOTE: Filtering by categories persisted as CSV via value converter can be
    // tricky to translate portably across providers. To ensure correctness,
    // fetch a reasonable superset from DB, then filter categories in-memory.
    // This keeps results correct without relying on provider-specific SQL.

    const int SupersetMax = 512;
    var superset = await query
      .OrderBy(r => r.Id)
      .Take(Math.Max(quantity, SupersetMax))
      .ToListAsync();

    if (cats.Count > 0)
    {
      superset = superset
        .Where(r => (r.Categories ?? new List<string>())
          .Any(c => cats.Contains(NormalizeSlug(c))))
        .ToList();
    }

    return superset
      .Take(quantity)
      .ToList();
  }

  public async Task<int> ReassignOwnerAsync(string fromOwnerId, string toOwnerId)
  {
    if (string.IsNullOrWhiteSpace(fromOwnerId))
    {
      throw new ArgumentException("Source owner id must be provided.", nameof(fromOwnerId));
    }

    if (string.IsNullOrWhiteSpace(toOwnerId))
    {
      throw new ArgumentException("Target owner id must be provided.", nameof(toOwnerId));
    }

    fromOwnerId = fromOwnerId.Trim();
    toOwnerId = toOwnerId.Trim();

    List<Recipe> recipes = await _context.Recipe
      .Where(r => r.OwnerId == fromOwnerId)
      .ToListAsync();

    if (recipes.Count == 0)
    {
      return 0;
    }

    foreach (Recipe recipe in recipes)
    {
      recipe.OwnerId = toOwnerId;
    }

    await _context.SaveChangesAsync();

    return recipes.Count;
  }

  public async Task<RecipesDataResponse> GetRecipesAndFoodsByUserId(string userId)
  {
    var data = await GetAllRecipesByUserId(userId);
    var recipes = data.Recipes;
    List<RecipeResponse> recipeDtos = _mapper.Map<List<RecipeResponse>>(recipes);
    // Mark ownership for UI convenience
    foreach (var r in recipeDtos) { r.IsOwner = true; }
    List<Food> foods = data.Foods;

    if (foods.Count == 0)
    {
      var fallbackFoods = await foodService.GetAllAsync();

      foods = fallbackFoods
        .OrderBy(_ => System.Random.Shared.NextDouble())
        .Take(30)
        .ToList();
    }

    var response = new RecipesDataResponse
    {
      Recipes = recipeDtos,
      Foods = _mapper.Map<List<Food>>(foods)
    };
    response.RecipeCategories = await BuildCategoryMapAsync();

    // Attach user recipe lists as DTOs to avoid serialization cycles
    try
    {
      var lists = await _context.RecipeList
        .AsNoTracking()
        .Where(l => l.OwnerId == userId)
        .Include(l => l.Items)
        .Select(l => new RecipeListResponse
        {
          Id = l.Id,
          OwnerId = l.OwnerId,
          Name = l.Name,
          Description = l.Description,
          CreatedAt = l.CreatedAt,
          UpdatedAt = l.UpdatedAt,
          Items = l.Items
            .OrderBy(i => i.Position)
            .Select(i => new RecipeListItemResponse
            {
              RecipeListId = i.RecipeListId,
              RecipeId = i.RecipeId,
              Position = i.Position,
              CreatedAt = i.CreatedAt,
            })
            .ToList()
        })
        .ToListAsync();

      response.RecipeLists = lists;
    }
    catch
    {
      // ignore in case of permission issues
    }

    return response;
  }

  public async Task DeleteStepsAsync(Recipe recipe)
  {
    recipe.Steps.Clear();

    await _context.SaveChangesAsync();
  }
}

