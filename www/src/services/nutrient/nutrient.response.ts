import { NutrientBase as NutrientDataBase } from './nutrient.types';

export type NutrientResponse = number;

export type NutrientsResponse = Record<string, NutrientResponse>;

export type NutrientDataResponse = NutrientDataBase;

export type NutrientsDataResponse = Record<string, NutrientDataResponse>;

export interface AllNutrientsResponse {
  nutritionalInformation: NutrientsResponse;
  minerals: NutrientsResponse;
  vitamins: NutrientsResponse;
  aminoAcids: NutrientsResponse;
}

export interface AllNutrientsDataResponse {
  nutritionalInformation: Record<string, NutrientDataResponse>;
  minerals: Record<string, NutrientDataResponse>;
  vitamins: Record<string, NutrientDataResponse>;
  aminoAcids: Record<string, NutrientDataResponse>;
}
