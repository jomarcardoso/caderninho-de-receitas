import isNaN from 'lodash/isNaN';
import { AminoAcids } from '../amino-acid';
import { Food, Measure, Measurer, FoodService, MEASURE, FOOD } from '../food';
import { Ingredient, PORTION, UnFormat } from './ingredient.types';

export function getQuantityByMeasure(
  measure: Measure = MEASURE,
  food: Food = FOOD,
): number {
  if (measure.type === 'LITERAL') return measure.quantity;

  let { quantity = 1 }: Measure =
    food.oneMeasures.find((oneMeasure) => oneMeasure.type === measure.type) ||
    MEASURE;

  if (quantity === 0) {
    if (measure.type === 'CUP') {
      quantity = 240;
    }

    if (measure.type === 'TABLE_SPOON') {
      quantity = 15;
    }

    if (measure.type === 'TEA_SPOON') {
      quantity = 5;
    }

    if (measure.type === 'UNITY_LARGE') {
      quantity =
        (food.oneMeasures.find((oneMeasure) => oneMeasure.type === 'UNITY')
          ?.quantity ?? quantity) * 1.2;
    }

    if (measure.type === 'UNITY_SMALL') {
      quantity =
        (food.oneMeasures.find((oneMeasure) => oneMeasure.type === 'UNITY')
          ?.quantity ?? quantity) * 0.8;
    }
  }

  return measure.quantity * quantity;
}

const LITERAL_REGEX =
  /(^\d*\s?m?li?t?r?o?\s)|(^\d*\s?k?i?l?o?gr?a?m?a?s?\s)|(\(.*\d*\s?k?i?l?o?gr?a?m?a?s?\s?c?a?d?a?\))|(^\d*\s?kg\s)|(^\d*\s?kilos\s)|(^\d*\s?kilo\s)|(\(.*\d*\s?kilos?\))|(\(.*\d*\s?m?li?t?r?o?\))/;

export function verifyIsLiteral(string = ''): boolean {
  return LITERAL_REGEX.test(string);
}

export function getLiteralQuantity(string = ''): number {
  return Number(
    string
      .match(LITERAL_REGEX)?.[0]
      ?.replace(/\s/g, '')
      ?.replace(/[a-z]/g, '')
      ?.replace(/\(/g, '')
      ?.replace(/\)/g, ''),
  );
}

export function verifyIsLiteralByUnit(string = ''): boolean {
  return /\(.*cada.*\)/.test(string);
}

export function measureTypeFromString(string: string): Measure['type'] {
  let type: Measurer = 'UNITY';

  if (string.includes('peito')) {
    type = 'BREAST';
  }

  if (string.includes('lata')) {
    type = 'CAN';
  }

  if (string.includes('dente')) {
    type = 'CLOVE';
  }

  if (string.includes('colher')) {
    type = 'TABLE_SPOON';
  }

  if (string.match(/.*colher.*chá.*/)) {
    type = 'TEA_SPOON';
  }

  if (string.includes('fatia') || string.includes('rodela')) {
    type = 'SLICE';
  }

  if (string.includes('folha')) {
    type = 'UNITY';
  }

  if (type === 'UNITY') {
    if (string.includes('pequeno') || string.includes('pequena')) {
      type = 'UNITY_SMALL';
    }

    if (string.includes('grande')) {
      type = 'UNITY_LARGE';
    }
  }

  if (
    string.includes('xícara') ||
    string.includes('xícara (chá)') ||
    string.includes('xícaras (chá)') ||
    string.includes('xicara') ||
    string.includes('copo')
  ) {
    type = 'CUP';
  }

  if (verifyIsLiteral(string)) type = 'LITERAL';

  if (string.includes('a gosto') || string.includes('à gosto')) {
    type = 'LITERAL';
  }

  return type;
}

