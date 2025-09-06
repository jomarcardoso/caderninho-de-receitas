using Microsoft.EntityFrameworkCore;
using Server.Models.Food;
using Fastenshtein;
using Server.Models;

namespace Server.Services;

public class FoodService
{
  public static List<string> FoodModifiers = new List<string>
  {
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
    return await _context.Foods.FindAsync(id);
  }

  // Buscar todos os alimentos
  public async Task<List<Food>> GetAllAsync()
  {
    if (foods.Count > 0)
      return foods;

    foods = await _context.Foods.ToListAsync();

    return foods;
  }

  // Salvar um novo Food
  public async Task<Food> AddAsync(Food food)
  {
    _context.Foods.Add(food);
    await _context.SaveChangesAsync();
    return food;
  }

  // Atualizar um Food existente
  public async Task<Food?> UpdateAsync(Food food)
  {
    var existingFood = await _context.Foods.FindAsync(food.Id);
    if (existingFood == null) return null;

    existingFood.Name = food.Name;
    existingFood.Calories = food.Calories;
    // Atualize outras propriedades necessárias

    await _context.SaveChangesAsync();
    return existingFood;
  }

  internal async Task<Food?> hasExactFoodWithThisName(string name)
  {
    List<Food> _allFoods = await GetAllAsync();

    return _allFoods.FirstOrDefault(f => string.Equals(f.NamePt.Trim(), name.Trim(), StringComparison.OrdinalIgnoreCase));
  }

  internal async Task<Food?> hasExactKeyWithThisName(string name)
  {
    List<Food> _allFoods = await GetAllAsync();

    return _allFoods.FirstOrDefault((f) => f.KeysPt.Split(", ").Any((k) => string.Equals(k.Trim(), name.Trim(), StringComparison.OrdinalIgnoreCase)));
  }

  internal static string filterName(string name)
  {
    return FoodModifiers.Aggregate(name,
      (current, modifier) =>
        StringService.ReplaceEnding(current.Replace(modifier, "").Trim().Replace("  ", " "), " e", "")
    );
  }

  internal async Task<Food> BestMatch(string name)
  {
    List<Food> _allFoods = await GetAllAsync();

    return _allFoods
      .OrderBy(food => (food.KeysPt + ", " + food.NamePt).Split(", ").Min(key => new Levenshtein(name).DistanceFrom(key)))
      .First();
  }

  public async Task<Food> FindFoodByPossibleName(string possibleName)
  {
    foods = await _context.Foods.ToListAsync();
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
    return recipes
      .SelectMany(r => r.Steps)
      .SelectMany(s => s.Ingredients)
      .Select(i => i.Food)
      .DistinctBy(f => f.Id)
      .ToList();
  }
}
