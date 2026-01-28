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
  public DbSet<Icon> FoodIcon { get; set; }
  public DbSet<RecipeShare> RecipeShare { get; set; }
  public DbSet<Server.Models.FoodEditRequest> FoodEditRequest { get; set; }
  public DbSet<FoodRevision> FoodRevision { get; set; }
  public DbSet<UserProfile> UserProfile { get; set; }
  public DbSet<UserAuthIdentity> UserAuthIdentity { get; set; }
  public DbSet<UserProfileRevision> UserProfileRevision { get; set; }
  public DbSet<RecipeRevision> RecipeRevisions { get; set; }
  public DbSet<RecipeList> RecipeList { get; set; }
  public DbSet<RecipeItem> RecipeItem { get; set; }
  public DbSet<RecipeCategory> RecipeCategory { get; set; }
  public DbSet<RecipeCategoryRevision> RecipeCategoryRevision { get; set; }

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
      entity.HasOne(f => f.Icon)
        .WithMany()
        .HasForeignKey(f => f.IconId)
        .OnDelete(DeleteBehavior.SetNull);
      entity.Navigation(f => f.Icon).AutoInclude();

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
      entity.HasIndex(r => r.Slug);
      entity.HasIndex(r => new { r.Visibility, r.TombstoneStatus });

      // Ignorar propriedades legadas derivadas de revisões
      entity.Ignore(r => r.NutritionalInformation);
      entity.Ignore(r => r.AminoAcids);
      entity.Ignore(r => r.EssentialAminoAcids);
      entity.Ignore(r => r.Vitamins);
      entity.Ignore(r => r.Minerals);
      entity.Ignore(r => r.Steps);

      // Persist category ids as comma-separated list
      var categoriesConverter = new ValueConverter<List<int>, string>(
        v => string.Join(',', v ?? new List<int>()),
        v => string.IsNullOrWhiteSpace(v)
          ? new List<int>()
          : v.Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(ParsePositiveInt)
            .Where(id => id > 0)
            .ToList()
      );

      var categoriesComparer = new ValueComparer<List<int>>(
        (a, b) => (a ?? new()).SequenceEqual(b ?? new()),
        v => (v ?? new()).Aggregate(0, (acc, x) => HashCode.Combine(acc, x.GetHashCode())),
        v => v == null ? new List<int>() : v.ToList()
      );

      entity.Property(r => r.CategoryIds)
        .HasConversion(categoriesConverter)
        .HasColumnName("Categories")
        .HasColumnType("text")
        .Metadata.SetValueComparer(categoriesComparer);


      entity.HasOne(r => r.Food)
        .WithMany()
        .HasForeignKey(r => r.FoodId)
        .OnDelete(DeleteBehavior.SetNull);

      // Link Recipe.OwnerId -> UserProfile.Id
      entity
        .HasOne(r => r.Owner)
        .WithMany()
        .HasForeignKey(r => r.OwnerId)
        .HasPrincipalKey(u => u.Id);

      entity.HasOne(r => r.PublishedRevision)
        .WithMany()
        .HasForeignKey(r => r.PublishedRevisionId)
        .OnDelete(DeleteBehavior.Restrict);

      entity.HasOne(r => r.LatestRevision)
        .WithMany()
        .HasForeignKey(r => r.LatestRevisionId)
        .OnDelete(DeleteBehavior.Restrict);

      entity.HasOne(r => r.MergedIntoRecipe)
        .WithMany()
        .HasForeignKey(r => r.MergedIntoRecipeId)
        .OnDelete(DeleteBehavior.Restrict);

      entity.HasMany(r => r.Revisions)
        .WithOne(rr => rr.Recipe)
        .HasForeignKey(rr => rr.RecipeId)
        .OnDelete(DeleteBehavior.Cascade);
    });

    // RecipeRelation
    modelBuilder.Entity<RecipeRelation>(entity =>
    {
      entity.HasKey(r => r.Id);
      entity.HasIndex(r => new { r.RecipeId, r.RelatedRecipeId }).IsUnique();
    });

    // RecipeCategory
    modelBuilder.Entity<RecipeCategory>(entity =>
    {
      entity.HasKey(c => c.Id);
      entity.Property(c => c.Slug)
        .IsRequired()
        .HasMaxLength(128);
      entity.HasIndex(c => c.Slug).IsUnique();
      entity.OwnsOne(c => c.Name);
      entity.OwnsOne(c => c.NamePlural);
      entity.OwnsOne(c => c.Description);
      entity.Property(c => c.CreatedAt).IsRequired();
      entity.Property(c => c.Img).HasColumnType("text");
      entity.Property(c => c.BannerImg).HasColumnType("text");
      entity.Property(c => c.Visibility).HasColumnType("integer");
      entity.Property(c => c.Featured).HasColumnType("boolean");
    });

    // RecipeCategoryRevision
    modelBuilder.Entity<RecipeCategoryRevision>(entity =>
    {
      entity.HasKey(r => r.Id);
      entity.HasIndex(r => new { r.RecipeCategoryId, r.Status });
      entity.HasIndex(r => new { r.Status, r.CreatedAtUtc })
        .HasDatabaseName("IX_RecipeCategoryRevision_Pending")
        .HasFilter("\"Status\" = 1");
      entity.Property(r => r.Payload).IsRequired();
      entity.Property(r => r.CreatedAtUtc).IsRequired();
      entity.Property(r => r.UpdatedAtUtc).IsRequired();

      entity.HasOne(r => r.CreatedByUser)
        .WithMany()
        .HasForeignKey(r => r.CreatedByUserId)
        .HasPrincipalKey(u => u.Id)
        .OnDelete(DeleteBehavior.Restrict);

      entity.HasOne(r => r.ReviewedByUser)
        .WithMany()
        .HasForeignKey(r => r.ReviewedByUserId)
        .HasPrincipalKey(u => u.Id)
        .OnDelete(DeleteBehavior.SetNull);
    });

    // Icon
    modelBuilder.Entity<Icon>(entity =>
    {
      entity.HasKey(i => i.Id);
      entity.ToTable("FoodIcon");
      // Localized name is owned; enforce uniqueness on Name.En and require it
      entity.OwnsOne(i => i.Name, nb =>
      {
        nb.Property(n => n.En).IsRequired();
        nb.Property(n => n.Pt);
        nb.HasIndex(n => n.En).IsUnique();
      });

      entity.Property(i => i.Url).IsRequired();
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
      entity.HasIndex(e => new { e.Status, e.CreatedAt })
        .HasDatabaseName("IX_FoodEditRequest_Pending")
        .HasFilter("\"Status\" = 0");
      entity.Property(e => e.ProposedBy).IsRequired();
      entity.Property(e => e.Payload).IsRequired();
      entity.Property(e => e.CreatedAt).IsRequired();
    });

    // FoodRevision
    modelBuilder.Entity<FoodRevision>(entity =>
    {
      entity.HasKey(r => r.Id);
      entity.HasIndex(r => new { r.FoodId, r.Status });
      entity.HasIndex(r => new { r.Status, r.CreatedAtUtc })
        .HasDatabaseName("IX_FoodRevision_Pending")
        .HasFilter("\"Status\" = 1");
      entity.Property(r => r.Payload).IsRequired();
      entity.Property(r => r.CreatedAtUtc).IsRequired();
      entity.Property(r => r.UpdatedAtUtc).IsRequired();

      entity.HasOne(r => r.CreatedByUser)
        .WithMany()
        .HasForeignKey(r => r.CreatedByUserId)
        .HasPrincipalKey(u => u.Id)
        .OnDelete(DeleteBehavior.Restrict);

      entity.HasOne(r => r.ReviewedByUser)
        .WithMany()
        .HasForeignKey(r => r.ReviewedByUserId)
        .HasPrincipalKey(u => u.Id)
        .OnDelete(DeleteBehavior.SetNull);
    });

    // UserProfile
    modelBuilder.Entity<UserProfile>(entity =>
    {
      entity.HasKey(u => u.Id);
      entity.Property(u => u.Id).IsRequired();
      entity.HasIndex(u => u.Id).IsUnique();
      entity.HasIndex(u => u.FirebaseUid).IsUnique();
      entity.HasIndex(u => new { u.Visibility, u.TombstoneStatus });
      entity.Property(u => u.CreatedAtUtc).IsRequired();
      entity.Property(u => u.UpdatedAtUtc).IsRequired();
      entity.Property(u => u.LastLoginAtUtc);
      entity.Property(u => u.ShareToken);
      entity.Property(u => u.ShareTokenCreatedAt);
      entity.Property(u => u.ShareTokenRevokedAt);
      entity.Property(u => u.GoogleId);
      entity.Property(u => u.GoogleEmailVerified);
      entity.Property(u => u.FirebaseUid);
      entity.Property(u => u.IsGuest);

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

      // Roles persistence
      var (roleConv, roleCmp) = BuildEnumListPersistence<Role>();
      entity.Property(u => u.Roles)
        .HasConversion(roleConv)
        .HasColumnType("text")
        .Metadata.SetValueComparer(roleCmp);

      // Emails persistence
      var emailConverter = new ValueConverter<List<string>, string>(
        v => string.Join(',', v ?? new List<string>()),
        v => string.IsNullOrWhiteSpace(v)
          ? new List<string>()
          : v.Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(x => x.Trim())
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .ToList()
      );
      var emailComparer = new ValueComparer<List<string>>(
        (a, b) => (a ?? new()).SequenceEqual(b ?? new(), StringComparer.OrdinalIgnoreCase),
        v => (v ?? new()).Aggregate(0, (acc, x) => HashCode.Combine(acc, x.ToLowerInvariant().GetHashCode())),
        v => v == null ? new List<string>() : v.ToList()
      );

      entity.Property(u => u.Emails)
        .HasConversion(emailConverter)
        .HasColumnType("text")
        .Metadata.SetValueComparer(emailComparer);

      entity.HasOne(u => u.PublishedRevision)
        .WithMany()
        .HasForeignKey(u => u.PublishedRevisionId)
        .OnDelete(DeleteBehavior.Restrict);

      entity.HasOne(u => u.LatestRevision)
        .WithMany()
        .HasForeignKey(u => u.LatestRevisionId)
        .OnDelete(DeleteBehavior.Restrict);
    });

    // UserAuthIdentity
    modelBuilder.Entity<UserAuthIdentity>(entity =>
    {
      entity.HasKey(i => i.Id);
      entity.Property(i => i.UserProfileId).IsRequired();
      entity.Property(i => i.Provider).IsRequired();
      entity.Property(i => i.ProviderUserId).IsRequired();
      entity.HasIndex(i => new { i.Provider, i.ProviderUserId }).IsUnique();
      entity.HasIndex(i => i.UserProfileId);
      entity.HasOne(i => i.UserProfile)
        .WithMany(u => u.AuthIdentities)
        .HasForeignKey(i => i.UserProfileId)
        .OnDelete(DeleteBehavior.Cascade);
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

    modelBuilder.Entity<RecipeItem>(entity =>
    {
      entity.ToTable("RecipeListItem");
      entity.HasKey(i => new { i.RecipeListId, i.RecipeId });
      entity.HasOne(i => i.Recipe)
        .WithMany()
        .HasForeignKey(i => i.RecipeId)
        .OnDelete(DeleteBehavior.Cascade);
    });

    modelBuilder.Entity<RecipeRevision>(entity =>
    {
      entity.HasKey(r => r.Id);
      entity.HasIndex(r => r.CreatedAtUtc);
      entity.Property(r => r.CreatedByUserId).IsRequired().HasMaxLength(80);

      entity.OwnsMany(r => r.Steps, step =>
      {
        step.WithOwner().HasForeignKey("RecipeRevisionId");
        step.HasKey("Id");
        step.ToTable("RecipeStep");

        step.OwnsMany(s => s.Ingredients, ingredient =>
        {
          ingredient.WithOwner().HasForeignKey("RecipeRevisionStepId");
          ingredient.HasKey("Id");
          ingredient.ToTable("Ingredient");
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
    });

    modelBuilder.Entity<UserProfileRevision>(entity =>
    {
      entity.HasKey(r => r.Id);
      entity.HasIndex(r => new { r.UserProfileId, r.Status });
      entity.HasIndex(r => r.CreatedAtUtc);
      entity.Property(r => r.CreatedByUserId).HasMaxLength(80);
      entity.Property(r => r.ReviewedByUserId).HasMaxLength(80);

      entity.HasOne(r => r.UserProfile)
        .WithMany(p => p.Revisions)
        .HasForeignKey(r => r.UserProfileId)
        .OnDelete(DeleteBehavior.Cascade);
    });

  }

  private static int ParsePositiveInt(string value)
  {
    return int.TryParse(value.Trim(), out var parsed) ? parsed : 0;
  }

  private static TEnum? TryParseEnum<TEnum>(string value) where TEnum : struct, Enum
  {
    return Enum.TryParse<TEnum>(value, true, out var parsed) ? parsed : null;
  }
}
