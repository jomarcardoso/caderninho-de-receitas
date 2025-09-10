using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options)
      : base(options) { }

  public DbSet<Recipe> Recipe { get; set; }
  public DbSet<Food> Food { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    // Food
    modelBuilder.Entity<Food>(entity =>
    {
      entity.OwnsOne(f => f.NutritionalInformation);
      entity.OwnsOne(f => f.AminoAcids);
      entity.OwnsOne(f => f.Vitamins);
      entity.OwnsOne(f => f.Minerals);

      entity.OwnsMany(f => f.Measures);
    });

    // Recipe
    modelBuilder.Entity<Recipe>(entity =>
    {
      entity.OwnsMany(r => r.Steps, step =>
      {
        step.OwnsMany(s => s.Ingredients, ingredient =>
        {
          ingredient.OwnsOne(i => i.AminoAcids);
          ingredient.OwnsOne(i => i.NutritionalInformation);
          ingredient.OwnsOne(i => i.Vitamins);
          ingredient.OwnsOne(i => i.Minerals);
        });

        step.OwnsOne(s => s.NutritionalInformation);
        step.OwnsOne(s => s.AminoAcids);
        step.OwnsOne(s => s.Vitamins);
        step.OwnsOne(s => s.Minerals);
      });

      entity.OwnsOne(r => r.NutritionalInformation);
      entity.OwnsOne(r => r.AminoAcids);
      entity.OwnsOne(r => r.Vitamins);
      entity.OwnsOne(r => r.Minerals);
    });
  }
}
