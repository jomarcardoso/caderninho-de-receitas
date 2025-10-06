import type { NutrientDataResponse } from '../nutrient-data/nutrient-data.response';

export type NutrientResponse = number;

export type NutrientsResponse = Record<string, NutrientResponse>;

export type NutrientsDataResponse = Record<string, NutrientDataResponse>;

export interface AllNutrientsResponse {
  nutritionalInformation: NutrientsResponse;
  minerals: NutrientsResponse;
  vitamins: NutrientsResponse;
  aminoAcids: NutrientsResponse;
  essentialAminoAcids: NutrientsResponse;
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
