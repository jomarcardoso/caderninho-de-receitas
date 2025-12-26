import { type FoodSummaryResponse } from '../food/food.response';
import { type AllNutrientsResponse } from '../nutrient-data/nutrient-data.response';
import type { IngredientBase } from './ingredient.types';

export interface IngredientResponse
  extends IngredientBase<FoodSummaryResponse>,
    AllNutrientsResponse {
  measureType: string;
}
