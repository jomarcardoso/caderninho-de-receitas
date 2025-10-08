import { type Language } from 'services/language/language.types';
import type { RecipeDto } from 'services/recipe/recipe.dto';
import type { Recipe } from 'services/recipe/recipe.model';
import { mapRecipeModelToDto } from 'services/recipe/recipe.service';

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

export function setCurrentRecipe(recipe: Recipe | RecipeDto): void {
  const recipeDto = mapRecipeModelToDto(recipe);

  localStorage.setItem(STORAGE_CURRENT_RECIPE, JSON.stringify(recipeDto));
}

export function getCurrentRecipe(): RecipeDto | undefined {
  const recipe = localStorage.getItem(STORAGE_CURRENT_RECIPE);

  if (!recipe) {
    return;
  }

  return JSON.parse(recipe);
}

