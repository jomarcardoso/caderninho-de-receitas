import { AminoAcids, AMINO_ACIDS } from '../food';
import { Portion } from '../portion/portion.types';

export type RecipeCategory =
  | 'pão'
  | 'molho'
  | 'salada'
  | 'sobremesa'
  | 'bolo'
  | 'comida'
  | 'lanche'
  | 'aperitivo'
  | 'bebida';

export const recipeCategoryList: Array<RecipeCategory> = [
  'aperitivo',
  'bebida',
  'bolo',
  'comida',
  'lanche',
  'molho',
  'pão',
  'salada',
  'sobremesa',
];

export interface RecipePart {
  name: string;
  portions: Array<Portion>;
  preparation: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  image: string;
  calories: number;
  gi: number;
  gl: number;
  carbohydrates: number;
  acidification: number;
  aminoAcids: AminoAcids;
  category: RecipeCategory | '';
  parts: Array<RecipePart>;
}

export interface RecipePartData {
  name: string;
  portions: Array<string>;
  preparation: string;
}

export interface RecipeData {
  id?: number;
  name: string;
  description?: string;
  parts: Array<RecipePartData>;
  category: RecipeCategory | '';
}

export const RECIPE_PART_DATA: RecipePartData = {
  name: '',
  portions: [],
  preparation: '',
};

export const RECIPE_DATA: RecipeData = {
  id: 0,
  name: '',
  description: '',
  category: '',
  parts: [],
};

export const RECIPE_PART: RecipePart = {
  name: '',
  portions: [],
  preparation: '',
};

export const RECIPE: Recipe = {
  calories: 0,
  description: '',
  image: '',
  name: '',
  id: 0,
  parts: [],
  gi: 0,
  acidification: 0,
  gl: 0,
  carbohydrates: 0,
  aminoAcids: AMINO_ACIDS,
  category: '',
};

export type SetRecipe = (recipeData: RecipeData) => number;
