import { User } from 'firebase/auth';
import {
  Firestore,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  collection,
  deleteDoc,
} from 'firebase/firestore';
import remove from 'lodash/remove';
import { useState, useEffect, useCallback } from 'react';
import { Food } from '../services/food';
import { RecipeService, RecipeData } from '../services/recipe';
import type { FirebaseHook } from './use-firebase';

const RECIPES_LOCAL_STORAGE = 'recipes';

function getRecipeDatas(): RecipeData[] {
  if (typeof window === 'undefined') return [];

  let recipesData: RecipeData[] =
    JSON.parse(localStorage.getItem(RECIPES_LOCAL_STORAGE) || 'null') ?? [];

  // legacy recipes
  if (!recipesData.length) {
    recipesData =
      JSON.parse(localStorage.getItem('cadertinho-de-receitas') || 'null')
        ?.recipes ?? [];
  }

  return recipesData;
}

function removeFromDB(id?: number, db?: Firestore) {
  if (db && id) {
    try {
      deleteDoc(doc(db, 'recipes', String(id)));
    } catch (e) {
      console.log('erro ao salvar receita', e);
    }
  }
}

function saveAllOnDB(recipesData: RecipeData[], db?: Firestore, user?: User) {
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

function saveRecipesInLocalStorage(recipesData: RecipeData[]) {
  localStorage.setItem(RECIPES_LOCAL_STORAGE, JSON.stringify(recipesData));
}

function getRecipesFromLocalStorage(): RecipeData[] {
  return (
    JSON.parse(localStorage.getItem(RECIPES_LOCAL_STORAGE) || 'null') ?? []
  );
}

function update(recipesData: RecipeData[], db?: Firestore, user?: User): void {
  if (typeof window === 'undefined') return;

  const savedRecipesData = getRecipesFromLocalStorage();

  const toRemove = savedRecipesData.filter(
    (recipeData) => !recipesData.some((saved) => recipeData.id === saved.id),
  );

  saveRecipesInLocalStorage(recipesData);

  if (toRemove.length) {
    toRemove.forEach((recipeToRemove) => removeFromDB(recipeToRemove.id, db));

    return;
  }

  saveAllOnDB(recipesData, db, user);
}

export default function useRecipes(
  foods: Array<Food>,
  firebase: FirebaseHook,
): {
  recipes: Array<RecipeData>;
  addRecipe(recipeData: RecipeData): number;
  removeRecipe(id: number): void;
} {
  const [recipes, setRecipes] = useState(getRecipeDatas());
  const [hasFetched, setHasFetched] = useState(false);

  /**
   * @returns id
   */
  function addRecipe(recipeData: RecipeData): number {
    const id = recipeData.id || new Date().getTime();
    const editing = recipeData.id;
    const newRecipe = {
      ...recipeData,
      id,
    };

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
      const uid = firebase.auth?.currentUser?.uid;

      if (!uid) {
        if (!hasFetched) {
          return;
        }

        setHasFetched(true);

        setTimeout(() => {
          getSavedRecipes(db);
        }, 1000);

        return;
      }

      setHasFetched(true);

      const q = query(collection(db, 'recipes'), where('userId', '==', uid));

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

          if (!storageRecipe) {
            recipesToStorage.push(recipeData);
          } else if (storageRecipe.lastUpdate < recipeData.lastUpdate) {
            const index = recipesToStorage.findIndex(
              (recipe) => recipe.id === storageRecipe.id,
            );

            recipesToStorage[index] = recipeData;
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
    if (firebase.db && !hasFetched) {
      getSavedRecipes(firebase.db);
    }
  }, [firebase, getSavedRecipes, hasFetched]);

  useEffect(() => {
    update(recipes, firebase.db, firebase.user);
  }, [firebase, recipes]);

  return {
    recipes,
    removeRecipe,
    addRecipe,
  };
}
