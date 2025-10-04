import { Food, FOOD, Measure } from '../food';
import IngredientService, {
  verifyIsLiteral,
  getQuantityByMeasure,
  getLiteralQuantity,
  verifyIsLiteralByUnit,
} from './ingredient.service';

describe('IngredientService', () => {
  describe('measureFromString', () => {
    const { measureFromString } = IngredientService;

    it('meio cacho de uva', () => {
      const measure: Measure = {
        quantity: 0.5,
        type: 'BUNCH',
      };

      expect(measureFromString('meio cacho de uva')).toStrictEqual(measure);
    });

    it('1 vidro de azeitonas sem caroço', () => {
      const measure: Measure = {
        quantity: 1,
        type: 'GLASS',
      };

      expect(
        measureFromString('1 vidro de azeitonas sem caroço'),
      ).toStrictEqual(measure);
    });

    it('raspas de 1 limão', () => {
      const measure: Measure = {
        quantity: 0,
        type: 'LITERAL',
      };

      expect(measureFromString('raspas de 1 limão')).toStrictEqual(measure);
    });

    it('1 pitada de canela em pó', () => {
      const measure: Measure = {
        quantity: 0,
        type: 'LITERAL',
      };

      expect(measureFromString('1 pitada de canela em pó')).toStrictEqual(
        measure,
      );
    });

    it('2 filés de peito de frango (cerca de 200g cada)', () => {
      const measure: Measure = {
        quantity: 400,
        type: 'LITERAL',
      };

      expect(
        measureFromString('2 filés de peito de frango (cerca de 200g cada)'),
      ).toStrictEqual(measure);
    });

    it('¼ de xícara (chá) de nozes', () => {
      const measure: Measure = {
        quantity: 0.25,
        type: 'CUP',
      };

      expect(measureFromString('¼ de xícara (chá) de nozes')).toStrictEqual(
        measure,
      );
    });

    it('1 ⅓ de xícara (chá) de gravatinha (ou outra massa curta de grano duro)', () => {
      const measure: Measure = {
        quantity: 1.333,
        type: 'CUP',
      };

      expect(
        measureFromString(
          '1 ⅓ de xícara (chá) de gravatinha (ou outra massa curta de grano duro)',
        ),
      ).toStrictEqual(measure);
    });

    it('1¼ de xícara (chá) de gravatinha (ou outra massa curta de grano duro)', () => {
      const measure: Measure = {
        quantity: 1.25,
        type: 'CUP',
      };

      expect(
        measureFromString(
          '1¼ de xícara (chá) de gravatinha (ou outra massa curta de grano duro)',
        ),
      ).toStrictEqual(measure);
    });

    it('empty', () => {
      const measure: Measure = {
        quantity: 1,
        type: 'UNITY',
      };

      expect(measureFromString()).toStrictEqual(measure);
    });

    it('100g de', () => {
      const measure: Measure = {
        quantity: 100,
        type: 'LITERAL',
      };

      expect(measureFromString('100g de')).toStrictEqual(measure);
    });

    it('100 gramas de alho', () => {
      const measure: Measure = {
        quantity: 100,
        type: 'LITERAL',
      };

      expect(measureFromString('100 gramas de alho')).toStrictEqual(measure);
    });

    it('1 xícara', () => {
      const measure: Measure = {
        quantity: 1,
        type: 'CUP',
      };

      expect(measureFromString('1 xícara')).toStrictEqual(measure);
    });

    it('Uma xícara', () => {
      const measure: Measure = {
        quantity: 1,
        type: 'CUP',
      };

      expect(measureFromString('Uma xícara')).toStrictEqual(measure);
    });

    it('Uma xícara e meia', () => {
      const measure: Measure = {
        quantity: 1.5,
        type: 'CUP',
      };

      expect(measureFromString('Uma xícara e meia')).toStrictEqual(measure);
    });

    it('Meia xícara', () => {
      const measure: Measure = {
        quantity: 0.5,
        type: 'CUP',
      };

      expect(measureFromString('Meia xícara')).toStrictEqual(measure);
    });

    it('4 xícaras e meia', () => {
      const measure: Measure = {
        quantity: 4.5,
        type: 'CUP',
      };

      expect(measureFromString('4 xícaras e meia')).toStrictEqual(measure);
    });

    it('Duas colheres de chá', () => {
      const measure: Measure = {
        quantity: 2,
        type: 'TEA_SPOON',
      };

      expect(measureFromString('Duas colheres de chá')).toStrictEqual(measure);
    });

    it('Duas colheres e meia de chá de', () => {
      const measure: Measure = {
        quantity: 2.5,
        type: 'TEA_SPOON',
      };

      expect(measureFromString('Duas colheres e meia de chá de')).toStrictEqual(
        measure,
      );
    });

    it('3 colheres de sopa', () => {
      const measure: Measure = {
        quantity: 3,
        type: 'TABLE_SPOON',
      };

      expect(measureFromString('3 colheres de sopa')).toStrictEqual(measure);
    });

    it('3 colheres e meia de sopa de', () => {
      const measure: Measure = {
        quantity: 3.5,
        type: 'TABLE_SPOON',
      };

      expect(measureFromString('3 colheres e meia de sopa de')).toStrictEqual(
        measure,
      );
    });

    it('Meia colher de sopa de', () => {
      const measure: Measure = {
        quantity: 0.5,
        type: 'TABLE_SPOON',
      };

      expect(measureFromString('Meia colher de sopa de')).toStrictEqual(
        measure,
      );
    });

    it('2 peitos de frango desfiado', () => {
      const measure: Measure = {
        quantity: 2,
        type: 'BREAST',
      };

      expect(measureFromString('2 peitos de frango desfiado')).toStrictEqual(
        measure,
      );
    });

    it('duas latas de molho de tomate pronto', () => {
      const measure: Measure = {
        quantity: 2,
        type: 'CAN',
      };

      expect(
        measureFromString('duas latas de molho de tomate pronto'),
      ).toStrictEqual(measure);
    });

    it('1 cebola pequena bem picadinha', () => {
      const measure: Measure = {
        quantity: 1,
        type: 'UNITY_SMALL',
      };

      expect(measureFromString('1 cebola pequena bem picadinha')).toStrictEqual(
        measure,
      );
    });

    it('1 kg de batata', () => {
      const measure: Measure = {
        quantity: 1000,
        type: 'LITERAL',
      };

      expect(measureFromString('1 kg de batata')).toStrictEqual(measure);
    });

    it('um dente de alho', () => {
      const measure: Measure = {
        quantity: 1,
        type: 'CLOVE',
      };

      expect(measureFromString('um dente de alho')).toStrictEqual(measure);
    });

    it('1 pote de iogurte natural (170 g)', () => {
      const measure: Measure = {
        quantity: 170,
        type: 'LITERAL',
      };

      expect(
        measureFromString('1 pote de iogurte natural (170 g)'),
      ).toStrictEqual(measure);
    });
  });

  describe('getQuantityByMeasure', () => {
    it('1 cup of seed', () => {
      const quantiy = getQuantityByMeasure(
        {
          quantity: 1,
          type: 'CUP',
        },
        {
          ...FOOD,
          type: 'seed',
        } as Food,
      );

      expect(quantiy).toBe(200);
    });

    it('4 spoon of powder', () => {
      const quantiy = getQuantityByMeasure(
        {
          quantity: 4,
          type: 'TABLE_SPOON',
        },
        {
          ...FOOD,
          type: 'powder',
        } as Food,
      );

      expect(quantiy).toBe(30);
    });

    it('1000g literal', () => {
      const quantiy = getQuantityByMeasure({
        quantity: 1000,
        type: 'LITERAL',
      });

      expect(quantiy).toBe(1000);
    });

    it('0 g literal', () => {
      const quantiy = getQuantityByMeasure({
        quantity: 0,
        type: 'LITERAL',
      });

      expect(quantiy).toBe(0);
    });

    it('0 g literal', () => {
      const quantiy = getQuantityByMeasure({
        quantity: 0,
        type: 'LITERAL',
      });

      expect(quantiy).toBe(0);
    });

    it('cup of food without measure equal 240 by default', () => {
      const quantiy = getQuantityByMeasure({
        quantity: 1,
        type: 'CUP',
      });

      expect(quantiy).toBe(240);
    });

    it('table spoon of food without measure equal 15 by default', () => {
      const quantiy = getQuantityByMeasure({
        quantity: 1,
        type: 'TABLE_SPOON',
      });

      expect(quantiy).toBe(15);
    });

    it('tea spoon of food without measure equal 5 by default', () => {
      const quantiy = getQuantityByMeasure({
        quantity: 1,
        type: 'TEA_SPOON',
      });

      expect(quantiy).toBe(5);
    });

    it('0.5 cups of food without measure equal 120 by default', () => {
      const quantiy = getQuantityByMeasure({
        quantity: 0.5,
        type: 'CUP',
      });

      expect(quantiy).toBe(120);
    });

    it('1 cup with measure get the value by measures', () => {
      const quantiy = getQuantityByMeasure(
        {
          quantity: 1,
          type: 'CUP',
        },
        {
          ...FOOD,
          oneMeasures: [
            {
              quantity: 40,
              type: 'CUP',
            },
          ],
        },
      );

      expect(quantiy).toBe(40);
    });

    it('0.5 cup with measure get the half value by measures', () => {
      const quantiy = getQuantityByMeasure(
        {
          quantity: 0.5,
          type: 'CUP',
        },
        {
          ...FOOD,
          oneMeasures: [
            {
              quantity: 40,
              type: 'CUP',
            },
          ],
        },
      );

      expect(quantiy).toBe(20);
    });

    it('food with unity get the unity value', () => {
      const quantiy = getQuantityByMeasure(
        {
          quantity: 0.5,
          type: 'UNITY',
        },
        {
          ...FOOD,
          oneMeasures: [
            {
              quantity: 40,
              type: 'UNITY',
            },
          ],
        },
      );

      expect(quantiy).toBe(20);
    });

    it('if no UNITY SMALL get the value like 80% of unity', () => {
      const quantiy = getQuantityByMeasure(
        {
          quantity: 1,
          type: 'UNITY_SMALL',
        },
        {
          ...FOOD,
          oneMeasures: [
            {
              quantity: 100,
              type: 'UNITY',
            },
          ],
        },
      );

      expect(quantiy).toBe(80);
    });

    it('if no UNITY LARGE get the value like 120% of unity', () => {
      const quantiy = getQuantityByMeasure(
        {
          quantity: 1,
          type: 'UNITY_LARGE',
        },
        {
          ...FOOD,
          oneMeasures: [
            {
              quantity: 100,
              type: 'UNITY',
            },
          ],
        },
      );

      expect(quantiy).toBe(120);
    });
  });

  describe('verifyIsLiteralByUnit', () => {
    it('2 filés de peito de frango (cerca de 200g cada)', () => {
      const isLiteral = verifyIsLiteralByUnit(
        '2 filés de peito de frango (cerca de 200g cada)',
      );

      expect(isLiteral).toBe(true);
    });

    it('¼ de xícara (chá) de molho de tomate para pizza', () => {
      const isLiteral = verifyIsLiteralByUnit(
        '¼ de xícara (chá) de molho de tomate para pizza',
      );

      expect(isLiteral).toBe(false);
    });

    it('½ xícara (chá) de tomate sweet grape cortados ao meio (90 g)', () => {
      const isLiteral = verifyIsLiteralByUnit(
        '½ xícara (chá) de tomate sweet grape cortados ao meio (90 g)',
      );

      expect(isLiteral).toBe(false);
    });
  });

  describe('verifyIsLiteral', () => {
    it('⅔ de xícara (chá) de água morna (160 ml)', () => {
      const isLiteral = verifyIsLiteral(
        '⅔ de xícara (chá) de água morna (160 ml)',
      );

      expect(isLiteral).toBe(true);
    });

    it('½ xícara (chá) de tomate sweet grape cortados ao meio (90 g)', () => {
      const isLiteral = verifyIsLiteral(
        '½ xícara (chá) de tomate sweet grape cortados ao meio (90 g)',
      );

      expect(isLiteral).toBe(true);
    });

    it('¼ de xícara (chá) de molho de tomate para pizza', () => {
      const isLiteral = verifyIsLiteral(
        '¼ de xícara (chá) de molho de tomate para pizza',
      );

      expect(isLiteral).toBe(false);
    });

    it('500 ml de creme de leite fresco 35% de gordura', () => {
      const isLiteral = verifyIsLiteral(
        '500 ml de creme de leite fresco 35% de gordura',
      );

      expect(isLiteral).toBe(true);
    });

    it('2 filés de peito de frango (cerca de 200g cada)', () => {
      const isLiteral = verifyIsLiteral(
        '2 filés de peito de frango (cerca de 200g cada)',
      );

      expect(isLiteral).toBe(true);
    });

    it('100 g de frango: true', () => {
      const isLiteral = verifyIsLiteral('100 g de frango');

      expect(isLiteral).toBe(true);
    });

    it('100g de frango: true', () => {
      const isLiteral = verifyIsLiteral('100g de frango');

      expect(isLiteral).toBe(true);
    });

    it('100 kg de frango: true', () => {
      const isLiteral = verifyIsLiteral('100 kg de frango');

      expect(isLiteral).toBe(true);
    });

    it('100kg de frango: true', () => {
      const isLiteral = verifyIsLiteral('100kg de frango');

      expect(isLiteral).toBe(true);
    });

    it('1 galeto: false', () => {
      const isLiteral = verifyIsLiteral('1 galeto');

      expect(isLiteral).toBe(false);
    });

    it('5 kilogramas de queijo', () => {
      const isLiteral = verifyIsLiteral('5 kilogramas de queijo');

      expect(isLiteral).toBe(true);
    });

    it('5 kilos de carne de segunda', () => {
      const isLiteral = verifyIsLiteral('5 kilos de carne de segunda');

      expect(isLiteral).toBe(true);
    });

    it('200 gramas de queijo', () => {
      const isLiteral = verifyIsLiteral('200 gramas de queijo');

      expect(isLiteral).toBe(true);
    });

    it('20 fatias de queijo', () => {
      const isLiteral = verifyIsLiteral('20 fatias de queijo');

      expect(isLiteral).toBe(false);
    });

    it('1 pote de iogurte natural (170 g)', () => {
      const isLiteral = verifyIsLiteral('1 pote de iogurte natural (170 g)');

      expect(isLiteral).toBe(true);
    });

    it('170g de iogurte natural', () => {
      const isLiteral = verifyIsLiteral('1 pote de iogurte natural (170 g)');

      expect(isLiteral).toBe(true);
    });

    it('1 ⅓ de xícara (chá) de gravatinha (ou outra massa curta de grano duro)', () => {
      const isLiteral = verifyIsLiteral(
        '1 ⅓ de xícara (chá) de gravatinha (ou outra massa curta de grano duro)',
      );

      expect(isLiteral).toBe(false);
    });
  });

  describe('getLiteralQuantity', () => {
    it('⅔ de xícara (chá) de água morna (160 ml)', () => {
      const quantity = getLiteralQuantity(
        '⅔ de xícara (chá) de água morna (160 ml)',
      );

      expect(quantity).toBe(160);
    });

    it('½ xícara (chá) de tomate sweet grape cortados ao meio (90 g)', () => {
      const quantity = getLiteralQuantity(
        '½ xícara (chá) de tomate sweet grape cortados ao meio (90 g)',
      );

      expect(quantity).toBe(90);
    });

    it('1 peça de filé mignon suíno (cerca de 650 g)', () => {
      const quantity = getLiteralQuantity(
        '1 peça de filé mignon suíno (cerca de 650 g)',
      );

      expect(quantity).toBe(650);
    });
  });
});

