using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options)
      : base(options) { }

  public DbSet<Recipe> Recipes { get; set; }
  public DbSet<Food> Foods { get; set; }
}
