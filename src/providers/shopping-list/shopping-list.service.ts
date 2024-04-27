import { FoodService } from '../../services/food';
import { ShoppingItem, ShoppingList } from './shopping-list.types';

/**
 *
 * @param shoppingList string extract text and checkboxes
 * @returns the text to textarea and a list
 */
function format(data: string): ShoppingList {
  const lines = data.split(/\n/);
  const text = data.replaceAll('- [ ] ', '').replaceAll('- [x] ', '');

  const list = lines.map<ShoppingItem>((line) => {
    const text = line.replace('- [ ] ', '').replace('- [x] ', '');
    const checked = line.includes('- [x] ');
    const { food } = FoodService.getFoodByString(text);

    return {
      checked,
      food,
      text,
    };
  });

  return {
    list,
    text,
  };
}

function process(text: string): ShoppingItem[] {
  const lines = text.split(/\n/);

  return lines.map<ShoppingItem>((text) => {
    const { food } = FoodService.getFoodByString(text);

    return {
      checked: false,
      food,
      text,
    };
  });
}

export const ShoppingListService = {
  format,
  process,
};
