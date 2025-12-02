import type {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';
import type { NutrientDataResponse } from '../nutrient-data/nutrient-data.response';

export interface CommonDataResponse {
  measures: Record<string, LanguageTextAndPlural>;
  foodTypes: Record<string, LanguageText>;
  measurementUnits: Record<string, LanguageTextAndPlural>;
  recipeCategories: Record<
    string,
    LanguageTextAndPlural & { img?: string; url?: string; key?: string }
  >;
  aminoAcids: Record<string, NutrientDataResponse>;
  minerals: Record<string, NutrientDataResponse>;
  vitamins: Record<string, NutrientDataResponse>;
  nutritionalInformation: Record<string, NutrientDataResponse>;
}
