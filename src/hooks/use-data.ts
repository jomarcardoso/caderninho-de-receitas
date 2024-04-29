import { useDB } from './use-db';
import { useStorage } from './use-storage';

export interface Data<T = unknown> {
  info: T | null;
  lastUpdate: number;
}

const useData = (collection = '') => {
  const [storage, setStorage] = useStorage(collection);
  const [db, setDB] = useDB(collection, setStorage);

  return [storage, setDB];
};
