import type { Food } from '../food/food.model';
import type {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';
import type { AllNutrientsData } from '../nutrient-data/nutrient-data.model';
import type { AllNutrients } from '../nutrient/nutrient.model';
import type { RecipeStep } from '../recipe-step';
import type { RecipeBase } from './recipe.types';

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
