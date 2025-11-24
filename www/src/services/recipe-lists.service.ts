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

import { appendAuthHeader } from '@common/services/auth/token.storage';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';

function apiBase(): string {
  const base =
    (process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.RECIPES_API_URL ||
      '')
      .toString()
      .trim();
  return (base || DEFAULT_API_BASE_URL).replace(/\/$/, '');
}

function withAuth(init?: RequestInit): RequestInit {
  const headers = new Headers(init?.headers as HeadersInit | undefined);
  appendAuthHeader(headers);
  return { ...(init ?? {}), headers };
}

async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function getRecipeLists(): Promise<RecipeList[]> {
  const res = await fetch(`${apiBase()}/api/RecipeLists`, withAuth());
  return handleJson<RecipeList[]>(res);
}

export async function getRecipeList(id: number): Promise<RecipeList | null> {
  const res = await fetch(`${apiBase()}/api/RecipeLists/${id}`, withAuth());
  if (res.status === 404) return null;
  return handleJson<RecipeList>(res);
}

export async function createRecipeList(
  name: string,
  description?: string,
): Promise<RecipeList> {
  const res = await fetch(
    `${apiBase()}/api/RecipeLists`,
    withAuth({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    }),
  );
  return handleJson<RecipeList>(res);
}

export async function updateRecipeList(
  id: number,
  payload: { name?: string; description?: string | null },
): Promise<RecipeList> {
  const res = await fetch(
    `${apiBase()}/api/RecipeLists/${id}`,
    withAuth({
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
  );
  return handleJson<RecipeList>(res);
}

export async function deleteRecipeList(id: number): Promise<boolean> {
  const res = await fetch(
    `${apiBase()}/api/RecipeLists/${id}`,
    withAuth({ method: 'DELETE' }),
  );
  if (res.status === 404) return false;
  await handleJson<{ deleted: boolean }>(res);
  return true;
}

export async function addRecipeToList(
  listId: number,
  recipeId: number,
): Promise<boolean> {
  const res = await fetch(
    `${apiBase()}/api/RecipeLists/${listId}/recipes/${recipeId}`,
    withAuth({ method: 'POST' }),
  );
  if (res.status === 404) return false;
  const data = await handleJson<{ added?: boolean }>(res);
  return Boolean(data?.added ?? true);
}

export async function removeRecipeFromList(
  listId: number,
  recipeId: number,
): Promise<boolean> {
  const res = await fetch(
    `${apiBase()}/api/RecipeLists/${listId}/recipes/${recipeId}`,
    withAuth({ method: 'DELETE' }),
  );
  if (res.status === 404) return false;
  const data = await handleJson<{ removed?: boolean }>(res);
  return Boolean(data?.removed ?? true);
}
