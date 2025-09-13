import { CommonResponse } from '../common/common.response';
import { MeasureResponse } from '../measure/mesure.response';
import { NutrientsResponse } from '../nutrients/nutrients.response';
import { FoodBase, FoodTypeBase } from './food.types';

export type FoodTypeResponse = FoodTypeBase;

export interface FoodResponse extends FoodBase, NutrientsResponse {
  measurementUnit: number;
  type: number;
  measures: Array<MeasureResponse>;
  nutritionalInformation: Record<string, number>;
  minerals: Record<string, number>;
}

export interface FoodsResponse extends CommonResponse {
  foods: Array<FoodResponse>;
}
