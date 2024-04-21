import { createContext } from 'react';

export const ShoppingListContext = createContext<{
  shoppingList: string;
  updateShoppingList?(list: string): void;
}>({ shoppingList: '' });
