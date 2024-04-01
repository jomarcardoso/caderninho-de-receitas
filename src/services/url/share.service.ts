import { Firestore } from 'firebase/firestore';
import { RECIPE, Recipe, RecipeService } from '../recipe';

const RECIPE_PARAM = 'recipeId';

function shareRecipe(recipe: Recipe): Promise<void> {
  const url = `${window.location.origin}?${RECIPE_PARAM}=${recipe.id}` ?? '';
  const title = recipe.name || 'Receita';

  if (!navigator.share) return Promise.resolve();

  return navigator.share({
    title,
    text: RecipeService.formatToText(recipe),
    url,
  });
}

async function getRecipeByUrlParams(db?: Firestore): Promise<Recipe | null> {
  if (typeof window === 'undefined' || !db) {
    return null;
  }

  const params = window.location.search;

  if (!params) {
    return null;
  }

  const recipeId = Number(new URLSearchParams(params).get(RECIPE_PARAM) ?? 0);

  if (!recipeId) {
    return null;
  }

  const recipe = await RecipeService.getRecipeByIdFromDB(recipeId, db);

  delete recipe?.userId;
  delete recipe?.id;

  return recipe;
}

export const ShareService = {
  shareRecipe,
  getRecipeByUrlParams,
};
