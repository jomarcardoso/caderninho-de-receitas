import { Food, AminoAcids, Measure, AMINO_ACIDS } from '../food';
import { FOOD } from '../food/food.types';

export interface Portion {
  food: Food;
  quantity: number;
  calories: number;
  carbohydrates: number;
  aminoAcids: AminoAcids;
  measure: Measure;
  description: string;
}

export type UnFormat = (portion: Portion) => string;

export const PORTION: Portion = {
  aminoAcids: AMINO_ACIDS,
  calories: 0,
  carbohydrates: 0,
  food: FOOD,
  measure: {
    quantity: 0,
    type: 'LITERAL',
  },
  quantity: 0,
  description: '',
};
