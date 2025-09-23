import {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';
import { NutrientData } from '../nutrient-data/nutrient-data.model';

export interface CommonData {
  measures: LanguageTextAndPlural[];
  foodTypes: LanguageText[];
  measurementUnits: LanguageTextAndPlural[];
  vitamins: NutrientData[];
  aminoAcids: NutrientData[];
  minerals: NutrientData[];
  nutritionalInformation: NutrientData[];
}
