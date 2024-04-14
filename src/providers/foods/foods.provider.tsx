import React, { FC, HTMLProps, useMemo } from 'react';
import { foods } from '../../db/food';
import { FoodsContext } from './foods.context';

export const FoodsProvider: FC<HTMLProps<HTMLDivElement>> = ({ children }) => {
  const memoizedFoods = useMemo(() => foods, [foods]);

  return (
    <FoodsContext.Provider value={memoizedFoods}>
      {children}
    </FoodsContext.Provider>
  );
};
