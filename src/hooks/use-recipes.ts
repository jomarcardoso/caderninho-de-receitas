import remove from 'lodash/remove';
import { useState, useEffect } from 'react';
import { Food } from '../services/food';
import { RecipeService, Recipe, RecipeData } from '../services/recipe';

const RECIPES_LOCAL_STORAGE = 'recipes';

function get(foods: Array<Food>): Recipe[] {
  if (typeof window === 'undefined') return [];

  let recipesData: RecipeData[] =
    JSON.parse(localStorage.getItem(RECIPES_LOCAL_STORAGE) || 'null') ?? [];

  // legacy recipes
  if (!recipesData.length) {
    recipesData =
      JSON.parse(localStorage.getItem('saude-em-pontos') || 'null')?.recipes ??
      [];
  }

  return (
    recipesData?.map((recipeData) =>
      RecipeService.format({ recipeData, foods }),
    ) ?? []
  );
}

function saveAll(recipes: Recipe[]): void {
  if (typeof window === 'undefined') return;

  const recipesData = recipes.map((recipe) => RecipeService.unFormat(recipe));

  localStorage.setItem(RECIPES_LOCAL_STORAGE, JSON.stringify(recipesData));
}

export default function useRecipes(foods: Array<Food>): {
  recipes: Array<Recipe>;
  addRecipe(recipeData: RecipeData): number;
  removeRecipe(id: number): void;
} {
  const [recipes, setRecipes] = useState(get(foods));

  /**
   * @returns id
   */
  function addRecipe(recipeData: RecipeData): number {
    const id = recipeData.id || new Date().getTime();
    const editing = recipeData.id;
    const newRecipe: Recipe = RecipeService.format({
      recipeData: {
        ...recipeData,
        id,
      },
      foods,
    });

    if (editing) {
      const indexToChange = recipes.findIndex(
        ({ id: recipeIndex }) => recipeIndex === id,
      );

      const newRecipes = [...recipes];

      newRecipes[indexToChange] = newRecipe;

      setRecipes(newRecipes);

      return id;
    }

    setRecipes([...recipes, newRecipe]);

    return id;
  }

  function removeRecipe(id = 0) {
    const newRecipes = remove(recipes, (recipe) => recipe.id !== id);

    setRecipes(newRecipes);
  }

  useEffect(() => {
    saveAll(recipes);
  }, [recipes]);

  return {
    recipes,
    removeRecipe,
    addRecipe,
  };
}
