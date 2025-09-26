import { Food } from '../food/food.model';
import { Measure } from '../measure/measure.model';
import { AllNutrients } from '../nutrient/nutrient.model';
import { IngredientBase } from './ingredient.types';

export interface Ingredient extends IngredientBase<Food>, AllNutrients {
  measureType: Measure;
}
