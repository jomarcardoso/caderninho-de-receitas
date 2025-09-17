import { CommonResponse } from '../common/common.response';
import { AllNutrientsResponse } from '../nutrient/nutrient.response';
import { FoodBase } from './food.types';

export interface FoodResponse extends FoodBase, AllNutrientsResponse {
  measurementUnit: number;
  type: number;
  measures: Record<string, number>;
  nutritionalInformation: Record<string, number>;
  minerals: Record<string, number>;
}

export interface FoodsResponse extends CommonResponse {
  foods: Array<FoodResponse>;
}
