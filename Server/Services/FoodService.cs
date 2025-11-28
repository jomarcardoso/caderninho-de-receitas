using Microsoft.EntityFrameworkCore;
using Fastenshtein;
using Server.Models;
using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace Server.Services;

public class FoodService
{
  public static readonly List<string> FoodModifiersPt = new()
  {
    "em ponto de pomada",
    "para untar",
    "para fritar",
    "a forma", "a tigela", "as mãos",
    "para decorar", "para finalizar", "para regar",
    "para cobrir", "para rechear", "para guarnecer",
    "em temperatura ambiente", "gelado", "frio", "quente",
    "para servir gelado", "para servir quente", "para acompanhar",
    "a gosto", "à gosto",
    "para servir", "a gosto para servir", "a gosto para servir (opcional)",
    "(opcional)", "opcional",
    "picado", "picada", "picados", "picadas",
    "para polvilhar", "para polvilhar a mesa", "para polvilhar a bancada",
    "ralado", "ralada", "ralados", "raladas",
    "na hora",
    "cozido", "cozida", "cozidos", "cozidas",
    "desfiado", "desfiada", "desfiados", "desfiadas",
    "triturado", "triturada", "triturados", "trituradas",
    "fatiado", "fatiada", "fatiados", "fatiadas",
    "moído", "moída", "moídos", "moídas",
    "inteiro", "inteira", "inteiros", "inteiras",
    "pelado", "pelados",
    "maduro", "maduros",
    "amanhecido", "amanhecidos",
    "coado", "coados",
    "em cubo", "em cubos",
    "em rodela", "em rodelas",
    "amassado", "amassada", "amassados", "amassadas",
    "temperado", "temperada", "temperados", "temperadas",
    "assado", "assada", "assados", "assadas",
    "frito", "frita", "fritos", "fritas",
    "tostado", "tostada", "tostados", "tostadas",
    "grelhado", "grelhada", "grelhados", "grelhadas",
    "batido", "batida", "batidos", "batidas",
    "escorrido", "escorrida", "escorridos", "escorridas",
    "seco", "seca", "secos", "secas",
    "hidratado", "hidratada", "hidratados", "hidratadas",
    "congelado", "congelada", "congelados", "congeladas",
    "descongelado", "descongelada", "descongelados", "descongeladas",
    "recheado", "recheada", "recheados", "recheadas",
    "cru", "crua", "crus", "cruas",
    "peneirado", "peneirada", "peneirados", "peneiradas", "filé", "filés"
  };

  public static readonly List<string> FoodModifiersEn = new()
  {
    "to taste", "for serving", "for garnish", "for topping",
    "to taste for serving", "to taste for serving (optional)",
    "for greasing", "for lining", "for dusting", "for decorating",
    "to decorate", "to grease", "to line",
    "chopped", "finely chopped", "roughly chopped",
    "diced", "sliced", "thinly sliced", "thickly sliced",
    "minced", "grated", "shredded",
    "cooked", "boiled", "baked", "roasted",
    "fried", "grilled", "seared", "broiled",
    "beaten", "whisked",
    "drained", "rinsed",
    "dry", "hydrated",
    "frozen", "thawed",
    "stuffed", "filled",
    "raw", "whole",
    "cubed", "mashed",
    "seasoned"
  };

  public Server.Shared.Language? LanguagePreference { get; set; } = null;

  private static IEnumerable<string> GetModifiers(Server.Shared.Language? language)
  {
    if (!language.HasValue)
    {
      return FoodModifiersPt.Concat(FoodModifiersEn);
    }

    return language.Value == Server.Shared.Language.Pt
      ? FoodModifiersPt
      : FoodModifiersEn;
  }

  private static readonly char[] KeySeparators = new[] { ',', ';' };

  private readonly AppDbContext _context;
  private List<Food> foods = new List<Food>();

  public FoodService(AppDbContext context, Microsoft.Extensions.Configuration.IConfiguration? configuration = null)
  {
    _context = context;
    try
    {
      var val = configuration?["FoodMatching:LowConfidenceThreshold"];
      if (!string.IsNullOrWhiteSpace(val) && double.TryParse(val, System.Globalization.CultureInfo.InvariantCulture, out var parsed))
      {
        if (parsed >= 0 && parsed <= 1) LowConfidenceThreshold = parsed;
      }
    }
    catch { /* ignore config issues */ }
  }

  private static IEnumerable<string> GetLanguageValues(LanguageText? text)
  {
    if (text is null)
      yield break;

    if (!string.IsNullOrWhiteSpace(text.Pt))
      yield return text.Pt.Trim();

    if (!string.IsNullOrWhiteSpace(text.En))
      yield return text.En.Trim();
  }

