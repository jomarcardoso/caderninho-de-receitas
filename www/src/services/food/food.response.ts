import { CommonResponse } from '../common/common.response';
import { AllNutrientsResponse } from '../nutrient/nutrient.response';
import { FoodBase } from './food.types';

export interface FoodResponse extends FoodBase, AllNutrientsResponse {
  measurementUnit: number;
  type: number;
  measures: Record<string, number>;
}

export interface FoodsDataResponse extends CommonResponse {
  foods: FoodResponse[];
}
