import { FoodsDataResponse } from '../food/food.response';
import { AllNutrientsResponse } from '../nutrient/nutrient.response';
import { RecipeStepResponse } from '../recipe-step';
import { RecipeBase } from './recipe.types';

export interface RecipeResponse
  extends RecipeBase<RecipeStepResponse>,
    AllNutrientsResponse {
  food: number;
}

export interface RecipesDataResponse extends FoodsDataResponse {
  recipes: RecipeResponse[];
}
