import { useCallback, useContext, useEffect, useState } from 'react';
import type { Data } from './use-data';
import { FirebaseContext } from '../providers';
import { doc, setDoc } from 'firebase/firestore';

const DEFAULT_DATA: Data = {
  lastUpdate: 0,
  info: null,
};

export const useDB = <T>(
  collection = '',
  setStorage: (newData: Data<T>) => Data<T> | undefined,
): [Data<T>, (newData: Data<T>) => void] => {
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState<Data<T>>(DEFAULT_DATA as Data<T>);

  /**
   * if return data, the data here is more recent
   */
  const _set = useCallback((newData: Data<T>): Data<T> | undefined => {
    if (typeof window === 'undefined') {
      return;
    }

    const newestData = setStorage(newData);

    if (!firebase.user || !firebase.db) return;

    if (newestData) {
      try {
        setDoc(doc(firebase.db, collection, firebase.user.uid), newestData);
      } catch (e) {
        console.log('erro ao salvar lista de compras', e);
      }

      return;
    }

    setDoc(doc(firebase.db, collection, firebase.user.uid), newData);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const item = localStorage.getItem(collection);

    if (!item) return;

    const initialData = JSON.parse(item || 'null') ?? (DEFAULT_DATA as Data<T>);

    setData(initialData);
  }, []);

  return [data, _set];
};
