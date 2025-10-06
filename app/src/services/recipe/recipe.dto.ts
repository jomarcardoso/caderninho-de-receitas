import type { RecipeStepDto } from '../recipe-step';
import type { RecipeContract } from './recipe.types';

export type RecipeDto = RecipeContract<RecipeStepDto>;
