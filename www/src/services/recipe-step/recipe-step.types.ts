export interface RecipeStepBase<TRecipeIngredient> {
  title: string;
  preparation: string;
  additional: string;
  ingredients: TRecipeIngredient;
}
