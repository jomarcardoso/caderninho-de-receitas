import type {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';
import type { NutrientData } from '../nutrient-data/nutrient-data.model';

export interface CommonData {
  measures: LanguageTextAndPlural[];
  foodTypes: LanguageText[];
  measurementUnits: LanguageTextAndPlural[];
  recipeCategories: Category[];
  vitamins: NutrientData[];
  aminoAcids: NutrientData[];
  minerals: NutrientData[];
  nutritionalInformation: NutrientData[];
}

export interface Category extends LanguageTextAndPlural {
  key: string;
  url: string;
  img: string;
  description?: LanguageText;
  bannerImg?: string;
}
