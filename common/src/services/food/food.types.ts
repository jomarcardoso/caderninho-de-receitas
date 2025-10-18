import { type Language } from '../language/language.types';

export interface FoodBase {
  id: number;
  name: Record<Language, string>;
  description: Record<Language, string>;
  imgs: string[];
  keys: Record<Language, string>;
  isRecipe: boolean;
  icon: string;
}
