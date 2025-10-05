import type { Food, FoodsData } from '../food/food.model';
import type { FoodsDataResponse } from '../food/food.response';
import { mapAllNutrientsResponseToModel } from '../nutrient/nutrient.service';
import type { Ingredient } from './ingredient.model';
import type { IngredientResponse } from './ingredient.reponse';

export function mapIngredientResponseToModel(
  ingredientResponse: IngredientResponse,
  foodsData: FoodsData,
  foodsDataResponse: FoodsDataResponse,
): Ingredient {
  const food = foodsData.foods.find(
    (f) => f.id === ingredientResponse.food,
  ) as Food;
  return {
    ...ingredientResponse,
    ...mapAllNutrientsResponseToModel(ingredientResponse, foodsDataResponse),
    measureType: foodsDataResponse.measures[ingredientResponse.measureType],
    food,
  };
}
