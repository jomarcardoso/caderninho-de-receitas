import { CommonResponse } from '../common/common.response';
import { MeasureResponse } from '../measure/mesure.response';
import { FoodBase, FoodTypeBase } from './food.types';

export type FoodTypeResponse = FoodTypeBase;

export interface FoodResponse extends FoodBase {
  measurementUnit: number;
  type: number;
  measures: Array<MeasureResponse>;
}

export interface FoodsResponse extends CommonResponse {
  foods: Array<FoodResponse>;
}
