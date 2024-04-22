import React, { FC, HTMLProps, useContext, useMemo } from 'react';
import { useShoppingList } from './shopping-list.hook';
import { FirebaseContext } from '../firebase';
import { ShoppingListContext } from './shopping-list.context';

export const ShoppingListProvider: FC<HTMLProps<HTMLDivElement>> = ({
  children,
}) => {
  const firebase = useContext(FirebaseContext);
  const { shoppingList, updateShoppingList } = useShoppingList(firebase);

  return (
    <ShoppingListContext.Provider value={{ shoppingList, updateShoppingList }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
