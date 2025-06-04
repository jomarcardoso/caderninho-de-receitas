import { FOOD, FoodService } from '../../services/food';
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
    const food = text.trim() ? FoodService.getFoodByString(text).food : FOOD;

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

  console.log('process', text);

  return lines.map<ShoppingItem>((text) => {
    const { food } = FoodService.getFoodByString(text);

    return {
      checked: false,
      food,
      text,
    };
  });
}

function unformat({ text, list }: ShoppingList) {
  console.log('unformat', text, list);
  return list
    .map(({ checked, text }) => {
      return `- [${checked ? 'x' : ' '}] ${text}`;
    })
    .join('\n');
}

function unprocess(text = '', checks: boolean[]): string {
  const lines = text.split('\n');

  return lines
    .map((line, index) => {
      return `- [${checks[index] ? 'x' : ' '}] ${line}`;
    })
    .join('\n');
}

export const ShoppingListService = {
  format,
  process,
  unformat,
  unprocess,
};
