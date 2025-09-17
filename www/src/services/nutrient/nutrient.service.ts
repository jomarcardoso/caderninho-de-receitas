import { CommonResponse } from '../common/common.response';
import { AllNutrients, Nutrient } from './nutrient.model';
import {
  AllNutrientsResponse,
  NutrientsDataResponse,
  NutrientsResponse,
} from './nutrient.response';

export function mapNutrientResponseToModel(
  nutrientsResponse: NutrientsResponse,
  nutrientsData: NutrientsDataResponse,
): Nutrient[] {
  return Object.entries(nutrientsResponse).map(([key, quantity]) => ({
    quantity,
    index: nutrientsData[key].index,
    name: nutrientsData[key].name,
    shortName: nutrientsData[key].shortName,
    measurementUnit: nutrientsData[key].measurementUnit,
  }));
}

export function mapAllNutrientsResponseToModel(
  allNutrientsResponse: AllNutrientsResponse,
  { nutritionalInformation, minerals, vitamins, aminoAcids }: CommonResponse,
): AllNutrients {
  return {
    nutritionalInformation: mapNutrientResponseToModel(
      allNutrientsResponse.nutritionalInformation,
      nutritionalInformation,
    ),
    minerals: mapNutrientResponseToModel(
      allNutrientsResponse.minerals,
      minerals,
    ),
    vitamins: mapNutrientResponseToModel(
      allNutrientsResponse.vitamins,
      vitamins,
    ),
    aminoAcids: mapNutrientResponseToModel(
      allNutrientsResponse.aminoAcids,
      aminoAcids,
    ),
  };
}
