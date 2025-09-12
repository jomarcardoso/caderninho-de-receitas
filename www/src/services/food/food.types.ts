import { Language } from '../language/language.types';
import { Nutrients } from '../nutrients';

export interface FoodTypeBase {
  type: number;
  text: Record<Language, string>;
}

export interface FoodBase extends Nutrients {
  id: number;
  name: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
  keys: Record<Language, string>;
  isRecipe: boolean;
  icon: string;
}
