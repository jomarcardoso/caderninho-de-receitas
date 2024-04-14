import React, { FC, HTMLProps, useMemo } from 'react';
import FoodsContext from './foods.context';
import { foods } from '../../db/food';

export const FoodsProvider: FC<HTMLProps<HTMLDivElement>> = ({ children }) => {
  const memoizedFoods = useMemo(() => foods, [foods]);

  return (
    <FoodsContext.Provider value={memoizedFoods}>
      {children}
    </FoodsContext.Provider>
  );
};
