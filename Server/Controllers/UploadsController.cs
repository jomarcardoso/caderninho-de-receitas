using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadsController : ControllerBase
{
  private readonly AzureBlobSasService sasService;

  public UploadsController(AzureBlobSasService sasService)
  {
    this.sasService = sasService;
  }

  public class SasRequest
  {
    public string FileName { get; set; } = string.Empty;
    public string? ContentType { get; set; }
    public string? Prefix { get; set; }
  }

  public record SasResponse(string UploadUrl, string BlobUrl, DateTimeOffset ExpiresOn);

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
}

