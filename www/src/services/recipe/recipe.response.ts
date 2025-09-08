import { Food } from '../food';
import { RecipeStepResponseDto } from '../recipe-step';
import { RecipeBase } from './recipe.types';

export type RecipeResponseDto = RecipeBase<RecipeStepResponseDto>;

// Wrapper com recipes + foods
export interface RecipeAndFoodResponseDto {
  recipes: RecipeResponseDto[];
  foods: Food[];
}
