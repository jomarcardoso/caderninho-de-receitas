import { createContext } from 'react';
import { ShoppingList, ShoppingListData } from './shopping-list.types';

export const ShoppingListContext = createContext<{
  shoppingList: ShoppingList;
  updateShoppingList?(list: string): void;
}>({
  shoppingList: {
    list: [],
    text: '',
  },
});
