import { appendAuthHeader } from '@common/services/auth/token.storage';
import type { Food } from '@common/services/food/food.model';
import {
  AMINO_ACIDS_FALLBACK,
  MINERALS_FALLBACK,
  NUTRITIONAL_INFO_FALLBACK,
  VITAMINS_FALLBACK,
  mapRecordToNutrients,
} from '@common/services/nutrient/fallback';
import type { LanguageText, LanguageTextAndPlural } from '@common/services/language/language.types';

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
  if (!Array.isArray(data)) return [];
  return data.map(normalizeFoodFromSearch);
}

export interface FoodImageSearchResult {
  foodId: number;
  name?: string;
  imgs: string[];
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
    `${apiBase()}/api/food/search-images?${params.toString()}`,
    withAuth(),
  );
  return await handleJson<FoodImageSearchResult[]>(res);
}

const DEFAULT_MEASUREMENT_UNIT: LanguageTextAndPlural = {
  text: { en: 'gram', pt: 'grama' } as LanguageText,
  pluralText: { en: 'grams', pt: 'gramas' } as LanguageText,
};

function normalizeFoodFromSearch(raw: any): Food {
  const typeText = typeof raw?.type === 'string' ? raw.type : 'food';
  const measurementUnit =
    typeof raw?.measurementUnit === 'object'
      ? (raw.measurementUnit as LanguageTextAndPlural)
      : DEFAULT_MEASUREMENT_UNIT;

  return {
    ...(raw as any),
    type:
      typeof raw?.type === 'object'
        ? raw.type
        : ({ en: typeText, pt: typeText } as LanguageText),
    measurementUnit,
    measures: Array.isArray(raw?.measures) ? raw.measures : [],
    nutritionalInformation: mapRecordToNutrients(
      raw?.nutritionalInformation,
      NUTRITIONAL_INFO_FALLBACK,
    ),
    minerals: mapRecordToNutrients(raw?.minerals, MINERALS_FALLBACK),
    vitamins: mapRecordToNutrients(raw?.vitamins, VITAMINS_FALLBACK),
    aminoAcids: mapRecordToNutrients(raw?.aminoAcids, AMINO_ACIDS_FALLBACK),
  } as Food;
}
