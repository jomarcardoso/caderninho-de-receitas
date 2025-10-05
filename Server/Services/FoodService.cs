using Microsoft.EntityFrameworkCore;
using Fastenshtein;
using Server.Models;
using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace Server.Services;

public class FoodService
{
  public static List<string> FoodModifiers = new List<string>
  {
    "a gosto", "à gosto",
    "para servir", "a gosto para servir", "a gosto para servir (opcional)",
    "(opcional)", "opcional",
    "picado", "picada", "picados", "picadas",
    "ralado", "ralada", "ralados", "raladas",
    "cozido", "cozida", "cozidos", "cozidas",
    "desfiado", "desfiada", "desfiados", "desfiadas",
    "triturado", "triturada", "triturados", "trituradas",
    "fatiado", "fatiada", "fatiados", "fatiadas",
    "moído", "moída", "moídos", "moídas",
    "inteiro", "inteira", "inteiros", "inteiras",
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
    "peneirado", "peneirada", "peneirados", "peneiradas",
    "to taste", "for serving", "for garnish", "for topping",
    "to taste for serving", "to taste for serving (optional)",
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

  private static readonly char[] KeySeparators = new[] { ',', ';' };

  private readonly AppDbContext _context;
  private List<Food> foods = new List<Food>();

  public FoodService(AppDbContext context)
  {
    _context = context;
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

  internal static string filterName(string name)
  {
    var noPrefixName = filterPrefix(name);

    var normalized = FoodModifiers
      .OrderByDescending(modifier => modifier.Length)
      .Aggregate(noPrefixName,
        (current, modifier) => current.Replace(modifier, string.Empty).Trim().Replace("  ", " "));
    normalized = StringService.ReplaceEnding(normalized, " e", string.Empty);
    normalized = StringService.ReplaceEnding(normalized, " and", string.Empty);

    return normalized.Trim();
  }

  internal async Task<Food> BestMatch(string name)
  {
    List<Food> _allFoods = await GetAllAsync();
    var trimmedName = name.Trim();
    var levenshtein = new Levenshtein(trimmedName);

    return _allFoods
      .OrderBy(food =>
      {
        var candidates = GetSearchableValues(food);

        return candidates.Count == 0
          ? levenshtein.DistanceFrom(string.Empty)
          : candidates.Min(candidate => levenshtein.DistanceFrom(candidate));
      })
      .First();
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

    string filteredPossibleName = filterName(possibleName);

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

    return await BestMatch(filteredPossibleName);
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

