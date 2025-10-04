import { useContext, useEffect, useMemo, useReducer } from 'react';
import { STORAGE_CURRENT_RECIPE } from '../../storage/storage.service';
import { StorageService } from '../../storage';
import { currentRecipeReducer } from './current-recipe.reducer';
import { DataContext } from '../data/data.context';
import { last } from 'lodash';
import { Recipe } from '../../services/recipe/recipe.model';
import type { CurrentRecipeContextProps } from './current-recipe.context';

let initialRecipeId = 0;

if (typeof window !== 'undefined') {
  const editingRecipeId = localStorage.getItem(STORAGE_CURRENT_RECIPE);

  if (editingRecipeId) {
    initialRecipeId = Number(editingRecipeId);
  }
}

export const useRecipe = (): CurrentRecipeContextProps => {
  const {
    data: { recipes },
  } = useContext(DataContext);
  const lastRegisteredRecipe = last(recipes);
  const currentRecipe = useMemo(() => {
    if (!initialRecipeId) {
      return lastRegisteredRecipe;
    }

    return recipes.find((r) => r.id === initialRecipeId);
  }, [recipes]);

  const [state, dispatch] = useReducer(currentRecipeReducer, {
    recipe: currentRecipe,
    lastRecipe: lastRegisteredRecipe,
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
    if (state.recipe) {
      StorageService.setCurrentRecipe(state.recipe);
    }
  }, [state.recipe]);

  return {
    currentRecipe: state.recipe,
    setCurrentRecipe,
    restoreLastRecipe,
  };
};
