import { CommonResponse } from '../common/common.response';
import { NutrientDataResponse } from '../nutrient-data/nutrient-data.response';
import { AllNutrients, Nutrient } from './nutrient.model';
import { AllNutrientsResponse, NutrientsResponse } from './nutrient.response';

export function mapNutrientResponseToModel(
  nutrientsResponse: NutrientsResponse,
  nutrientsData: Record<string, NutrientDataResponse>,
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
    essentialAminoAcids: mapNutrientResponseToModel(
      allNutrientsResponse.essentialAminoAcids,
      aminoAcids,
    ),
    aminoAcidsScore: allNutrientsResponse.aminoAcidsScore,
  };
}
