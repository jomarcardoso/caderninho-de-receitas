import { MeasureTypeResponse } from '../measure/mesure.response';
import { MeasurementUnitResponse } from '../measurement-unity/measurement-unity.types';
import { Food } from './food.model';
import { FoodResponse, FoodsResponse, FoodTypeResponse } from './food.response';

export function mapFoodResponseToModel(
  foodData: FoodResponse,
  measureTypes: MeasureTypeResponse[],
  foodTypes: FoodTypeResponse[],
  measurementUnits: MeasurementUnitResponse[],
): Food {
  return {
    ...foodData,
    measurementUnit: measurementUnits[foodData.measurementUnit],
    measures:
      foodData?.measures?.map((measure) => ({
        ...measure,
        text: measureTypes[measure.type].text,
      })) ?? [],
    type: foodTypes[foodData.type],
    aminoAcids: {
      ...AMINO_ACIDS,
      alanine: foodData?.alanine ?? AMINO_ACIDS.alanine,
      arginine: foodData?.arginine ?? AMINO_ACIDS.arginine,
      asparticAcid: foodData?.asparticAcid ?? AMINO_ACIDS.asparticAcid,
      cystine: foodData?.cystine ?? AMINO_ACIDS.cystine,
      glutamicAcid: foodData?.glutamicAcid ?? AMINO_ACIDS.glutamicAcid,
      glycine: foodData?.glycine ?? AMINO_ACIDS.glycine,
      histidine: foodData?.histidine ?? AMINO_ACIDS.histidine,
      isoleucine: foodData?.isoleucine ?? AMINO_ACIDS.isoleucine,
      leucine: foodData?.leucine ?? AMINO_ACIDS.leucine,
      lysine: foodData?.lysine ?? AMINO_ACIDS.lysine,
      methionine: foodData?.methionine ?? AMINO_ACIDS.methionine,
      phenylalanine: foodData?.phenylalanine ?? AMINO_ACIDS.phenylalanine,
      proline: foodData?.proline ?? AMINO_ACIDS.proline,
      serine: foodData?.serine ?? AMINO_ACIDS.serine,
      threonine: foodData?.threonine ?? AMINO_ACIDS.threonine,
      tryptophan: foodData?.tryptophan ?? AMINO_ACIDS.tryptophan,
      tyrosine: foodData?.tyrosine ?? AMINO_ACIDS.tyrosine,
      valine: foodData?.valine ?? AMINO_ACIDS.valine,
    },
    minerals: MineralService.format(foodData),
    vitamins: VitaminService.format(foodData),
  };
}

export async function fetchFood(): Promise<Food[]> {
  const res = await fetch('http://localhost:5106/api/food');
  const data: FoodsResponse = await res.json();

  return data.foods.map((food) =>
    mapFoodResponseToModel(
      food,
      data.measureTypes,
      data.foodTypes,
      data.measurementUnits,
    ),
  );
}
