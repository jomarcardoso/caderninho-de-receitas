import type { FoodsDataResponse } from '../food/food.response';
import type { AllNutrientsResponse } from '../nutrient/nutrient.response';
import type { RecipeStepResponse } from '../recipe-step';
import type { RecipeBase } from './recipe.types';

export interface RecipeResponse
  extends RecipeBase<RecipeStepResponse>,
    AllNutrientsResponse {
  food: number;
}

export interface RecipesDataResponse extends FoodsDataResponse {
  recipes: RecipeResponse[];
}

export interface RecipeDataResponse extends FoodsDataResponse {
  recipes: RecipeResponse;
  relatedRecipes: RecipeResponse[];
}
