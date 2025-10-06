import type { IngredientResponse } from '../ingredient/ingredient.reponse';
import { type AllNutrientsResponse } from '../nutrient/nutrient.response';
import type { RecipeStepBase } from './recipe-step.types';

export type RecipeStepResponse = RecipeStepBase<IngredientResponse> &
  AllNutrientsResponse;
