import type { Food } from '../food/food.model';
import type { Measure } from '../measure/measure.model';
import { type AllNutrients } from '../nutrient/nutrient.model';
import type { IngredientBase } from './ingredient.types';

export interface Ingredient extends IngredientBase<Food>, AllNutrients {
  measureType: Measure;
}
