import type { Food } from './food.model';
import {
  AMINO_ACIDS_FALLBACK,
  MINERALS_FALLBACK,
  NUTRITIONAL_INFO_FALLBACK,
  VITAMINS_FALLBACK,
  mapRecordToNutrients,
} from '../nutrient/fallback';
import type {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';

export type FoodListParams = {
  text?: string;
  categories?: string[] | string;
  limit?: number;
};

export interface FoodImageSearchResult {
  foodId: number;
  name?: string;
  imgs: string[];
}

const DEFAULT_MEASUREMENT_UNIT: LanguageTextAndPlural = {
  text: { en: 'gram', pt: 'grama' } as LanguageText,
  pluralText: { en: 'grams', pt: 'gramas' } as LanguageText,
};

export function buildFoodListSearchParams(
  params: FoodListParams = {},
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
    sp.set('quantity', String(clamped));
    sp.set('limit', String(clamped));
  }

  return sp;
}

export function normalizeFoodFromResponse(raw: any): Food {
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
