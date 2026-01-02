using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Models;
using Server.Response;
using Server.Shared;
using System.Globalization;
using System.Text;

namespace Server.Services;

public class RecipeService
{
  private readonly AppDbContext _context;
  private readonly IMapper _mapper;
  private readonly IngredientService ingredientService;
  private readonly FoodService foodService;

  public enum RevisionView
  {
    LatestPreferred,
    PublishedPreferred
  }

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
    var revision = await BuildRevisionAsync(recipeDto);
    var entity = new Recipe
    {
      Id = recipeDto.Id,
      OwnerId = string.Empty,
      Slug = NormalizeSlug(recipeDto.Name),
      Visibility = Visibility.Private,
      Imgs = recipeDto.Imgs ?? new List<string>(),
      Categories = NormalizeCategorySlugs(recipeDto.Categories),
      CreatedAtUtc = DateTime.UtcNow,
      UpdatedAtUtc = DateTime.UtcNow,
      ShareToken = Guid.NewGuid().ToString("N"),
      ShareTokenCreatedAt = DateTime.UtcNow
    };

    revision.Recipe = entity;
    entity.Revisions = new List<RecipeRevision> { revision };

    await EnsureCategoriesExistAsync(entity.Categories);
    return entity;
  }

  public async Task<Recipe?> FindRecipeWithDetailsById(int recipeId)
  {
    return await _context.Recipe
      .Include(r => r.Owner)
      .Include(r => r.LatestRevision)
      .ThenInclude(rv => rv.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .Include(r => r.PublishedRevision)
      .ThenInclude(rv => rv.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .FirstOrDefaultAsync(r => r.Id == recipeId);
  }

  public Recipe CloneRecipeForUser(Recipe source, string ownerId)
  {
    if (source is null) throw new ArgumentNullException(nameof(source));
    if (string.IsNullOrWhiteSpace(ownerId)) throw new ArgumentException("Owner id must be provided.", nameof(ownerId));

    var baseRevision = source.LatestRevision ?? source.PublishedRevision ?? new RecipeRevision();
    var clonedSteps = (baseRevision.Steps ?? new List<RecipeRevisionStep>())
      .Select(s => new RecipeRevisionStep(
        s.Title ?? string.Empty,
        s.Preparation ?? string.Empty,
        s.Additional ?? string.Empty,
        s.IngredientsText ?? string.Empty,
        (s.Ingredients ?? new List<RecipeRevisionIngredient>())
          .Select(i => new RecipeRevisionIngredient(
            i.Text ?? string.Empty,
            i.Food,
            i.Quantity,
            i.MeasureType,
            i.MeasureQuantity))
          .ToList()
      ))
      .ToList();

    var newRevision = new RecipeRevision(
      baseRevision.Name,
      baseRevision.Keys,
      baseRevision.Language,
      clonedSteps,
      ownerId)
    ;

    var recipe = new Recipe
    {
      OwnerId = ownerId,
      Slug = source.Slug,
      Visibility = Visibility.Private,
      Revisions = new List<RecipeRevision> { newRevision },
      Imgs = source.Imgs,
      Categories = source.Categories,
      CopiedFromRecipeId = source.Id,
      IsPublic = source.IsPublic,
      ShareToken = Guid.NewGuid().ToString("N"),
      ShareTokenCreatedAt = DateTime.UtcNow
    };

    newRevision.Recipe = recipe;
    return recipe;
  }

  public async Task UpdateEntityFromDto(Recipe recipe, RecipeDto recipeDto)
  {
    if (recipe is null) throw new ArgumentNullException(nameof(recipe));
    if (recipeDto is null) throw new ArgumentNullException(nameof(recipeDto));

    var revision = await BuildRevisionAsync(recipeDto);
    revision.Recipe = recipe;
    revision.RecipeId = recipe.Id;

    if (recipe.Revisions is null)
      recipe.Revisions = new List<RecipeRevision>();
    else
      recipe.Revisions.Clear();
    recipe.Revisions.Add(revision);
    _context.RecipeRevisions.Add(revision);

    recipe.LatestRevision = null;
    recipe.LatestRevisionId = null;
    recipe.Imgs = recipeDto.Imgs ?? new List<string>();
    recipe.Categories = NormalizeCategorySlugs(recipeDto.Categories);
    recipe.UpdatedAtUtc = DateTime.UtcNow;
    await EnsureCategoriesExistAsync(recipe.Categories);
  }

  public class RecipesFoodsAndIcons
  {
    public List<Recipe> Recipes { get; set; } = new();
    public List<Food> Foods { get; set; } = new();
  }

  public async Task<RecipesFoodsAndIcons> GetAllRecipesByUserId(string userId)
  {
    var result = new RecipesFoodsAndIcons();

    result.Recipes = await _context.Recipe
      .Where(r => r.OwnerId == userId)
      .Include(r => r.Owner)
      .Include(r => r.PublishedRevision)
      .ThenInclude(rv => rv.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .Include(r => r.LatestRevision)
      .ThenInclude(rv => rv.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .ToListAsync();

    result.Foods = FoodService.GetFoodsFromRecipes(result.Recipes);
    return result;
  }

  public async Task<List<Recipe>> GetMostCopiedRecipesAsync(int quantity, string? userId = null)
  {
    if (quantity <= 0) return new List<Recipe>();
    bool includePrivate = !string.IsNullOrWhiteSpace(userId);

    return await _context.Recipe
      .AsNoTracking()
      .Include(r => r.Owner)
      .Include(r => r.LatestRevision)
      .ThenInclude(rv => rv.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .Where(r => r.Visibility == Visibility.Public || (includePrivate && r.OwnerId == userId))
      .OrderByDescending(r => r.SavedByOthersCount)
      .ThenBy(r => r.Id)
      .Take(quantity)
      .ToListAsync();
  }

  public async Task<List<Recipe>> SearchRecipesByTextAsync(string searchText, int quantity, string? userId = null)
  {
    if (string.IsNullOrWhiteSpace(searchText) || quantity <= 0) return new List<Recipe>();
    bool includePrivate = !string.IsNullOrWhiteSpace(userId);
    string pattern = $"%{searchText.Trim()}%";
    quantity = Math.Min(quantity, 64);

    return await _context.Recipe
      .AsNoTracking()
      .Include(r => r.LatestRevision)
      .ThenInclude(rv => rv.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .Where(r =>
        (EF.Functions.ILike(r.LatestRevision!.Name, pattern) || EF.Functions.ILike(r.LatestRevision!.Keys, pattern))
        && (r.Visibility == Visibility.Public || (includePrivate && r.OwnerId == userId)))
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
      // ignora seeds faltando
    }
  }

  public async Task<Dictionary<string, RecipeCategoryResponse>> BuildCategoryMapAsync()
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

    return dict.ToDictionary(
      kvp => kvp.Key,
      kvp => new RecipeCategoryResponse
      {
        Id = kvp.Value.Id,
        Key = kvp.Value.Key,
        Url = kvp.Value.Url,
        Name = kvp.Value.Text,
        NamePlural = kvp.Value.PluralText,
        Description = kvp.Value.Description,
        Img = kvp.Value.Img,
        BannerImg = kvp.Value.BannerImg
      },
      StringComparer.OrdinalIgnoreCase);
  }

  public async Task<List<Recipe>> SearchRecipesAsync(string? text, IEnumerable<string>? categoryKeys, int quantity, string? userId = null)
  {
    quantity = Math.Clamp(quantity, 1, 64);
    bool includePrivate = !string.IsNullOrWhiteSpace(userId);

    IQueryable<Recipe> query = _context.Recipe
      .AsNoTracking()
      .Include(r => r.Owner)
      .Include(r => r.LatestRevision)
      .ThenInclude(rv => rv.Steps)
      .ThenInclude(s => s.Ingredients)
      .ThenInclude(i => i.Food)
      .Where(r => r.Visibility == Visibility.Public || (includePrivate && r.OwnerId == userId));

    var hasText = !string.IsNullOrWhiteSpace(text);
    if (hasText)
    {
      string pattern = $"%{text!.Trim()}%";
      query = query.Where(r =>
        EF.Functions.ILike(r.LatestRevision!.Name, pattern)
        || EF.Functions.ILike(r.LatestRevision!.Keys, pattern)
        || r.LatestRevision!.Steps.Any(s => EF.Functions.ILike(s.Title ?? string.Empty, pattern)
          || EF.Functions.ILike(s.Preparation ?? string.Empty, pattern)
          || EF.Functions.ILike(s.Additional ?? string.Empty, pattern)
          || EF.Functions.ILike(s.IngredientsText ?? string.Empty, pattern))
      );
    }

    var cats = NormalizeCategorySlugs(categoryKeys).ToHashSet(StringComparer.OrdinalIgnoreCase);

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

  public RecipeRevision? SelectRevision(Recipe recipe, RevisionView view)
  {
    return view == RevisionView.PublishedPreferred
      ? recipe.PublishedRevision ?? recipe.LatestRevision
      : recipe.LatestRevision ?? recipe.PublishedRevision;
  }

  private static RecipeStepResponse ToStepResponse(RecipeRevisionStep step)
  {
    var ingredients = (step.Ingredients ?? new List<RecipeRevisionIngredient>())
      .Where(i => i.Food is not null)
      .Select(i => new IngredientResponse
      {
        Text = i.Text ?? string.Empty,
        Food = new FoodSummaryResponse
        {
          Id = i.Food!.Id,
          Name = i.Food.Name,
          Icon = i.Food.Icon != null ? i.Food.Icon.Url : string.Empty,
          Imgs = i.Food.Imgs.ToArray()
        },
        Quantity = i.Quantity,
        MeasureType = i.MeasureType,
        MeasureQuantity = i.MeasureQuantity,
        NutritionalInformation = i.NutritionalInformation ?? new NutritionalInformationBase(),
        Minerals = i.Minerals ?? new MineralsBase(),
        Vitamins = i.Vitamins ?? new VitaminsBase(),
        AminoAcids = i.AminoAcids ?? new AminoAcidsBase(),
        EssentialAminoAcids = i.EssentialAminoAcids ?? new EssentialAminoAcidsBase()
      })
      .ToList();

    return new RecipeStepResponse
    {
      Title = step.Title ?? string.Empty,
      Preparation = step.Preparation ?? string.Empty,
      Additional = step.Additional ?? string.Empty,
      IngredientsText = step.IngredientsText ?? string.Empty,
      Ingredients = ingredients,
      NutritionalInformation = step.NutritionalInformation ?? new NutritionalInformationBase(),
      Minerals = step.Minerals ?? new MineralsBase(),
      Vitamins = step.Vitamins ?? new VitaminsBase(),
      AminoAcids = step.AminoAcids ?? new AminoAcidsBase(),
      EssentialAminoAcids = step.EssentialAminoAcids ?? new EssentialAminoAcidsBase(),
      AminoAcidsScore = (step.EssentialAminoAcids ?? new EssentialAminoAcidsBase()).GetScore()
    };
  }

  private static void AggregateNutrientsFromSteps(IEnumerable<RecipeRevisionStep> steps, RecipeResponse response)
  {
    var ni = new NutritionalInformationBase();
    var minerals = new MineralsBase();
    var vitamins = new VitaminsBase();
    var amino = new AminoAcidsBase();
    var essential = new EssentialAminoAcidsBase();

    foreach (var s in steps ?? Enumerable.Empty<RecipeRevisionStep>())
    {
      ni.Add(s.NutritionalInformation);
      minerals.Add(s.Minerals);
      vitamins.Add(s.Vitamins);
      amino.Add(s.AminoAcids);
      essential.Add(s.EssentialAminoAcids);
    }

    response.NutritionalInformation = ni;
    response.Minerals = minerals;
    response.Vitamins = vitamins;
    response.AminoAcids = amino;
    response.EssentialAminoAcids = essential;
  }

  public RecipeResponse BuildRecipeResponse(Recipe recipe, RevisionView view, string? callerUserId = null)
  {
    var response = _mapper.Map<RecipeResponse>(recipe);
    var revision = SelectRevision(recipe, view);

    if (revision is not null)
    {
      response.Name = revision.Name;
      response.Keys = revision.Keys;
      response.Language = revision.Language;

      var steps = (revision.Steps ?? new List<RecipeRevisionStep>())
        .Select(ToStepResponse)
        .ToList();
      response.Steps = steps;

      response.Food = steps
        .SelectMany(s => s.Ingredients)
        .Select(i => i.Food)
        .FirstOrDefault() ?? new FoodSummaryResponse();

      AggregateNutrientsFromSteps(revision.Steps, response);
    }

    response.IsOwner = !string.IsNullOrWhiteSpace(callerUserId) && string.Equals(recipe.OwnerId, callerUserId, StringComparison.Ordinal);

    if (response.IsOwner)
    {
      response.ShareToken = recipe.ShareToken;
      response.ShareTokenCreatedAt = recipe.ShareTokenCreatedAt;
      response.ShareTokenRevokedAt = recipe.ShareTokenRevokedAt;
    }
    else
    {
      response.ShareToken = null;
      response.ShareTokenCreatedAt = null;
      response.ShareTokenRevokedAt = null;
    }
    return response;
  }

  public RecipeSummaryResponse BuildRecipeSummaryResponse(Recipe recipe, RevisionView view, string? callerUserId = null)
  {
    var summary = _mapper.Map<RecipeSummaryResponse>(recipe);
    var revision = SelectRevision(recipe, view);

    if (revision is not null)
    {
      summary.Name = revision.Name;
      summary.NutritionalInformation = new NutritionalInformationBase();
      foreach (var step in revision.Steps ?? Enumerable.Empty<RecipeRevisionStep>())
      {
        summary.NutritionalInformation.Add(step.NutritionalInformation);
      }
    }

    summary.IsOwner = !string.IsNullOrWhiteSpace(callerUserId) && string.Equals(recipe.OwnerId, callerUserId, StringComparison.Ordinal);
    return summary;
  }

  public async Task<List<RecipeSummaryResponse>> GetRecipeSummariesByUserId(string userId)
  {
    var data = await GetAllRecipesByUserId(userId);
    var recipes = data.Recipes;
    List<RecipeSummaryResponse> recipeDtos = recipes
      .Select(r => BuildRecipeSummaryResponse(r, RevisionView.LatestPreferred, userId))
      .ToList();
    return recipeDtos;
  }

  public async Task DeleteStepsAsync(Recipe recipe)
  {
    var revision = recipe.LatestRevision ?? recipe.PublishedRevision;
    if (revision is null) return;
    revision.Steps.Clear();
    await _context.SaveChangesAsync();
  }


  private async Task<RecipeRevision> BuildRevisionAsync(RecipeDto recipeDto)
  {
    var lang = recipeDto.Language;
    ingredientService.LanguagePreference = lang;
    foodService.LanguagePreference = lang;

    var steps = new List<RecipeRevisionStep>();

    foreach (RecipeStepDto stepDto in recipeDto.Steps)
    {
      var ingredients = new List<RecipeRevisionIngredient>();
      var lines = (stepDto.IngredientsText ?? string.Empty)
        .Split('\n', StringSplitOptions.RemoveEmptyEntries);

      foreach (var line in lines)
      {
        var normalizedText = line.Trim();
        if (string.IsNullOrWhiteSpace(normalizedText)) continue;

        ingredientService.Text = normalizedText;
        ingredientService.LanguagePreference = recipeDto.Language;
        var ingredient = await ingredientService.ToEntity();
        if (ingredient.Food is not null)
        {
          ingredients.Add(new RecipeRevisionIngredient(
            ingredient.Text ?? string.Empty,
            ingredient.Food,
            ingredient.Quantity,
            ingredient.MeasureType,
            ingredient.MeasureQuantity
          ));
        }
      }

      steps.Add(new RecipeRevisionStep(
        stepDto.Title ?? string.Empty,
        stepDto.Preparation ?? string.Empty,
        stepDto.Additional ?? string.Empty,
        stepDto.IngredientsText ?? string.Empty,
        ingredients
      ));
    }

    var revision = new RecipeRevision(
      recipeDto.Name,
      recipeDto.Keys,
      lang,
      steps,
      string.Empty);

    return revision;
  }
}
