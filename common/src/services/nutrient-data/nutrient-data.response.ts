import type { Nutrients } from '../nutrient/nutrient.response';
import type { NutrientBase } from '../nutrient/nutrient.types';

export type NutrientDataResponse = NutrientBase;

export interface AllNutrients {
  nutritionalInformation: Nutrients;
  minerals: Nutrients;
  vitamins: Nutrients;
  aminoAcids: Nutrients;
  essentialAminoAcids: Nutrients;
  aminoAcidsScore: number;
}

export interface AllNutrientsDataResponse {
  nutritionalInformation: Record<string, NutrientDataResponse>;
  minerals: Record<string, NutrientDataResponse>;
  vitamins: Record<string, NutrientDataResponse>;
  aminoAcids: Record<string, NutrientDataResponse>;
}
