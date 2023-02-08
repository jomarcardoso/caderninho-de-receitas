import { User } from 'firebase/auth';
import {
  Firestore,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  collection,
} from 'firebase/firestore';
import remove from 'lodash/remove';
import { useState, useEffect, useCallback } from 'react';
import { Food } from '../services/food';
import { RecipeService, Recipe, RecipeData } from '../services/recipe';
import type { FirebaseHook } from './use-firebase';

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

function saveAll(recipes: Recipe[], db?: Firestore, user?: User): void {
  if (typeof window === 'undefined') return;

  const recipesData = recipes.map((recipe) => RecipeService.unFormat(recipe));

  localStorage.setItem(RECIPES_LOCAL_STORAGE, JSON.stringify(recipesData));

  if (db && user) {
    recipesData.forEach((recipeData) => {
      try {
        setDoc(doc(db, 'recipes', String(recipeData.id)), {
          ...recipeData,
          userId: user.uid,
        });
      } catch (e) {
        console.log('erro ao salvar receita', e);
      }
    });
  }
}

export default function useRecipes(
  foods: Array<Food>,
  firebase: FirebaseHook,
): {
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

  const getSavedRecipes = useCallback(
    async (db: Firestore) => {
      if (!firebase.user?.uid) return;

      const q = query(
        collection(db, 'recipes'),
        where('userId', '==', firebase.user.uid),
      );

      try {
        const querySnapshot = await getDocs(q);
        const recipesToStorage = [...recipes];

        querySnapshot.forEach((doc3) => {
          const data = doc3.data();

          delete data.userId;

          const recipeData = data as RecipeData;
          const storageRecipe = recipes.find(
            (recipe) => recipe.id === recipeData.id,
          );

          const formattedRecipe = RecipeService.format({ recipeData, foods });

          if (!storageRecipe) {
            recipesToStorage.push(formattedRecipe);
          } else if (
            storageRecipe.lastUpdate.getTime() < recipeData.lastUpdate
          ) {
            const index = recipesToStorage.findIndex(
              (recipe) => recipe.id === storageRecipe.id,
            );

            recipesToStorage[index] = formattedRecipe;
          }
        });

        if (recipesToStorage.length !== recipes.length) {
          setRecipes(recipesToStorage);
        }
      } catch (error) {
        console.log('erro ao buscar receitas', error);
      }
    },
    [firebase.user?.uid, foods, recipes],
  );

  useEffect(() => {
    if (firebase.db) {
      getSavedRecipes(firebase.db);
    }
  }, [firebase.db, getSavedRecipes]);

  useEffect(() => {
    saveAll(recipes, firebase.db, firebase.user);
  }, [firebase, recipes]);

  return {
    recipes,
    removeRecipe,
    addRecipe,
  };
}
