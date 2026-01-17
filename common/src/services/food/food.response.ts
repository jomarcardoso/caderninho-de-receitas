import type { LanguageText } from '../language/language.types';
import type { Food as FoodModel } from './food.model';

export type Food = FoodModel;

export interface FoodSummary {
  id: number;
  name: LanguageText;
  icon?: string | { url?: string } | string[] | null;
  imgs: string[];
}
