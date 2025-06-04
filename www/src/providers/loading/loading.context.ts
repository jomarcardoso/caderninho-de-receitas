import React, { createContext } from 'react';

const LoadingContext = createContext<{
  loading: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}>({ loading: false });

export default LoadingContext;
