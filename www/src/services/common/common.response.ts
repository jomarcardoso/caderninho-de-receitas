import { FoodTypeResponse } from '../food/food.response';
import { MeasureTypeResponse } from '../measure/mesure.response';
import { MeasurementUnitResponse } from '../measurement-unity/measurement-unity.types';

export interface CommonResponse {
  measureTypes: MeasureTypeResponse[];
  foodTypes: FoodTypeResponse[];
  measurementUnits: MeasurementUnitResponse[];
}
