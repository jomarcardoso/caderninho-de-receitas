import { IngredientResponse } from '../ingredient/ingredient.reponse';
import { RecipeStepBase } from './recipe-step.types';

export type RecipeStepResponseDto = RecipeStepBase<IngredientResponse>;
