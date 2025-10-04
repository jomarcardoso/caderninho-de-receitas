import type { Reducer } from 'react';
import type { Recipe } from '../../services/recipe/recipe.model';

interface State {
  recipe?: Recipe;
  lastRecipe?: Recipe;
}

interface Action {
  type: 'set' | 'restore_last';
  value?: Recipe;
}

export const currentRecipeReducer: Reducer<State, Action> = (state, action) => {
  if (action.type === 'set') {
    if (action.value && action.value.id) {
      return {
        lastRecipe: action.value,
        recipe: action.value,
      };
    }

    return {
      ...state,
      recipe: action.value,
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
