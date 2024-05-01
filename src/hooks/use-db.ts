import { useCallback, useContext, useEffect, useState } from 'react';
import type { Data } from './use-data';
import { FirebaseContext } from '../providers';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useIsOnline } from './use-is-online';

const DEFAULT_DATA: Data = {
  lastUpdate: 0,
  info: null,
};

export const useDB = <T>(
  collection = '',
): [Data<T>, (newData: Data<T>) => void] => {
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState<Data<T>>(DEFAULT_DATA as Data<T>);
  const isOnline = useIsOnline();
  const { auth, db } = firebase;
  const uid = auth?.currentUser?.uid;

  const _set = useCallback(async (newData: Data<T>) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!uid || !db || !isOnline) return;

    try {
      await setDoc(doc(db, collection, uid), newData);

      setData(newData);
    } catch (e) {
      console.log('erro ao salvar lista de compras', e);
    }
  }, []);

  const _get = useCallback(async () => {
    if (!db || !uid || !isOnline) {
      return;
    }

    const docRef = doc(db, collection, uid);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const documentData = docSnap.data() as Data<T>;

        setData(documentData);
      }
    } catch (error) {
      console.log('erro ao buscar receitas', error);
    }
  }, [db, uid, isOnline]);

  //
  useEffect(() => {
    if (data) return;

    _get();
  }, [db, uid, isOnline]);

  return [data, _set];
};
