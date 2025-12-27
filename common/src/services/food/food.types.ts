import { type Language } from '../language/language.types';

export interface Icon {
  id: number;
  name: Record<Language, string>;
  url: string;
  keys: Record<Language, string>;
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
