import type { Food } from './food.model';
import type { FoodSummary } from './food.response';
import { appendAuthHeader } from '../auth/token.storage';
import { getApiBase } from '../http/api-base';
import {
  buildFoodListSearchParams,
  normalizeFoodFromResponse,
  type FoodImageSearchResult,
  type FoodListParams,
} from './food.service';

const API_BASE = () => `${getApiBase()}/api/food`;

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

export async function listFoods(
  params: FoodListParams = {},
): Promise<FoodSummary[]> {
  const sp = buildFoodListSearchParams(params);
  const res = await fetch(
    `${API_BASE()}${sp.toString() ? `?${sp}` : ''}`,
    withAuth(),
  );
  const data = await handleJson<FoodSummary[]>(res);
  return Array.isArray(data) ? data : [];
}

export async function searchFoods(
  text: string,
  limit = 20,
  categories?: string[] | string,
): Promise<FoodSummary[]> {
  const trimmed = text?.trim();
  const hasCategories =
    (Array.isArray(categories) && categories.length > 0) ||
    (typeof categories === 'string' && categories.trim().length > 0);
  if (!trimmed && !hasCategories) return [];
  return listFoods({ text: trimmed, categories, limit });
}

export async function searchFoodImages(
  text: string,
  limit = 20,
): Promise<FoodImageSearchResult[]> {
  if (!text || !text.trim()) return [];

  const params = new URLSearchParams();
  params.set('text', text.trim());
  params.set('limit', String(limit));

  const res = await fetch(
    `${API_BASE()}/search-images?${params.toString()}`,
    withAuth(),
  );
  return await handleJson<FoodImageSearchResult[]>(res);
}

export async function fetchFoodById(id: number): Promise<Food | null> {
  if (!id || id <= 0) return null;
  const res = await fetch(`${API_BASE()}/${id}`, withAuth());
  const data = await handleJson<Food>(res);
  if (!data) return null;
  return normalizeFoodFromResponse(data);
}

export type { FoodImageSearchResult, FoodListParams } from './food.service';
