import {
  NutrientDataResponse,
  NutrientsResponse,
} from '../nutrient/nutrient.response';

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
