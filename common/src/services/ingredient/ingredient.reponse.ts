import { type FoodSummary } from '../food/food.response';
import { type AllNutrients } from '../nutrient-data/nutrient-data.response';
import type { IngredientBase } from './ingredient.types';

export interface IngredientResponse
  extends IngredientBase<FoodSummary>,
    AllNutrients {
  measureType: string;
}
