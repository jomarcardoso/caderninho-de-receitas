using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Services;
using SixLabors.ImageSharp.Formats.Webp;
using System.Text.RegularExpressions;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadsController : ControllerBase
{
  private readonly AzureBlobSasService sasService;
  private readonly IImageOptimizationService imageOptimization;
  private readonly GcsStorageService gcsStorage;

  public UploadsController(AzureBlobSasService sasService, IImageOptimizationService imageOptimization, GcsStorageService gcsStorage)
  {
    this.sasService = sasService;
    this.imageOptimization = imageOptimization;
    this.gcsStorage = gcsStorage;
  }

  public class SasRequest
  {
    public string FileName { get; set; } = string.Empty;
    public string? ContentType { get; set; }
    public string? Prefix { get; set; }
  }

  public record SasResponse(string UploadUrl, string BlobUrl, DateTimeOffset ExpiresOn);

  public class OptimizeRequest
  {
    public IFormFile? File { get; set; }
    public int? MaxWidth { get; set; }
    public int? MaxHeight { get; set; }
    public int? Quality { get; set; }
    public WebpEncodingMethod? Method { get; set; }
    public bool? NearLossless { get; set; }
    public bool? StripMetadata { get; set; }
  }

  public class RecipeUploadRequest
  {
    public IFormFile? File { get; set; }
    public int? MaxWidth { get; set; }
    public int? MaxHeight { get; set; }
    public int? Quality { get; set; }
    public WebpEncodingMethod? Method { get; set; }
    public bool? NearLossless { get; set; }
    public bool? StripMetadata { get; set; }
    public string? Prefix { get; set; }
  }

  public record RecipeUploadResponse(string Url, string ObjectName, int Width, int Height);

  [HttpPost("sas")]
  [AllowAnonymous]
  [ProducesResponseType(typeof(SasResponse), StatusCodes.Status200OK)]
  public IActionResult CreateSas([FromBody] SasRequest request)
  {
    if (string.IsNullOrWhiteSpace(request.FileName))
    {
      return BadRequest(new { error = "FileName is required" });
    }

    // Normalize blob path: optional prefix/date/user folders could be here
    var safeName = request.FileName.Replace("\\", "/").TrimStart('/')
      .Replace("..", string.Empty);
    var prefix = string.IsNullOrWhiteSpace(request.Prefix)
      ? $"recipes/{DateTime.UtcNow:yyyy/MM/dd}"
      : request.Prefix.Trim('/');
    var blobName = string.IsNullOrWhiteSpace(prefix) ? safeName : $"{prefix}/{safeName}";

    var (uploadUri, publicUri, expiresOn) = sasService.CreateWriteSas(blobName, request.ContentType);
    return Ok(new SasResponse(uploadUri.ToString(), publicUri.ToString(), expiresOn));
  }

  [HttpPost("optimize-webp")]
  [AllowAnonymous]
  [RequestSizeLimit(20 * 1024 * 1024)]
  public async Task<IActionResult> OptimizeWebp([FromForm] OptimizeRequest request, CancellationToken cancellationToken)
  {
    if (request.File is null || request.File.Length == 0)
    {
      return BadRequest(new { error = "File is required" });
    }

    await using var input = request.File.OpenReadStream();
    var validation = await imageOptimization.ValidateAsync(input, cancellationToken);
    if (!validation.IsValid)
    {
      return BadRequest(new { error = validation.Reason });
    }

    var options = new WebpOptions
    {
      Quality = request.Quality ?? 50,
      Method = request.Method ?? WebpEncodingMethod.Default,
      NearLossless = request.NearLossless ?? false,
      StripMetadata = request.StripMetadata ?? true
    };

    var maxWidth = request.MaxWidth ?? 1920;
    var maxHeight = request.MaxHeight ?? 1920;

    var result = await imageOptimization.ResizeAndWebpAsync(input, maxWidth, maxHeight, options, cancellationToken);
    return File(result.Output, result.ContentType);
  }

  [HttpPost("recipes")]
  [RequestSizeLimit(20 * 1024 * 1024)]
  public async Task<IActionResult> UploadRecipe([FromForm] RecipeUploadRequest request, CancellationToken cancellationToken)
  {
    if (request.File is null || request.File.Length == 0)
    {
      return BadRequest(new { error = "File is required" });
    }

    await using var input = request.File.OpenReadStream();
    var validation = await imageOptimization.ValidateAsync(input, cancellationToken);
    if (!validation.IsValid)
    {
      return BadRequest(new { error = validation.Reason });
    }

    var options = new WebpOptions
    {
      Quality = request.Quality ?? 50,
      Method = request.Method ?? WebpEncodingMethod.Default,
      NearLossless = request.NearLossless ?? false,
      StripMetadata = request.StripMetadata ?? true
    };

    var maxWidth = request.MaxWidth ?? 1920;
    var maxHeight = request.MaxHeight ?? 1920;

    var optimized = await imageOptimization.ResizeAndWebpAsync(input, maxWidth, maxHeight, options, cancellationToken);

    var prefix = string.IsNullOrWhiteSpace(request.Prefix)
      ? $"recipes/{DateTime.UtcNow:yyyy/MM/dd}"
      : request.Prefix.Trim('/');

    var baseName = SanitizeFileName(Path.GetFileNameWithoutExtension(request.File.FileName));
    var objectName = $"{prefix}/{baseName}-{Guid.NewGuid():N}.webp";
    var url = await gcsStorage.UploadAsync(optimized.Output, objectName, optimized.ContentType, cancellationToken);

    return Ok(new RecipeUploadResponse(url, objectName, optimized.Width, optimized.Height));
  }

  private static string SanitizeFileName(string? name)
  {
    var fallback = "image";
    if (string.IsNullOrWhiteSpace(name))
    {
      return fallback;
    }

    var normalized = name.Trim().ToLowerInvariant();
    normalized = Regex.Replace(normalized, @"[^a-z0-9\-._]+", "-");
    normalized = Regex.Replace(normalized, @"-+", "-").Trim('-');
    if (normalized.Length > 80)
    {
      normalized = normalized[..80].Trim('-');
    }
    return string.IsNullOrWhiteSpace(normalized) ? fallback : normalized;
  }
}
