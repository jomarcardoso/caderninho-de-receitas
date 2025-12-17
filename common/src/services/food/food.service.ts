import { mapCommonResponseToModel } from '../common/common.service';
import { mapAllNutrientsResponseToModel } from '../nutrient/nutrient.service';
import type { Food, FoodsData } from './food.model';
import type { FoodResponse, FoodsDataResponse } from './food.response';

export function mapFoodResponseToModel(
  foodResponse: FoodResponse,
  commonResponse: FoodsDataResponse,
): Food {
  const iconList: string[] = [];
  const iconObj = (foodResponse as any).icon as
    | { url?: string }
    | undefined;
  if (iconObj) {
    const raw = (iconObj.url ?? '').trim();
    if (raw) {
      if (
        raw.startsWith('http://') ||
        raw.startsWith('https://') ||
        raw.startsWith('data:')
      ) {
        iconList.push(raw);
      } else if (raw.startsWith('<')) {
        iconList.push(`data:image/svg+xml;utf8,${encodeURIComponent(raw)}`);
      } else {
        iconList.push(`data:image/png;base64,${raw}`);
      }
    }
  }

  return {
    ...foodResponse,
    ...mapAllNutrientsResponseToModel(foodResponse, commonResponse),
    categories: Array.isArray((foodResponse as any).categories)
      ? ((foodResponse as any).categories as string[])
      : [],
    imgs: Array.isArray((foodResponse as any).imgs)
      ? ((foodResponse as any).imgs as string[])
      : (foodResponse as any).image
      ? [String((foodResponse as any).image)]
      : [],
    // If icon not resolved, fallback to images list so consumers can just use `icon` array
    icon:
      iconList.length > 0
        ? iconList
        : Array.isArray((foodResponse as any).imgs)
        ? ((foodResponse as any).imgs as string[])
        : (foodResponse as any).image
        ? [String((foodResponse as any).image)]
        : [],
    // keep original filename for edit forms when present in response
    ...((foodResponse as any).icon
      ? { iconName: (foodResponse as any).icon }
      : {}),
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
