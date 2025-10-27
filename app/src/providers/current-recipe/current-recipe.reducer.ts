import type { Reducer } from 'react';

interface State {
  recipeId?: number;
  lastRecipeId?: number;
}

interface Action {
  type: 'set' | 'restore_last';
  value?: number;
}

export const currentRecipeReducer: Reducer<State, Action> = (state, action) => {
  if (action.type === 'set') {
    if (typeof action.value === 'number' && action.value > 0) {
      return {
        lastRecipeId: action.value,
        recipeId: action.value,
      };
    }

    return {
      ...state,
      recipeId: undefined,
    };
  }

  if (action.type === 'restore_last') {
    return {
      ...state,
      recipeId: state.lastRecipeId,
    };
  }

  return state;
};

