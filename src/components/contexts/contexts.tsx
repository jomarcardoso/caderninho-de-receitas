import React, { FC, HTMLProps, useMemo } from 'react';
import useFoods from '../../hooks/use-food';
import { Recipes } from './Recipes';
import FoodsContext from '../../contexts/foods-context';
import FirebaseContext from '../../contexts/firebase-context';
import { useFirebase } from '../../hooks/use-firebase';

const Contexts: FC<HTMLProps<HTMLDivElement>> = ({ children }) => {
  const firebase = useFirebase();

  const foods = useFoods();
  const memoizedFoods = useMemo(() => foods, [foods]);

  return (
    <FirebaseContext.Provider value={firebase}>
      <FoodsContext.Provider value={memoizedFoods}>
        <Recipes>{children}</Recipes>
      </FoodsContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default Contexts;
