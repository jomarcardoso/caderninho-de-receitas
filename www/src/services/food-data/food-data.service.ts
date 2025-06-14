import {
  AminoAcidsData,
  AminoAcids,
  AMINO_ACIDS,
} from '../amino-acid/amino-acid.constants';
import {
  FOOD,
  FoodType,
  FoodTypes,
  Measurer,
  MeasurerValues,
  type Food,
  type FoodData,
} from '../food/food.types';
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
    ...FOOD,
    ...data,
    unitOfMeasurement: data?.unitOfMeasurement === 1 ? 'liter' : 'gram',
    oneMeasures:
      data?.oneMeasures?.map((oneMeasure) => ({
        type: (Object.keys(MeasurerValues) as Measurer[])[oneMeasure.type],
        quantity: oneMeasure.quantity ?? 1,
      })) ?? [],
    keys: (data?.keys || '').split(', ') ?? [],
    type:
      (Object.values(FoodTypes) as FoodType[])[data?.type || 5] || FOOD.type,
    aminoAcids: {
      ...AMINO_ACIDS,
      alanine: data?.alanine ?? AMINO_ACIDS.alanine,
      arginine: data?.arginine ?? AMINO_ACIDS.arginine,
      asparticAcid: data?.asparticAcid ?? AMINO_ACIDS.asparticAcid,
      cystine: data?.cystine ?? AMINO_ACIDS.cystine,
      glutamicAcid: data?.glutamicAcid ?? AMINO_ACIDS.glutamicAcid,
      glycine: data?.glycine ?? AMINO_ACIDS.glycine,
      histidine: data?.histidine ?? AMINO_ACIDS.histidine,
      isoleucine: data?.isoleucine ?? AMINO_ACIDS.isoleucine,
      leucine: data?.leucine ?? AMINO_ACIDS.leucine,
      lysine: data?.lysine ?? AMINO_ACIDS.lysine,
      methionine: data?.methionine ?? AMINO_ACIDS.methionine,
      phenylalanine: data?.phenylalanine ?? AMINO_ACIDS.phenylalanine,
      proline: data?.proline ?? AMINO_ACIDS.proline,
      serine: data?.serine ?? AMINO_ACIDS.serine,
      threonine: data?.threonine ?? AMINO_ACIDS.threonine,
      tryptophan: data?.tryptophan ?? AMINO_ACIDS.tryptophan,
      tyrosine: data?.tyrosine ?? AMINO_ACIDS.tyrosine,
      valine: data?.valine ?? AMINO_ACIDS.valine,
    },
    minerals: MineralService.format(data),
    vitamins: VitaminService.format(data),
  };
}
