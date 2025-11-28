import { appendAuthHeader } from '@common/services/auth/token.storage';
import type { Food } from '@common/services/food/food.model';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';

function apiBase(): string {
  const base =
    (process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.RECIPES_API_URL ||
      '') as string;
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

export async function searchFoods(
  text: string,
  limit = 25,
): Promise<Food[]> {
  if (!text || !text.trim()) return [];

  const params = new URLSearchParams();
  params.set('text', text.trim());
  params.set('limit', String(limit));

  const res = await fetch(
    `${apiBase()}/api/food/search?${params.toString()}`,
    withAuth(),
  );
  const data = await handleJson<Food[]>(res);
  return Array.isArray(data) ? data : [];
}
