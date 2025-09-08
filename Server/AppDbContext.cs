using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options)
      : base(options) { }

  public DbSet<Recipe> Recipes { get; set; }
  public DbSet<Food> Foods { get; set; }

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
    });

    // Ingredient
    modelBuilder.Entity<Ingredient>(entity =>
    {
      entity.OwnsOne(i => i.NutritionalInformation);
      entity.OwnsOne(i => i.AminoAcids);
      entity.OwnsOne(i => i.Vitamins);
      entity.OwnsOne(i => i.Minerals);
    });

    // RecipeStep
    modelBuilder.Entity<RecipeStep>(entity =>
    {
      entity.OwnsOne(i => i.NutritionalInformation);
      entity.OwnsOne(i => i.AminoAcids);
      entity.OwnsOne(i => i.Vitamins);
      entity.OwnsOne(i => i.Minerals);
    });

    // Recipe
    modelBuilder.Entity<Recipe>(entity =>
    {
      entity.OwnsOne(i => i.NutritionalInformation);
      entity.OwnsOne(i => i.AminoAcids);
      entity.OwnsOne(i => i.Vitamins);
      entity.OwnsOne(i => i.Minerals);
    });
  }
}
