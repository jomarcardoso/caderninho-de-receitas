using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Server.Models;

namespace Server.Tests;

public class AppDbContextModelTests
{
  [Test]
  public void OnModelCreating_does_not_create_shadow_revision_fks()
  {
    var options = new DbContextOptionsBuilder<AppDbContext>()
      .UseInMemoryDatabase(Guid.NewGuid().ToString())
      .Options;

    using var context = new AppDbContext(options);
    var entityType = context.Model.FindEntityType(typeof(UserProfile));

    Assert.That(entityType, Is.Not.Null);

    var shadowNames = entityType!.GetProperties()
      .Where(p => p.IsShadowProperty())
      .Select(p => p.Name)
      .ToList();

    Assert.That(shadowNames, Does.Not.Contain("LatestRevisionId1"));
    Assert.That(shadowNames, Does.Not.Contain("PublishedRevisionId1"));
  }
}
