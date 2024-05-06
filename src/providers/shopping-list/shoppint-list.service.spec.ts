import { BEAN } from '../../db/beans';
import { CINNAMON } from '../../db/c';
import { FOOD } from '../../services/food';
import { FoodDataService } from '../../services/food-data';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingList } from './shopping-list.types';

describe('ShoppingListService', () => {
  describe('format', () => {
    it('should return default if no string', () => {
      const formatted = ShoppingListService.format('');

      expect(formatted).toStrictEqual({
        list: [
          {
            checked: false,
            food: FOOD,
            text: '',
          },
        ],
        text: '',
      } as ShoppingList);
    });

    it('should return default if only spaces', () => {
      const formatted = ShoppingListService.format('  ');

      expect(formatted).toStrictEqual({
        list: [
          {
            checked: false,
            food: FOOD,
            text: '  ',
          },
        ],
        text: '  ',
      } as ShoppingList);
    });

    it('should return 2 default line if has breakline', () => {
      const formatted = ShoppingListService.format('\n');

      expect(formatted).toStrictEqual({
        list: [
          {
            checked: false,
            food: FOOD,
            text: '',
          },
          {
            checked: false,
            food: FOOD,
            text: '',
          },
        ],
        text: '\n',
      } as ShoppingList);
    });

    it('should return 2 default line if has breakline and spaces', () => {
      const formatted = ShoppingListService.format('\n  \n ');

      expect(formatted).toStrictEqual({
        list: [
          {
            checked: false,
            food: FOOD,
            text: '',
          },
          {
            checked: false,
            food: FOOD,
            text: '  ',
          },
          {
            checked: false,
            food: FOOD,
            text: ' ',
          },
        ],
        text: '\n  \n ',
      } as ShoppingList);
    });

    it('should return a food if it is in the line', () => {
      const formatted = ShoppingListService.format('canela');

      expect(formatted).toStrictEqual({
        list: [
          {
            checked: false,
            food: {
              ...FoodDataService.format(CINNAMON),
              id: 48,
            },
            text: 'canela',
          },
        ],
        text: 'canela',
      } as ShoppingList);
    });

    it('should return two foods if there is 2 lines', () => {
      const formatted = ShoppingListService.format('canela\nfeijão');

      expect(formatted).toStrictEqual({
        list: [
          {
            checked: false,
            food: {
              ...FoodDataService.format(CINNAMON),
              id: 48,
            },
            text: 'canela',
          },
          {
            checked: false,
            food: {
              ...FoodDataService.format(BEAN),
              id: 250,
            },
            text: 'feijão',
          },
        ],
        text: 'canela\nfeijão',
      } as ShoppingList);
    });

    it('should return one food in the second line', () => {
      const formatted = ShoppingListService.format('\nfeijão');

      expect(formatted).toStrictEqual({
        list: [
          {
            checked: false,
            food: FOOD,
            text: '',
          },
          {
            checked: false,
            food: {
              ...FoodDataService.format(BEAN),
              id: 250,
            },
            text: 'feijão',
          },
        ],
        text: '\nfeijão',
      } as ShoppingList);
    });
  });

  it('should return default checked if only "- [x] ', () => {
    const formatted = ShoppingListService.format('- [x] ');

    expect(formatted).toStrictEqual({
      list: [
        {
          checked: true,
          food: FOOD,
          text: '',
        },
      ],
      text: '',
    } as ShoppingList);
  });

  it('should return default not checked if only "- [ ] ', () => {
    const formatted = ShoppingListService.format('- [ ] ');

    expect(formatted).toStrictEqual({
      list: [
        {
          checked: false,
          food: FOOD,
          text: '',
        },
      ],
      text: '',
    } as ShoppingList);
  });

  it('should return canela not checked "- [ ] canela"', () => {
    const formatted = ShoppingListService.format('- [ ] canela');

    expect(formatted).toStrictEqual({
      list: [
        {
          checked: false,
          food: {
            ...FoodDataService.format(CINNAMON),
            id: 48,
          },
          text: 'canela',
        },
      ],
      text: 'canela',
    } as ShoppingList);
  });
});
