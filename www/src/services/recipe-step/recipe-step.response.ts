import { IngredientResponseDto } from '../recipe/recipe.response';

export interface RecipeStepResponseDto {
  id: number;
  name: string;
  ingredientsText: string;
  ingredients: IngredientResponseDto[];
  preparation: string;
  additional: string;
}
