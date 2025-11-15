// Lightweight service for Recipe Lists (frontend www)
// Matches Server/Controllers/RecipeListsController.cs endpoints

export type RecipeListItem = {
  recipeListId: number;
  recipeId: number;
  position: number;
  createdAt: string;
  // Optional expanded recipe when returned by GET /api/RecipeLists/{id}
  recipe?: {
    id: number;
    name: string;
    description?: string | null;
    imgs?: string[];
  };
};

export type RecipeList = {
  id: number;
  ownerId: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  items?: RecipeListItem[];
};

function apiBase(): string {
  const base =
    (process.env.RECIPES_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '')
      .toString()
      .trim();
  return (base || 'http://localhost:5106').replace(/\/$/, '');
}

async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function getRecipeLists(): Promise<RecipeList[]> {
  await ensureOwnerCookie();
  const res = await fetch(`${apiBase()}/api/RecipeLists`, {
    credentials: 'include',
  });
  return handleJson<RecipeList[]>(res);
}

export async function getRecipeList(id: number): Promise<RecipeList | null> {
  await ensureOwnerCookie();
  const res = await fetch(`${apiBase()}/api/RecipeLists/${id}`, {
    credentials: 'include',
  });
  if (res.status === 404) return null;
  return handleJson<RecipeList>(res);
}

export async function createRecipeList(
  name: string,
  description?: string,
): Promise<RecipeList> {
  await ensureOwnerCookie();
  const res = await fetch(`${apiBase()}/api/RecipeLists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, description }),
  });
  return handleJson<RecipeList>(res);
}

export async function updateRecipeList(
  id: number,
  payload: { name?: string; description?: string | null },
): Promise<RecipeList> {
  await ensureOwnerCookie();
  const res = await fetch(`${apiBase()}/api/RecipeLists/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  return handleJson<RecipeList>(res);
}

export async function deleteRecipeList(id: number): Promise<boolean> {
  await ensureOwnerCookie();
  const res = await fetch(`${apiBase()}/api/RecipeLists/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (res.status === 404) return false;
  await handleJson<{ deleted: boolean }>(res);
  return true;
}

export async function addRecipeToList(
  listId: number,
  recipeId: number,
): Promise<boolean> {
  await ensureOwnerCookie();
  const res = await fetch(`${apiBase()}/api/RecipeLists/${listId}/recipes/${recipeId}`, {
    method: 'POST',
    credentials: 'include',
  });
  if (res.status === 404) return false;
  const data = await handleJson<{ added?: boolean }>(res);
  return Boolean(data?.added ?? true);
}

export async function removeRecipeFromList(
  listId: number,
  recipeId: number,
): Promise<boolean> {
  await ensureOwnerCookie();
  const res = await fetch(`${apiBase()}/api/RecipeLists/${listId}/recipes/${recipeId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (res.status === 404) return false;
  const data = await handleJson<{ removed?: boolean }>(res);
  return Boolean(data?.removed ?? true);
}

import { ensureOwnerCookie } from '@common/services/auth/owner.util';
