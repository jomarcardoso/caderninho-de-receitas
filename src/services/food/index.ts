import * as FoodServices from './food.service';

export const FoodService = FoodServices;

export {
  MeasurerValues,
  AMINO_ACIDS,
  MEASURE,
  FOOD,
  PURE_FOOD,
  MINERALS,
  VITAMINS,
  TRANSLATED_AMINO_ACIDS,
} from './food.types';

export type {
  AminoAcids,
  EssencialAminoAcids,
  Food,
  Measure,
  Measurer,
  NonEssencialAminoAcids,
  UnitOfMeasurement,
  Minerals,
} from './food.types';
