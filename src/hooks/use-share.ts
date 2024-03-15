import { ShareFunction } from '../contexts/share-context';
import { RecipeData, RecipeService } from '../services/recipe';

function shareFullRecipe(recipe: RecipeData) {
  const toShare = RecipeService.generateParamsToShare(recipe);
  const url = `${window.location.origin}?${toShare}#recipe` ?? '';
  const title = recipe.name || 'Receita';

  if (!navigator.share) return;

  navigator.share({
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

export function useShare(): ShareFunction {
  return (recipe: Parameters<ShareFunction>[0]) => {
    const hasId = !!recipe.id;

    if (!hasId) {
      shareFullRecipe(recipe as RecipeData);

      return;
    }
  };
}
