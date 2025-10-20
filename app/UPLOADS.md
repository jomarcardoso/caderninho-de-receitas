Azure Blob Upload (App)

- Configure `VITE_API_BASE_URL` in an `.env` file for the app (example: `https://localhost:5173`).
- Use `uploadImageToAzure(file, { prefix })` from `src/services/upload/azure-blob.service.ts` to upload images and get the public URL.
- Alternatively, use the `UploadButton` component from `src/components/upload-button/upload-button.tsx`.

Example:

```
import { uploadImageToAzure } from './src/services/upload/azure-blob.service';

async function handle(file) {
  const url = await uploadImageToAzure(file, { prefix: 'recipes' });
  console.log('Imagem publicada em:', url);
}
```

