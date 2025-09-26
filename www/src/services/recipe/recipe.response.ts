import { FoodsDataResponse } from '../food/food.response';
import { AllNutrientsResponse } from '../nutrient/nutrient.response';
import { RecipeStepResponse } from '../recipe-step';
import { RecipeBase } from './recipe.types';

export type RecipeResponse = RecipeBase<RecipeStepResponse> &
  AllNutrientsResponse;

export interface RecipesDataResponse extends FoodsDataResponse {
  recipes: RecipeResponse[];
}
