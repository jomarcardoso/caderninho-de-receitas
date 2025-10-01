using Microsoft.EntityFrameworkCore;
using Fastenshtein;
using Server.Models;
using System.Text.RegularExpressions;

namespace Server.Services;

public class FoodService
{
  public static List<string> FoodModifiers = new List<string>
  {
    "a gosto", "à gosto",
    "para servir", "a gosto para servir", "a gosto para servir (opcional)",
    "(opcional)",
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
    "peneirado", "peneirada", "peneirados", "peneiradas"
  };

  private readonly AppDbContext _context;
  private List<Food> foods = new List<Food>();

  public FoodService(AppDbContext context)
  {
    _context = context;
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
    List<Food> _allFoods = await GetAllAsync();

    return _allFoods.FirstOrDefault(f => string.Equals(f.Name.Pt.Trim(), name.Trim(), StringComparison.OrdinalIgnoreCase));
  }

  internal async Task<Food?> hasExactKeyWithThisName(string name)
  {
    List<Food> _allFoods = await GetAllAsync();

    return _allFoods.FirstOrDefault((f) => f.Keys.Pt.Split(", ").Any((k) => string.Equals(k.Trim(), name.Trim(), StringComparison.OrdinalIgnoreCase)));
  }

  internal static string filterPrefix(string foodText)
  {
    if (string.IsNullOrWhiteSpace(foodText))
      return string.Empty;

    // normaliza espaחos extras
    foodText = foodText.Trim();

    // regex para remover "de", "da", "do", "dos", "das", "of" no inםcio
    return Regex.Replace(foodText, @"^(de|da|do|dos|das|of)\s+", "", RegexOptions.IgnoreCase).Trim();
  }

  internal static string filterName(string name)
  {
    var noPrefixName = filterPrefix(name);

    return FoodModifiers.Aggregate(noPrefixName,
      (current, modifier) =>
        StringService.ReplaceEnding(current.Replace(modifier, "").Trim().Replace("  ", " "), " e", "")
    );
  }

  internal async Task<Food> BestMatch(string name)
  {
    List<Food> _allFoods = await GetAllAsync();

    return _allFoods
      .OrderBy(food => (food.Keys.Pt + ", " + food.Name.Pt).Split(", ").Min(key => new Levenshtein(name).DistanceFrom(key)))
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