  private static IEnumerable<string> GetKeyValues(LanguageText? text)
  {
    return GetLanguageValues(text)
      .SelectMany(value => value.Split(KeySeparators, StringSplitOptions.RemoveEmptyEntries))
      .Select(key => key.Trim())
      .Where(key => !string.IsNullOrWhiteSpace(key));
  }

  private static List<string> GetSearchableValues(Food food)
  {
    var values = new List<string>();

    values.AddRange(GetLanguageValues(food.Name));
    values.AddRange(GetKeyValues(food.Keys));

    if (values.Count == 0)
    {
      var fallback = food.Name?.Pt ?? food.Name?.En ?? string.Empty;

      if (!string.IsNullOrWhiteSpace(fallback))
        values.Add(fallback.Trim());
    }

    return values;
  }

  // Buscar um Food pelo ID
  public async Task<Food?> GetByIdAsync(int id)
  {
    return await _context.Food.FindAsync(id);
  }

  // Buscar todos os alimentos
  public async Task<List<Food>> GetAllAsync()
  {
    if (foods.Count > 0)
      return foods;

    foods = await _context.Food.ToListAsync();

    return foods;
  }

  // Salvar um novo Food
  public async Task<Food> AddAsync(Food food)
  {
    _context.Food.Add(food);
    await _context.SaveChangesAsync();
    return food;
  }

  // Atualizar um Food existente
  public async Task<Food?> UpdateAsync(Food food)
  {
    var existingFood = await _context.Food.FindAsync(food.Id);
    if (existingFood == null) return null;

    existingFood.Name = food.Name;
    // existingFood.Calories = food.Calories;

    await _context.SaveChangesAsync();
    return existingFood;
  }

  internal async Task<Food?> hasExactFoodWithThisName(string name)
  {
    if (string.IsNullOrWhiteSpace(name))
      return null;

    List<Food> _allFoods = await GetAllAsync();
    var trimmedName = name.Trim();

    return _allFoods.FirstOrDefault(f =>
      GetLanguageValues(f.Name).Any(value =>
        string.Equals(value, trimmedName, StringComparison.OrdinalIgnoreCase)));
  }

  internal async Task<Food?> hasExactKeyWithThisName(string name)
  {
    if (string.IsNullOrWhiteSpace(name))
      return null;

    List<Food> _allFoods = await GetAllAsync();
    var trimmedName = name.Trim();

    return _allFoods.FirstOrDefault(f =>
      GetKeyValues(f.Keys).Any(key =>
        string.Equals(key, trimmedName, StringComparison.OrdinalIgnoreCase)));
  }

  internal static string filterPrefix(string foodText)
  {
    if (string.IsNullOrWhiteSpace(foodText))
      return string.Empty;

    foodText = foodText.Trim();

    return Regex.Replace(foodText, @"^(de|da|do|dos|das|of|the)\s+", "", RegexOptions.IgnoreCase).Trim();
  }

  internal static string filterName(string name) => filterName(name, null);

