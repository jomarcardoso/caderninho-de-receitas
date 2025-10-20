using Azure;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;

namespace Server.Services;

public class AzureBlobSasService
{
  private readonly string accountName;
  private readonly string accountKey;
  private readonly string containerName;
  private readonly string? cdnBaseUrl;

  public AzureBlobSasService(IConfiguration configuration)
  {
    accountName = configuration["AzureBlob:AccountName"] ?? string.Empty;
    accountKey = configuration["AzureBlob:AccountKey"] ?? string.Empty;
    containerName = configuration["AzureBlob:Container"] ?? string.Empty;
    cdnBaseUrl = configuration["AzureBlob:CdnBaseUrl"];

    if (string.IsNullOrWhiteSpace(accountName))
      throw new InvalidOperationException("AzureBlob:AccountName must be configured");
    if (string.IsNullOrWhiteSpace(accountKey))
      throw new InvalidOperationException("AzureBlob:AccountKey must be configured");
    if (string.IsNullOrWhiteSpace(containerName))
      throw new InvalidOperationException("AzureBlob:Container must be configured");
  }

  public (Uri uploadUri, Uri publicUri, DateTimeOffset expiresOn) CreateWriteSas(string blobName, string? contentType = null, TimeSpan? lifetime = null)
  {
    lifetime ??= TimeSpan.FromMinutes(10);
    var expiresOn = DateTimeOffset.UtcNow.Add(lifetime.Value);

    // Build a SAS token for the specific blob
    var sasBuilder = new BlobSasBuilder
    {
      BlobContainerName = containerName,
      BlobName = blobName,
      Resource = "b",
      ExpiresOn = expiresOn,
    };
    sasBuilder.SetPermissions(BlobSasPermissions.Create | BlobSasPermissions.Write | BlobSasPermissions.Add);

    if (!string.IsNullOrWhiteSpace(contentType))
    {
      sasBuilder.ContentType = contentType;
    }

    var sasToken = sasBuilder.ToSasQueryParameters(new StorageSharedKeyCredential(accountName, accountKey)).ToString();

    var uploadUriBuilder = new UriBuilder($"https://{accountName}.blob.core.windows.net/{containerName}/{blobName}")
    {
      Query = sasToken
    };

    var publicBase = string.IsNullOrWhiteSpace(cdnBaseUrl)
      ? $"https://{accountName}.blob.core.windows.net/{containerName}"
      : cdnBaseUrl!.TrimEnd('/');

    var publicUri = new Uri($"{publicBase}/{blobName}");

    return (uploadUriBuilder.Uri, publicUri, expiresOn);
  }
}
