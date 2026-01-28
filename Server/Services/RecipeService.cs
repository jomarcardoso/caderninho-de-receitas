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
    var food = await ResolveMainFoodAsync(recipeDto);
    var categoryIds = await ResolveRecipeCategoryIdsAsync(recipeDto.Categories);
    var newCategoryIds = await EnsureCategoriesExistAsync(recipeDto.NewCategories);
    var mergedCategoryIds = categoryIds
      .Concat(newCategoryIds)
      .Distinct()
      .ToList();

    var entity = new Recipe
    {
      OwnerId = string.Empty,
      Slug = NormalizeSlug(recipeDto.Name),
      Description = recipeDto.Description,
      Additional = recipeDto.Additional,
      Visibility = recipeDto.Visibility ?? Visibility.Private,
      CategoryIds = mergedCategoryIds,
      Food = food,
      FoodId = food?.Id,
      CreatedAtUtc = DateTime.UtcNow,
      UpdatedAtUtc = DateTime.UtcNow,
      ShareToken = Guid.NewGuid().ToString("N"),
      ShareTokenCreatedAt = DateTime.UtcNow
    };

    revision.Recipe = entity;
    entity.Revisions = new List<RecipeRevision> { revision };

    return entity;
  }

  public async Task<Recipe?> FindRecipeWithDetailsById(int recipeId)
  {
    return await _context.Recipe
      .Include(r => r.Owner)
      .Include(r => r.Food)
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
    var clonedSteps = (baseRevision.Steps ?? new List<RecipeStep>())
      .Select(s => new RecipeStep(
        s.Title ?? string.Empty,
        s.Preparation ?? string.Empty,
        s.Additional ?? string.Empty,
        s.IngredientsText ?? string.Empty,
        (s.Ingredients ?? new List<Ingredient>())
          .Select(i => new Ingredient(
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
    newRevision.Imgs = new List<string>(baseRevision.Imgs ?? new List<string>());

    var recipe = new Recipe
    {
      OwnerId = ownerId,
      Slug = source.Slug,
      Revisions = new List<RecipeRevision> { newRevision },
      CategoryIds = source.CategoryIds,
      Description = source.Description,
      Additional = source.Additional,
      FoodId = source.FoodId,
      Food = source.Food,
      CopiedFromRecipeId = source.Id,
      Visibility = source.Visibility,
      ShareToken = Guid.NewGuid().ToString("N"),
      ShareTokenCreatedAt = DateTime.UtcNow
    };

    newRevision.Recipe = recipe;
    return recipe;
  }

  public async Task<RecipeRevision> UpdateEntityFromDto(Recipe recipe, RecipeDto recipeDto)
  {
    if (recipe is null) throw new ArgumentNullException(nameof(recipe));
    if (recipeDto is null) throw new ArgumentNullException(nameof(recipeDto));

    var effectiveVisibility = recipeDto.Visibility ?? Visibility.Private;
    var published = recipe.PublishedRevision;
    var latest = recipe.LatestRevision;
    var keepPublished = effectiveVisibility == Visibility.Public && published is not null;
    var latestIsPublished = published is not null && latest is not null && latest.Id == published.Id;

    RecipeRevision revision;
    var createdNew = false;

    if (keepPublished)
    {
      if (latest is null || latestIsPublished)
      {
        revision = await BuildRevisionAsync(recipeDto);
        createdNew = true;
      }
      else
      {
        revision = latest;
        await ApplyDtoToRevisionAsync(revision, recipeDto);
      }
    }
    else
    {
      if (latest is not null)
      {
        revision = latest;
        await ApplyDtoToRevisionAsync(revision, recipeDto);
      }
      else if (published is not null)
      {
        revision = published;
        await ApplyDtoToRevisionAsync(revision, recipeDto);
      }
      else
      {
        revision = await BuildRevisionAsync(recipeDto);
        createdNew = true;
      }

      recipe.PublishedRevision = null;
      recipe.PublishedRevisionId = null;
    }

    if (createdNew)
    {
      revision.Recipe = recipe;
      revision.RecipeId = recipe.Id;

      recipe.Revisions ??= new List<RecipeRevision>();
      recipe.Revisions.Add(revision);
      _context.RecipeRevisions.Add(revision);

      recipe.LatestRevision = null;
      recipe.LatestRevisionId = null;
    }

    var mainFood = await ResolveMainFoodAsync(recipeDto);
    recipe.Description = recipeDto.Description;
    recipe.Additional = recipeDto.Additional;
    var categoryIds = await ResolveRecipeCategoryIdsAsync(recipeDto.Categories);
    var newCategoryIds = await EnsureCategoriesExistAsync(recipeDto.NewCategories);
    recipe.CategoryIds = categoryIds
      .Concat(newCategoryIds)
      .Distinct()
      .ToList();
    recipe.Food = mainFood;
    recipe.FoodId = mainFood?.Id;
    recipe.UpdatedAtUtc = DateTime.UtcNow;
    PruneRevisions(recipe, revision, keepPublished ? published : null);
    return revision;
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
      .Include(r => r.Food)
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

  private IQueryable<Recipe> BuildRecipeSummaryQuery(bool includeSteps)
  {
    IQueryable<Recipe> query = _context.Recipe.AsNoTracking();
    query = query
      .Include(r => r.Owner)
      .Include(r => r.Food);

    if (includeSteps)
    {
      query = query
        .Include(r => r.LatestRevision)
        .ThenInclude(rv => rv.Steps)
        .Include(r => r.PublishedRevision)
        .ThenInclude(rv => rv.Steps);
    }
    else
    {
      query = query
        .Include(r => r.LatestRevision)
        .Include(r => r.PublishedRevision);
    }

    return query;
  }

  public async Task<List<Recipe>> GetRecipesForSummaryByIdsAsync(IEnumerable<int> recipeIds, bool includeSteps = false)
  {
    var ids = recipeIds
      .Where(id => id > 0)
      .Distinct()
      .ToList();

    if (ids.Count == 0) return new List<Recipe>();

    return await BuildRecipeSummaryQuery(includeSteps)
      .Where(r => ids.Contains(r.Id))
      .ToListAsync();
  }

  public async Task<List<Recipe>> GetRecipesForSummaryByOwnerAsync(string ownerId, ISet<int>? excludedIds = null, bool includeSteps = false)
  {
    if (string.IsNullOrWhiteSpace(ownerId)) return new List<Recipe>();

    var query = BuildRecipeSummaryQuery(includeSteps)
      .Where(r => r.OwnerId == ownerId);

    var excluded = excludedIds?
      .Where(id => id > 0)
      .Distinct()
      .ToList() ?? new List<int>();

    if (excluded.Count > 0)
    {
      query = query.Where(r => !excluded.Contains(r.Id));
    }

    return await query.ToListAsync();
  }

  public async Task<List<Recipe>> GetMostCopiedRecipesAsync(int quantity, string? userId = null)
  {
    if (quantity <= 0) return new List<Recipe>();
    bool includePrivate = !string.IsNullOrWhiteSpace(userId);

    return await _context.Recipe
      .AsNoTracking()
      .Include(r => r.Owner)
      .Include(r => r.Food)
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
      .Include(r => r.Food)
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

  private async Task<List<int>> ResolveRecipeCategoryIdsAsync(IEnumerable<int>? categoryIds)
  {
    var ids = categoryIds?
      .Where(id => id > 0)
      .Distinct()
      .ToList() ?? new List<int>();

    if (ids.Count == 0) return new List<int>();

    var existingIds = await _context.RecipeCategory
      .AsNoTracking()
      .Where(c => ids.Contains(c.Id))
      .Select(c => c.Id)
      .ToListAsync();

    return existingIds
      .Where(id => id > 0)
      .Distinct()
      .ToList();
  }

  private async Task<List<int>> EnsureCategoriesExistAsync(IEnumerable<string>? categories)
  {
    var slugMap = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
    foreach (var entry in categories ?? Array.Empty<string>())
    {
      var label = (entry ?? string.Empty).Trim();
      if (string.IsNullOrWhiteSpace(label)) continue;
      var slug = NormalizeSlug(label);
      if (string.IsNullOrWhiteSpace(slug)) continue;
      if (!slugMap.ContainsKey(slug)) slugMap[slug] = label;
    }

    var normalized = NormalizeCategorySlugs(slugMap.Keys);
    if (normalized.Count == 0) return new List<int>();

    var existingIds = new List<int>();

    try
    {
      var existing = await _context.RecipeCategory
        .Where(c => normalized.Contains(c.Slug))
        .Select(c => new { c.Slug, c.Id })
        .ToListAsync();

      var existingBySlug = existing
        .GroupBy(x => x.Slug, StringComparer.OrdinalIgnoreCase)
        .ToDictionary(g => g.Key, g => g.First().Id, StringComparer.OrdinalIgnoreCase);

      existingIds = existingBySlug.Values
        .Where(id => id > 0)
        .Distinct()
        .ToList();

      var missing = normalized
        .Where(slug => !existingBySlug.ContainsKey(slug))
        .ToList();

      if (missing.Count == 0)
      {
        return normalized
          .Select(slug => existingBySlug.TryGetValue(slug, out var id) ? id : 0)
          .Where(id => id > 0)
          .Distinct()
          .ToList();
      }

      foreach (var slug in missing)
      {
        var label = slugMap.TryGetValue(slug, out var name) ? name : slug;
        _context.RecipeCategory.Add(new RecipeCategory
        {
          Slug = slug,
          Name = new LanguageText { Pt = label, En = label },
          NamePlural = new LanguageText { Pt = label, En = label },
          Description = new LanguageText { Pt = string.Empty, En = string.Empty },
          Img = string.Empty,
          BannerImg = string.Empty,
          Visibility = Visibility.Private,
          Featured = false,
          CreatedAt = DateTime.UtcNow
        });
      }

      await _context.SaveChangesAsync();
    }
    catch
    {
      // ignora seeds faltando
      return existingIds;
    }

    return await _context.RecipeCategory
      .AsNoTracking()
      .Where(c => normalized.Contains(c.Slug))
      .Select(c => c.Id)
      .Distinct()
      .ToListAsync();
  }

  private static void AddCategoryLookup(Dictionary<string, int> lookup, string? key, int id)
  {
    if (id <= 0 || string.IsNullOrWhiteSpace(key)) return;
    if (!lookup.ContainsKey(key)) lookup[key] = id;
  }

  private async Task<Dictionary<string, int>> BuildCategoryLookupAsync(bool includePrivate)
  {
    var map = await BuildCategoryMapAsync(includePrivate);
    var lookup = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);

    foreach (var item in map.Values)
    {
      AddCategoryLookup(lookup, item.Key, item.Id);
      AddCategoryLookup(lookup, item.Url, item.Id);
      AddCategoryLookup(lookup, NormalizeSlug(item.Key), item.Id);
      AddCategoryLookup(lookup, NormalizeSlug(item.Url), item.Id);
    }

    return lookup;
  }

  private Dictionary<int, RecipeCategoryResponse> BuildCategoryIdMapSync(bool includePrivate)
  {
    var map = BuildCategoryMapSync(includePrivate);
    return map.Values
      .Where(c => c.Id > 0)
      .GroupBy(c => c.Id)
      .ToDictionary(g => g.Key, g => g.First());
  }

  public async Task<Dictionary<string, RecipeCategoryResponse>> BuildCategoryMapAsync(bool includePrivate = false)
  {
    var dict = new Dictionary<string, RecipeCategoryResponse>(StringComparer.OrdinalIgnoreCase);

    try
    {
      var categories = await _context.RecipeCategory.AsNoTracking().ToListAsync();

      if (!includePrivate)
      {
        categories = categories.Where(c => c.Visibility == Visibility.Public).ToList();
      }

      foreach (var category in categories)
      {
        var existing = dict.ContainsKey(category.Slug) ? dict[category.Slug] : null;
        dict[category.Slug] = new RecipeCategoryResponse
        {
          Id = category.Id,
          Key = existing?.Key ?? category.Slug,
          Url = existing?.Url ?? category.Slug,
          Featured = category.Featured,
          Name = new LanguageTextBase
          {
            En = category.Name.En,
            Pt = category.Name.Pt
          },
          NamePlural = new LanguageTextBase
          {
            En = !string.IsNullOrWhiteSpace(category.NamePlural?.En) ? category.NamePlural.En : (existing?.NamePlural?.En ?? category.Name.En),
            Pt = !string.IsNullOrWhiteSpace(category.NamePlural?.Pt) ? category.NamePlural.Pt : (existing?.NamePlural?.Pt ?? category.Name.Pt)
          },
          Description = new LanguageTextBase
          {
            En = category.Description.En,
            Pt = category.Description.Pt
          },
          Img = !string.IsNullOrWhiteSpace(category.Img) ? category.Img : (existing?.Img ?? string.Empty),
          BannerImg = !string.IsNullOrWhiteSpace(category.BannerImg) ? category.BannerImg : (existing?.BannerImg ?? string.Empty)
        };
      }
    }
    catch
    {
      // fallback apenas com defaults
    }

    return dict.ToDictionary(kvp => kvp.Key, kvp => kvp.Value, StringComparer.OrdinalIgnoreCase);
  }

  private Dictionary<string, RecipeCategoryResponse> BuildCategoryMapSync(bool includePrivate = false)
  {
    var dict = new Dictionary<string, RecipeCategoryResponse>(StringComparer.OrdinalIgnoreCase);

    try
    {
      var categories = _context.RecipeCategory.AsNoTracking().ToList();

      if (!includePrivate)
      {
        categories = categories.Where(c => c.Visibility == Visibility.Public).ToList();
      }

      foreach (var category in categories)
      {
        var existing = dict.ContainsKey(category.Slug) ? dict[category.Slug] : null;
        dict[category.Slug] = new RecipeCategoryResponse
        {
          Id = category.Id,
          Key = existing?.Key ?? category.Slug,
          Url = existing?.Url ?? category.Slug,
          Featured = category.Featured,
          Name = new LanguageTextBase
          {
            En = category.Name.En,
            Pt = category.Name.Pt
          },
          NamePlural = new LanguageTextBase
          {
            En = !string.IsNullOrWhiteSpace(category.NamePlural?.En) ? category.NamePlural.En : (existing?.NamePlural?.En ?? category.Name.En),
            Pt = !string.IsNullOrWhiteSpace(category.NamePlural?.Pt) ? category.NamePlural.Pt : (existing?.NamePlural?.Pt ?? category.Name.Pt)
          },
          Description = new LanguageTextBase
          {
            En = category.Description.En,
            Pt = category.Description.Pt
          },
          Img = !string.IsNullOrWhiteSpace(category.Img) ? category.Img : (existing?.Img ?? string.Empty),
          BannerImg = !string.IsNullOrWhiteSpace(category.BannerImg) ? category.BannerImg : (existing?.BannerImg ?? string.Empty)
        };
      }
    }
    catch
    {
      // fallback apenas com defaults
    }

    return dict.ToDictionary(kvp => kvp.Key, kvp => kvp.Value, StringComparer.OrdinalIgnoreCase);
  }

  public async Task<List<Recipe>> SearchRecipesAsync(string? text, IEnumerable<string>? categoryKeys, int quantity, string? userId = null)
  {
    quantity = Math.Clamp(quantity, 1, 64);
    bool includePrivate = !string.IsNullOrWhiteSpace(userId);

    IQueryable<Recipe> query = _context.Recipe
      .AsNoTracking()
      .Include(r => r.Owner)
      .Include(r => r.Food)
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

    var categoryLookup = await BuildCategoryLookupAsync(includePrivate);
    var cats = new HashSet<int>();

    foreach (var key in categoryKeys ?? Array.Empty<string>())
    {
      var raw = (key ?? string.Empty).Trim();
      if (string.IsNullOrWhiteSpace(raw)) continue;

      if (categoryLookup.TryGetValue(raw, out var id))
      {
        cats.Add(id);
        continue;
      }

      var normalized = NormalizeSlug(raw);
      if (categoryLookup.TryGetValue(normalized, out id))
      {
        cats.Add(id);
      }
    }

    const int SupersetMax = 512;
    var superset = await query
      .OrderBy(r => r.Id)
      .Take(Math.Max(quantity, SupersetMax))
      .ToListAsync();

    if (cats.Count > 0)
    {
      superset = superset
        .Where(r =>
          (r.CategoryIds ?? new List<int>())
            .Any(id => cats.Contains(id)))
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

  private static RecipeStepResponse ToStepResponse(RecipeStep step)
  {
    var ingredients = (step.Ingredients ?? new List<Ingredient>())
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

  private static void AggregateNutrientsFromSteps(IEnumerable<RecipeStep> steps, RecipeResponse response)
  {
    var ni = new NutritionalInformationBase();
    var minerals = new MineralsBase();
    var vitamins = new VitaminsBase();
    var amino = new AminoAcidsBase();
    var essential = new EssentialAminoAcidsBase();

    foreach (var s in steps ?? Enumerable.Empty<RecipeStep>())
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

  private static UserProfileSummaryResponse BuildUserSummary(UserProfile? owner, string fallbackId)
  {
    if (owner is null)
    {
      return new UserProfileSummaryResponse { Id = fallbackId, DisplayName = fallbackId };
    }

    return UserProfileResponseBuilder.BuildSummary(owner, isAdmin: false, callerId: null);
  }

  private static List<string> ResolveRecipeImages(Recipe recipe, RecipeRevision? revision)
  {
    var revisionImgs = revision?.Imgs;
    if (revisionImgs is not null && revisionImgs.Count > 0)
    {
      return revisionImgs.ToList();
    }

    var foodImgs = recipe.Food?.Imgs;
    if (foodImgs is not null && foodImgs.Count > 0)
    {
      return foodImgs.ToList();
    }

    return new List<string>();
  }

  public RecipeResponse BuildRecipeResponse(Recipe recipe, RevisionView view, string? callerUserId = null)
  {
    var response = _mapper.Map<RecipeResponse>(recipe);
    var revision = SelectRevision(recipe, view);
    response.Imgs = ResolveRecipeImages(recipe, revision);

    var categoryMap = BuildCategoryIdMapSync(includePrivate: true);
    response.Categories = (recipe.CategoryIds ?? new List<int>())
      .Select(id => categoryMap.TryGetValue(id, out var cat) ? cat : BuildFallbackCategory(id))
      .ToList();

    if (revision is not null)
    {
      response.Name = revision.Name;
      response.Keys = revision.Keys;
      response.Language = revision.Language;

      var steps = (revision.Steps ?? new List<RecipeStep>())
        .Select(ToStepResponse)
        .ToList();
      response.Steps = steps;

      response.Food = recipe.Food is not null
        ? _mapper.Map<FoodSummaryResponse>(recipe.Food)
        : new FoodSummaryResponse();

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

    response.Author = response.Owner ?? BuildUserSummary(recipe.Owner, recipe.OwnerId);
    response.CopiedFromRecipeId = recipe.CopiedFromRecipeId;

    if (recipe.CopiedFromRecipeId is not null)
    {
      var original = _context.Recipe.Local
        .FirstOrDefault(r => r.Id == recipe.CopiedFromRecipeId.Value)
        ?? _context.Recipe
          .AsNoTracking()
          .Include(r => r.Owner)
          .FirstOrDefault(r => r.Id == recipe.CopiedFromRecipeId.Value);

      var viewerId = string.IsNullOrWhiteSpace(callerUserId) ? null : callerUserId.Trim();
      var isCopyOwner = !string.IsNullOrWhiteSpace(viewerId)
        && string.Equals(recipe.OwnerId, viewerId, StringComparison.Ordinal);
      var isOriginalOwner = original is not null
        && !string.IsNullOrWhiteSpace(viewerId)
        && string.Equals(original.OwnerId, viewerId, StringComparison.Ordinal);
      var canSeeOriginal = original is not null
        && (isCopyOwner || isOriginalOwner || original.Visibility == Visibility.Public);

      if (!canSeeOriginal)
      {
        response.Author = null;
        response.CopiedFromRecipeId = null;
      }
      else
      {
        response.Author = BuildUserSummary(original!.Owner, original.OwnerId);
        response.CopiedFromRecipeId = recipe.CopiedFromRecipeId;
      }
    }

    return response;
  }

  private static RecipeCategoryResponse BuildFallbackCategory(int id)
  {
    var label = id.ToString(CultureInfo.InvariantCulture);
    var text = new LanguageTextBase { En = label, Pt = label };
    return new RecipeCategoryResponse
    {
      Id = id,
      Key = label,
      Url = label,
      Name = text,
      NamePlural = text,
      Description = new LanguageTextBase(),
      Img = string.Empty,
      BannerImg = string.Empty,
      Featured = false
    };
  }

  public RecipeSummaryResponse BuildRecipeSummaryResponse(Recipe recipe, RevisionView view, string? callerUserId = null)
  {
    var summary = _mapper.Map<RecipeSummaryResponse>(recipe);
    var revision = SelectRevision(recipe, view);
    summary.Imgs = ResolveRecipeImages(recipe, revision);

    if (revision is not null)
    {
      summary.Name = revision.Name;
      summary.NutritionalInformation = new NutritionalInformationBase();
      foreach (var step in revision.Steps ?? Enumerable.Empty<RecipeStep>())
      {
        summary.NutritionalInformation.Add(step.NutritionalInformation);
      }
    }

    summary.IsOwner = !string.IsNullOrWhiteSpace(callerUserId) && string.Equals(recipe.OwnerId, callerUserId, StringComparison.Ordinal);
    return summary;
  }

  public async Task<List<RecipeSummaryResponse>> GetRecipeSummariesByUserId(string userId)
  {
    var recipes = await GetRecipesForSummaryByOwnerAsync(userId, includeSteps: true);
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


  private async Task<Food?> ResolveMainFoodAsync(RecipeDto recipeDto)
  {
    if (string.IsNullOrWhiteSpace(recipeDto.Name)) return null;
    if (!await _context.Food.AsNoTracking().AnyAsync()) return null;
    return await foodService.FindFoodByPossibleName(recipeDto.Name);
  }

  private async Task<RecipeRevision> BuildRevisionAsync(RecipeDto recipeDto)
  {
    Language lang = recipeDto.Language;
    ingredientService.LanguagePreference = lang;
    foodService.LanguagePreference = lang;

    var steps = new List<RecipeStep>();

    foreach (RecipeStepDto stepDto in recipeDto.Steps)
    {
      var ingredients = new List<Ingredient>();
      var lines = (stepDto.IngredientsText ?? string.Empty)
        .Split('\n', StringSplitOptions.RemoveEmptyEntries);

      foreach (var line in lines)
      {
        var normalizedText = line.Trim();
        if (string.IsNullOrWhiteSpace(normalizedText)) continue;

        ingredientService.Text = normalizedText;

        Ingredient ingredient = await ingredientService.ToEntity();

        if (ingredient.Food is not null)
        {
          ingredients.Add(ingredient);
        }
      }

      steps.Add(new RecipeStep(
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
    revision.Imgs = recipeDto.Imgs ?? new List<string>();

    return revision;
  }

  private async Task ApplyDtoToRevisionAsync(RecipeRevision revision, RecipeDto recipeDto)
  {
    var rebuilt = await BuildRevisionAsync(recipeDto);
    revision.Name = rebuilt.Name;
    revision.Keys = rebuilt.Keys;
    revision.Language = rebuilt.Language;
    revision.Steps = rebuilt.Steps;
    revision.Imgs = rebuilt.Imgs ?? new List<string>();
    revision.UpdatedAtUtc = DateTime.UtcNow;
  }

  private void PruneRevisions(Recipe recipe, RecipeRevision latest, RecipeRevision? published)
  {
    recipe.Revisions ??= new List<RecipeRevision>();
    var keep = new HashSet<Guid> { latest.Id };
    if (published is not null)
    {
      keep.Add(published.Id);
    }

    var extra = recipe.Revisions.Where(r => !keep.Contains(r.Id)).ToList();
    foreach (var rev in extra)
    {
      _context.RecipeRevisions.Remove(rev);
    }

    recipe.Revisions = recipe.Revisions.Where(r => keep.Contains(r.Id)).ToList();
  }
}
