import { Food, Measure } from '../food';
import { RecipeStepResponseDto } from '../recipe-step';

// Ingredient com referência numérica (FoodId)
export interface IngredientResponseDto {
  id: number;
  text: string;
  food: number; // FoodId
  quantity: number;
  measure: Measure;
}

export interface RecipeResponseDto {
  id: number;
  name: string;
  description?: string;
  additional?: string;
  steps: RecipeStepResponseDto[];
  ownerId: string;
}

// Wrapper com recipes + foods
export interface RecipeAndFoodResponseDto {
  recipes: RecipeResponseDto[];
  foods: Food[];
}
