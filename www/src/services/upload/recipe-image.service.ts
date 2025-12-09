export interface RecipeUploadResponse {
  url: string;
  objectName: string;
  width: number;
  height: number;
}

function getApiBase(): string {
  const fromEnv = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  return (fromEnv || 'http://localhost:5106').replace(/\/$/, '');
}

export async function uploadRecipeImage(
  file: File,
  opts?: {
    prefix?: string;
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    nearLossless?: boolean;
    stripMetadata?: boolean;
  },
): Promise<RecipeUploadResponse> {
  const form = new FormData();
  form.append('file', file);
  if (opts?.prefix) form.append('prefix', opts.prefix);
  if (opts?.maxWidth) form.append('maxWidth', String(opts.maxWidth));
  if (opts?.maxHeight) form.append('maxHeight', String(opts.maxHeight));
  if (opts?.quality) form.append('quality', String(opts.quality));
  if (typeof opts?.nearLossless === 'boolean') form.append('nearLossless', String(opts.nearLossless));
  if (typeof opts?.stripMetadata === 'boolean') form.append('stripMetadata', String(opts.stripMetadata));

  const res = await fetch(`${getApiBase()}/api/uploads/recipes`, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Falha no upload da receita: ${res.status} ${text}`);
  }

  return (await res.json()) as RecipeUploadResponse;
}

export async function uploadImageFromUrl(
  imageUrl: string,
  opts?: {
    prefix?: string;
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    nearLossless?: boolean;
    stripMetadata?: boolean;
  },
): Promise<RecipeUploadResponse> {
  const url = (imageUrl || '').trim();
  if (!url) {
    throw new Error('URL da imagem é obrigatória');
  }

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Falha ao baixar imagem: ${res.status} ${text}`);
  }

  const contentType = res.headers.get('content-type') || 'image/jpeg';
  const blob = await res.blob();
  const fileName =
    (url.split('/').pop() || 'image').split('?')[0].split('#')[0] ||
    'image';
  const file = new File([blob], fileName, { type: contentType });

  return uploadRecipeImage(file, opts);
}
