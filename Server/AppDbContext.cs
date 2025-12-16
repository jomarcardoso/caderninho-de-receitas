using Microsoft.EntityFrameworkCore;
using Server.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Shared;
using System.Linq;
using System.Collections.Generic;
using System;

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
  public DbSet<RecipeCategoryOpen> RecipeCategoryOpen { get; set; }
  public DbSet<CategoryEditRequest> CategoryEditRequest { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    static (ValueConverter<List<TEnum>, string> converter, ValueComparer<List<TEnum>> comparer) BuildEnumListPersistence<TEnum>() where TEnum : struct, Enum
    {
      var converter = new ValueConverter<List<TEnum>, string>(
        v => string.Join(',', (v ?? new()).Select(x => x.ToString())),
        v => string.IsNullOrWhiteSpace(v)
          ? new List<TEnum>()
          : v.Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(x => TryParseEnum<TEnum>(x))
            .Where(x => x.HasValue)
            .Select(x => x!.Value)
            .ToList()
      );

      var comparer = new ValueComparer<List<TEnum>>(
        (a, b) => (a ?? new()).SequenceEqual(b ?? new()),
        v => (v ?? new()).Aggregate(0, (acc, x) => HashCode.Combine(acc, x.GetHashCode())),
        v => v == null ? new List<TEnum>() : v.ToList()
      );

      return (converter, comparer);
    }

    // Food
    modelBuilder.Entity<Food>(entity =>
    {
      entity.HasOne(f => f.IconData)
        .WithMany()
        .HasForeignKey(f => f.IconId)
        .OnDelete(DeleteBehavior.SetNull);
      entity.Navigation(f => f.IconData).AutoInclude();

      var (foodCategoriesConverter, foodCategoriesComparer) = (
        new ValueConverter<List<string>, string>(
          v => string.Join(',', v ?? new List<string>()),
          v => string.IsNullOrWhiteSpace(v)
            ? new List<string>()
            : v.Split(',', StringSplitOptions.RemoveEmptyEntries)
              .Select(x => x.Trim())
              .Where(x => !string.IsNullOrWhiteSpace(x))
              .ToList()
        ),
        new ValueComparer<List<string>>(
          (a, b) => (a ?? new()).SequenceEqual(b ?? new(), StringComparer.OrdinalIgnoreCase),
          v => (v ?? new()).Aggregate(0, (acc, x) => HashCode.Combine(acc, x.ToLowerInvariant().GetHashCode())),
          v => v == null ? new List<string>() : v.ToList()
        )
      );

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
      entity.Property(f => f.Categories)
        .HasConversion(foodCategoriesConverter)
        .HasColumnType("text")
        .Metadata.SetValueComparer(foodCategoriesComparer);
    });

    // Recipe
    modelBuilder.Entity<Recipe>(entity =>
    {
      // Persist Categories as a comma-separated slug list
      var categoriesConverter = new ValueConverter<List<string>, string>(
        v => string.Join(',', v ?? new List<string>()),
        v => string.IsNullOrWhiteSpace(v)
          ? new List<string>()
          : v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(x => x.Trim()).Where(x => !string.IsNullOrWhiteSpace(x)).ToList()
      );

      var categoriesComparer = new ValueComparer<List<string>>(
        (a, b) => (a ?? new()).SequenceEqual(b ?? new(), StringComparer.OrdinalIgnoreCase),
        v => (v ?? new()).Aggregate(0, (acc, x) => HashCode.Combine(acc, x.ToLowerInvariant().GetHashCode())),
        v => v == null ? new List<string>() : v.ToList()
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

      // Link Recipe.OwnerId -> UserProfile.OwnerId
      entity
        .HasOne(r => r.Owner)
        .WithMany()
        .HasForeignKey(r => r.OwnerId)
        .HasPrincipalKey(u => u.OwnerId);
    });

    // RecipeRelation
    modelBuilder.Entity<RecipeRelation>(entity =>
    {
      entity.HasKey(r => r.Id);
      entity.HasIndex(r => new { r.RecipeId, r.RelatedRecipeId }).IsUnique();
    });

    // RecipeCategoryOpen
    modelBuilder.Entity<RecipeCategoryOpen>(entity =>
    {
      entity.HasKey(c => c.Id);
      entity.Property(c => c.Slug)
        .IsRequired()
        .HasMaxLength(128);
      entity.HasIndex(c => c.Slug).IsUnique();
      entity.OwnsOne(c => c.Name);
      entity.Property(c => c.CreatedAt).IsRequired();
    });

    // CategoryEditRequest
    modelBuilder.Entity<CategoryEditRequest>(entity =>
    {
      entity.HasKey(e => e.Id);
      entity.HasIndex(e => new { e.CategoryId, e.Status });
      entity.Property(e => e.ProposedBy).IsRequired();
      entity.Property(e => e.Payload).IsRequired();
      entity.Property(e => e.CreatedAt).IsRequired();
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

      // Persist enum lists as comma-separated strings
      var (allergyConv, allergyCmp) = BuildEnumListPersistence<AllergyRestriction>();
      entity.Property(u => u.Allergies)
        .HasConversion(allergyConv)
        .HasColumnType("text")
        .Metadata.SetValueComparer(allergyCmp);

      var (intConv, intCmp) = BuildEnumListPersistence<IntoleranceRestriction>();
      entity.Property(u => u.Intolerances)
        .HasConversion(intConv)
        .HasColumnType("text")
        .Metadata.SetValueComparer(intCmp);

      var (medConv, medCmp) = BuildEnumListPersistence<MedicalRestriction>();
      entity.Property(u => u.MedicalRestrictions)
        .HasConversion(medConv)
        .HasColumnType("text")
        .Metadata.SetValueComparer(medCmp);

      var (dietConv, dietCmp) = BuildEnumListPersistence<DietStyleRestriction>();
      entity.Property(u => u.DietStyles)
        .HasConversion(dietConv)
        .HasColumnType("text")
        .Metadata.SetValueComparer(dietCmp);

      var (cultureConv, cultureCmp) = BuildEnumListPersistence<CulturalRestriction>();
      entity.Property(u => u.CulturalRestrictions)
        .HasConversion(cultureConv)
        .HasColumnType("text")
        .Metadata.SetValueComparer(cultureCmp);

      var (prefConv, prefCmp) = BuildEnumListPersistence<PersonalPreferenceRestriction>();
      entity.Property(u => u.PersonalPreferences)
        .HasConversion(prefConv)
        .HasColumnType("text")
        .Metadata.SetValueComparer(prefCmp);
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

  private static TEnum? TryParseEnum<TEnum>(string value) where TEnum : struct, Enum
  {
    return Enum.TryParse<TEnum>(value, true, out var parsed) ? parsed : null;
  }
}
