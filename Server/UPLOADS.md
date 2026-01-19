Uploads (GCS)

Configure these settings (appsettings.json, appsettings.Development.json or User Secrets):

- `Gcs:BucketName`
- `Gcs:CredentialsPath`
- `Gcs:PublicBaseUrl` (optional)

Endpoints available:

- `POST /api/uploads/recipes` (multipart form)
  - Returns `{ url, objectName, width, height }`
- `POST /api/uploads/icons` (multipart form)
  - Returns `{ url, objectName }`
- `POST /api/uploads/optimize-webp` (multipart form)
