import { RecipeData, RECIPE_DATA } from '../services/recipe';

export interface GlobalObject {
  isSharedUrl: boolean;
}

declare global {
  interface Window {
    SaudeEmPontos: GlobalObject;
  }
}

if (typeof window !== 'undefined') {
  window.SaudeEmPontos = window.SaudeEmPontos || {
    isSharedUrl: false,
  };
}

export const STORAGE_CURRENT_RECIPE = 'currentRecipe';

export const STORAGE_CURRENT_RECIPE_ID = 'currentRecipeId';

export const STORAGE_MY_RECIPES = 'myRecipes';

export function removeCurrentRecipe(): void {
  localStorage.removeItem(STORAGE_CURRENT_RECIPE);
}

export function setCurrentRecipe(recipe: RecipeData): void {
  localStorage.setItem(STORAGE_CURRENT_RECIPE, JSON.stringify(recipe));
}

export function getCurrentRecipe(): RecipeData {
  const recipe = localStorage.getItem(STORAGE_CURRENT_RECIPE);

  if (!recipe) {
    return RECIPE_DATA;
  }

  return JSON.parse(recipe);
}
