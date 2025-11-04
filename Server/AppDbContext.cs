using Microsoft.EntityFrameworkCore;
using Server.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Shared;

namespace Server;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options)
      : base(options) { }

  public DbSet<Recipe> Recipe { get; set; }
  public DbSet<Food> Food { get; set; }
  public DbSet<RecipeRelation> RecipeRelation { get; set; }
  public DbSet<FoodIcon> FoodIcon { get; set; }
  public DbSet<RecipeShare> RecipeShare { get; set; }
  public DbSet<Server.Models.FoodEditRequest> FoodEditRequest { get; set; }
  public DbSet<UserProfile> UserProfile { get; set; }
  public DbSet<RecipeList> RecipeList { get; set; }
  public DbSet<RecipeListItem> RecipeListItem { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    // Food
    modelBuilder.Entity<Food>(entity =>
    {
      entity.OwnsOne(f => f.Name);
      entity.OwnsOne(f => f.Description);
      entity.OwnsOne(f => f.Keys);
      entity.OwnsOne(f => f.NutritionalInformation);
      entity.OwnsOne(f => f.AminoAcids);
      entity.OwnsOne(f => f.EssentialAminoAcids);
      entity.OwnsOne(f => f.Vitamins);
      entity.OwnsOne(f => f.Minerals);
      entity.OwnsOne(f => f.Name);
      entity.OwnsOne(f => f.Measures);
    });

    // Recipe
    modelBuilder.Entity<Recipe>(entity =>
    {
      // Persist Categories as a comma-separated enum names string
      var categoriesConverter = new ValueConverter<List<RecipeCategory>, string>(
        v => SerializeCategories(v),
        v => DeserializeCategories(v)
      );

      var categoriesComparer = new ValueComparer<List<RecipeCategory>>(
        (a, b) => (a ?? new()).SequenceEqual(b ?? new()),
        v => (v ?? new()).Aggregate(0, (acc, x) => HashCode.Combine(acc, x.GetHashCode())),
        v => v == null ? new List<RecipeCategory>() : v.ToList()
      );

      entity.Property(r => r.Categories)
        .HasConversion(categoriesConverter)
        .HasColumnName("Categories")
        .HasColumnType("text")
        .Metadata.SetValueComparer(categoriesComparer);

      entity.OwnsMany(r => r.Steps, step =>
      {
        step.OwnsMany(s => s.Ingredients, ingredient =>
        {
          ingredient.OwnsOne(i => i.NutritionalInformation);
          ingredient.OwnsOne(i => i.AminoAcids);
          ingredient.OwnsOne(i => i.EssentialAminoAcids);
          ingredient.OwnsOne(i => i.Vitamins);
          ingredient.OwnsOne(i => i.Minerals);
        });

        step.OwnsOne(s => s.NutritionalInformation);
        step.OwnsOne(s => s.AminoAcids);
        step.OwnsOne(s => s.EssentialAminoAcids);
        step.OwnsOne(s => s.Vitamins);
        step.OwnsOne(s => s.Minerals);
      });

      entity.OwnsOne(r => r.NutritionalInformation);
      entity.OwnsOne(r => r.AminoAcids);
      entity.OwnsOne(r => r.EssentialAminoAcids);
      entity.OwnsOne(r => r.Vitamins);
      entity.OwnsOne(r => r.Minerals);
    });

    // RecipeRelation
    modelBuilder.Entity<RecipeRelation>(entity =>
    {
      entity.HasKey(r => r.Id);
      entity.HasIndex(r => new { r.RecipeId, r.RelatedRecipeId }).IsUnique();
    });

    // FoodIcon
    modelBuilder.Entity<FoodIcon>(entity =>
    {
      entity.HasKey(i => i.Id);
      // Localized name is owned; enforce uniqueness on Name.En and require it
      entity.OwnsOne(i => i.Name, nb =>
      {
        nb.Property(n => n.En).IsRequired();
        nb.Property(n => n.Pt);
        nb.HasIndex(n => n.En).IsUnique();
      });

      entity.Property(i => i.MediaType).IsRequired();
      entity.Property(i => i.Content).IsRequired();
      entity.OwnsOne(i => i.Keys);
    });

    // RecipeShare
    modelBuilder.Entity<RecipeShare>(entity =>
    {
      entity.HasKey(s => s.Id);
      entity.HasIndex(s => s.Slug).IsUnique();
      entity.Property(s => s.Slug).IsRequired();
      entity.Property(s => s.OwnerId).IsRequired();
      entity.Property(s => s.CreatedAt).IsRequired();
    });

    // FoodEditRequest
    modelBuilder.Entity<Server.Models.FoodEditRequest>(entity =>
    {
      entity.HasKey(e => e.Id);
      entity.HasIndex(e => new { e.FoodId, e.Status });
      entity.Property(e => e.ProposedBy).IsRequired();
      entity.Property(e => e.Payload).IsRequired();
      entity.Property(e => e.CreatedAt).IsRequired();
    });

    // UserProfile
    modelBuilder.Entity<UserProfile>(entity =>
    {
      entity.HasKey(u => u.OwnerId);
      entity.Property(u => u.OwnerId).IsRequired();
      entity.HasIndex(u => u.OwnerId).IsUnique();
      entity.Property(u => u.CreatedAt).IsRequired();
      entity.Property(u => u.UpdatedAt).IsRequired();
    });

    // RecipeList
    modelBuilder.Entity<RecipeList>(entity =>
    {
      entity.HasKey(l => l.Id);
      entity.Property(l => l.OwnerId).IsRequired();
      entity.Property(l => l.Name).IsRequired();
      entity.HasIndex(l => new { l.OwnerId, l.Name });
      entity.HasMany(l => l.Items)
        .WithOne(i => i.RecipeList!)
        .HasForeignKey(i => i.RecipeListId)
        .OnDelete(DeleteBehavior.Cascade);
    });

    modelBuilder.Entity<RecipeListItem>(entity =>
    {
      entity.HasKey(i => new { i.RecipeListId, i.RecipeId });
      entity.HasOne(i => i.Recipe)
        .WithMany()
        .HasForeignKey(i => i.RecipeId)
        .OnDelete(DeleteBehavior.Cascade);
    });
  }

  private static string SerializeCategories(List<RecipeCategory>? list)
  {
    var items = (list ?? new List<RecipeCategory>())
      .Select(x => x.ToString())
      .Distinct()
      .ToArray();
    return string.Join(',', items);
  }

  private static List<RecipeCategory> DeserializeCategories(string? data)
  {
    var result = new List<RecipeCategory>();
    var raw = (data ?? string.Empty).Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
    foreach (var s in raw)
    {
      try
      {
        var val = Enum.Parse<RecipeCategory>(s, ignoreCase: true);
        if (!result.Contains(val)) result.Add(val);
      }
      catch { /* ignore invalid values */ }
    }
    return result;
  }
}




