import { FoodResponse } from '../food/food.response';
import {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';
import {
  AllNutrientsResponse,
  NutrientsResponse,
} from '../nutrient/nutrient.response';
import { RecipeStepResponseDto } from '../recipe-step';
import { RecipeBase } from './recipe.types';

export type RecipeResponse = RecipeBase<RecipeStepResponseDto> &
  AllNutrientsResponse;

export interface RecipesResponse {
  recipes: RecipeResponse[];
  foods: FoodResponse[];
  measures: Record<string, LanguageTextAndPlural>;
  foodTypes: Record<string, LanguageText>;
  measurementUnits: Record<string, LanguageTextAndPlural>;
  vitamins: NutrientsResponse;
  aminoAcids: NutrientsResponse;
  minerals: NutrientsResponse;
  nutritionalInformation: NutrientsResponse;
}
