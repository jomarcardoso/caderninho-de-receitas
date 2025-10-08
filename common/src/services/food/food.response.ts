import type { CommonResponse } from '../common/common.response';
import { type AllNutrientsResponse } from '../nutrient/nutrient.response';
import { type FoodBase } from './food.types';

export interface FoodResponse extends FoodBase, AllNutrientsResponse {
  measurementUnit: number;
  type: number;
  measures: Record<string, number>;
}

export interface FoodsDataResponse extends CommonResponse {
  foods: FoodResponse[];
}
