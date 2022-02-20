import remove from 'lodash/remove';
import { useState, useEffect } from 'react';
import AccountService, {
  AccountAndSet,
  SetAccount,
} from '../services/account.service';
import { Food } from '../services/food';
import { RecipeService, Recipe, RecipeData } from '../services/recipe';

export default function useAccount(foods: Array<Food>): AccountAndSet {
  const [account, _setAccount] = useState(AccountService.get(foods));

  function setRecipe(recipeData: RecipeData): number {
    const id = recipeData.id || new Date().getTime();

    const recipe: Recipe = RecipeService.format({
      recipeData: {
        ...recipeData,
        id,
      },
      foods,
    });

    const editing = recipeData.id;

    if (editing) {
      const indexToChange = account.recipes.findIndex(
        ({ id: recipeIndex }) => recipeIndex === id,
      );

      account.recipes[indexToChange] = recipe;

      _setAccount({
        ...account,
        recipes: account.recipes,
      });

      return id;
    }

    _setAccount({
      ...account,
      recipes: [...account.recipes, recipe],
    });

    return id;
  }

  function removeRecipe(id = 0) {
    const newRecipes = remove(account.recipes, (recipe) => recipe.id !== id);

    _setAccount({
      ...account,
      recipes: newRecipes,
    });
  }

  function setHasCompletedTutorial(value = true) {
    _setAccount({
      ...account,
      hasCompletedTutorial: value,
    });
  }

  useEffect(() => {
    AccountService.save(account);
  }, [account]);

  const setAccount: SetAccount = {
    recipe: setRecipe,
    removeRecipe,
    completedTutorial: setHasCompletedTutorial,
  };

  return {
    account,
    setAccount,
  };
}
