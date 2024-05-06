import { useCallback, useContext, useEffect, useState } from 'react';
import type { Data } from './use-data';
import { FirebaseContext } from '../providers';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useIsOnline } from './use-is-online';

interface DBData<T = null> extends Data<T> {
  userId: string;
}

const DEFAULT_DATA: DBData = {
  lastUpdate: 0,
  info: null,
  userId: '',
};

export const useDB = <T>(
  collection = '',
): [Data<T>, (newData: Data<T>) => void] => {
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState<Data<T>>(DEFAULT_DATA as Data<T>);
  const [hasFetched, setHasFetched] = useState(false);
  const isOnline = useIsOnline();
  const { auth, db } = firebase;
  const uid = auth?.currentUser?.uid;

  const _set = useCallback(
    async (newData: Data<T>) => {
      if (
        typeof window === 'undefined' ||
        !uid ||
        !db ||
        !isOnline ||
        !hasFetched ||
        newData === data
      ) {
        return;
      }

      if (newData.lastUpdate < data.lastUpdate) {
        return;
      }

      try {
        const dbData: DBData<T> = {
          ...newData,
          userId: uid,
        };

        await setDoc(doc(db, collection, uid), dbData);

        setData(newData);
      } catch (e) {
        console.log('erro ao salvar lista de compras', e);
      }
    },
    [hasFetched, uid, db, isOnline],
  );

  const _get = useCallback(async () => {
    if (!db || !uid || !isOnline) {
      return;
    }

    const docRef = doc(db, collection, uid);

    try {
      const docSnap = await getDoc(docRef);

      setHasFetched(true);

      if (docSnap.exists()) {
        const { info, lastUpdate } = docSnap.data() as DBData<T>;

        setData({
          info,
          lastUpdate,
        });

        return;
      }

      // announce there is no fetched data, after set has fetched to true
      setData({ ...DEFAULT_DATA });
    } catch (error) {
      console.log('erro ao buscar receitas', error);
    }
  }, [db, uid, isOnline, setHasFetched, setData]);

  //
  useEffect(() => {
    if (data.info) return;

    _get();
  }, [db, uid, isOnline]);

  return [data, _set];
};
