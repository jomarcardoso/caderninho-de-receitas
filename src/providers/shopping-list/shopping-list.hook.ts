import { User } from 'firebase/auth';
import { Firestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { useState, useEffect, useCallback, useMemo } from 'react';
import type { FirebaseHook } from '../firebase/firebase.hook';
import { ShoppingList, ShoppingListData } from './shopping-list.types';
import { ShoppingListService } from './shopping-list.service';

interface ShoppingListDB extends ShoppingListData {
  userId: string;
}

const SHOPPING_LIST_STORAGE = 'shopping_list';

function saveListInLocalStorage(list: ShoppingListData) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(SHOPPING_LIST_STORAGE, JSON.stringify(list));
}

function getListFromLocalStorage(): ShoppingListData {
  if (typeof window === 'undefined')
    return {
      list: '',
      lastUpdate: 0,
    };

  return (
    JSON.parse(localStorage.getItem(SHOPPING_LIST_STORAGE) || 'null') ?? []
  );
}

export function useShoppingList(firebase: FirebaseHook): {
  shoppingList: ShoppingList;
  updateShoppingList(list: string): void;
} {
  const [shoppingList, setShoppingList] = useState(getListFromLocalStorage());
  const [hasFetched, setHasFetched] = useState(false);

  const saveOnDB = (db?: Firestore, user?: User) => {
    if (!db || !user) {
      return;
    }

    const formattedShoppingList: ShoppingListDB = {
      list: shoppingList.list,
      userId: user.uid,
      lastUpdate: Date.now(),
    };

    try {
      setDoc(doc(db, 'shoppingList', user.uid), formattedShoppingList);
    } catch (e) {
      console.log('erro ao salvar lista de compras', e);
    }
  };

  const update = (list = '', db?: Firestore, user?: User): void => {
    if (typeof window === 'undefined') return;

    const lastUpdate = Date.now();

    saveListInLocalStorage({
      lastUpdate,
      list,
    });
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
          const listFromDB = docSnap.data() as ShoppingListData;

          if (shoppingList.lastUpdate < listFromDB.lastUpdate) {
            setShoppingList({
              lastUpdate: listFromDB.lastUpdate,
              list: listFromDB.list,
            });
          }

          setHasFetched(true);
        }
      } catch (error) {
        console.log('erro ao buscar receitas', error);
      }
    },
    [firebase.user?.uid, shoppingList],
  );

  // useEffect(() => {
  //   if (firebase.db && !hasFetched) {
  //     getSavedShoppingList(firebase.db);
  //   }
  // }, [firebase, getSavedShoppingList, hasFetched]);

  // useEffect(() => {
  //   update(shoppingList.list, firebase.db, firebase.user);
  // }, [firebase, shoppingList]);

  const formattedhoppingList = useMemo(() => {
    return ShoppingListService.format(shoppingList.list);
  }, [shoppingList]);

  return {
    shoppingList: formattedhoppingList,
    updateShoppingList: update,
  };
}
