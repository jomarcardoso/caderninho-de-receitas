import { useContext, useEffect, useReducer } from 'react';
import { STORAGE_CURRENT_RECIPE } from '../../storage/storage.service';
import { StorageService } from '../../storage';
import { currentRecipeReducer } from './current-recipe.reducer';
import { DataContext } from '../data/recipes.context';
import { last } from 'lodash';
import { Recipe } from '../../services/recipe/recipe.model';

let initialRecipe: Recipe | undefined = undefined;

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
  const { data: recipes = [] } = useContext(DataContext);
  const lastRegisteredRecipe = last(recipes);

  if (!initialRecipe?.name) {
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
