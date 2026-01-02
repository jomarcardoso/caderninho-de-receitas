using Microsoft.EntityFrameworkCore;

namespace Server.Services;

/// <summary>
/// Daily task to clear expired featured profiles.
/// </summary>
public class FeaturedExpiryService : BackgroundService
{
  private readonly IServiceProvider _services;
  private readonly ILogger<FeaturedExpiryService> _logger;

  public FeaturedExpiryService(IServiceProvider services, ILogger<FeaturedExpiryService> logger)
  {
    _services = services;
    _logger = logger;
  }

  protected override async Task ExecuteAsync(CancellationToken stoppingToken)
  {
    // Run once at startup, then every 24h
    while (!stoppingToken.IsCancellationRequested)
    {
      try
      {
        using var scope = _services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var now = DateTime.UtcNow;

        var expired = await db.UserProfile
          .Where(u => u.IsFeatured && u.FeaturedUntil != null && u.FeaturedUntil <= now)
          .ToListAsync(stoppingToken);

        if (expired.Count > 0)
        {
          foreach (var profile in expired)
          {
            profile.IsFeatured = false;
            profile.FeaturedAt = null;
            profile.FeaturedUntil = null;
            profile.UpdatedAtUtc = now;
          }
          await db.SaveChangesAsync(stoppingToken);
          _logger.LogInformation("FeaturedExpiryService: cleared {Count} expired profiles", expired.Count);
        }
      }
      catch (OperationCanceledException)
      {
        // graceful shutdown
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "FeaturedExpiryService: failed while clearing expired featured profiles");
      }

      try
      {
        await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
      }
      catch (OperationCanceledException)
      {
        // shutdown
      }
    }
  }
}
