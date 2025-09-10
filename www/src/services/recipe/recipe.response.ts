import { Food } from '../food';
import { MeasureTypeResponse } from '../measure/mesure.response';
import { RecipeStepResponseDto } from '../recipe-step';
import { RecipeBase } from './recipe.types';

export type RecipeResponse = RecipeBase<RecipeStepResponseDto>;

export interface RecipeAndFoodResponse {
  recipes: RecipeResponse[];
  foods: Food[];
  measureTypes: MeasureTypeResponse[];
}
