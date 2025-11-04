export interface SasResponse {
  uploadUrl: string;
  blobUrl: string;
  expiresOn: string;
}

function getApiBase(): string {
  // Prefer env, fallback to server default used in Program.cs
  const fromEnv = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  return (fromEnv || 'http://localhost:5106').replace(/\/$/, '');
}

export async function requestSas(fileName: string, contentType?: string, prefix?: string): Promise<SasResponse> {
  const res = await fetch(`${getApiBase()}/api/uploads/sas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, contentType, prefix }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Falha ao obter SAS: ${res.status} ${text}`);
  }

  return (await res.json()) as SasResponse;
}

export async function uploadWithSas(uploadUrl: string, file: File): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'x-ms-blob-type': 'BlockBlob',
      'Content-Type': file.type || 'application/octet-stream',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Falha no upload: ${res.status} ${text}`);
  }
}

export async function uploadImageToAzure(file: File, opts?: { prefix?: string }): Promise<string> {
  const { uploadUrl, blobUrl } = await requestSas(file.name, file.type, opts?.prefix);
  await uploadWithSas(uploadUrl, file);
  return blobUrl;
}

