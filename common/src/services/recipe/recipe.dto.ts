import type { RecipeStepDto } from '../recipe-step';
import type { Language } from '../language/language.types';

export interface RecipeDto {
  name: string;
  keys: string;
  description?: string;
  additional?: string;
  steps: RecipeStepDto[];
  language: Language;
  imgs?: string[];
  categories?: string[];
}
