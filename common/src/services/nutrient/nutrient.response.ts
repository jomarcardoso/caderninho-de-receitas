import type { NutrientDataResponse } from '../nutrient-data/nutrient-data.response';

export type NutrientResponse = number;

export type Nutrients = Record<string, NutrientResponse>;

export type NutrientsDataResponse = Record<string, NutrientDataResponse>;

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
  essentialAminoAcids: Record<string, NutrientDataResponse>;
  aminoAcidsScore: number;
}
