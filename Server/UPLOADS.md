Azure Blob Upload (Server)

Configure these settings (appsettings.json, appsettings.Development.json or User Secrets):

- `AzureBlob:AccountName`
- `AzureBlob:AccountKey`
- `AzureBlob:Container` (e.g., `images`)
- `AzureBlob:CdnBaseUrl` (optional, if using a CDN/front door; fallback is the blob endpoint)

Endpoint available:

- `POST /api/uploads/sas` body `{ fileName, contentType?, prefix? }`
  - Returns `{ uploadUrl, blobUrl, expiresOn }`
  - Upload the file with `PUT` to `uploadUrl` setting headers:
    - `x-ms-blob-type: BlockBlob`
    - `Content-Type: <file content type>`

