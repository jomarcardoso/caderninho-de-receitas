import { AminoAcids, AMINO_ACIDS } from '../amino-acid';
import { Food, Measure } from '../food';
import { FOOD } from '../food/food.types';

export interface Ingredient {
  food: Food;
  quantity: number;
  calories: number;
  carbohydrates: number;
  totalFat: number;
  dietaryFiber: number;
  proteins: number;
  aminoAcids: AminoAcids;
  measure: Measure;
  description: string;
}

export type UnFormat = (ingredient: Ingredient) => string;

export const PORTION: Ingredient = {
  aminoAcids: AMINO_ACIDS,
  calories: 0,
  carbohydrates: 0,
  totalFat: 0,
  dietaryFiber: 0,
  proteins: 0,
  food: FOOD,
  measure: {
    quantity: 0,
    type: 'LITERAL',
  },
  quantity: 0,
  description: '',
};
