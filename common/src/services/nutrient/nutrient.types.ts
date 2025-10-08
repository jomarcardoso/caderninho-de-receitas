import type { Language } from '../language/language.types';

export interface NutrientBase {
  index: number;
  name: Record<Language, string>;
  shortName: string;
  measurementUnit: string;
}
