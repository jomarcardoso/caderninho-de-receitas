import {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';
import { Measure } from '../measure/measure.model';
import { AllNutrients } from '../nutrient-data/nutrients.types';
import { FoodBase } from './food.types';

export interface Food extends FoodBase, AllNutrients {
  type: LanguageText;
  measurementUnit: LanguageTextAndPlural;
  measures: Array<Measure>;
}
