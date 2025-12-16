import { type Language } from '../language/language.types';

export interface FoodBase {
  id: number;
  name: Record<Language, string>;
  description: Record<Language, string>;
  imgs: string[];
  keys: Record<Language, string>;
  isRecipe: boolean;
  // New: numeric id referencing FoodIcon entity
  iconId?: number;
  // Icon sources list (data:URI or URLs) or inline object when coming directly from the API relation. If empty, UI may fallback to imgs
  icon: string[] | import('./food.response').FoodIconResponse | null;
  categories?: string[];
}
