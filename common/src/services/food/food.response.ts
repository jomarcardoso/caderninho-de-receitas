import type { CommonDataResponse } from '../common/common.response';
import type { Food } from './food.model';

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

export type FoodResponse = Food;

export interface FoodsDataResponse extends CommonDataResponse {
  foods: FoodResponse[];
}
