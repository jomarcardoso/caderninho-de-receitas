using Microsoft.EntityFrameworkCore;
using Server.Models;
using Fastenshtein;

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
    "cru", "crua", "crus", "cruas"
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
    return await _context.Foods.ToListAsync();
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

  private Food? hasExactFoodWithThisName(string name)
  {
    return foods.FirstOrDefault(f => string.Equals(f.NamePt, name, StringComparison.OrdinalIgnoreCase));
  }

  private Food? hasExactKeyWithThisName(string name)
  {
    return foods.FirstOrDefault((f) => f.KeysPt.Split(',').Any((k) => string.Equals(k, name, StringComparison.OrdinalIgnoreCase)));
  }

  private static string filterName(string name)
  {
    return FoodModifiers.Aggregate(name, (current, modifier) => current.Replace(modifier, "").Trim());
  }

  private Food BestMatch(string name)
  {
    return foods
      .OrderBy(food => (food.KeysPt + ", " + food.NamePt).Split(", ").Min(key => new Levenshtein(name).DistanceFrom(key)))
      .First();
  }

  public async Task<Food> FindFoodByPossibleName(string possibleName)
  {
    foods = await _context.Foods.ToListAsync();
    Food? _food = hasExactFoodWithThisName(possibleName);

    if (_food != null)
    {
      return _food;
    }

    _food = hasExactKeyWithThisName(possibleName);

    if (_food != null)
    {
      return _food;
    }

    string filteredPossibleName = filterName(possibleName);

    _food = hasExactFoodWithThisName(filteredPossibleName);

    if (_food != null)
    {
      return _food;
    }

    _food = hasExactKeyWithThisName(filteredPossibleName);

    if (_food != null)
    {
      return _food;
    }

    return BestMatch(filteredPossibleName);
  }
}
