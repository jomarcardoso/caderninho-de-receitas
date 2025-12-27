import { type CommonData } from '../common/common.model';
import type { LanguageText } from '../language/language.types';
import { type AllNutrients } from '../nutrient-data/nutrients.types';
import type { Icon, FoodType } from './food.types';
import type { MeasurementUnit } from '../measure/measurement-unit.types';
import { Measures } from '../measure';

export interface Food extends AllNutrients {
  id: number;
  name: LanguageText;
  keys: LanguageText;
  description: LanguageText;
  imgs: string[];
  measurementUnit: MeasurementUnit;
  measures: Measures;
  icon: Icon;
  type: FoodType;
  categories: string[]; // slugs
}

export interface FoodsData extends CommonData {
  foods: Food[];
}

const EMPTY_LANGUAGE_TEXT: LanguageText = { en: '', pt: '' };

export const FOOD: Food = {
  id: 0,
  name: { ...EMPTY_LANGUAGE_TEXT },
  description: { ...EMPTY_LANGUAGE_TEXT },
  imgs: [],
  keys: { ...EMPTY_LANGUAGE_TEXT },
  categories: [],
  icon: {
    id: 0,
    name: { ...EMPTY_LANGUAGE_TEXT },
    url: '',
    keys: { ...EMPTY_LANGUAGE_TEXT },
  },
  type: 'solid',
  measurementUnit: 'gram',
  measures: {} as Measures,
  nutritionalInformation: [],
  minerals: [],
  vitamins: [],
  aminoAcids: [],
  essentialAminoAcids: [],
  aminoAcidsScore: 0,
};
