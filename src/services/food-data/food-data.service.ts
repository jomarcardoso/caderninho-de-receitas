import {
  AminoAcidsData,
  AminoAcids,
  AMINO_ACIDS,
} from '../amino-acid/amino-acid.constants';
import type { Food, FoodData } from '../food/food.types';
import { MineralService } from '../mineral';
import { VitaminService } from '../vitamin';

export function formatAminoAcids(data?: AminoAcidsData): AminoAcids {
  return Object.keys(AMINO_ACIDS).reduce((object, key) => {
    const vitaminKey = key as keyof AminoAcids;

    return {
      ...object,
      [key]: data?.[vitaminKey] ?? AMINO_ACIDS[vitaminKey],
    };
  }, {}) as AminoAcids;
}

export function format(data?: FoodData): Food {
  return {
    acidification: data?.acidification ?? 0,
    aminoAcids: formatAminoAcids(data?.aminoAcids),
    calories: data?.calories ?? 0,
    carbohydrates: data?.carbohydrates ?? 0,
    ashes: data?.ashes ?? 0,
    description: data?.description ?? '',
    dietaryFiber: data?.dietaryFiber ?? 0,
    gi: data?.gi ?? 0,
    gl: data?.gl ?? 0,
    id: data?.id ?? 0,
    image: data?.image ?? '',
    icon: data?.icon ?? '',
    keys: data?.keys ?? [],
    monounsaturatedFats: data?.monounsaturatedFats ?? 0,
    polyunsaturatedFats: data?.polyunsaturatedFats ?? 0,
    name: data?.name ?? '',
    oneMeasures: data?.oneMeasures ?? [],
    proteins: data?.proteins ?? 0,
    saturedFats: data?.saturedFats ?? 0,
    sugar: data?.sugar ?? 0,
    totalFat: data?.totalFat ?? 0,
    unitOfMeasurement: data?.unitOfMeasurement ?? 'gram',
    minerals: MineralService.format(data?.minerals),
    vitamins: VitaminService.format(data?.vitamins),
    version: data?.version ?? 'RAW',
    rawId: data?.id ?? 0,
    cholesterol: data?.cholesterol ?? 0,
    recipe: data?.recipe ?? false,
    type: data?.type ?? 'solid',
  };
}
