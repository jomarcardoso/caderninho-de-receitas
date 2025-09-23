import { Language } from '../services/language/language.types';
import { RecipeDto } from '../services/recipe/recipe.dto';

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

export const STORAGE_LANGUAGE = 'language';

export function setLanguage(language: Language): void {
  localStorage.setItem(STORAGE_LANGUAGE, JSON.stringify(language));
}

export function removeCurrentRecipe(): void {
  localStorage.removeItem(STORAGE_CURRENT_RECIPE);
}

export function setCurrentRecipe(recipe: RecipeDto): void {
  localStorage.setItem(STORAGE_CURRENT_RECIPE, JSON.stringify(recipe));
}

export function getCurrentRecipe(): RecipeDto | undefined {
  const recipe = localStorage.getItem(STORAGE_CURRENT_RECIPE);

  if (!recipe) {
    return;
  }

  return JSON.parse(recipe);
}
