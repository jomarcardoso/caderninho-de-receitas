import type { Recipe, RecipeCategory, RecipeSummary } from './recipe.model';
import type { RecipeDto } from './recipe.dto';
import { getApiBase } from '../http/api-base';

export type RecipeApiServerOptions = {
  baseUrl?: string;
  authToken?: string;
  headers?: HeadersInit;
  init?: RequestInit;
  fetcher?: typeof fetch;
};

export type RecipeSearchParams = {
  text?: string;
  categories?: string[] | string;
  limit?: number;
};

export type RecipeGetByIdOptions = {
  relatedRecipesLimit?: number;
  relatedRecipesExcludeSameOwner?: boolean;
  shareToken?: string;
};

const API_BASE = (options?: RecipeApiServerOptions) =>
  `${(options?.baseUrl ?? getApiBase()).replace(/\/$/, '')}/api/recipe`;

function buildInit(options?: RecipeApiServerOptions): RequestInit {
  const init = { ...(options?.init ?? {}) };
  const headers = new Headers(init.headers as HeadersInit | undefined);

  if (options?.headers) {
    const extra = new Headers(options.headers);
    extra.forEach((value, key) => headers.set(key, value));
  }

  if (options?.authToken && !headers.has('authorization')) {
    headers.set('authorization', `Bearer ${options.authToken}`);
  }

  return { ...init, headers };
}

async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const error = new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    (error as { status?: number; body?: string }).status = res.status;
    (error as { status?: number; body?: string }).body = text;
    throw error;
  }
  return (await res.json()) as T;
}

async function ensureOk(res: Response): Promise<void> {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const error = new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    (error as { status?: number; body?: string }).status = res.status;
    (error as { status?: number; body?: string }).body = text;
    throw error;
  }
}

function buildRecipeSearchParams(
  params: RecipeSearchParams = {},
): URLSearchParams {
  const sp = new URLSearchParams();
  const text = params.text?.trim();
  if (text) sp.set('text', text);

  if (Array.isArray(params.categories)) {
    const cleaned = params.categories
      .map((c) => (typeof c === 'string' ? c.trim() : ''))
      .filter(Boolean);
    if (cleaned.length) sp.set('categories', cleaned.join(','));
  } else if (typeof params.categories === 'string') {
    const trimmed = params.categories.trim();
    if (trimmed) sp.set('categories', trimmed);
  }

  if (typeof params.limit === 'number' && Number.isFinite(params.limit)) {
    const clamped = Math.max(1, Math.min(Math.trunc(params.limit), 64));
    sp.set('limit', String(clamped));
    sp.set('quantity', String(clamped));
  }

  return sp;
}

function buildRecipeDetailsParams(
  opts?: RecipeGetByIdOptions,
): URLSearchParams {
  const sp = new URLSearchParams();
  if (opts?.shareToken) sp.set('shareToken', opts.shareToken);

  if (
    typeof opts?.relatedRecipesLimit === 'number' &&
    Number.isFinite(opts.relatedRecipesLimit)
  ) {
    const clamped = Math.max(1, Math.min(Math.trunc(opts.relatedRecipesLimit), 5));
    sp.set('relatedRecipesLimit', String(clamped));
    sp.set('count', String(clamped));
  }

  if (typeof opts?.relatedRecipesExcludeSameOwner === 'boolean') {
    const value = opts.relatedRecipesExcludeSameOwner ? 'true' : 'false';
    sp.set('relatedRecipesExcludeSameOwner', value);
    sp.set('excludeSameOwner', value);
  }

  return sp;
}

export async function listMyRecipes(
  options?: RecipeApiServerOptions,
): Promise<RecipeSummary[]> {
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(API_BASE(options), buildInit(options));
  const data = await handleJson<RecipeSummary[]>(res);
  return Array.isArray(data) ? data : [];
}

export async function getRecipeById(
  id: number,
  opts?: RecipeGetByIdOptions,
  options?: RecipeApiServerOptions,
): Promise<Recipe> {
  const params = buildRecipeDetailsParams(opts);
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(
    `${API_BASE(options)}/${id}${params.toString() ? `?${params}` : ''}`,
    buildInit(options),
  );
  return await handleJson<Recipe>(res);
}

export async function searchRecipes(
  params: RecipeSearchParams,
  options?: RecipeApiServerOptions,
): Promise<Recipe[]> {
  const trimmedText = params.text?.trim();
  const hasCategories =
    (Array.isArray(params.categories) && params.categories.length > 0) ||
    (typeof params.categories === 'string' && params.categories.trim().length > 0);
  if (!trimmedText && !hasCategories) return [];

  const sp = buildRecipeSearchParams(params);
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(
    `${API_BASE(options)}/search${sp.toString() ? `?${sp}` : ''}`,
    buildInit(options),
  );
  const data = await handleJson<Recipe[]>(res);
  return Array.isArray(data) ? data : [];
}

