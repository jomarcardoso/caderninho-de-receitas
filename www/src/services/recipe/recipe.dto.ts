import { RecipeStepDto } from '../recipe-step';
import { RecipeContract } from './recipe.types';

export type RecipeDto = RecipeContract<RecipeStepDto[]>;
