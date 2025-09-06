import { AminoAcids, AMINO_ACIDS } from '../amino-acid';
import { Measure } from '../food';
import { FOOD } from '../food/food.types';
import { MINERALS, Minerals } from '../mineral';
import { NutritionalInformation } from '../nutritional-information';
import { VITAMINS, Vitamins } from '../vitamin';

export interface IngredientBase<TFood> {
  text: string;
  food: TFood;
  quantity: number;
  measure: Measure;
  nutritionalInformation: NutritionalInformation;
  aminoAcids: AminoAcids;
  vitamins: Vitamins;
  minerals: Minerals;
}

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
  text: '',
  vitamins: VITAMINS,
  minerals: MINERALS,
};
