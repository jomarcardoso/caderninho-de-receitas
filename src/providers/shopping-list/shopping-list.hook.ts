import { User } from 'firebase/auth';
import { Firestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { useState, useEffect, useCallback } from 'react';
import type { FirebaseHook } from '../firebase/firebase.hook';
import { ShoppingListDB } from './shopping-list.types';

const SHOPPING_LIST_STORAGE = 'shopping_list';

function saveListInLocalStorage(list = '') {
  if (typeof window === 'undefined') return;

  localStorage.setItem(SHOPPING_LIST_STORAGE, JSON.stringify(list));
}

function getListFromLocalStorage(): string {
  if (typeof window === 'undefined') return '';

  return localStorage.getItem(SHOPPING_LIST_STORAGE) || '';
}

export function useShoppingList(firebase: FirebaseHook): {
  shoppingList: string;
  updateShoppingList(list: string): void;
} {
  const [shoppingList, setShoppingList] = useState(getListFromLocalStorage());
  const [hasFetched, setHasFetched] = useState(false);

  const saveOnDB = (db?: Firestore, user?: User) => {
    if (!db || !user) {
      return;
    }

    const formattedShoppingList: ShoppingListDB = {
      list: shoppingList,
      userId: user.uid,
    };

    try {
      setDoc(doc(db, 'shoppingList', user.uid), formattedShoppingList);
    } catch (e) {
      console.log('erro ao salvar lista de compras', e);
    }
  };

  const update = (shoppingList: string, db?: Firestore, user?: User): void => {
    if (typeof window === 'undefined') return;

    saveListInLocalStorage(shoppingList);
    saveOnDB(db, user);
  };

  const getSavedShoppingList = useCallback(
    async (db: Firestore) => {
      const uid = firebase.auth?.currentUser?.uid;

      // try once to wait the uid
      if (!uid) {
        if (!hasFetched) {
          return;
        }

        //after the first time it will be true and wil not try again
        setHasFetched(true);

        setTimeout(() => {
          getSavedShoppingList(db);
        }, 1000);

        return;
      }

      const docRef = doc(db, 'shoppingList', uid);

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const recipeFromDB = docSnap.data() as ShoppingListDB;

          if (recipeFromDB?.list) {
            setShoppingList(recipeFromDB.list);
          }

          setHasFetched(true);
        }
      } catch (error) {
        console.log('erro ao buscar receitas', error);
      }
    },
    [firebase.user?.uid, shoppingList],
  );

  useEffect(() => {
    if (firebase.db && !hasFetched) {
      getSavedShoppingList(firebase.db);
    }
  }, [firebase, getSavedShoppingList, hasFetched]);

  useEffect(() => {
    update(shoppingList, firebase.db, firebase.user);
  }, [firebase, shoppingList]);

  return {
    shoppingList,
    updateShoppingList: update,
  };
}
