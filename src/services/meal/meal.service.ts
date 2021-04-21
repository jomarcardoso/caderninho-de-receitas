import { Food, AminoAcids, FoodService } from '../food';
import PortionService from '../portion/portion.service';
import { Portion } from '../portion/portion.types';
import { Meal, MealData, MEAL_DATA } from './meal.types';

export function calculateCalories(portions: Array<Portion> = []): number {
  return Number(
    portions
      .reduce((sum, portion) => {
        return sum + portion.calories;
      }, 0)
      .toFixed(0),
  );
}

export function calculateCarbohidrates(portions: Array<Portion> = []): number {
  return Number(
    portions
      .reduce((sum, portion) => {
        return sum + portion.calories;
      }, 0)
      .toFixed(0),
  );
}

export function calculateGI(portions: Array<Portion> = []): number {
  const total = portions.reduce((sum, portion) => {
    return sum + portion.food.gi;
  }, 0);

  return total / portions.length;
}

export function calculateGC(portions: Array<Portion> = []): number {
  const total = portions.reduce((sum, portion) => {
    return sum + portion.food.gl;
  }, 0);

  return total / portions.length;
}

export function calculateAcidification(portions: Array<Portion> = []): number {
  const total = portions.reduce((sum, portion) => {
    return sum + portion.food.acidification;
  }, 0);

  return total / portions.length;
}

export function format({
  mealData = MEAL_DATA,
  foods = [],
}: {
  mealData: MealData;
  foods: Array<Food>;
}): Meal {
  const portions = mealData?.portions?.map((text) =>
    PortionService.portionFromString({ text, foods }),
  );

  const allAminoAcids: AminoAcids = {
    alanine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.alanine + sum,
      0,
    ),
    arginine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.arginine + sum,
      0,
    ),
    asparticAcid: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.asparticAcid + sum,
      0,
    ),
    cystine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.cystine + sum,
      0,
    ),
    glutamicAcid: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.glutamicAcid + sum,
      0,
    ),
    glutamine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.glutamine + sum,
      0,
    ),
    glycine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.glycine + sum,
      0,
    ),
    histidine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.histidine + sum,
      0,
    ),
    isoleucine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.isoleucine + sum,
      0,
    ),
    leucine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.leucine + sum,
      0,
    ),
    lysine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.lysine + sum,
      0,
    ),
    methionine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.methionine + sum,
      0,
    ),
    phenylalanine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.phenylalanine + sum,
      0,
    ),
    proline: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.proline + sum,
      0,
    ),
    serine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.serine + sum,
      0,
    ),
    threonine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.threonine + sum,
      0,
    ),
    tryptophan: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.tryptophan + sum,
      0,
    ),
    tyrosine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.tyrosine + sum,
      0,
    ),
    valine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.valine + sum,
      0,
    ),
  };

  const {
    food: { image = '' },
  } = FoodService.getFoodByString({
    foods,
    text: mealData.name,
  });

  return {
    ...mealData,
    id: mealData?.id ?? Math.round(Math.random() * 1000),
    portions,
    calories: calculateCalories(portions),
    name: mealData.name,
    description: mealData?.description ?? '',
    image,
    gi: calculateGI(portions),
    acidification: calculateAcidification(portions),
    gl: calculateGC(portions),
    carbohydrates: calculateCarbohidrates(portions),
    aminoAcids: allAminoAcids,
  };
}

export function unFormat(meal: Meal): MealData {
  return {
    id: meal.id ?? MEAL_DATA.id,
    name: meal.name ?? MEAL_DATA.name,
    description: meal.description ?? MEAL_DATA.description,
    portions: meal.portions.map(PortionService.unFormat) ?? MEAL_DATA.portions,
    preparation: meal.preparation ?? MEAL_DATA.preparation,
  };
}

export function formatToShare(mealData: MealData): string {
  const json = JSON.stringify(mealData);

  return new URLSearchParams({ mealData: json }).toString();
}

export function unFormatToShare(paramString: string): MealData {
  const json = new URLSearchParams(paramString).get('mealData') ?? 'null';

  const mealData: MealData = JSON.parse(json);

  delete mealData.id;

  return mealData;
}
