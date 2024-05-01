import { useEffect } from 'react';
import { useDB } from './use-db';
import { useStorage } from './use-storage';

export interface Data<T = unknown> {
  info: T | null;
  lastUpdate: number;
}

export const useData = (collection = '') => {
  const [storage, setStorage] = useStorage(collection);
  const [db, setDB] = useDB(collection);

  useEffect(() => {
    if (storage.lastUpdate < db.lastUpdate) {
      setStorage(db);
    }

    if (db.lastUpdate < storage.lastUpdate) {
      setDB(storage);
    }
  }, [storage, db]);

  return [storage, setDB];
};
