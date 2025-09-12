import { Measure } from '../measure/measure.model';
import { MeasurementUnit } from '../measurement-unity/measurement-unity.types';
import { FoodBase, FoodTypeBase } from './food.types';

export type FoodType = FoodTypeBase;

export interface Food extends FoodBase {
  type: FoodType;
  measurementUnit: MeasurementUnit;
  measures: Array<Measure>;
}
