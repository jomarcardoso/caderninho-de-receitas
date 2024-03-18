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
import { Recipe } from '../services/recipe';
import type { FirebaseHook } from './use-firebase';

const RECIPES_LOCAL_STORAGE = 'recipes';

function saveRecipesInLocalStorage(recipes: Recipe[]) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(RECIPES_LOCAL_STORAGE, JSON.stringify(recipes));
}

function getRecipesFromLocalStorage(): Recipe[] {
  if (typeof window === 'undefined') return [];

  return (
    JSON.parse(localStorage.getItem(RECIPES_LOCAL_STORAGE) || 'null') ?? []
  );
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

export default function useRecipes(
  foods: Array<Food>,
  firebase: FirebaseHook,
): {
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

    console.log('vai sincronizar 4', recipesToSync);

    recipesToSync.forEach(async (recipe) => {
      try {
        await setDoc(doc(db, 'recipes', String(recipe.id)), {
          ...recipe,
          userId: user.uid,
        });

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

          const recipe = data as Recipe;
          const storageRecipe = recipes.find(
            (recipe) => recipe.id === recipe.id,
          );

          if (!storageRecipe) {
            recipesToStorage.push(recipe);
          } else if (storageRecipe.lastUpdate < recipe.lastUpdate) {
            const index = recipesToStorage.findIndex(
              (recipe) => recipe.id === storageRecipe.id,
            );

            recipesToStorage[index] = recipe;
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
