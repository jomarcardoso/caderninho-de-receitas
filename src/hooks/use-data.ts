import { useCallback, useEffect, useState } from 'react';
import { useDB } from './use-db';
import { useStorage } from './use-storage';

export interface Data<T = unknown> {
  info: T | null;
  lastUpdate: number;
}

export const useData = <T>(
  collection = '',
  initialData: T,
): [T, (info: T) => void] => {
  const [storage, setStorage] = useStorage<T>(collection);
  const [db, setDB] = useDB<T>(collection);

  const _set = useCallback((info: T) => {
    const newData: Data<T> = {
      info,
      lastUpdate: Date.now(),
    };

    setStorage(newData);
    setDB(newData);
  }, []);

  useEffect(() => {
    // console.log('seta a merda da cebola', storage, db);
    if (storage.lastUpdate < db.lastUpdate) {
      console.log('nesse caso vai definir o localstora, mas com atraso né');
      setStorage(db);
    }

    if (db.lastUpdate < storage.lastUpdate) {
      setDB(storage);
    }
  }, [storage, db]);

  return [storage.info || initialData, _set];
};
