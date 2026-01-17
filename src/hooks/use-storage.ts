import { useCallback, useEffect, useState } from 'react';
import type { Data } from './use-data';

const DEFAULT_DATA: Data = {
  lastUpdate: 0,
  info: null,
};

function getInitialData<T>(collection = ''): Data<T> {
  if (typeof window === 'undefined') {
    return DEFAULT_DATA as Data<T>;
  }

  const item = localStorage.getItem(collection);

  if (!item) {
    return DEFAULT_DATA as Data<T>;
  }

  return JSON.parse(item || 'null') ?? (DEFAULT_DATA as Data<T>);
}

export const useStorage = <T>(
  collection = '',
): [Data<T>, (newData: Data<T>) => void] => {
  const [data, setData] = useState<Data<T>>(getInitialData<T>(collection));

  const _set = useCallback((newData: Data<T>) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (newData.lastUpdate < data.lastUpdate) {
      return;
    }

    console.log(newData);

    setData(newData);
    localStorage.setItem(collection, JSON.stringify(newData));
  }, []);

  return [data, _set];
};
