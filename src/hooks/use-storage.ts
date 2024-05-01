import { useCallback, useEffect, useState } from 'react';
import type { Data } from './use-data';

const DEFAULT_DATA: Data = {
  lastUpdate: 0,
  info: null,
};

export const useStorage = <T>(
  collection = '',
): [Data<T>, (newData: Data<T>) => void => {
  const [data, setData] = useState<Data<T>>(DEFAULT_DATA as Data<T>);

  const _set = useCallback((newData: Data<T>) => {
    if (typeof window === 'undefined') {
      return;
    }

    setData(newData);
    localStorage.setItem(collection, JSON.stringify(newData));
  }, []);

  const _get = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const item = localStorage.getItem(collection);

    if (!item) return;

    const initialData = JSON.parse(item || 'null') ?? (DEFAULT_DATA as Data<T>);

    setData(initialData);
  }, []);

  useEffect(() => {
    if (data) return;

    _get();
  }, []);

  return [data, _set];
};
