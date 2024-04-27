import type { Food } from '../../services/food';

export interface ShoppingListDB {
  list: string;
  userId: string;
}

export interface ShoppingItem {
  text: string;
  checked: boolean;
  food: Food;
}

export interface ShoppingList {
  text: string;
  list: ShoppingItem[];
}
