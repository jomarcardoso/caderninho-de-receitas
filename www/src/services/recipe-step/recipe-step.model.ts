import { Ingredient } from '../ingredient/ingredient.model';
import { AllNutrients } from '../nutrient/nutrient.model';
import { RecipeStepBase } from './recipe-step.types';

export type RecipeStep = RecipeStepBase<Ingredient> & AllNutrients;
