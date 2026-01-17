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
import { Recipe } from '../../services/recipe';
import type { FirebaseHook } from '../firebase/firebase.hook';

const RECIPES_STORAGE = 'recipes';

function saveRecipesInLocalStorage(recipes: Recipe[]) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(RECIPES_STORAGE, JSON.stringify(recipes));
}

function getRecipesFromLocalStorage(): Recipe[] {
  if (typeof window === 'undefined') return [];

  return JSON.parse(localStorage.getItem(RECIPES_STORAGE) || 'null') ?? [];
}

function removeFromDB(id?: number, db?: Firestore) {
  if (db && id) {
    try {
      deleteDoc(doc(db, RECIPES_STORAGE, String(id)));
    } catch (e) {
      console.log('erro ao salvar receita', e);
    }
  }
}

export function useRecipes(firebase: FirebaseHook): {
  recipes: Array<Recipe>;
  addRecipe(recipe: Recipe): number;
  removeRecipe(id: number): void;
} {
  const [recipes, setRecipes] = useState(getRecipesFromLocalStorage());
  const [hasFetched, setHasFetched] = useState(false);

  const saveAllOnDB = (db?: Firestore, user?: User) => {
    if (!db || !user) {
      return;
    }

    const recipesToSync = recipes.filter((recipe) => recipe.needSync);

    recipesToSync.forEach(async (recipe) => {
      const newRecipe = {
        ...recipe,
        userId: user.uid,
      };

      delete newRecipe.needSync;

      try {
        await setDoc(doc(db, RECIPES_STORAGE, String(recipe.id)), newRecipe);

        setRecipes(recipes.map((recipe) => ({ ...recipe, needSync: false })));
      } catch (e) {
        console.log('erro ao salvar receita', e);
      }
    });
  };

  const update = (recipes: Recipe[], db?: Firestore, user?: User): void => {
    if (typeof window === 'undefined') return;

    const savedRecipesData = getRecipesFromLocalStorage();

    const toRemove = savedRecipesData.filter(
      (recipe) => !recipes.some((saved) => recipe.id === saved.id),
    );

    saveRecipesInLocalStorage(recipes);

    if (toRemove.length) {
      toRemove.forEach((recipeToRemove) => removeFromDB(recipeToRemove.id, db));

      return;
    }

    saveAllOnDB(db, user);
  };

  /**
   * @returns id
   */
  function addRecipe(recipe: Recipe): number {
    const id = recipe.id || new Date().getTime();
    const editing = recipe.id;
    const newRecipe = {
      ...recipe,
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

      // try once to wait the uid
      if (!uid) {
        if (hasFetched) {
          return;
        }

        //after the first time it will be true and wil not try again
        setHasFetched(true);

        setTimeout(() => {
          getSavedRecipes(db);
        }, 1000);

        return;
      }

      const q = query(
        collection(db, RECIPES_STORAGE),
        where('userId', '==', uid),
      );

      try {
        const querySnapshot = await getDocs(q);
        const recipesFromStorage = [...recipes];

        querySnapshot.forEach((doc3) => {
          const recipeFromDB = doc3.data() as Recipe;

          const storagedRecipe = recipes.find(
            (storageRecipe) => storageRecipe.id === recipeFromDB.id,
          );

          if (!storagedRecipe) {
            recipesFromStorage.push(recipeFromDB);
          } else if (storagedRecipe.lastUpdate < recipeFromDB.lastUpdate) {
            const index = recipesFromStorage.findIndex(
              (recipe) => recipe.id === storagedRecipe.id,
            );

            recipesFromStorage[index] = recipeFromDB;
          }
        });

        if (recipesFromStorage.length !== recipes.length) {
          setRecipes(recipesFromStorage);
        }

        setHasFetched(true);
      } catch (error) {
        console.log('erro ao buscar receitas', error);
      }
    },
    [firebase.user?.uid, recipes],
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
