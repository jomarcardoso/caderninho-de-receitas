import { Food } from '../food/food.model';
import {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';
import {
  AllNutrientsData,
  NutrientData,
} from '../nutrient-data/nutrient-data.model';
import { AllNutrients } from '../nutrient/nutrient.model';
import { RecipeStep } from '../recipe-step';
import { RecipeBase } from './recipe.types';

export type Recipe = RecipeBase<RecipeStep> & AllNutrients;

export interface RecipesData extends AllNutrientsData {
  recipes: Recipe[];
  foods: Food[];
  measures: LanguageTextAndPlural[];
  foodTypes: LanguageText[];
  measurementUnits: LanguageTextAndPlural[];
}
