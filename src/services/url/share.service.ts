import { RecipeData, RecipeService } from '../recipe';

function shareFullRecipe(recipe: RecipeData): Promise<void> {
  const toShare = RecipeService.generateParamsToShare(recipe);
  const url = `${window.location.origin}?${toShare}#recipe` ?? '';
  const title = recipe.name || 'Receita';

  if (!navigator.share) return Promise.resolve();

  return navigator.share({
    title,
    text: title,
    url,
  });
}

function shareIdRecipe(recipe: RecipeData) {
  const url = `${window.location.origin}?sharedId=${recipe.id}#recipe` ?? '';
  const title = recipe.name || 'Receita';

  if (!navigator.share) return;

  navigator.share({
    title,
    text: title,
    url,
  });
}

export const ShareService = {
  shareFullRecipe,
  shareIdRecipe,
};
