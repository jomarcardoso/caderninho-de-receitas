import { type Language } from 'services/language/language.types';
import type { RecipeDto } from 'services/recipe/recipe.dto';

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

export const STORAGE_MY_RECIPES = 'myRecipes';

export const STORAGE_LANGUAGE = 'language';

export function setLanguage(language: Language): void {
  localStorage.setItem(STORAGE_LANGUAGE, JSON.stringify(language));
}

export function removeCurrentRecipe(): void {
  localStorage.removeItem(STORAGE_CURRENT_RECIPE);
}

export function setCurrentRecipeId(recipeId: number): void {
  localStorage.setItem(STORAGE_CURRENT_RECIPE, String(recipeId));
}

export function getCurrentRecipeId(): number | undefined {
  const recipeId = localStorage.getItem(STORAGE_CURRENT_RECIPE);
  if (!recipeId) return;
  const parsed = Number(recipeId);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

