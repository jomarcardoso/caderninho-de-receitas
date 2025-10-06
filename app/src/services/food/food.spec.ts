import { FoodService } from '.';
import { PUMPKIN } from '../../db/a';
import { SWEET_POTATO } from '../../db/b';
import { BEAN } from '../../db/beans';
import { CARROT } from '../../db/c';
import { HONEY, LEMON_AND_HONEY_SALAD_SAUCE } from '../../db/m';
import { BREAD, SWEET_POTATO_BREAD } from '../../db/p';
import { BEAN_WITH_CUMIN } from '../../db/recipes';
import { carrot } from '../../db/src';
import { AminoAcids, AMINO_ACIDS } from '../amino-acid';
import { FOOD, Food } from './food.types';

describe('FoodService', () => {
  describe('getFoodByString', () => {
    const { getFoodByString } = FoodService;

    it('carrot with carrot on list', () => {
      const result = getFoodByString('cenoura');

      expect(result).toStrictEqual({ food: carrot, index: 0 });
    });

    it('should return ingredient if not prefer "recipe"', () => {
      const result = getFoodByString('feijão');

      expect(result).toStrictEqual({ food: BEAN, index: 0 });
    });

    it('should return recipe if prefer "recipe"', () => {
      const result = getFoodByString('feijão', {
        preferRecipe: true,
      });

      expect(result).toStrictEqual({ food: BEAN_WITH_CUMIN, index: 0 });
    });

    it('taxi without the list', () => {
      const result = getFoodByString('taxi');

      expect(result).toStrictEqual({ food: FOOD, index: 0 });
    });

    it('abóbora on the list of keys', () => {
      const result = getFoodByString('abóbora');

      expect(result).toStrictEqual({ food: PUMPKIN, index: 0 });
    });

    it('Abóbora camelcase on the list of keys', () => {
      const result = getFoodByString('Abóbora');

      expect(result).toStrictEqual({ food: PUMPKIN, index: 0 });
    });

    it('exact bolo de cenoura on the list of keys', () => {
      const result = getFoodByString('bolo de cenoura');

      expect(result).toStrictEqual({ food: CARROT, index: 0 });
    });

    it('cenoura ralada on the list like cenoura', () => {
      const result = getFoodByString('cenoura ralada');

      expect(result).toStrictEqual({ food: CARROT, index: 0 });
    });

    it('Molho de salada', () => {
      const result = getFoodByString('molho de salada');

      expect(result).toStrictEqual({
        food: LEMON_AND_HONEY_SALAD_SAUCE,
        index: 0,
      });
    });

    it('Molho de mel e limão', () => {
      const result = getFoodByString('Molho de mel e limão');

      expect(result).toStrictEqual({
        food: LEMON_AND_HONEY_SALAD_SAUCE,
        index: 0,
      });
    });

    it('Molho pra salada de mel e limão', () => {
      const result = getFoodByString('Molho pra salada de mel e limão');

      expect(result).toStrictEqual({
        food: LEMON_AND_HONEY_SALAD_SAUCE,
        index: 0,
      });
    });

    it('1 colher (sopa) de mel', () => {
      const result = getFoodByString('1 colher (sopa) de mel');

      expect(result).toStrictEqual({
        food: HONEY,
        index: 19,
      });
    });

    it('Pão', () => {
      const result = getFoodByString('Pão', { preferRecipe: true });

      expect(result).toStrictEqual({
        food: BREAD,
        index: 0,
      });
    });

    it('Pão de batata-doce', () => {
      const result = getFoodByString('Pão de batata-doce');

      expect(result).toStrictEqual({
        food: SWEET_POTATO_BREAD,
        index: 0,
      });
    });

    it('batata-doce', () => {
      const result = getFoodByString('batata-doce');

      expect(result).toStrictEqual({
        food: SWEET_POTATO,
        index: 0,
      });
    });

    it('1 xícara (chá) de batata-doce cozida e amassada (1 batata grande)', () => {
      const result = getFoodByString(
        '1 xícara (chá) de batata-doce cozida e amassada (1 batata grande)',
      );

      expect(result).toStrictEqual({
        food: SWEET_POTATO,
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
