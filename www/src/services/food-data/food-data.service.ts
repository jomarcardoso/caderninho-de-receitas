import {
  AminoAcidsData,
  AminoAcids,
  AMINO_ACIDS,
} from '../amino-acid/amino-acid.constants';
import {
  FOOD,
  FoodType,
  FoodTypes,
  MeasureType,
  MeasurerValues,
  type Food,
  type FoodData,
} from '../food/food.types';
import { MineralService } from '../mineral';
import { VitaminService } from '../vitamin';

export function formatAminoAcids(data?: AminoAcidsData): AminoAcids {
  return Object.keys(AMINO_ACIDS).reduce((object, key) => {
    const vitaminKey = key as keyof AminoAcids;

    return {
      ...object,
      [key]: data?.[vitaminKey] ?? AMINO_ACIDS[vitaminKey],
    };
  }, {}) as AminoAcids;
}
