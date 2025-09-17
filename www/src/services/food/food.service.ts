import { CommonResponse } from '../common/common.response';
import { mapAllNutrientsResponseToModel } from '../nutrient/nutrient.service';
import { Food } from './food.model';
import { FoodResponse, FoodsResponse } from './food.response';

export function mapFoodResponseToModel(
  foodResponse: FoodResponse,
  commonResponse: CommonResponse,
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

export function mapAllFoodsResponseToModel(data: FoodsResponse): Food[] {
  return data.foods.map((food) => mapFoodResponseToModel(food, data));
}

export async function fetchFood(): Promise<Food[]> {
  try {
    const res = await fetch('http://localhost:5106/api/food');
    const data: FoodsResponse = await res.json();

    return mapAllFoodsResponseToModel(data);
  } catch (error) {
    console.log(error);
  }

  return [];
}
