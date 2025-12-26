import type { CommonDataResponse } from '../common/common.response';
import { type AllNutrientsResponse } from '../nutrient/nutrient.response';
import { type FoodBase } from './food.types';

export interface FoodIconResponse {
  id: number;
  url?: string; // public URL
}

export interface FoodSummaryResponse {
  id: number;
  name: string;
  icon: string;
  imgs: string[];
}

export interface FoodResponse extends FoodBase, AllNutrientsResponse {
  measurementUnit: string; // MeasurementUnit slug (e.g., "gram", "liter")
  type: string; // FoodType slug (e.g., "fruit", "solid")
  measures: Record<string, number>;
  categories?: string[];
  icon?: FoodIconResponse | null;
  iconId?: number;
}

export interface FoodsDataResponse extends CommonDataResponse {
  foods: FoodResponse[];
}
