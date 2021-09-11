import { Food, AminoAcids, FoodService } from '../food';
import PortionService from '../portion/portion.service';
import { Portion } from '../portion/portion.types';
import { Recipe, RecipeData, RECIPE_DATA } from './recipe.types';

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
  recipeData = RECIPE_DATA,
  foods = [],
}: {
  recipeData: RecipeData;
  foods: Array<Food>;
}): Recipe {
  const portions = recipeData?.portions?.map((text) =>
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
    text: recipeData.name,
  });

  return {
    ...recipeData,
    id: recipeData?.id ?? Math.round(Math.random() * 1000),
    portions,
    calories: calculateCalories(portions),
    name: recipeData.name,
    description: recipeData?.description ?? '',
    image,
    gi: calculateGI(portions),
    acidification: calculateAcidification(portions),
    gl: calculateGC(portions),
    carbohydrates: calculateCarbohidrates(portions),
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
    portions:
      recipe.portions.map(PortionService.unFormat) ?? RECIPE_DATA.portions,
    preparation: recipe.preparation ?? RECIPE_DATA.preparation,
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