// for literal measure regex

/*
(^\d*\s?m?li?t?r?o?\s)|(^\d*\s?g\s)|(^\d*\s?grama\s)|(^\d*\s?gramas\s)|(\(.*\d*\s?g\))|(\(.*\d*\s?grama\))|(\(.*\d*\s?gramas\))|(^\d*\s?kg\s)|(^\d*\s?kilograma\s)|(^\d*\s?kilogramas\s)|(^\d*\s?kilos\s)|(^\d*\s?kilo\s)|(\(.*\d*\s?kg\))|(\(.*\d*\s?kilograma\))|(\(.*\d*\s?kilogramas\))|(\(.*\d*\s?kilos\))|(\(.*\d*\s?kilo\))|(\(.*\d*\s?m?li?t?r?o?\))

500g de queijo
500 g de queijo
500gramas de queijo
500 gramas de queijo
1grama de queijo
1 grama de queijo

500kg de queijo
500 kg de queijo
500kilogramas de queijo
500 kilogramas de queijo
500kilos de queijo
500 kilos de queijo
1kilograma de queijo
1 kilograma de queijo
1kilo de queijo
1 kilo de queijo

de queijo (500g)
de queijo (500 g)
de queijo (500gramas)
de queijo (500 gramas)
de queijo (1grama)
de queijo (1 grama)

de queijo (500kg)
de queijo (500 kg)
de queijo (500kilogramas)
de queijo (500 kilogramas)
de queijo (500kilos)
de queijo (500 kilos)
de queijo (1kilograma)
de queijo (1 kilograma)
de queijo (1kilo)
de queijo (1 kilo)

500g de queijo
500 g de queijo
500gramas de queijo
500 gramas de queijo
1grama de queijo
1 grama de queijo

5kg de queijo
50 kg de queijo
5kilogramas de queijo
5 kilogramas de queijo
5kilos de queijo
5 kilos de queijo
1kilograma de queijo
1 kilograma de queijo
1kilo de queijo
1 kilo de queijo

de queijo (5g)
de queijo (5 g)
de queijo (5gramas)
de queijo (5 gramas)
de queijo (1grama)
de queijo (1 grama)

de queijo (5kg)
de queijo (5 kg)
de queijo (5kilogramas)
de queijo (5 kilogramas)
de queijo (5kilos)
de queijo (5 kilos)
de queijo (1kilograma)
de queijo (1 kilograma)
de queijo (1kilo)
de queijo (1 kilo)

500ml de leite fresco
500 ml de leite fresco
leite freco (500ml)
leite freco (500 ml)

1 litro de leite
1l de leite
1 l de leite
leite (1l)
leite (1 l)
leite (1 litro)
*/
