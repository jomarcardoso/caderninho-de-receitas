using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Controllers;
using Server.Dtos;
using Server.Models;
using Server.Response;
using Server.Shared;

namespace Server.Tests.Controllers;

public class RecipeCategoryControllerTests
{
  private static AppDbContext BuildContext()
  {
    var options = new DbContextOptionsBuilder<AppDbContext>()
      .UseInMemoryDatabase(Guid.NewGuid().ToString())
      .Options;
    return new RecipeTestAppDbContext(options);
  }

  private static RecipeCategoryController BuildController(AppDbContext context, string? userId = null, params string[] roles)
  {
    var httpContext = new DefaultHttpContext();
    if (!string.IsNullOrWhiteSpace(userId))
    {
      var claims = new List<Claim> { new Claim(ClaimTypes.NameIdentifier, userId) };
      foreach (var role in roles)
      {
        claims.Add(new Claim(ClaimTypes.Role, role));
      }
      httpContext.User = new ClaimsPrincipal(new ClaimsIdentity(claims, "test"));
    }

    var controller = new RecipeCategoryController(context)
    {
      ControllerContext = new ControllerContext { HttpContext = httpContext }
    };
    return controller;
  }

  private static RecipeCategoryDto BuildDto(string nameEn, string namePt, bool? featured = null)
  {
    return new RecipeCategoryDto
    {
      Name = new LanguageText { En = nameEn, Pt = namePt },
      NamePlural = new LanguageText { En = $"{nameEn}s", Pt = $"{namePt}s" },
      Description = new LanguageText { En = string.Empty, Pt = string.Empty },
      Img = "img.png",
      BannerImg = "banner.png",
      Featured = featured
    };
  }

  private static RecipeCategory SeedCategory(AppDbContext context, string slug, string nameEn, string namePt, Visibility visibility, bool featured)
  {
    var category = new RecipeCategory
    {
      Slug = slug,
      Name = new LanguageText { En = nameEn, Pt = namePt },
      NamePlural = new LanguageText { En = $"{nameEn}s", Pt = $"{namePt}s" },
      Description = new LanguageText { En = string.Empty, Pt = string.Empty },
      Img = "img.png",
      BannerImg = "banner.png",
      Visibility = visibility,
      Featured = featured,
      CreatedAt = DateTime.UtcNow
    };
    context.RecipeCategory.Add(category);
    context.SaveChanges();
    return category;
  }

  [Test]
  public async Task GetAll_returns_public_and_respects_featured_filter()
  {
    using var context = BuildContext();
    var featured = SeedCategory(context, "desserts", "Dessert", "Doce", Visibility.Public, true);
    var regular = SeedCategory(context, "snacks", "Snack", "Lanche", Visibility.Public, false);
    SeedCategory(context, "private", "Hidden", "Oculta", Visibility.Private, true);

    var controller = BuildController(context);
    var result = await controller.GetAll();

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var payload = ok!.Value as IEnumerable<RecipeCategoryResponse>;
    Assert.That(payload, Is.Not.Null);
    var list = payload!.ToList();
    Assert.That(list.Count, Is.EqualTo(2));
    Assert.That(list.Select(l => l.Id), Does.Contain(featured.Id));
    Assert.That(list.Select(l => l.Id), Does.Contain(regular.Id));

    var featuredResult = await controller.GetAll(true);
    var featuredOk = featuredResult.Result as OkObjectResult;
    Assert.That(featuredOk, Is.Not.Null);
    var featuredPayload = featuredOk!.Value as IEnumerable<RecipeCategoryResponse>;
    Assert.That(featuredPayload, Is.Not.Null);
    var featuredList = featuredPayload!.ToList();
    Assert.That(featuredList.Count, Is.EqualTo(1));
    Assert.That(featuredList[0].Id, Is.EqualTo(featured.Id));
  }

  [Test]
  public async Task Create_without_user_returns_unauthorized()
  {
    using var context = BuildContext();
    var controller = BuildController(context, null);

    var result = await controller.Create(BuildDto("Dessert", "Doce"));

    Assert.That(result.Result, Is.InstanceOf<UnauthorizedResult>());
  }

  [Test]
  public async Task Create_keeper_creates_pending_revision_and_no_category()
  {
    using var context = BuildContext();
    var controller = BuildController(context, "keeper-1");

    var result = await controller.Create(BuildDto("Dessert", "Doce"));

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as RecipeCategoryRevisionResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Status, Is.EqualTo(RevisionStatus.PendingReview));
    Assert.That(response.Type, Is.EqualTo(RevisionType.Create));
    Assert.That(response.Original, Is.Null);
    Assert.That(response.Proposed, Is.Not.Null);
    Assert.That(response.Proposed!.Id, Is.EqualTo(0));

