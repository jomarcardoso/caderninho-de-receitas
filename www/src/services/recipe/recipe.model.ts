import { AllNutrients } from '../nutrient/nutrient.model';
import { RecipeStep } from '../recipe-step';
import { RecipeBase } from './recipe.types';

export type Recipe = RecipeBase<RecipeStep[]> & AllNutrients;
