import { Food } from '../../services/food/food.model';

export interface ShoppingListData {
  list: string;
  lastUpdate: number;
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
