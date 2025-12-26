import { type Language } from '../language/language.types';

export interface FoodBase {
  id: number;
  name: Record<Language, string>;
  description: Record<Language, string>;
  imgs: string[];
  keys: Record<Language, string>;
  isRecipe: boolean;
  iconId?: number; // numeric id referencing FoodIcon entity
  icon: string[] | import('./food.response').FoodIconResponse | null;
  categories?: string[];
}

export type FoodType =
  | 'liquid'
  | 'seed'
  | 'herb'
  | 'temper'
  | 'fruit'
  | 'solid'
  | 'oil'
  | 'legumen'
  | 'flake'
  | 'root'
  | 'meat'
  | 'vegetable'
  | 'cake'
  | 'cheese'
  | 'powder'
  | 'starch'
  | 'recipe';
