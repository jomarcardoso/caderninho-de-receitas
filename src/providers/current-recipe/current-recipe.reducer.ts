import { Reducer } from 'react';
import { RECIPE, Recipe } from '../../services/recipe';

interface State {
  recipe: Recipe;
  lastRecipe: Recipe;
}

interface Action {
  type: 'set' | 'restore_last';
  value?: Recipe;
}

export const currentRecipeReducer: Reducer<State, Action> = (state, action) => {
  if (action.type === 'set') {
    if (action.value && action.value.id) {
      return {
        lastRecipe: action.value || RECIPE,
        recipe: action.value || RECIPE,
      };
    }

    return {
      ...state,
      recipe: action.value || RECIPE,
    };
  }

  if (action.type === 'restore_last') {
    return {
      ...state,
      recipe: state.lastRecipe,
    };
  }

  return state;
};
