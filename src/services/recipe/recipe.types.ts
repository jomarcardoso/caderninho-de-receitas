import { AminoAcids, AMINO_ACIDS } from '../food';
import { Portion } from '../portion/portion.types';

export interface Recipe {
  id: number;
  name: string;
  description: string;
  image: string;
  portions: Array<Portion>;
  calories: number;
  gi: number;
  gl: number;
  carbohydrates: number;
  acidification: number;
  aminoAcids: AminoAcids;
  preparation: string;
}

export interface RecipeData {
  id?: number;
  name: string;
  description?: string;
  portions: Array<string>;
  preparation: string;
}

export const RECIPE_DATA: RecipeData = {
  id: 0,
  name: '',
  description: '',
  portions: [],
  preparation: '',
};

export const RECIPE: Recipe = {
  calories: 0,
  description: '',
  image: '',
  name: '',
  id: 0,
  portions: [],
  gi: 0,
  acidification: 0,
  gl: 0,
  carbohydrates: 0,
  aminoAcids: AMINO_ACIDS,
  preparation: '',
};

export type SetRecipe = (recipeData: RecipeData) => number;
