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

export interface Recipe extends RecipeBase<RecipeStep>, AllNutrients {
  food: Food;
}

export interface RecipesData extends AllNutrientsData {
  recipes: Recipe[];
  foods: Food[];
  measures: LanguageTextAndPlural[];
  foodTypes: LanguageText[];
  measurementUnits: LanguageTextAndPlural[];
}