    Assert.That(context.RecipeCategory.Count(), Is.EqualTo(0));
    Assert.That(context.RecipeCategoryRevision.Count(), Is.EqualTo(1));
  }

  [Test]
  public async Task Create_admin_creates_category_and_approved_revision()
  {
    using var context = BuildContext();
    var controller = BuildController(context, "admin-1", Role.Admin.ToString());

    var result = await controller.Create(BuildDto("Dessert", "Doce", featured: true));

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as RecipeCategoryRevisionResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Status, Is.EqualTo(RevisionStatus.Approved));
    Assert.That(response.Type, Is.EqualTo(RevisionType.Create));

    var category = context.RecipeCategory.AsNoTracking().First();
    Assert.That(category.Slug, Is.EqualTo("doce"));
    Assert.That(category.Featured, Is.True);
    Assert.That(context.RecipeCategoryRevision.Count(), Is.EqualTo(1));
  }

  [Test]
  public async Task Update_keeper_creates_pending_revision_without_mutating_category()
  {
    using var context = BuildContext();
    var category = SeedCategory(context, "desserts", "Dessert", "Doce", Visibility.Public, false);
    var controller = BuildController(context, "keeper-1");

    var result = await controller.Update(category.Id, BuildDto("Sweet", "Doce", featured: true));

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as RecipeCategoryRevisionResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Status, Is.EqualTo(RevisionStatus.PendingReview));
    Assert.That(response.Type, Is.EqualTo(RevisionType.Update));
    Assert.That(response.Original, Is.Not.Null);
    Assert.That(response.Proposed, Is.Not.Null);

    var stored = context.RecipeCategory.AsNoTracking().First(c => c.Id == category.Id);
    Assert.That(stored.Name.En, Is.EqualTo("Dessert"));
    Assert.That(stored.Featured, Is.False);
  }

  [Test]
  public async Task Update_admin_updates_category_and_returns_approved_revision()
  {
    using var context = BuildContext();
    var category = SeedCategory(context, "desserts", "Dessert", "Doce", Visibility.Public, false);
    var controller = BuildController(context, "admin-1", Role.Admin.ToString());

    var result = await controller.Update(category.Id, BuildDto("Sweet", "Doce", featured: true));

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as RecipeCategoryRevisionResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Status, Is.EqualTo(RevisionStatus.Approved));
    Assert.That(response.Type, Is.EqualTo(RevisionType.Update));

    var stored = context.RecipeCategory.AsNoTracking().First(c => c.Id == category.Id);
    Assert.That(stored.Name.En, Is.EqualTo("Sweet"));
    Assert.That(stored.Featured, Is.True);
  }

  [Test]
  public async Task Delete_keeper_creates_pending_revision_and_keeps_category()
  {
    using var context = BuildContext();
    var category = SeedCategory(context, "desserts", "Dessert", "Doce", Visibility.Public, false);
    var controller = BuildController(context, "keeper-1");

    var result = await controller.Delete(category.Id);

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as RecipeCategoryRevisionResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Status, Is.EqualTo(RevisionStatus.PendingReview));
    Assert.That(response.Type, Is.EqualTo(RevisionType.Delete));
    Assert.That(response.Original, Is.Not.Null);
    Assert.That(response.Proposed, Is.Null);

    Assert.That(context.RecipeCategory.AsNoTracking().Any(c => c.Id == category.Id), Is.True);
  }

  [Test]
  public async Task Delete_admin_removes_category()
  {
    using var context = BuildContext();
    var category = SeedCategory(context, "desserts", "Dessert", "Doce", Visibility.Public, false);
    var controller = BuildController(context, "admin-1", Role.Admin.ToString());

    var result = await controller.Delete(category.Id);

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as RecipeCategoryRevisionResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Status, Is.EqualTo(RevisionStatus.Approved));
    Assert.That(response.Type, Is.EqualTo(RevisionType.Delete));
    Assert.That(context.RecipeCategory.AsNoTracking().Any(c => c.Id == category.Id), Is.False);
  }

  [Test]
  public async Task Approve_revision_creates_category_for_create_request()
  {
    using var context = BuildContext();
    var keeper = BuildController(context, "keeper-1");
    await keeper.Create(BuildDto("Dessert", "Doce"));

    var revision = await context.RecipeCategoryRevision.AsNoTracking().FirstAsync();
    Assert.That(revision.Status, Is.EqualTo(RevisionStatus.PendingReview));

    var admin = BuildController(context, "admin-1", Role.Admin.ToString());
    var result = await admin.ApproveRevision(revision.Id);

    Assert.That(result, Is.InstanceOf<OkResult>());
    var updated = await context.RecipeCategoryRevision.AsNoTracking().FirstAsync(r => r.Id == revision.Id);
    Assert.That(updated.Status, Is.EqualTo(RevisionStatus.Approved));
    Assert.That(context.RecipeCategory.Count(), Is.EqualTo(1));
  }

  [Test]
  public async Task Reject_revision_marks_as_rejected()
  {
    using var context = BuildContext();
    var keeper = BuildController(context, "keeper-1");
    await keeper.Create(BuildDto("Dessert", "Doce"));

    var revision = await context.RecipeCategoryRevision.AsNoTracking().FirstAsync();
    var admin = BuildController(context, "admin-1", Role.Admin.ToString());

    var result = await admin.RejectRevision(revision.Id);

    Assert.That(result, Is.InstanceOf<OkResult>());
    var updated = await context.RecipeCategoryRevision.AsNoTracking().FirstAsync(r => r.Id == revision.Id);
    Assert.That(updated.Status, Is.EqualTo(RevisionStatus.Rejected));
  }
}
