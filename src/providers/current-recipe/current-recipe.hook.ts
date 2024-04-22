import { useContext, useEffect, useReducer, useState } from 'react';
import { RECIPE, Recipe } from '../../services/recipe';
import { STORAGE_CURRENT_RECIPE } from '../../storage/storage.service';
import { StorageService } from '../../storage';
import { currentRecipeReducer } from './current-recipe.reducer';
import { RecipesContext } from '../recipes/recipes.context';
import { last } from 'lodash';

let initialRecipe = RECIPE;

if (typeof window !== 'undefined') {
  const editingRecipeJson = localStorage.getItem(STORAGE_CURRENT_RECIPE);

  if (editingRecipeJson) {
    initialRecipe = JSON.parse(editingRecipeJson) as Recipe;
  }
}

export const useRecipe = (): {
  currentRecipe: Recipe;
  setCurrentRecipe: React.Dispatch<React.SetStateAction<Recipe>>;
  restoreLastRecipe(): void;
} => {
  const { recipes = [] } = useContext(RecipesContext);
  const lastRegisteredRecipe = last(recipes) || RECIPE;

  if (!initialRecipe.name) {
    initialRecipe = lastRegisteredRecipe;
  }

  const [state, dispatch] = useReducer(currentRecipeReducer, {
    recipe: initialRecipe,
    lastRecipe: initialRecipe,
  });

  function restoreLastRecipe() {
    dispatch({
      type: 'restore_last',
    });
  }

  function setCurrentRecipe(value: Recipe) {
    dispatch({
      type: 'set',
      value,
    });
  }

  useEffect(() => {
    StorageService.setCurrentRecipe(state.recipe);
  }, [state.recipe]);

  return {
    currentRecipe: state.recipe,
    setCurrentRecipe,
    restoreLastRecipe,
  };
};
