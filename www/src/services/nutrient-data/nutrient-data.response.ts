import { NutrientsResponse } from '../nutrient/nutrient.response';
import { NutrientBase } from '../nutrient/nutrient.types';

export type NutrientDataResponse = NutrientBase;

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
