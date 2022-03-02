import { AminoAcids, AMINO_ACIDS } from '../amino-acid';
import { Ingredient } from '../ingredient/ingredient.types';
import { MINERALS, Minerals } from '../mineral';
import { VITAMINS, Vitamins } from '../vitamin';

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

export interface RecipeStep {
  name: string;
  ingredients: Array<Ingredient>;
  preparation: string;
  additional: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  additional: string;
  image: string;
  calories: number;
  gi: number;
  gl: number;
  carbohydrates: number;
  totalFat: number;
  dietaryFiber: number;
  proteins: number;
  acidification: number;
  aminoAcids: AminoAcids;
  category: RecipeCategory | '';
  steps: Array<RecipeStep>;
  vitamins: Vitamins;
  minerals: Minerals;
}

export interface RecipeStepData {
  name: string;
  ingredients: string;
  preparation: string;
  additional: string;
}

export interface RecipeData {
  id?: number;
  name: string;
  description?: string;
  additional?: string;
  steps: Array<RecipeStepData>;
  category: RecipeCategory | '';
}

export const RECIPE_STEP_DATA: RecipeStepData = {
  name: '',
  ingredients: '',
  preparation: '',
  additional: '',
};

export const RECIPE_DATA: RecipeData = {
  id: 0,
  name: '',
  description: '',
  additional: '',
  category: '',
  steps: [],
};

export const RECIPE_STEP: RecipeStep = {
  name: '',
  ingredients: [],
  preparation: '',
  additional: '',
};

export const RECIPE: Recipe = {
  calories: 0,
  description: '',
  additional: '',
  image: '',
  name: '',
  id: 0,
  steps: [],
  gi: 0,
  acidification: 0,
  gl: 0,
  carbohydrates: 0,
  totalFat: 0,
  dietaryFiber: 0,
  proteins: 0,
  aminoAcids: AMINO_ACIDS,
  vitamins: VITAMINS,
  minerals: MINERALS,
  category: '',
};

export type SetRecipe = (recipeData: RecipeData) => number;
