import { IngredientResponse } from '../ingredient/ingredient.reponse';
import { AllNutrientsResponse } from '../nutrient/nutrient.response';
import { RecipeStepBase } from './recipe-step.types';

export type RecipeStepResponseDto = RecipeStepBase<IngredientResponse> &
  AllNutrientsResponse;
