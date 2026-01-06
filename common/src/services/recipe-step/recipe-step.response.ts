import type { IngredientResponse } from '../ingredient/ingredient.reponse';
import { type AllNutrients } from '../nutrient/nutrient.response';
import type { RecipeStepBase } from './recipe-step.types';

export type RecipeStep = RecipeStepBase<IngredientResponse> & AllNutrients;