  internal static string filterName(string name, Server.Shared.Language? language)
  {
    var noPrefixName = filterPrefix(name);

    // Remove known modifiers in a case-insensitive way (handles "Para polvilhar ...")
    var normalized = noPrefixName;
    foreach (var modifier in GetModifiers(language).OrderByDescending(m => m.Length))
    {
      if (string.IsNullOrWhiteSpace(modifier)) continue;
      var pattern = Regex.Escape(modifier);
      // Replace all occurrences, ignore case, and trim extra spaces produced
      normalized = Regex.Replace(normalized, pattern, string.Empty, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
      normalized = Regex.Replace(normalized, "\\s+", " ", RegexOptions.CultureInvariant).Trim();
    }

    // Also handle generic trailing purpose phrases starting with "para ..." or "for ..."
    // e.g., "farinha de trigo para polvilhar a bancada" -> "farinha de trigo"
    normalized = Regex.Replace(normalized, @"\b(para|for)\b.*$", string.Empty, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant).Trim();

    // Remove any parenthetical segments (e.g., "(cerca de 740 g)") that are not part of the core food name
    normalized = Regex.Replace(normalized, @"\([^)]*\)", " ", RegexOptions.CultureInvariant).Trim();

    // Collapse multiple spaces
    normalized = Regex.Replace(normalized, "\\s+", " ", RegexOptions.CultureInvariant).Trim();
    normalized = StringService.ReplaceEnding(normalized, " e", string.Empty);
    normalized = StringService.ReplaceEnding(normalized, " and", string.Empty);

    return normalized.Trim();
  }

  private static double LowConfidenceThreshold = 0.55; // 0..1 similarity
  private static readonly object LowConfidenceLogLock = new();
  private static string LowConfidenceLogFilePath => Path.Combine(AppContext.BaseDirectory, "logs", "food-match-low-confidence.jsonl");

  private static double ComputeNormalizedScore(string query, string candidate, Levenshtein levenshtein)
  {
    if (string.IsNullOrWhiteSpace(query) && string.IsNullOrWhiteSpace(candidate)) return 1.0;
    if (string.IsNullOrWhiteSpace(candidate)) return 0.0;
    int distance = levenshtein.DistanceFrom(candidate);
    int maxLen = Math.Max(query.Length, candidate.Length);
    if (maxLen == 0) return 1.0;
    double score = 1.0 - (double)distance / maxLen;
    if (score < 0) score = 0; if (score > 1) score = 1;
    return score;
  }

  private static async Task TryLogLowConfidenceAsync(object payload)
  {
    try
    {
      var directory = Path.GetDirectoryName(LowConfidenceLogFilePath)!;
      if (!Directory.Exists(directory)) Directory.CreateDirectory(directory);
      string json = System.Text.Json.JsonSerializer.Serialize(payload);
      lock (LowConfidenceLogLock)
      {
        File.AppendAllText(LowConfidenceLogFilePath, json + Environment.NewLine);
      }
      await Task.CompletedTask;
    }
    catch
    {
      // non-fatal; ignore logging errors
    }
  }

  internal async Task<Food> BestMatch(string name, string? originalInput = null)
  {
    List<Food> _allFoods = await GetAllAsync();
    var trimmedName = name.Trim();
    var levenshtein = new Levenshtein(trimmedName);

    static bool StartsWithWord(string source, string query)
    {
      if (string.IsNullOrWhiteSpace(source) || string.IsNullOrWhiteSpace(query)) return false;
      return Regex.IsMatch(source, $@"^\s*{Regex.Escape(query)}\b", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
    }

    static bool ContainsWord(string source, string query)
    {
      if (string.IsNullOrWhiteSpace(source) || string.IsNullOrWhiteSpace(query)) return false;
      return Regex.IsMatch(source, $@"\b{Regex.Escape(query)}\b", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
    }

    // Strong preference: any value that starts with the query as a word
    var startsWithSet = _allFoods
      .Select(food => new { Food = food, Values = GetSearchableValues(food).ToList() })
      .Where(x => x.Values.Any(v => StartsWithWord(v, trimmedName)))
      .Select(x => new { x.Food, Distance = x.Values.Min(v => levenshtein.DistanceFrom(v)) })
      .OrderBy(x => x.Distance)
      .FirstOrDefault();

    if (startsWithSet is not null)
    {
      var food = startsWithSet.Food;
      var bestVal = GetSearchableValues(food).OrderBy(v => levenshtein.DistanceFrom(v)).FirstOrDefault() ?? string.Empty;
      var score = ComputeNormalizedScore(trimmedName, bestVal, levenshtein);
      if (score < LowConfidenceThreshold)
      {
        await TryLogLowConfidenceAsync(new
        {
          type = "startsWith",
          query = trimmedName,
          bestCandidate = bestVal,
          score,
          language = LanguagePreference?.ToString(),
          foodId = food.Id,
          foodNamePt = food.Name?.Pt,
          foodNameEn = food.Name?.En,
          timestampUtc = DateTime.UtcNow
        });
      }
      return food;
    }

    // Next preference: any value that contains the query as a word
    var containsSet = _allFoods
      .Select(food => new { Food = food, Values = GetSearchableValues(food).ToList() })
      .Where(x => x.Values.Any(v => ContainsWord(v, trimmedName)))
      .Select(x => new { x.Food, Distance = x.Values.Min(v => levenshtein.DistanceFrom(v)) })
      .OrderBy(x => x.Distance)
      .FirstOrDefault();

    if (containsSet is not null)
    {
      var food = containsSet.Food;
      var bestVal = GetSearchableValues(food).OrderBy(v => levenshtein.DistanceFrom(v)).FirstOrDefault() ?? string.Empty;
      var score = ComputeNormalizedScore(trimmedName, bestVal, levenshtein);
      if (score < LowConfidenceThreshold)
      {
        await TryLogLowConfidenceAsync(new
        {
          type = "contains",
          query = trimmedName,
          bestCandidate = bestVal,
          score,
          language = LanguagePreference?.ToString(),
          foodId = food.Id,
          foodNamePt = food.Name?.Pt,
          foodNameEn = food.Name?.En,
          timestampUtc = DateTime.UtcNow
        });
      }
      return food;
    }

    // Fallback: pure Levenshtein with tie-break preferring shorter best candidate
    var fallbackRanked = _allFoods
      .Select(food =>
      {
        var candidates = GetSearchableValues(food).ToList();
        var bestVal = candidates.Count == 0
          ? string.Empty
          : candidates.OrderBy(candidate => levenshtein.DistanceFrom(candidate)).First();
        var baseDistance = candidates.Count == 0
          ? levenshtein.DistanceFrom(string.Empty)
          : levenshtein.DistanceFrom(bestVal);
        var nameLen = (food.Name?.Pt ?? food.Name?.En ?? string.Empty).Length;
        return new { Food = food, Base = baseDistance, Best = bestVal, NameLen = nameLen };
      })
      .OrderBy(x => x.Base)
      .ThenBy(x => x.Best.Length)
      .ThenBy(x => x.NameLen)
      .First();

    {
      var bestVal = fallbackRanked.Best ?? string.Empty;
      var score = ComputeNormalizedScore(trimmedName, bestVal, levenshtein);
      if (score < LowConfidenceThreshold)
      {
        await TryLogLowConfidenceAsync(new
        {
          type = "levenshtein",
          query = trimmedName,
          originalQuery = originalInput,
          bestCandidate = bestVal,
          score,
          language = LanguagePreference?.ToString(),
          foodId = fallbackRanked.Food.Id,
          foodNamePt = fallbackRanked.Food.Name?.Pt,
          foodNameEn = fallbackRanked.Food.Name?.En,
          timestampUtc = DateTime.UtcNow
        });
      }
    }
    return fallbackRanked.Food;
  }

  public async Task<Food> FindFoodByPossibleName(string possibleName)
  {
    foods = await _context.Food.ToListAsync();
    Food? _food = await hasExactFoodWithThisName(possibleName);

    if (_food != null)
    {
      return _food;
    }

    _food = await hasExactKeyWithThisName(possibleName);

    if (_food != null)
    {
      return _food;
    }

    var prefixFilteredName = filterPrefix(possibleName);

    if (!string.Equals(prefixFilteredName, possibleName, StringComparison.OrdinalIgnoreCase))
    {
      _food = await hasExactFoodWithThisName(prefixFilteredName);

      if (_food != null)
      {
        return _food;
      }

      _food = await hasExactKeyWithThisName(prefixFilteredName);

      if (_food != null)
      {
        return _food;
      }
    }

    string filteredPossibleName = filterName(possibleName, LanguagePreference);

    _food = await hasExactFoodWithThisName(filteredPossibleName);

    if (_food != null)
    {
      return _food;
    }

    _food = await hasExactKeyWithThisName(filteredPossibleName);

    if (_food != null)
    {
      return _food;
    }

    // If no exact match, try substring containment (both directions) and prefer the longest match
    // var allFoods = await GetAllAsync();
    // var substringCandidate = allFoods
    //   .Select(f => new
    //   {
    //     Food = f,
    //     BestLen = GetSearchableValues(f)
    //       .Select(val => new { Val = val, Len = Math.Max(
    //           val.IndexOf(filteredPossibleName, StringComparison.OrdinalIgnoreCase) >= 0 ? filteredPossibleName.Length : 0,
    //           filteredPossibleName.IndexOf(val, StringComparison.OrdinalIgnoreCase) >= 0 ? val.Length : 0) })
    //       .Max(x => x.Len)
    //   })
    //   .Where(x => x.BestLen > 0)
    //   .OrderByDescending(x => x.BestLen)
    //   .Select(x => x.Food)
    //   .FirstOrDefault();

    // if (substringCandidate is not null)
    // {
    //   return substringCandidate;
    // }

    return await BestMatch(filteredPossibleName, possibleName);
  }

  public async Task<Food> FindFoodByPossibleName(string possibleName, Server.Shared.Language? language)
  {
    var previous = LanguagePreference;
    try
    {
      LanguagePreference = language;
      return await FindFoodByPossibleName(possibleName);
    }
    finally
    {
      LanguagePreference = previous;
    }
  }

  public static List<Food> GetFoodsFromRecipes(List<Recipe> recipes)
  {
    var foodsFromSteps = recipes
      .SelectMany(r => r.Steps)
      .SelectMany(s => s.Ingredients)
      .Select(i => i.Food);

    var recipeFoods = recipes
      .Select(r => r.Food);

    return foodsFromSteps
      .Concat(recipeFoods)
      .Where(f => f is not null)
      .DistinctBy(f => f!.Id)
      .ToList()!;
  }
}

