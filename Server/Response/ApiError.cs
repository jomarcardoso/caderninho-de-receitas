using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Response;

/// <summary>
/// Standard error envelope for API responses (similar to RFC 7807 / Problem Details).
/// </summary>
public class ApiError
{
  public string? Type { get; set; }
  public string? Title { get; set; }
  public int Status { get; set; }
  public string? Detail { get; set; }
  public string? Instance { get; set; }

  /// <summary>
  /// Stable, short domain code (e.g., "food.not_found", "recipe.validation_failed").
  /// </summary>
  public string? Code { get; set; }

  /// <summary>
  /// Request/trace identifier for correlating with logs.
  /// </summary>
  public string? CorrelationId { get; set; }

  /// <summary>
  /// Optional field-level errors (e.g., validation issues).
  /// </summary>
  public Dictionary<string, string[]> Errors { get; set; } = new();
}
