import { appendAuthHeader } from '@common/services/auth/token.storage';

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

function withAuthHeaders(init?: RequestInit): RequestInit {
  const headers = new Headers(init?.headers as HeadersInit | undefined);
  appendAuthHeader(headers);
  return { ...(init ?? {}), headers };
}

export async function fetchPendingRecipes(): Promise<PendingRecipe[]> {
  const res = await fetch(`${API_BASE}/api/Recipe/pending`, withAuthHeaders());
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as PendingRecipe[];
}

export async function approveRecipe(id: number): Promise<void> {
  const res = await fetch(
    `${API_BASE}/api/Recipe/${id}/approve`,
    withAuthHeaders({ method: 'POST' }),
  );
  if (!res.ok) throw new Error(await res.text());
}

export async function denyRecipe(id: number): Promise<void> {
  const res = await fetch(
    `${API_BASE}/api/Recipe/${id}/deny`,
    withAuthHeaders({ method: 'POST' }),
  );
  if (!res.ok) throw new Error(await res.text());
}
