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

export interface RecipeBase<TRecipeStep> {
  id?: number;
  title: string;
  description?: string;
  additional?: string;
  image: string;
  steps: TRecipeStep;
  // category: RecipeCategory | '';
  lastUpdate: number;
  needSync?: boolean;
  userId?: number;
  nutritionalInformation: NutritionalInformation;
  minerals: Minerals;
  vitamins: Vitamins;
  aminoAcids: AminoAcids;
}

export const RECIPE_STEP: RecipeStep = {
  title: '',
  ingredients: '',
  preparation: '',
  additional: '',
};

export const RECIPE: Recipe = {
  id: 0,
  title: '',
  description: '',
  additional: '',
  category: '',
  steps: [],
  lastUpdate: Date.now(),
};

export type SetRecipe = (recipe: Recipe) => number;

// public class RecipeAndFoodResponseDto
// {
//   public List<RecipeResponseDto> Recipes { get; set; } = new();
//   public List<Food> Foods { get; set; } = new();
// }
