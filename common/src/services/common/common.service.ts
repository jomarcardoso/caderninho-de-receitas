import { type CommonData } from './common.model';
import type { CommonDataResponse } from './common.response';

export function mapCommonResponseToModel(data: CommonDataResponse): CommonData {
  const {
    measures = {} as CommonDataResponse['measures'],
    foodTypes = {} as CommonDataResponse['foodTypes'],
    measurementUnits = {} as CommonDataResponse['measurementUnits'],
    recipeCategories = {} as CommonDataResponse['recipeCategories'],
    vitamins = {} as CommonDataResponse['vitamins'],
    aminoAcids = {} as CommonDataResponse['aminoAcids'],
    minerals = {} as CommonDataResponse['minerals'],
    nutritionalInformation = {} as CommonDataResponse['nutritionalInformation'],
  } = (data || {}) as CommonDataResponse;

  return {
    measures: Object.values(measures),
    foodTypes: Object.values(foodTypes),
    measurementUnits: Object.values(measurementUnits),
    recipeCategories: Object.entries(recipeCategories).map(([key, val]) => ({
      key,
      text: val.text,
      pluralText: val.pluralText,
      img: (val as any)?.img || '',
      url: (val as any)?.url || key,
    })),
    vitamins: Object.values(vitamins),
    aminoAcids: Object.values(aminoAcids),
    minerals: Object.values(minerals),
    nutritionalInformation: Object.values(nutritionalInformation),
  };
}
