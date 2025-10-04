import { NutrientBase } from '../nutrient/nutrient.types';

export type NutrientData = NutrientBase;

export interface AllNutrientsData {
  nutritionalInformation: NutrientData[];
  minerals: NutrientData[];
  vitamins: NutrientData[];
  aminoAcids: NutrientData[];
}
