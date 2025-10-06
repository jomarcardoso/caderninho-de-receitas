// import { useEffect, useState } from 'react';
// import { ShareService } from '../services/url/share.service';
// import { RecipeDto } from '../services/recipe/recipe.dto';

// export function useSharedRecipe() {
//   const [sharedRecipe, setSharedRecipe] = useState<RecipeDto | null>();
//   async function getSharedRecipe() {
//     const newSharedRecipe = await ShareService.getRecipeByUrlParams();

//     if (newSharedRecipe) {
//       setSharedRecipe(newSharedRecipe as RecipeDto);
//     }
//   }

//   function handleRecipeId(newRecipe: Recipe | null) {
//     if (sharedRecipe && !newRecipe) {
//       window.location.search = '';
//     }

//     setSharedRecipe(newRecipe);
//   }

//   useEffect(() => {
//     getSharedRecipe();
//   }, []);

//   return {
//     sharedRecipe,
//     setSharedRecipe: handleRecipeId,
//   };
// }
