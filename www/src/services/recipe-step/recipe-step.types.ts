export interface RecipeStepContract {
  title: string;
  preparation: string;
  additional: string;
  ingredientsText: string;
}

export interface RecipeStepBase<TRecipeIngredient> extends RecipeStepContract {
  ingredients: TRecipeIngredient[];
}
