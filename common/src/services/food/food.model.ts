import { type CommonData } from '../common/common.model';
import type {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';
import { type Measure } from '../measure/measure.model';
import { type AllNutrients } from '../nutrient-data/nutrients.types';
import { type FoodBase } from './food.types';

export interface Food extends FoodBase, AllNutrients {
  type: LanguageText;
  measurementUnit: LanguageTextAndPlural;
  measures: Array<Measure>;
}

export interface FoodsData extends CommonData {
  foods: Food[];
}

const EMPTY_LANGUAGE_TEXT: LanguageText = { en: '', pt: '' };

const EMPTY_MEASUREMENT_UNIT: LanguageTextAndPlural = {
  text: { ...EMPTY_LANGUAGE_TEXT },
  pluralText: { ...EMPTY_LANGUAGE_TEXT },
};

export const FOOD: Food = {
  id: 0,
  name: { ...EMPTY_LANGUAGE_TEXT },
  description: { ...EMPTY_LANGUAGE_TEXT },
  imgs: [],
  keys: { ...EMPTY_LANGUAGE_TEXT },
  isRecipe: false,
  iconId: 0,
  icon: '',
  type: { ...EMPTY_LANGUAGE_TEXT },
  measurementUnit: {
    text: { ...EMPTY_MEASUREMENT_UNIT.text },
    pluralText: { ...EMPTY_MEASUREMENT_UNIT.pluralText },
  },
  measures: [],
  nutritionalInformation: [],
  minerals: [],
  vitamins: [],
  aminoAcids: [],
};
