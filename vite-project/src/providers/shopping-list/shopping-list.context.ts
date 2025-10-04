import { createContext } from 'react';

export const ShoppingListContext = createContext<{
  shoppingList: string;
  setShoppingList?(list: string): void;
}>({
  shoppingList: '',
});
