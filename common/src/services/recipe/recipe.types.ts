import { type Language } from '../language/language.types';

export interface RecipeContract<TRecipeStep> {
  id?: number;
  name: string;
  description?: string;
  additional?: string;
  steps: TRecipeStep[];
  language: Language;
  imgs?: string[];
  // Recipe category keys (EN enum keys from backend)
  categories?: string[];
}

export interface RecipeBase<TRecipeStep> extends RecipeContract<TRecipeStep> {
  userId?: number;
  imgs?: string[];
  savedByOthersCount?: number;
  isPublic?: boolean;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// export type SetRecipe = (recipe: RecipeBase) => number;
