import * as FoodServices from './food.service';

export const FoodService = FoodServices;

export { MeasurerValues, MEASURE, FOOD } from './food.types';

export type {
  Food,
  FoodData,
  Measure,
  Measurer,
  FoodVersions,
  FoodVersion,
  UnitOfMeasurement,
} from './food.types';
