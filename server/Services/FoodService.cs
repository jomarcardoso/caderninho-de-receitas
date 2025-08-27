using Microsoft.EntityFrameworkCore;

using server.Models;

namespace server.Services;

public class FoodService
{
  private readonly AppDbContext _context;

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
}
