import type { LanguageText } from '../language/language.types';
import { type AllNutrients } from '../nutrient-data/nutrients.types';
import type { Icon, FoodType } from './food.types';
import { Measures } from '../measure';
import { MeasurementUnit } from '../measurement-unit/measurement-unit.types';

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

export interface FoodSummary {
  id: number;
  name: string;
  icon: string;
  imgs: string[];
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
