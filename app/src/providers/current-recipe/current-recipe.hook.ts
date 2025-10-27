import { useContext, useEffect, useMemo, useReducer } from 'react';
import { STORAGE_CURRENT_RECIPE } from '../../storage/storage.service';
import { StorageService } from '../../storage';
import { currentRecipeReducer } from './current-recipe.reducer';
import { DataContext } from '../data/data.context';
import { last } from 'lodash';
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
  const lastRegisteredRecipeId = useMemo(() => last(recipes)?.id, [recipes]);

  const [state, dispatch] = useReducer(currentRecipeReducer, {
    recipeId: initialRecipeId || lastRegisteredRecipeId,
    lastRecipeId: lastRegisteredRecipeId,
  });

  function restoreLastRecipe() {
    dispatch({
      type: 'restore_last',
    });
  }

  function setCurrentRecipeId(value?: number) {
    dispatch({
      type: 'set',
      value,
    });
  }

  useEffect(() => {
    if (state.recipeId) {
      StorageService.setCurrentRecipeId(state.recipeId);
    }
  }, [state.recipeId]);

  return {
    currentRecipeId: state.recipeId,
    setCurrentRecipeId,
    restoreLastRecipe,
  };
};

