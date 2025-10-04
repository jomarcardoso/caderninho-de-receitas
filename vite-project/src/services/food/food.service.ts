import { mapCommonResponseToModel } from '../common/common.service';
import { mapAllNutrientsResponseToModel } from '../nutrient/nutrient.service';
import type { Food, FoodsData } from './food.model';
import type { FoodResponse, FoodsDataResponse } from './food.response';

export function mapFoodResponseToModel(
  foodResponse: FoodResponse,
  commonResponse: FoodsDataResponse,
): Food {
  return {
    ...foodResponse,
    ...mapAllNutrientsResponseToModel(foodResponse, commonResponse),
    measurementUnit: {
      text: commonResponse.measurementUnits[foodResponse.measurementUnit].text,
      pluralText:
        commonResponse.measurementUnits[foodResponse.measurementUnit]
          .pluralText,
    },
    measures:
      Object.entries(foodResponse?.measures)?.map(([key, quantity]) => ({
        quantity,
        text: commonResponse.measures[key].text,
        pluralText: commonResponse.measures[key].pluralText,
      })) ?? [],
    type: commonResponse.foodTypes[foodResponse.type],
  };
}

// export function mapAllFoodsResponseToModel(data: FoodsDataResponse): Food[] {
//   return data.foods.map((food) => mapFoodResponseToModel(food, data));
// }

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

// export async function fetchFoods(): Promise<Food[]> {
//   try {
//     const res = await fetch('http://localhost:5106/api/food');
//     const data: FoodsDataResponse = await res.json();

//     return mapAllFoodsResponseToModel(data);
//   } catch (error) {
//     console.log(error);
//   }

//   return [];
// }
