using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Server.Controllers;
using Server.Dtos;
using Server.Models;
using Server.Response;
using Server.Services;
using Server.Shared;

namespace Server.Tests.Controllers;

public class FoodControllerTests
{
  private static AppDbContext BuildContext()
  {
    var options = new DbContextOptionsBuilder<AppDbContext>()
      .UseInMemoryDatabase(Guid.NewGuid().ToString())
      .Options;
    return new RecipeTestAppDbContext(options);
  }

  private static FoodController BuildController(AppDbContext context, string? userId = null, params string[] roles)
  {
    var services = new ServiceCollection();
    services.AddLogging();
    services.AddAutoMapper(cfg => cfg.AddProfile(new MappingProfile()));
    var mapper = services.BuildServiceProvider().GetRequiredService<IMapper>();
    var controller = new FoodController(context, mapper);

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

    controller.ControllerContext = new ControllerContext { HttpContext = httpContext };
    return controller;
  }

  private static FoodDto BuildDto(string nameEn, string namePt, params string[] categories)
  {
    return new FoodDto
    {
      Name = new LanguageText { En = nameEn, Pt = namePt },
      Keys = new LanguageText { En = nameEn.ToLowerInvariant(), Pt = namePt.ToLowerInvariant() },
      Description = new LanguageText { En = string.Empty, Pt = string.Empty },
      Imgs = new List<string> { "img-1" },
      Categories = categories.ToList(),
      MeasurementUnit = MeasurementUnit.Gram,
      Measures = new Measures(),
      Type = FoodType.Solid
    };
  }

  private static Food SeedFood(AppDbContext context, string nameEn, string namePt, params string[] categories)
  {
    var food = new Food
    {
      Name = new LanguageText { En = nameEn, Pt = namePt },
      Keys = new LanguageText { En = nameEn.ToLowerInvariant(), Pt = namePt.ToLowerInvariant() },
      Description = new LanguageText { En = string.Empty, Pt = string.Empty },
      Imgs = new List<string> { "img-1" },
      Categories = categories.ToList(),
      MeasurementUnit = MeasurementUnit.Gram,
      Measures = new Measures(),
      Type = FoodType.Solid
    };
    food.Process();
    context.Food.Add(food);
    context.SaveChanges();
    return food;
  }

  [Test]
  public async Task GetAll_filters_by_text()
  {
    using var context = BuildContext();
    var banana = SeedFood(context, "Banana", "Banana", "Fruit");
    SeedFood(context, "Bread", "Pao", "Bakery");

    var controller = BuildController(context);
    var result = await controller.GetAll("ban", null, 20);

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var payload = ok!.Value as IEnumerable<FoodSummaryResponse>;
    Assert.That(payload, Is.Not.Null);
    var list = payload!.ToList();
    Assert.That(list.Count, Is.EqualTo(1));
    Assert.That(list[0].Id, Is.EqualTo(banana.Id));
  }

  [Test]
  public async Task GetById_returns_ok_for_existing_food()
  {
    using var context = BuildContext();
    var food = SeedFood(context, "Milk", "Leite", "Dairy");

    var controller = BuildController(context);
    var result = await controller.GetById(food.Id);

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var payload = ok!.Value as FoodResponse;
    Assert.That(payload, Is.Not.Null);
    Assert.That(payload!.Id, Is.EqualTo(food.Id));
  }

  [Test]
  public async Task Create_without_user_returns_unauthorized()
  {
    using var context = BuildContext();
    var controller = BuildController(context, null);

    var result = await controller.Create(BuildDto("Banana", "Banana", "Fruit"));

    Assert.That(result.Result, Is.InstanceOf<UnauthorizedResult>());
  }

  [Test]
  public async Task Create_keeper_creates_pending_revision_and_no_food()
  {
    using var context = BuildContext();
    var controller = BuildController(context, "keeper-1");

    var result = await controller.Create(BuildDto("Banana", "Banana", "Fruit"));

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as FoodRevisionResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Status, Is.EqualTo(RevisionStatus.PendingReview));
    Assert.That(response.Type, Is.EqualTo(RevisionType.Create));
    Assert.That(response.Original, Is.Null);
    Assert.That(response.Proposed, Is.Not.Null);
    Assert.That(response.Proposed!.Id, Is.EqualTo(0));

