import { useEffect, useState } from 'react';
import { Recipe, RecipeService, RECIPE } from '../services/recipe';
import { StorageService } from '../storage';
import { STORAGE_CURRENT_RECIPE } from '../storage/storage.service';
import { FirebaseHook } from '../providers/firebase/firebase.hook';
import { ShareService } from '../services/url/share.service';

let initialRecipe = RECIPE;

if (typeof window !== 'undefined') {
  const editingRecipeJson = localStorage.getItem(STORAGE_CURRENT_RECIPE);

  if (editingRecipeJson) {
    initialRecipe = JSON.parse(editingRecipeJson) as Recipe;
  }
}

const useRecipe = (
  lastRegisteredRecipe: Recipe,
): {
  currentRecipe: Recipe;
  setCurrentRecipe: React.Dispatch<React.SetStateAction<Recipe>>;
  restoreLastRecipe(): void;
} => {
  if (!initialRecipe.name) {
    initialRecipe = lastRegisteredRecipe;
  }

  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const [lastRecipe, setLastRecipe] = useState<Recipe>(initialRecipe);

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
    restoreLastRecipe,
  };
};

export default useRecipe;
