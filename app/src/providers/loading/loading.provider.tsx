import { type FC, type HTMLProps, useMemo, useState } from 'react';
import LoadingContext from './loading.context';

export const LoadingProvider: FC<HTMLProps<Element>> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const memoizedLoading = useMemo(() => ({ loading, setLoading }), [loading]);

  return (
    <LoadingContext.Provider value={memoizedLoading}>
      {children}
    </LoadingContext.Provider>
  );
};
