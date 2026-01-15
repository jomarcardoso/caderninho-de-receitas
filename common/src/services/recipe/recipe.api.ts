import { getApiBase } from '../http/api-base';
import { httpRequest } from '../http/http-client';
import type { Category } from '../common/common.model';
import type { RecipeDto } from './recipe.dto';
import { RecipeSummary } from '@/components/recipe-lists/recipe-lists';

const API_BASE = () => `${getApiBase()}/api/recipe`;

export async function listMyRecipes(): Promise<RecipeSummary[]> {
  const res = await httpRequest<RecipeSummary[]>({
    url: API_BASE(),
    method: 'GET',
  });
  return res.data;
}

export async function getRecipeById(
  id: number,
  opts?: {
    relatedRecipesLimit?: number;
    relatedRecipesExcludeSameOwner?: boolean;
    shareToken?: string;
    authToken?: string;
  },
): Promise<Recipe> {
  const params = new URLSearchParams();
  if (opts?.relatedRecipesLimit !== undefined)
    params.set('count', String(opts.relatedRecipesLimit));
  if (opts?.relatedRecipesExcludeSameOwner !== undefined)
    params.set(
      'excludeSameOwner',
      opts.relatedRecipesExcludeSameOwner ? 'true' : 'false',
    );
  if (opts?.shareToken) params.set('shareToken', opts.shareToken);

  const headers = opts?.authToken
    ? {
        Authorization: `Bearer ${opts.authToken}`,
        Accept: 'application/json',
      }
    : undefined;
  const res = await httpRequest<Recipe>({
    url: `${API_BASE()}/${id}${params.toString() ? `?${params}` : ''}`,
    method: 'GET',
    skipAuth: opts?.authToken ? true : !opts?.shareToken,
    headers,
  });
  return res.data;
}

export async function searchRecipes(params: {
  text?: string;
  categories?: string[];
  limit?: number;
}): Promise<Recipe[]> {
  const sp = new URLSearchParams();
  if (params.text) sp.set('text', params.text);
  if (params.categories?.length)
    sp.set('categories', params.categories.join(','));
  if (params.limit !== undefined) sp.set('quantity', String(params.limit));

  const res = await httpRequest<Recipe[]>({
    url: `${API_BASE()}/search${sp.toString() ? `?${sp}` : ''}`,
    method: 'GET',
    skipAuth: true,
  });
  return res.data;
}

export async function createRecipe(dto: RecipeDto): Promise<Recipe> {
  const res = await httpRequest<Recipe>({
    url: API_BASE(),
    method: 'POST',
    data: dto,
  });
  return res.data;
}

export async function createRecipes(dtos: RecipeDto[]): Promise<Recipe[]> {
  const res = await httpRequest<Recipe[]>({
    url: `${API_BASE()}/many`,
    method: 'POST',
    data: dtos,
  });
  return res.data;
}

export async function updateRecipe(
  id: number,
  dto: RecipeDto,
): Promise<Recipe> {
  const res = await httpRequest<Recipe>({
    url: `${API_BASE()}/${id}`,
    method: 'PUT',
    data: dto,
  });
  return res.data;
}

export async function deleteRecipe(id: number): Promise<void> {
  await httpRequest<void>({
    url: `${API_BASE()}/${id}`,
    method: 'DELETE',
  });
}

export async function getRecipeCategories(): Promise<Category[]> {
  const res = await httpRequest<Category[]>({
    url: `${API_BASE()}/categories`,
    method: 'GET',
    skipAuth: true,
  });
  return res.data;
}

export async function listPendingRecipes(): Promise<Recipe[]> {
  const res = await httpRequest<Recipe[]>({
    url: `${API_BASE()}/pending`,
    method: 'GET',
  });
  return res.data;
}

export async function approveRecipe(id: number): Promise<void> {
  await httpRequest<void>({
    url: `${API_BASE()}/${id}/approve`,
    method: 'POST',
  });
}

export async function denyRecipe(id: number): Promise<void> {
  await httpRequest<void>({
    url: `${API_BASE()}/${id}/deny`,
    method: 'POST',
  });
}

export async function rebuildRecipeRelations(
  topPerRecipe = 10,
): Promise<{ created: number }> {
  const res = await httpRequest<{ created: number }>({
    url: `${API_BASE()}/relations/rebuild?topPerRecipe=${Math.max(
      1,
      Math.min(topPerRecipe, 50),
    )}`,
    method: 'POST',
  });
  return res.data;
}

export async function getMostCopiedRecipes(
  limit = 6,
): Promise<RecipeSummary[]> {
  const res = await httpRequest<RecipeSummary[]>({
    url: `${API_BASE()}/most-copied?quantity=${limit}`,
    method: 'GET',
    skipAuth: true,
  });
  return res.data;
}
