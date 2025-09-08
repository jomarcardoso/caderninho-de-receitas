import { IngredientResponseDto } from '../recipe/recipe.response';
import { RecipeStepBase } from './recipe-step.types';

export type RecipeStepResponseDto = RecipeStepBase<IngredientResponseDto>;
