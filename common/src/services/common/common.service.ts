import { type CommonData } from './common.model';
import type { CommonDataResponse } from './common.response';

export function mapCommonResponseToModel(data: CommonDataResponse): CommonData {
  return {
    measures: Object.values(data.measures),
    foodTypes: Object.values(data.foodTypes),
    measurementUnits: Object.values(data.measurementUnits),
    vitamins: Object.values(data.vitamins),
    aminoAcids: Object.values(data.aminoAcids),
    minerals: Object.values(data.minerals),
    nutritionalInformation: Object.values(data.nutritionalInformation),
  };
}
