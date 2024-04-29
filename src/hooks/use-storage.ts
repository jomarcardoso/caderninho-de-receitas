import { useCallback, useEffect, useState } from 'react';
import type { Data } from './use-data';

const DEFAULT_DATA: Data = {
  lastUpdate: 0,
  info: null,
};

export const useStorage = <T>(
  collection = '',
): [Data<T>, (newData: Data<T>) => Data<T> | undefined] => {
  const [data, setData] = useState<Data<T>>(DEFAULT_DATA as Data<T>);

  /**
   * if return data, the data here is more recent
   */
  const _set = useCallback((newData: Data<T>): Data<T> | undefined => {
    if (typeof window === 'undefined') {
      return;
    }

    if (newData.lastUpdate > data?.lastUpdate) {
      setData(newData);
      localStorage.setItem(collection, JSON.stringify(newData));

      return;
    }

    return data;
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
