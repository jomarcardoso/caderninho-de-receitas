using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using Microsoft.Extensions.Options;
using Server.Options;
using StorageObject = Google.Apis.Storage.v1.Data.Object;

namespace Server.Services;

public class GcsStorageService
{
  private readonly ILogger<GcsStorageService> _logger;
  private readonly GcsOptions _options;
  private readonly StorageClient _client;

  public GcsStorageService(IOptions<GcsOptions> options, ILogger<GcsStorageService> logger)
  {
    _logger = logger;
    _options = options.Value ?? throw new ArgumentNullException(nameof(options));
    if (string.IsNullOrWhiteSpace(_options.BucketName))
    {
      throw new InvalidOperationException("Gcs:BucketName must be configured.");
    }

    _client = CreateClient(_options);
  }

  public async Task<string> UploadAsync(Stream content, string objectName, string contentType, CancellationToken cancellationToken = default)
  {
    ArgumentNullException.ThrowIfNull(content);
    if (string.IsNullOrWhiteSpace(objectName)) throw new ArgumentException("Object name is required", nameof(objectName));

    content.Position = 0;
    var obj = await _client.UploadObjectAsync(new StorageObject
    {
      Bucket = _options.BucketName,
      Name = objectName,
      ContentType = contentType,
      CacheControl = "public, max-age=31536000, immutable"
    }, content, new UploadObjectOptions
    {
      PredefinedAcl = PredefinedObjectAcl.PublicRead
    }, cancellationToken);

    return BuildPublicUrl(obj.Name);
  }

  private StorageClient CreateClient(GcsOptions options)
  {
    if (!string.IsNullOrWhiteSpace(options.CredentialsPath))
    {
      _logger.LogInformation("Initializing GCS client with credentials file at {Path}", options.CredentialsPath);
      var credential = GoogleCredential.FromFile(options.CredentialsPath);
      return StorageClient.Create(credential);
    }

    _logger.LogInformation("Initializing GCS client using default application credentials.");
    return StorageClient.Create();
  }

  private string BuildPublicUrl(string objectName)
  {
    if (!string.IsNullOrWhiteSpace(_options.PublicBaseUrl))
    {
      return $"{_options.PublicBaseUrl.TrimEnd('/')}/{objectName}";
    }

    return $"https://storage.googleapis.com/{_options.BucketName}/{objectName}";
  }
}
