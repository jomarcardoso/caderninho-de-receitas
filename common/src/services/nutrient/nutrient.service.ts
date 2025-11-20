import type { CommonDataResponse } from '../common/common.response';
import type { NutrientDataResponse } from '../nutrient-data/nutrient-data.response';
import type { AllNutrients, Nutrient } from './nutrient.model';
import type {
  AllNutrientsResponse,
  NutrientsResponse,
} from './nutrient.response';

export function mapNutrientResponseToModel(
  nutrientsResponse: NutrientsResponse | undefined | null,
  nutrientsData: Record<string, NutrientDataResponse>,
): Nutrient[] {
  const entries = Object.entries(nutrientsResponse || {});
  return entries.map(([key, quantity]) => {
    const d = nutrientsData[key];
    return {
      quantity: typeof quantity === 'number' ? quantity : 0,
      index: d?.index ?? 0,
      name: d?.name ?? ({ en: key, pt: key } as any),
      shortName: d?.shortName ?? key,
      measurementUnit: d?.measurementUnit ?? '',
    };
  });
}

export function mapAllNutrientsResponseToModel(
  allNutrientsResponse: AllNutrientsResponse | undefined | null,
  {
    nutritionalInformation,
    minerals,
    vitamins,
    aminoAcids,
  }: CommonDataResponse,
): AllNutrients {
  return {
    nutritionalInformation: mapNutrientResponseToModel(
      allNutrientsResponse?.nutritionalInformation,
      nutritionalInformation,
    ),
    minerals: mapNutrientResponseToModel(
      allNutrientsResponse?.minerals,
      minerals,
    ),
    vitamins: mapNutrientResponseToModel(
      allNutrientsResponse?.vitamins,
      vitamins,
    ),
    aminoAcids: mapNutrientResponseToModel(
      allNutrientsResponse?.aminoAcids,
      aminoAcids,
    ),
    essentialAminoAcids: mapNutrientResponseToModel(
      allNutrientsResponse?.essentialAminoAcids,
      aminoAcids,
    ),
    aminoAcidsScore: allNutrientsResponse?.aminoAcidsScore ?? 0,
  };
}
