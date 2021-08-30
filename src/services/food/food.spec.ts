import { FoodService } from '.';
import { AminoAcids, AMINO_ACIDS, FOOD, Food } from './food.types';

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

const MOCK_HONEY: Food = {
  ...FOOD,
  name: 'Mel',
  enName: 'honey',
  keys: ['mel'],
};

const MOCK_CARROT_CAKE: Food = {
  ...FOOD,
  name: 'Bolo de cenoura',
  enName: 'carrot cake',
  keys: ['bolo', 'cenoura'],
};

const MOCK_LEMON_AND_HONEY_SALAD_DRESSING: Food = {
  ...FOOD,
  name: 'Molho de Limão e Mel para Salada',
  enName: 'lemon-and-honey-salad-dressing',
  keys: [
    'molho de salada',
    'molho para salada',
    'molho pra salada',
    'molho de limão',
    'molho de mel',
  ],
};

const MOCK_FOODS: Array<Food> = [
  MOCK_CARROT,
  MOCK_APPLE,
  MOCK_JERIMUM,
  MOCK_CARROT_CAKE,
  MOCK_LEMON_AND_HONEY_SALAD_DRESSING,
  MOCK_HONEY,
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

    it('Molho de salada', () => {
      const result = getFoodByString({
        foods: MOCK_FOODS,
        text: 'molho de salada',
      });

      expect(result).toStrictEqual({
        food: MOCK_LEMON_AND_HONEY_SALAD_DRESSING,
        index: 0,
      });
    });

    it('Molho de mel e limão', () => {
      const result = getFoodByString({
        foods: MOCK_FOODS,
        text: 'Molho de mel e limão',
      });

      expect(result).toStrictEqual({
        food: MOCK_LEMON_AND_HONEY_SALAD_DRESSING,
        index: 0,
      });
    });

    it('Molho pra salada de mel e limão', () => {
      const result = getFoodByString({
        foods: MOCK_FOODS,
        text: 'Molho pra salada de mel e limão',
      });

      expect(result).toStrictEqual({
        food: MOCK_LEMON_AND_HONEY_SALAD_DRESSING,
        index: 0,
      });
    });

    it('1 colher (sopa) de mel', () => {
      const result = getFoodByString({
        foods: MOCK_FOODS,
        text: '1 colher (sopa) de mel',
      });

      expect(result).toStrictEqual({
        food: MOCK_HONEY,
        index: 19,
      });
    });
  });

  describe('formatAminoAcids', () => {
    const { formatAminoAcids } = FoodService;

    it('calls empty', () => {
      const result = formatAminoAcids();

      expect(result).toStrictEqual(AMINO_ACIDS);
    });

    it('calls with histidine 200', () => {
      const result = formatAminoAcids({
        histidine: 200,
      });

      const expected: AminoAcids = {
        ...AMINO_ACIDS,
        histidine: 200,
      };

      expect(result).toStrictEqual(expected);
    });

    it('calls with empty object', () => {
      const result = formatAminoAcids({});

      expect(result).toStrictEqual(AMINO_ACIDS);
    });
  });
});
