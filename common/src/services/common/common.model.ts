import type {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';
import type { NutrientData } from '../nutrient-data/nutrient-data.model';

export interface CommonData {
  measures: LanguageTextAndPlural[];
  foodTypes: LanguageText[];
  measurementUnits: LanguageTextAndPlural[];
  recipeCategories: RecipeCategory[];
  vitamins: NutrientData[];
  aminoAcids: NutrientData[];
  minerals: NutrientData[];
  nutritionalInformation: NutrientData[];
}

export interface RecipeCategory extends LanguageTextAndPlural {
  key: string;
}