export async function createRecipe(
  dto: RecipeDto,
  options?: RecipeApiServerOptions,
): Promise<Recipe> {
  const init = buildInit(options);
  const headers = new Headers(init.headers as HeadersInit | undefined);
  if (!headers.has('content-type'))
    headers.set('content-type', 'application/json');
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(API_BASE(options), {
    ...init,
    method: 'POST',
    headers,
    body: JSON.stringify(dto),
  });
  return await handleJson<Recipe>(res);
}

export async function createRecipes(
  dtos: RecipeDto[],
  options?: RecipeApiServerOptions,
): Promise<Recipe[]> {
  if (!Array.isArray(dtos) || dtos.length === 0) return [];
  const init = buildInit(options);
  const headers = new Headers(init.headers as HeadersInit | undefined);
  if (!headers.has('content-type'))
    headers.set('content-type', 'application/json');
  const body = JSON.stringify(dtos);
  const fetcher = options?.fetcher ?? fetch;

  const res = await fetcher(`${API_BASE(options)}/bulk`, {
    ...init,
    method: 'POST',
    headers,
    body,
  });
  if (res.status === 404) {
    const fallback = await fetcher(`${API_BASE(options)}/many`, {
      ...init,
      method: 'POST',
      headers,
      body,
    });
    return await handleJson<Recipe[]>(fallback);
  }
  return await handleJson<Recipe[]>(res);
}

export async function updateRecipe(
  id: number,
  dto: RecipeDto,
  options?: RecipeApiServerOptions,
): Promise<Recipe> {
  const init = buildInit(options);
  const headers = new Headers(init.headers as HeadersInit | undefined);
  if (!headers.has('content-type'))
    headers.set('content-type', 'application/json');
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(`${API_BASE(options)}/${id}`, {
    ...init,
    method: 'PUT',
    headers,
    body: JSON.stringify(dto),
  });
  return await handleJson<Recipe>(res);
}

export async function deleteRecipe(
  id: number,
  options?: RecipeApiServerOptions,
): Promise<void> {
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(`${API_BASE(options)}/${id}`, {
    ...buildInit(options),
    method: 'DELETE',
  });
  await ensureOk(res);
}

export async function getRecipeCategories(
  options?: RecipeApiServerOptions,
): Promise<RecipeCategory[]> {
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(
    `${API_BASE(options)}/categories`,
    buildInit(options),
  );
  const data = await handleJson<RecipeCategory[]>(res);
  return Array.isArray(data) ? data : [];
}

export async function listPendingRecipes(
  options?: RecipeApiServerOptions,
): Promise<RecipeSummary[]> {
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(`${API_BASE(options)}/pending`, buildInit(options));
  const data = await handleJson<RecipeSummary[]>(res);
  return Array.isArray(data) ? data : [];
}

export async function approveRecipe(
  id: number,
  options?: RecipeApiServerOptions,
): Promise<void> {
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(`${API_BASE(options)}/${id}/approve`, {
    ...buildInit(options),
    method: 'POST',
  });
  await ensureOk(res);
}

export async function denyRecipe(
  id: number,
  options?: RecipeApiServerOptions,
): Promise<void> {
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(`${API_BASE(options)}/${id}/deny`, {
    ...buildInit(options),
    method: 'POST',
  });
  await ensureOk(res);
}

export async function rebuildRecipeRelations(
  topPerRecipe = 10,
  options?: RecipeApiServerOptions,
): Promise<{ created: number }> {
  const clamped = Math.max(1, Math.min(Math.trunc(topPerRecipe), 50));
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(
    `${API_BASE(options)}/relations/rebuild?topPerRecipe=${clamped}`,
    { ...buildInit(options), method: 'POST' },
  );
  return await handleJson<{ created: number }>(res);
}

export async function getMostCopiedRecipes(
  limit = 6,
  options?: RecipeApiServerOptions,
): Promise<RecipeSummary[]> {
  const clamped = Math.max(1, Math.min(Math.trunc(limit), 64));
  const params = new URLSearchParams();
  params.set('limit', String(clamped));
  params.set('quantity', String(clamped));
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(
    `${API_BASE(options)}/most-copied?${params.toString()}`,
    buildInit(options),
  );
  const data = await handleJson<RecipeSummary[]>(res);
  return Array.isArray(data) ? data : [];
}
