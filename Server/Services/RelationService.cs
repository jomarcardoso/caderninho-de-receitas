using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services;

public class RelationService
{
  private readonly AppDbContext _context;

  public RelationService(AppDbContext context)
  {
    _context = context;
  }

  private static IEnumerable<string> TokenizeKeys(string? keys)
  {
    if (string.IsNullOrWhiteSpace(keys)) yield break;
    foreach (var k in keys.Split(',', StringSplitOptions.RemoveEmptyEntries))
    {
      var t = k.Trim().ToLowerInvariant();
      if (!string.IsNullOrWhiteSpace(t)) yield return t;
    }
  }

  private static double ComputeWeight(Recipe a, Recipe b)
  {
    double weight = 0;

    if (a.Food?.Id > 0 && a.Food.Id == b.Food?.Id) weight += 3.0;

    var aFoods = a.Steps.SelectMany(s => s.Ingredients).Select(i => i.Food?.Id).Where(id => id.HasValue).Select(id => id!.Value).ToHashSet();
    var bFoods = b.Steps.SelectMany(s => s.Ingredients).Select(i => i.Food?.Id).Where(id => id.HasValue).Select(id => id!.Value).ToHashSet();
    var sharedFoods = aFoods.Intersect(bFoods).Count();
    weight += Math.Min(sharedFoods, 5) * 1.0;

    var aKeys = TokenizeKeys(a.Keys).ToHashSet();
    var bKeys = TokenizeKeys(b.Keys).ToHashSet();
    var sharedKeys = aKeys.Intersect(bKeys).Count();
    weight += Math.Min(sharedKeys, 5) * 0.5;

    return weight;
  }

  public async Task<int> RebuildAllRelationsAsync(int topPerRecipe = 10, CancellationToken ct = default)
  {
    var recipes = await _context.Recipe
      .Include(r => r.Food)
      .Include(r => r.Steps)
        .ThenInclude(s => s.Ingredients)
        .ThenInclude(i => i.Food)
      .AsNoTracking()
      .ToListAsync(ct);

    var buffer = new List<RecipeRelation>(recipes.Count * Math.Min(10, recipes.Count));

    foreach (var r in recipes)
    {
      var ranked = recipes
        .Where(o => o.Id != r.Id)
        .Select(o => new { Other = o, W = ComputeWeight(r, o) })
        .Where(x => x.W > 0)
        .OrderByDescending(x => x.W)
        .ThenBy(x => x.Other.Id)
        .Take(topPerRecipe)
        .ToList();

      foreach (var x in ranked)
      {
        buffer.Add(new RecipeRelation
        {
          RecipeId = r.Id,
          RelatedRecipeId = x.Other.Id,
          Weight = x.W,
          Source = "precompute-v1"
        });
      }
    }

    using var tx = await _context.Database.BeginTransactionAsync(ct);
    _context.RecipeRelation.RemoveRange(_context.RecipeRelation);
    await _context.SaveChangesAsync(ct);

    if (buffer.Count > 0)
    {
      await _context.RecipeRelation.AddRangeAsync(buffer, ct);
      await _context.SaveChangesAsync(ct);
    }
    await tx.CommitAsync(ct);

    return buffer.Count;
  }
}
