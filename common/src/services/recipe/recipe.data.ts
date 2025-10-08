import { FOODS_DATA } from '../food/food.data';
import type { RecipesData } from './recipe.model';

export const RECIPES_DATA: RecipesData = {
  ...FOODS_DATA,
  recipes: [],
};
