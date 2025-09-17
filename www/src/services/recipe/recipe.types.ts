export interface RecipeContract<TRecipeStep> {
  id?: number;
  name: string;
  description?: string;
  additional?: string;
  steps: TRecipeStep;
  // category: RecipeCategory | '';
  lastUpdate: number;
  needSync?: boolean;
}

export interface RecipeBase<TRecipeStep> extends RecipeContract<TRecipeStep> {
  userId?: number;
}

// export type SetRecipe = (recipe: RecipeBase) => number;
