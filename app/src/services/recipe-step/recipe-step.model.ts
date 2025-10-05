import type { Ingredient } from '../ingredient/ingredient.model';
import { type AllNutrients } from '../nutrient/nutrient.model';
import type { RecipeStepBase } from './recipe-step.types';

export type RecipeStep = RecipeStepBase<Ingredient> & AllNutrients;
