import { mapCommonResponseToModel } from '../common/common.service';
import type { Food, FoodsData } from './food.model';
import type { FoodResponse, FoodsDataResponse } from './food.response';

export function mapFoodResponseToModel(
  foodResponse: FoodResponse,
  _commonResponse: FoodsDataResponse,
): Food {
  // FoodResponse já chega no formato final de uso.
  return foodResponse;
}

export function mapFoodsDataResponseToModel(
  foodsDataResponse: FoodsDataResponse,
): FoodsData {
  const commonData = mapCommonResponseToModel(foodsDataResponse);

  return {
    ...commonData,
    foods: foodsDataResponse.foods.map((food) =>
      mapFoodResponseToModel(food, foodsDataResponse),
    ),
  };
}
