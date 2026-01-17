import type { Recipe, RecipeCategory, RecipeSummary } from './recipe.model';
import type { RecipeDto } from './recipe.dto';
import { appendAuthHeader } from '../auth/token.storage';
import { getApiBase } from '../http/api-base';

const API_BASE = () => `${getApiBase()}/api/recipe`;

export type RecipeSearchParams = {
  text?: string;
  categories?: string[] | string;
  limit?: number;
};

export type RecipeGetByIdOptions = {
  relatedRecipesLimit?: number;
  relatedRecipesExcludeSameOwner?: boolean;
  shareToken?: string;
  authToken?: string;
};

function withAuth(init?: RequestInit, authToken?: string): RequestInit {
  const headers = new Headers(init?.headers as HeadersInit | undefined);
  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  } else {
    appendAuthHeader(headers);
  }
  return { ...(init ?? {}), headers };
}

async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

async function ensureOk(res: Response): Promise<void> {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
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

export async function listMyRecipes(): Promise<RecipeSummary[]> {
  const res = await fetch(API_BASE(), withAuth());
  const data = await handleJson<RecipeSummary[]>(res);
  return Array.isArray(data) ? data : [];
}

export async function getRecipeById(
  id: number,
  opts?: RecipeGetByIdOptions,
): Promise<Recipe> {
  const params = buildRecipeDetailsParams(opts);
  const init =
    opts?.authToken
      ? withAuth(undefined, opts.authToken)
      : opts?.shareToken
        ? withAuth()
        : undefined;
  const res = await fetch(
    `${API_BASE()}/${id}${params.toString() ? `?${params}` : ''}`,
    init,
  );
  return await handleJson<Recipe>(res);
}

export async function searchRecipes(
  params: RecipeSearchParams,
): Promise<Recipe[]> {
  const trimmedText = params.text?.trim();
  const hasCategories =
    (Array.isArray(params.categories) && params.categories.length > 0) ||
    (typeof params.categories === 'string' && params.categories.trim().length > 0);
  if (!trimmedText && !hasCategories) return [];

  const sp = buildRecipeSearchParams(params);
  const res = await fetch(
    `${API_BASE()}/search${sp.toString() ? `?${sp}` : ''}`,
  );
  const data = await handleJson<Recipe[]>(res);
  return Array.isArray(data) ? data : [];
}

export async function createRecipe(dto: RecipeDto): Promise<Recipe> {
  const init = withAuth();
  const headers = new Headers(init.headers as HeadersInit | undefined);
  if (!headers.has('Content-Type'))
    headers.set('Content-Type', 'application/json');
  const res = await fetch(API_BASE(), {
    ...init,
    method: 'POST',
    body: JSON.stringify(dto),
    headers,
  });
  return await handleJson<Recipe>(res);
}

export async function createRecipes(dtos: RecipeDto[]): Promise<Recipe[]> {
  if (!Array.isArray(dtos) || dtos.length === 0) return [];
  const init = withAuth();
  const headers = new Headers(init.headers as HeadersInit | undefined);
  if (!headers.has('Content-Type'))
    headers.set('Content-Type', 'application/json');
  const body = JSON.stringify(dtos);

  const res = await fetch(`${API_BASE()}/bulk`, {
    ...init,
    method: 'POST',
    headers,
    body,
  });
  if (res.status === 404) {
    const fallback = await fetch(`${API_BASE()}/many`, {
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
): Promise<Recipe> {
  const init = withAuth();
  const headers = new Headers(init.headers as HeadersInit | undefined);
  if (!headers.has('Content-Type'))
    headers.set('Content-Type', 'application/json');
  const res = await fetch(`${API_BASE()}/${id}`, {
    ...init,
    method: 'PUT',
    headers,
    body: JSON.stringify(dto),
  });
  return await handleJson<Recipe>(res);
}

export async function deleteRecipe(id: number): Promise<void> {
  const res = await fetch(`${API_BASE()}/${id}`, {
    ...withAuth(),
    method: 'DELETE',
  });
  await ensureOk(res);
}

export async function getRecipeCategories(): Promise<RecipeCategory[]> {
  const res = await fetch(`${API_BASE()}/categories`);
  const data = await handleJson<RecipeCategory[]>(res);
  return Array.isArray(data) ? data : [];
}

export async function listPendingRecipes(): Promise<RecipeSummary[]> {
  const res = await fetch(`${API_BASE()}/pending`, withAuth());
  const data = await handleJson<RecipeSummary[]>(res);
  return Array.isArray(data) ? data : [];
}

export async function approveRecipe(id: number): Promise<void> {
  const res = await fetch(`${API_BASE()}/${id}/approve`, {
    ...withAuth(),
    method: 'POST',
  });
  await ensureOk(res);
}

export async function denyRecipe(id: number): Promise<void> {
  const res = await fetch(`${API_BASE()}/${id}/deny`, {
    ...withAuth(),
    method: 'POST',
  });
  await ensureOk(res);
}

export async function rebuildRecipeRelations(
  topPerRecipe = 10,
): Promise<{ created: number }> {
  const clamped = Math.max(1, Math.min(Math.trunc(topPerRecipe), 50));
  const res = await fetch(
    `${API_BASE()}/relations/rebuild?topPerRecipe=${clamped}`,
    { ...withAuth(), method: 'POST' },
  );
  return await handleJson<{ created: number }>(res);
}

export async function getMostCopiedRecipes(
  limit = 6,
): Promise<RecipeSummary[]> {
  const clamped = Math.max(1, Math.min(Math.trunc(limit), 64));
  const params = new URLSearchParams();
  params.set('limit', String(clamped));
  params.set('quantity', String(clamped));

  const res = await fetch(`${API_BASE()}/most-copied?${params.toString()}`);
  const data = await handleJson<RecipeSummary[]>(res);
  return Array.isArray(data) ? data : [];
}
