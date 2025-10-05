import { type Language } from '../language/language.types';

export interface FoodBase {
  id: number;
  name: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
  keys: Record<Language, string>;
  isRecipe: boolean;
  icon: string;
}