    Assert.That(context.Food.Count(), Is.EqualTo(0));
    Assert.That(context.FoodRevision.Count(), Is.EqualTo(1));
    var revision = context.FoodRevision.AsNoTracking().First();
    Assert.That(revision.FoodId, Is.Null);
  }

  [Test]
  public async Task Create_admin_creates_food_and_approved_revision()
  {
    using var context = BuildContext();
    var controller = BuildController(context, "admin-1", Role.Admin.ToString());

    var result = await controller.Create(BuildDto("Banana", "Banana", "Fruit"));

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as FoodRevisionResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Status, Is.EqualTo(RevisionStatus.Approved));
    Assert.That(response.Type, Is.EqualTo(RevisionType.Create));
    Assert.That(context.Food.Count(), Is.EqualTo(1));
    var revision = context.FoodRevision.AsNoTracking().First();
    Assert.That(revision.FoodId, Is.Not.Null);
  }

  [Test]
  public async Task Update_keeper_creates_pending_revision_without_mutating_food()
  {
    using var context = BuildContext();
    var food = SeedFood(context, "Banana", "Banana", "Fruit");
    var controller = BuildController(context, "keeper-1");

    var result = await controller.Update(food.Id, BuildDto("Banana Updated", "Banana Atualizada", "Fruit"));

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as FoodRevisionResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Status, Is.EqualTo(RevisionStatus.PendingReview));
    Assert.That(response.Type, Is.EqualTo(RevisionType.Update));
    Assert.That(response.Original, Is.Not.Null);
    Assert.That(response.Proposed, Is.Not.Null);
    Assert.That(response.Proposed!.Name.En, Is.EqualTo("Banana Updated"));

    var stored = context.Food.AsNoTracking().First(f => f.Id == food.Id);
    Assert.That(stored.Name.En, Is.EqualTo("Banana"));
  }

  [Test]
  public async Task Update_admin_updates_food_and_returns_approved_revision()
  {
    using var context = BuildContext();
    var food = SeedFood(context, "Banana", "Banana", "Fruit");
    var controller = BuildController(context, "admin-1", Role.Admin.ToString());

    var result = await controller.Update(food.Id, BuildDto("Banana Updated", "Banana Atualizada", "Fruit"));

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as FoodRevisionResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Status, Is.EqualTo(RevisionStatus.Approved));
    Assert.That(response.Type, Is.EqualTo(RevisionType.Update));
    Assert.That(response.Original, Is.Not.Null);
    Assert.That(response.Proposed, Is.Not.Null);

    var stored = context.Food.AsNoTracking().First(f => f.Id == food.Id);
    Assert.That(stored.Name.En, Is.EqualTo("Banana Updated"));
  }

  [Test]
  public async Task Delete_keeper_creates_pending_revision_and_keeps_food()
  {
    using var context = BuildContext();
    var food = SeedFood(context, "Banana", "Banana", "Fruit");
    var controller = BuildController(context, "keeper-1");

    var result = await controller.Delete(food.Id);

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as FoodRevisionResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Status, Is.EqualTo(RevisionStatus.PendingReview));
    Assert.That(response.Type, Is.EqualTo(RevisionType.Delete));
    Assert.That(response.Original, Is.Not.Null);
    Assert.That(response.Proposed, Is.Null);

    Assert.That(context.Food.AsNoTracking().Any(f => f.Id == food.Id), Is.True);
  }

  [Test]
  public async Task Delete_admin_removes_food()
  {
    using var context = BuildContext();
    var food = SeedFood(context, "Banana", "Banana", "Fruit");
    var controller = BuildController(context, "admin-1", Role.Admin.ToString());

    var result = await controller.Delete(food.Id);

    var ok = result.Result as OkObjectResult;
    Assert.That(ok, Is.Not.Null);
    var response = ok!.Value as FoodRevisionResponse;
    Assert.That(response, Is.Not.Null);
    Assert.That(response!.Status, Is.EqualTo(RevisionStatus.Approved));
    Assert.That(response.Type, Is.EqualTo(RevisionType.Delete));
    Assert.That(context.Food.AsNoTracking().Any(f => f.Id == food.Id), Is.False);
  }

  [Test]
  public async Task Approve_revision_creates_food_for_create_request()
  {
    using var context = BuildContext();
    var keeper = BuildController(context, "keeper-1");
    await keeper.Create(BuildDto("Banana", "Banana", "Fruit"));

    var revision = await context.FoodRevision.AsNoTracking().FirstAsync();
    Assert.That(revision.Status, Is.EqualTo(RevisionStatus.PendingReview));

    var admin = BuildController(context, "admin-1", Role.Admin.ToString());
    var result = await admin.ApproveRevision(revision.Id);

    Assert.That(result, Is.InstanceOf<OkResult>());
    var updated = await context.FoodRevision.AsNoTracking().FirstAsync(r => r.Id == revision.Id);
    Assert.That(updated.Status, Is.EqualTo(RevisionStatus.Approved));
    Assert.That(context.Food.Count(), Is.EqualTo(1));
  }

  [Test]
  public async Task Reject_revision_marks_as_rejected()
  {
    using var context = BuildContext();
    var keeper = BuildController(context, "keeper-1");
    await keeper.Create(BuildDto("Banana", "Banana", "Fruit"));

    var revision = await context.FoodRevision.AsNoTracking().FirstAsync();
    var admin = BuildController(context, "admin-1", Role.Admin.ToString());

    var result = await admin.RejectRevision(revision.Id);

    Assert.That(result, Is.InstanceOf<OkResult>());
    var updated = await context.FoodRevision.AsNoTracking().FirstAsync(r => r.Id == revision.Id);
    Assert.That(updated.Status, Is.EqualTo(RevisionStatus.Rejected));
  }
}
