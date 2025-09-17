import { NutrientBase } from './nutrient.types';

export interface Nutrient extends NutrientBase {
  quantity: number;
}

export interface AllNutrients {
  nutritionalInformation: Nutrient[];
  minerals: Nutrient[];
  vitamins: Nutrient[];
  aminoAcids: Nutrient[];
}
