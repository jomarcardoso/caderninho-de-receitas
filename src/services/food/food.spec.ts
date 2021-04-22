import { FoodService } from '.';
import { FOOD, Food } from './food.types';

const MOCK_CARROT: Food = {
  ...FOOD,
  name: 'Cenoura',
  enName: 'carrot',
  keys: ['cenoura ralada'],
};

const MOCK_APPLE: Food = {
  ...FOOD,
  name: 'Maçã',
  enName: 'appe',
};

const MOCK_JERIMUM: Food = {
  ...FOOD,
  name: 'Jerimum',
  enName: 'pumpkin',
  keys: ['abóbora', 'abobora'],
};

const MOCK_CARROT_CAKE: Food = {
  ...FOOD,
  name: 'Bolo de cenoura',
  enName: 'carrot cake',
  keys: ['bolo', 'cenoura'],
};

const MOCK_FOODS: Array<Food> = [
  MOCK_CARROT,
  MOCK_APPLE,
  MOCK_JERIMUM,
  MOCK_CARROT_CAKE,
];

describe('FoodService', () => {
  describe('getFoodByString', () => {
    const { getFoodByString } = FoodService;

    it('carrot with carrot on list', () => {
      const result = getFoodByString({ foods: MOCK_FOODS, text: 'cenoura' });

      expect(result).toStrictEqual({ food: MOCK_CARROT, index: 0 });
    });

    it('taxi without the list', () => {
      const result = getFoodByString({ foods: MOCK_FOODS, text: 'taxi' });

      expect(result).toStrictEqual({ food: FOOD, index: 0 });
    });

    it('abóbora on the list of keys', () => {
      const result = getFoodByString({ foods: MOCK_FOODS, text: 'abóbora' });

      expect(result).toStrictEqual({ food: MOCK_JERIMUM, index: 0 });
    });

    it('Abóbora camelcase on the list of keys', () => {
      const result = getFoodByString({ foods: MOCK_FOODS, text: 'Abóbora' });

      expect(result).toStrictEqual({ food: MOCK_JERIMUM, index: 0 });
    });

    it('exact bolo de cenoura on the list of keys', () => {
      const result = getFoodByString({
        foods: MOCK_FOODS,
        text: 'bolo de cenoura',
      });

      expect(result).toStrictEqual({ food: MOCK_CARROT_CAKE, index: 0 });
    });

    it('cenoura ralada on the list like cenoura', () => {
      const result = getFoodByString({
        foods: MOCK_FOODS,
        text: 'cenoura ralada',
      });

      expect(result).toStrictEqual({ food: MOCK_CARROT, index: 0 });
    });
  });
});
