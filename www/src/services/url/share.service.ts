import { RecipeDto } from '../recipe/recipe.dto';
import { recipeDtoToText } from '../recipe/recipe.service';

const RECIPE_PARAM = 'recipeId';

function shareRecipe(recipe: RecipeDto): Promise<void> {
  const url = `${window.location.origin}?${RECIPE_PARAM}=${recipe.id}`;
  const title = recipe.name || 'Receita';

  if (!navigator.share) return Promise.resolve();

  return navigator.share({
    title,
    text: recipeDtoToText(recipe),
    url,
  });
}

// async function getRecipeByUrlParams(): Promise<RecipeDto | null> {
//   if (typeof window === 'undefined') {
//     return null;
//   }

//   const params = window.location.search;

//   if (!params) {
//     return null;
//   }

//   const recipeId = Number(new URLSearchParams(params).get(RECIPE_PARAM) ?? 0);

//   if (!recipeId) {
//     return null;
//   }

//   const recipe = await fetchRecipeById(recipeId);

//   delete recipe?.userId;
//   delete recipe?.id;

//   return recipe;
// }

export const ShareService = {
  shareRecipe,
  // getRecipeByUrlParams,
};
