using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NUnit.Framework;
using Server.Services.Auth;

namespace Server.Tests.Services;

[TestFixture]
public class GoogleAuthServiceTests
{
  private FakeValidator validator = null!;
  private GoogleAuthService service = null!;
  private ILoggerFactory loggerFactory = null!;

  [SetUp]
  public void SetUp()
  {
    validator = new FakeValidator();
    loggerFactory = LoggerFactory.Create(static builder => { });
    var configuration = new ConfigurationBuilder()
      .AddInMemoryCollection(new Dictionary<string, string?>
      {
        ["Authentication:Google:ClientId"] = "client-id",
      })
      .Build();

    service = new GoogleAuthService(
      loggerFactory.CreateLogger<GoogleAuthService>(),
      configuration,
      validator.ValidateAsync);
  }

  [TearDown]
  public void TearDown()
  {
    loggerFactory.Dispose();
  }

  [Test]
  public async Task ValidateAsync_ReturnsNull_WhenTokenIsEmpty()
  {
    var result = await service.ValidateAsync(string.Empty);

    Assert.That(result, Is.Null);
    Assert.That(validator.LastToken, Is.Null);
  }

  [Test]
  public async Task ValidateAsync_ReturnsNull_WhenValidatorFails()
  {
    var result = await service.ValidateAsync("token");

    Assert.That(result, Is.Null);
  }

  [Test]
  public async Task ValidateAsync_ReturnsUserInfo_WhenValidatorSucceeds()
  {
    validator.PayloadToReturn = new GoogleJsonWebSignature.Payload
    {
      Subject = "sub",
      Email = "user@email",
      Name = "User",
      Picture = "picture",
      EmailVerified = true
    };

    var result = await service.ValidateAsync("token");

    Assert.That(result, Is.Not.Null);
    Assert.That(result!.Subject, Is.EqualTo("sub"));
    Assert.That(result.Email, Is.EqualTo("user@email"));
    Assert.That(result.Name, Is.EqualTo("User"));
    Assert.That(result.Picture, Is.EqualTo("picture"));
    Assert.That(result.EmailVerified, Is.True);
  }

  [Test]
  public async Task ValidateAsync_UsesConfiguredAudiences()
  {
    await service.ValidateAsync("token");

    Assert.That(validator.LastAudiences, Is.Not.Null);
    Assert.That(validator.LastAudiences, Does.Contain("client-id"));
  }

  [Test]
  public async Task ValidateAsync_ReturnsNull_WhenValidatorThrows()
  {
    validator.ExceptionToThrow = new InvalidOperationException("oops");

    var result = await service.ValidateAsync("token");

    Assert.That(result, Is.Null);
  }

  private sealed class FakeValidator
  {
    public string? LastToken { get; private set; }
    public IReadOnlyList<string>? LastAudiences { get; private set; }
    public GoogleJsonWebSignature.Payload? PayloadToReturn { get; set; }
    public Exception? ExceptionToThrow { get; set; }

    public Task<GoogleJsonWebSignature.Payload?> ValidateAsync(
      string idToken,
      GoogleJsonWebSignature.ValidationSettings settings,
      CancellationToken cancellationToken = default)
    {
      LastToken = idToken;
      LastAudiences = settings.Audience?.ToList();

      if (ExceptionToThrow is not null)
      {
        throw ExceptionToThrow;
      }

      return Task.FromResult(PayloadToReturn);
    }
  }
}
