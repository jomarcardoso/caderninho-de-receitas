import { translate } from '../language/language.service';
import { Language } from '../language/language.types';
import { RecipeDto } from '../recipe/recipe.dto';
import { Recipe } from '../recipe/recipe.model';
import {
  mapRecipeModelToDto,
  recipeDtoToText,
} from '../recipe/recipe.service';

const RECIPE_PARAM = 'recipeId';

function shareRecipe(recipe: Recipe | RecipeDto, language: Language = 'pt'): Promise<void> {
  const recipeDto = mapRecipeModelToDto(recipe);
  const url = `${window.location.origin}?${RECIPE_PARAM}=${recipeDto.id}`;
  const title = recipeDto.name || translate('recipeFallbackTitle', language);

  if (!navigator.share) return Promise.resolve();

  return navigator.share({
    title,
    text: recipeDtoToText(recipeDto, language),
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
