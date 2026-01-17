import type { Food } from './food.model';
import type { FoodSummary } from './food.response';
import { getApiBase } from '../http/api-base';
import {
  buildFoodListSearchParams,
  normalizeFoodFromResponse,
  type FoodImageSearchResult,
  type FoodListParams,
} from './food.service';

export type FoodApiServerOptions = {
  baseUrl?: string;
  authToken?: string;
  headers?: HeadersInit;
  init?: RequestInit;
  fetcher?: typeof fetch;
};

const API_BASE = (options?: FoodApiServerOptions) =>
  `${(options?.baseUrl ?? getApiBase()).replace(/\/$/, '')}/api/food`;

function buildInit(options?: FoodApiServerOptions): RequestInit {
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
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function listFoods(
  params: FoodListParams = {},
  options?: FoodApiServerOptions,
): Promise<FoodSummary[]> {
  const sp = buildFoodListSearchParams(params);
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(
    `${API_BASE(options)}${sp.toString() ? `?${sp}` : ''}`,
    buildInit(options),
  );
  const data = await handleJson<FoodSummary[]>(res);
  return Array.isArray(data) ? data : [];
}

export async function searchFoods(
  text: string,
  limit = 20,
  categories?: string[] | string,
  options?: FoodApiServerOptions,
): Promise<FoodSummary[]> {
  const trimmed = text?.trim();
  const hasCategories =
    (Array.isArray(categories) && categories.length > 0) ||
    (typeof categories === 'string' && categories.trim().length > 0);
  if (!trimmed && !hasCategories) return [];
  return listFoods({ text: trimmed, categories, limit }, options);
}

export async function searchFoodImages(
  text: string,
  limit = 20,
  options?: FoodApiServerOptions,
): Promise<FoodImageSearchResult[]> {
  if (!text || !text.trim()) return [];

  const params = new URLSearchParams();
  params.set('text', text.trim());
  params.set('limit', String(limit));

  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(
    `${API_BASE(options)}/search-images?${params.toString()}`,
    buildInit(options),
  );
  return await handleJson<FoodImageSearchResult[]>(res);
}

export async function fetchFoodById(
  id: number,
  options?: FoodApiServerOptions,
): Promise<Food | null> {
  if (!id || id <= 0) return null;
  const fetcher = options?.fetcher ?? fetch;
  const res = await fetcher(`${API_BASE(options)}/${id}`, buildInit(options));
  const data = await handleJson<Food>(res);
  if (!data) return null;
  return normalizeFoodFromResponse(data);
}

export type { FoodImageSearchResult, FoodListParams } from './food.service';
