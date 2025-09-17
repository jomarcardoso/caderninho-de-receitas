export interface RecipeStepContract<TRecipeIngredient> {
  title: string;
  preparation: string;
  additional: string;
  ingredients: TRecipeIngredient;
}

export type RecipeStepBase<TRecipeIngredient> =
  RecipeStepContract<TRecipeIngredient>;