function measureFromString(text = ''): Measure {
  const lowText = text.toLowerCase();
  const type = measureTypeFromString(lowText);

  const valueSplit = lowText.split(' ') || [];
  const quantityString =
    valueSplit.find((statement) => /^\d{1,}/.test(statement)) || '';

  let quantity = Number(
    quantityString
      .replace(/½/g, '')
      .replace(/1\/2/g, '')
      .replace(/⅓/g, '')
      .replace(/1\/3/g, '')
      .replace(/⅔/g, '')
      .replace(/2\/3/g, '')
      .replace(/¼/g, '')
      .replace(/1\/4/g, '')
      .replace(/\D/, ''),
  );

  if (valueSplit.find((statement) => statement === 'duas')) quantity = 2;

  if (isNaN(quantity) || !quantity) quantity = 1;

  if (
    lowText.includes('e meio') ||
    lowText.includes('e meia') ||
    lowText.includes('e ½') ||
    /\d\s?½/.test(lowText) ||
    lowText.includes('e 1/2') ||
    /\d 1\/2/.test(lowText)
  ) {
    quantity += 0.5;
  }

  if (
    lowText.includes('e um terço') ||
    lowText.includes('e ⅓') ||
    /\d\s?⅓/.test(lowText) ||
    lowText.includes('e 1/3') ||
    /\d 1\/3/.test(lowText)
  ) {
    quantity += 0.333;
  }

  if (
    lowText.includes('e dois terços') ||
    lowText.includes('e ⅔') ||
    /\d\s?⅔/.test(lowText) ||
    lowText.includes('e ⅔') ||
    /\d 2\/3/.test(lowText)
  ) {
    quantity += 0.666;
  }

  if (
    lowText.includes('e um quarto') ||
    lowText.includes('¼') ||
    /\d\s?¼/.test(lowText) ||
    lowText.includes('e 1/4') ||
    /\d 1\/4/.test(lowText)
  ) {
    quantity += 0.25;
  }

  if (
    lowText.startsWith('meio') ||
    lowText.startsWith('meia') ||
    lowText.startsWith('1/2') ||
    lowText.startsWith('½')
  ) {
    quantity = 0.5;
  }

  if (
    lowText.startsWith('um terço') ||
    lowText.startsWith('1/3') ||
    lowText.startsWith('⅓')
  ) {
    quantity = 0.333;
  }

  if (
    lowText.startsWith('um terço') ||
    lowText.startsWith('2/3') ||
    lowText.startsWith('⅔')
  ) {
    quantity = 0.666;
  }

  if (
    lowText.startsWith('um quarto') ||
    lowText.startsWith('1/4') ||
    lowText.startsWith('¼')
  ) {
    quantity = 0.25;
  }

  const isInKiloGram = lowText.includes('kg');

  if (type === 'LITERAL') {
    quantity = getLiteralQuantity(lowText);

    if (isInKiloGram) {
      quantity *= 1000;
    }
  }

  const isLiteralByUnit = verifyIsLiteralByUnit(lowText);

  if (isLiteralByUnit) {
    const units = Number(lowText.match(/^\d/)?.[0] ?? 2);

    quantity *= units;
  }
  if (lowText.includes('a gosto') || lowText.includes('à gosto')) {
    quantity = 0;
  }

  return {
    quantity,
    type,
  };
}

const unFormat: UnFormat = ({ description }) => description;

interface IngredientFromStringArgs {
  foods: Array<Food>;
  text: string;
}

function ingredientFromString({
  text,
  foods,
}: IngredientFromStringArgs): Ingredient {
  const { food } = FoodService.getFoodByString({
    foods,
    text,
  });

  const measure = measureFromString(text);

  if (!food) return PORTION;

  // const food = foods[ingredientData.foodId - 1];
  const quantity = getQuantityByMeasure(measure, food);
  const calories = (food.calories * quantity) / 100;
  const carbohydrates = (food.carbohydrates * quantity) / 100;
  const aminoAcids: AminoAcids = {
    alanine: (food.aminoAcids.alanine * quantity) / 100,
    valine: (food.aminoAcids.valine * quantity) / 100,
    tyrosine: (food.aminoAcids.tyrosine * quantity) / 100,
    tryptophan: (food.aminoAcids.tryptophan * quantity) / 100,
    threonine: (food.aminoAcids.threonine * quantity) / 100,
    serine: (food.aminoAcids.serine * quantity) / 100,
    proline: (food.aminoAcids.proline * quantity) / 100,
    phenylalanine: (food.aminoAcids.phenylalanine * quantity) / 100,
    methionine: (food.aminoAcids.methionine * quantity) / 100,
    lysine: (food.aminoAcids.lysine * quantity) / 100,
    leucine: (food.aminoAcids.leucine * quantity) / 100,
    isoleucine: (food.aminoAcids.isoleucine * quantity) / 100,
    histidine: (food.aminoAcids.histidine * quantity) / 100,
    glycine: (food.aminoAcids.glycine * quantity) / 100,
    glutamine: (food.aminoAcids.glutamine * quantity) / 100,
    glutamicAcid: (food.aminoAcids.glutamicAcid * quantity) / 100,
    cystine: (food.aminoAcids.cystine * quantity) / 100,
    asparticAcid: (food.aminoAcids.asparticAcid * quantity) / 100,
    arginine: (food.aminoAcids.arginine * quantity) / 100,
  };

  return {
    food,
    quantity,
    calories,
    carbohydrates,
    aminoAcids,
    measure,
    description: text,
  };
}

const IngredientService = {
  unFormat,
  ingredientFromString,
  measureFromString,
};

export default IngredientService;
