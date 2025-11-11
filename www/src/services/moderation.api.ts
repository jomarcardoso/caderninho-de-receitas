const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5106').replace(/\/$/, '');

export type PendingRecipe = {
  id: number;
  name: string;
  imgs?: string[];
  description?: string;
  ownerId: string;
  isPublic: boolean;
  verified: boolean;
  createdAt: string;
};

export async function fetchPendingRecipes(): Promise<PendingRecipe[]> {
  const res = await fetch(`${API_BASE}/api/Recipe/pending`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as PendingRecipe[];
}

export async function approveRecipe(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/Recipe/${id}/approve`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
}

export async function denyRecipe(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/Recipe/${id}/deny`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
}

