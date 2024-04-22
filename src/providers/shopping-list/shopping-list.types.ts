export interface ShoppingListDB {
  list: string;
  userId: string;
}

export interface ProcessedShoppingList {
  text: string;
  checked: boolean;
}
