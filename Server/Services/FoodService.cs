using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services;

public class FoodService
{
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
    return foods.FirstOrDefault(f => f.Name == name);
  }

  private Food? hasExactKeyWithThisName(string name)
  {
    return foods.FirstOrDefault((f) => f.Keys.Split(',').Any((k) => k == name));
  }

  public async Task<Food> FindFoodByPossibleName(string possibleName)
  {
    foods = await _context.Foods.ToListAsync();

    Food? _food = hasExactFoodWithThisName(possibleName);

    if (_food != null)
    {
      return _food;
    }

    _food = hasExactFoodWithThisName(possibleName);

    if (_food != null)
    {
      return _food;
    }
    // var food = await _context.Foods.FirstOrDefaultAsync(f => f.Name == name);
    // return food;
  }
}
