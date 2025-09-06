export interface RecipeStepBase<TRecipeIngredient> {
  title: string;
  description: string;
  ingredients: TRecipeIngredient;
  preparation: string;
  additional: string;
}
