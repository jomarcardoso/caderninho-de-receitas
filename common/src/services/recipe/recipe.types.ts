import { type Language } from '../language/language.types';

export interface RecipeContract<TRecipeStep> {
  id?: number;
  name: string;
  description?: string;
  additional?: string;
  steps: TRecipeStep[];
  language: Language;
  imgs?: string[];
  // category: RecipeCategory | '';
}

export interface RecipeBase<TRecipeStep> extends RecipeContract<TRecipeStep> {
  userId?: number;
  imgs?: string[];
  savedByOthersCount?: number;
}

// export type SetRecipe = (recipe: RecipeBase) => number;
