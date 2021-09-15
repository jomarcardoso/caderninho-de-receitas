import { Food, AminoAcids, FoodService } from '../food';
import PortionService from '../portion/portion.service';
import { Portion } from '../portion/portion.types';
import {
  Recipe,
  RecipeData,
  RecipePart,
  RecipePartData,
  RECIPE,
  RECIPE_DATA,
  RECIPE_PART,
  RECIPE_PART_DATA,
} from './recipe.types';

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

export function formatPart(
  data: RecipePartData,
  foods: Array<Food>,
): RecipePart {
  const portions: Array<Portion> = data?.portions?.split('\n').map((text) => {
    return PortionService.portionFromString({ text, foods });
  });

  return {
    name: data?.name ?? RECIPE_PART.name,
    portions: portions ?? RECIPE_PART.portions,
    preparation: data?.preparation ?? RECIPE_PART.preparation,
  };
}

export function format({
  recipeData = RECIPE_DATA,
  foods = [],
}: {
  recipeData: RecipeData;
  foods: Array<Food>;
}): Recipe {
  const parts =
    recipeData?.parts?.map((partData) => formatPart(partData, foods)) ??
    RECIPE.parts;

  const allPortions = parts.flatMap(({ portions }) => {
    return portions;
  });

  const allAminoAcids: AminoAcids = {
    alanine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.alanine + sum,
      0,
    ),
    arginine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.arginine + sum,
      0,
    ),
    asparticAcid: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.asparticAcid + sum,
      0,
    ),
    cystine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.cystine + sum,
      0,
    ),
    glutamicAcid: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.glutamicAcid + sum,
      0,
    ),
    glutamine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.glutamine + sum,
      0,
    ),
    glycine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.glycine + sum,
      0,
    ),
    histidine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.histidine + sum,
      0,
    ),
    isoleucine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.isoleucine + sum,
      0,
    ),
    leucine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.leucine + sum,
      0,
    ),
    lysine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.lysine + sum,
      0,
    ),
    methionine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.methionine + sum,
      0,
    ),
    phenylalanine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.phenylalanine + sum,
      0,
    ),
    proline: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.proline + sum,
      0,
    ),
    serine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.serine + sum,
      0,
    ),
    threonine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.threonine + sum,
      0,
    ),
    tryptophan: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.tryptophan + sum,
      0,
    ),
    tyrosine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.tyrosine + sum,
      0,
    ),
    valine: allPortions.reduce(
      (sum, { aminoAcids }) => aminoAcids.valine + sum,
      0,
    ),
  };

  const {
    food: { image = '' },
  } = FoodService.getFoodByString({
    foods,
    text: recipeData.name,
  });

  return {
    ...recipeData,
    id: recipeData?.id ?? Math.round(Math.random() * 1000),
    parts,
    calories: calculateCalories(allPortions),
    name: recipeData.name,
    description: recipeData?.description ?? '',
    image,
    gi: calculateGI(allPortions),
    acidification: calculateAcidification(allPortions),
    gl: calculateGC(allPortions),
    carbohydrates: calculateCarbohidrates(allPortions),
    aminoAcids: allAminoAcids,
    category: recipeData?.category ?? RECIPE_DATA.category,
  };
}

export function unFormat(recipe: Recipe): RecipeData {
  return {
    id: recipe.id ?? RECIPE_DATA.id,
    category: recipe?.category ?? RECIPE_DATA.category,
    name: recipe.name ?? RECIPE_DATA.name,
    description: recipe.description ?? RECIPE_DATA.description,
    parts: recipe.parts.map((part) => ({
      name: part.name,
      portions:
        part.portions.map(PortionService.unFormat).join('\n') ??
        RECIPE_PART_DATA.portions,
      preparation: part.preparation ?? RECIPE_PART_DATA.preparation,
    })),
  };
}

export function formatToShare(recipeData: RecipeData): string {
  const copy = { ...recipeData };

  delete copy.id;
  const json = JSON.stringify(recipeData);

  return new URLSearchParams({ recipeData: json }).toString();
}

export function unFormatToShare(paramString: string): RecipeData {
  const json = new URLSearchParams(paramString).get('recipeData') ?? 'null';

  const recipeData: RecipeData = JSON.parse(json);

  if (!recipeData?.id) {
    return RECIPE_DATA;
  }

  delete recipeData.id;

  return recipeData;
}
