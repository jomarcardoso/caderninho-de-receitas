import { useEffect, useState } from 'react';
import {
  ProcessedRecipe,
  Recipe,
  RecipeService,
  RECIPE,
} from '../services/recipe';
import { StorageService } from '../storage';
import { STORAGE_CURRENT_RECIPE } from '../storage/storage.service';

let initialRecipe = RECIPE;

if (typeof window !== 'undefined') {
  const editingRecipeJson = localStorage.getItem(STORAGE_CURRENT_RECIPE);

  if (editingRecipeJson) {
    initialRecipe = JSON.parse(editingRecipeJson) as Recipe;
  }
}

if (typeof window !== 'undefined') {
  const sharedString = window.location.search;

  if (sharedString) {
    const recipeShared = RecipeService.generateRecipeByParams(sharedString);

    if (recipeShared.steps[0]?.ingredients?.length) {
      initialRecipe = recipeShared;

      StorageService.setCurrentRecipe(recipeShared);
      window.location.search = '';
    }
  }
}

const useRecipe = (
  lastRegisteredRecipe: Recipe,
): {
  currentRecipe: Recipe;
  setCurrentRecipe: React.Dispatch<React.SetStateAction<Recipe>>;
  setCurrentRecipe(recipe: ProcessedRecipe): void;
  restoreLastRecipe(): void;
} => {
  if (!initialRecipe.name) {
    initialRecipe = lastRegisteredRecipe;
  }

  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const [lastRecipe, setLastRecipe] = useState<Recipe>(initialRecipe);

  function setCurrentRecipe(data: Recipe) {
    if (recipe.id) {
      setLastRecipe(recipe);
    }

    setRecipe(data);
  }

  function setCurrentRecipe(recipe: Recipe) {
    if (recipe.id) {
      setLastRecipe(recipe);
    }

    setRecipe(recipe);
  }

  function restoreLastRecipe() {
    setRecipe(lastRecipe);
  }

  useEffect(() => {
    StorageService.setCurrentRecipe(recipe);
  }, [recipe]);

  return {
    currentRecipe: recipe,
    setCurrentRecipe,
    setCurrentRecipe,
    restoreLastRecipe,
  };
};

export default useRecipe;
