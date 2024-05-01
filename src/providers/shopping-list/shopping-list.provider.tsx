import React, { FC, HTMLProps, useContext, useMemo } from 'react';
import { ShoppingListContext } from './shopping-list.context';
import { useData } from '../../hooks/use-data';

export const ShoppingListProvider: FC<HTMLProps<HTMLDivElement>> = ({
  children,
}) => {
  const [shoppingList, setShoppingList] = useData<string>('shopping_list', '');

  return (
    <ShoppingListContext.Provider value={{ shoppingList, setShoppingList }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
