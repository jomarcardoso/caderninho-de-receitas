import { AllNutrientsResponse } from '../nutrient-data/nutrient-data.response';
import { IngredientBase } from './ingredient.types';

export interface IngredientResponse
  extends IngredientBase<number>,
    AllNutrientsResponse {
  measureType: string;
}
