import type { CommonDataResponse } from '../common/common.response';
import type { NutrientDataResponse } from '../nutrient-data/nutrient-data.response';
import type { AllNutrients, Nutrient } from './nutrient.model';
import type { AllNutrients, Nutrients } from './nutrient.response';

export function mapNutrientResponseToModel(
  nutrientsResponse: Nutrients | undefined | null,
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

export function mapAllNutrientsToModel(
  allNutrients: AllNutrients | undefined | null,
  {
    nutritionalInformation,
    minerals,
    vitamins,
    aminoAcids,
  }: CommonDataResponse,
): AllNutrients {
  return {
    nutritionalInformation: mapNutrientResponseToModel(
      allNutrients?.nutritionalInformation,
      nutritionalInformation,
    ),
    minerals: mapNutrientResponseToModel(allNutrients?.minerals, minerals),
    vitamins: mapNutrientResponseToModel(allNutrients?.vitamins, vitamins),
    aminoAcids: mapNutrientResponseToModel(
      allNutrients?.aminoAcids,
      aminoAcids,
    ),
    essentialAminoAcids: mapNutrientResponseToModel(
      allNutrients?.essentialAminoAcids,
      aminoAcids,
    ),
    aminoAcidsScore: allNutrients?.aminoAcidsScore ?? 0,
  };
}
