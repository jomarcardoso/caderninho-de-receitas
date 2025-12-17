import type { CommonDataResponse } from '../common/common.response';
import { type AllNutrientsResponse } from '../nutrient/nutrient.response';
import { type FoodBase } from './food.types';

export interface FoodIconResponse {
  id: number;
  url?: string; // public URL
}

export interface FoodResponse extends FoodBase, AllNutrientsResponse {
  measurementUnit: number;
  type: number;
  measures: Record<string, number>;
  categories?: string[];
  icon?: FoodIconResponse | null;
}

export interface FoodsDataResponse extends CommonDataResponse {
  foods: FoodResponse[];
}
