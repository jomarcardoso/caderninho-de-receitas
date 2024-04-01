import { useEffect, useState } from 'react';
import { Recipe } from '../services/recipe';
import { FirebaseHook } from './use-firebase';
import { ShareService } from '../services/url/share.service';

export function useSharedRecipe(firebase: FirebaseHook) {
  const [sharedRecipe, setSharedRecipe] = useState<Recipe | null>();
  async function getSharedRecipe() {
    const newSharedRecipe = await ShareService.getRecipeByUrlParams(
      firebase.db,
    );

    if (newSharedRecipe) {
      setSharedRecipe(newSharedRecipe as Recipe);
    }
  }

  function handleRecipeId(newRecipe: Recipe) {
    if (sharedRecipe && !newRecipe) {
      window.location.search = '';
    }

    setSharedRecipe(newRecipe);
  }

  useEffect(() => {
    getSharedRecipe();
  }, [firebase?.db]);

  return {
    sharedRecipe,
    setSharedRecipe: handleRecipeId,
  };
}
