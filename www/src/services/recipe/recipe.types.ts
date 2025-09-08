import { AminoAcids, AMINO_ACIDS } from '../amino-acid';
import { MINERALS, Minerals } from '../mineral';
import { NutritionalInformation } from '../nutritional-information';
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

export interface RecipeContract<TRecipeStep> {
  id?: number;
  name: string;
  description?: string;
  additional?: string;
  steps: TRecipeStep;
  // category: RecipeCategory | '';
  lastUpdate: number;
  needSync?: boolean;
}

export interface RecipeBase<TRecipeStep> extends RecipeContract<TRecipeStep> {
  userId?: number;
  nutritionalInformation: NutritionalInformation;
  minerals: Minerals;
  vitamins: Vitamins;
  aminoAcids: AminoAcids;
}

export type SetRecipe = (recipe: RecipeBase) => number;
