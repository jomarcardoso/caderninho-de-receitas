import { FoodService } from '.';
import { AminoAcids, AMINO_ACIDS } from '../amino-acid';
import { FOOD, Food } from './food.types';

const MOCK_CARROT: Food = {
  ...FOOD,
  name: 'Cenoura',
  keys: ['cenoura', 'cenoura ralada'],
};

const MOCK_POTATO: Food = {
  ...FOOD,
  name: 'Batata',
  keys: ['batata', 'batatinha', 'batata inglesa'],
};

const MOCK_SWEET_POTATO: Food = {
  ...FOOD,
  name: 'Batata Doce',
  keys: ['batata doce', 'batata-doce', 'batata doce cozida'],
};

const MOCK_WHEAT_BREAD: Food = {
  ...FOOD,
  name: 'Pão caseiro',
  keys: ['pão caseiro', 'pão', 'pãozinho', 'pão integral'],
};

const MOCK_APPLE: Food = {
  ...FOOD,
  name: 'Maçã',
  keys: ['maçã', 'maçãs'],
};

const MOCK_JERIMUM: Food = {
  ...FOOD,
  name: 'Jerimum',
  keys: ['jerium', 'abóbora', 'abobora'],
};

const MOCK_HONEY: Food = {
  ...FOOD,
  name: 'Mel',
  keys: ['mel'],
};

const MOCK_CARROT_CAKE: Food = {
  ...FOOD,
  name: 'Bolo de cenoura',
  keys: ['bolo de cenoura', 'bolo'],
};

const MOCK_LEMON_AND_HONEY_SALAD_DRESSING: Food = {
  ...FOOD,
  name: 'Molho de Limão e Mel para Salada',
  keys: [
    'Molho de Limão e Mel para Salada',
    'molho de salada',
    'molho para salada',
    'molho pra salada',
    'molho de limão',
    'molho de mel',
  ],
};

const MOCK_SWEET_POTATO_BREAD: Food = {
  ...FOOD,
  name: 'Pão de Batata Doce',
  keys: [
    'bolinho de batata',
    'bolinho de batata doce',
    'bolinho de batata-doce',
    'pão de batata doce',
    'pão de batata-doce',
  ],
};

const MOCK_FOODS: Array<Food> = [
  MOCK_SWEET_POTATO,
  MOCK_POTATO,
  MOCK_WHEAT_BREAD,
  MOCK_CARROT,
  MOCK_APPLE,
  MOCK_JERIMUM,
  MOCK_CARROT_CAKE,
  MOCK_LEMON_AND_HONEY_SALAD_DRESSING,
  MOCK_HONEY,
  MOCK_SWEET_POTATO_BREAD,
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

    it('Pão', () => {
      const result = getFoodByString({
        foods: MOCK_FOODS,
        text: 'Pão',
      });

      expect(result).toStrictEqual({
        food: MOCK_WHEAT_BREAD,
        index: 0,
      });
    });

    it('Pão de batata-doce', () => {
      const result = getFoodByString({
        foods: MOCK_FOODS,
        text: 'Pão de batata-doce',
      });

      expect(result).toStrictEqual({
        food: MOCK_SWEET_POTATO_BREAD,
        index: 0,
      });
    });

    it('batata-doce', () => {
      const result = getFoodByString({
        foods: MOCK_FOODS,
        text: 'batata-doce',
      });

      expect(result).toStrictEqual({
        food: MOCK_SWEET_POTATO,
        index: 0,
      });
    });

    it('1 xícara (chá) de batata-doce cozida e amassada (1 batata grande)', () => {
      const result = getFoodByString({
        foods: MOCK_FOODS,
        text: '1 xícara (chá) de batata-doce cozida e amassada (1 batata grande)',
      });

      expect(result).toStrictEqual({
        food: MOCK_SWEET_POTATO,
        index: 18,
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
