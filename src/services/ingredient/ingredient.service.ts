import isNaN from 'lodash/isNaN';
import { AminoAcids } from '../amino-acid';
import { Food, Measure, Measurer, FoodService, MEASURE, FOOD } from '../food';
import { MINERALS, Minerals } from '../mineral';
import { VITAMINS, Vitamins } from '../vitamin';
import { Ingredient, PORTION } from './ingredient.types';

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
      if (food.type === 'seed') {
        quantity = 200;
      } else if (food.type === 'powder') {
        quantity = 120;
      } else if (food.type === 'oil') {
        quantity = 180;
      } else {
        quantity = 240;
      }
    }

    if (measure.type === 'TABLE_SPOON') {
      if (food.type === 'powder') {
        quantity = 7.5;
      } else {
        quantity = 15;
      }
    }

    if (measure.type === 'TEA_SPOON') {
      if (food.type === 'powder') {
        quantity = 1.5;
      } else {
        quantity = 5;
      }
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
  /(^\d*\s?m?li?t?r?o?\s)|(^\d*\s?k?i?l?o?gr?a?m?a?s?\s)|(\([a-zA-Z\d\s]*k?i?l?o?gr?a?m?a?s?\s?c?a?d?a?\))|(^\d*\s?kg\s)|(^\d*\s?kilos\s)|(^\d*\s?kilo\s)|(\(.*\d*\s?kilos?\))|(\(\d*\s?m?li?t?r?o?\))/;

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

  if (string.includes(' lata')) {
    type = 'CAN';
  }

  if (string.includes(' vidro')) {
    type = 'GLASS';
  }

  if (string.includes(' cacho')) {
    type = 'BUNCH';
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

  if (
    string.includes('a gosto') ||
    string.startsWith('um fio') ||
    string.includes('à gosto') ||
    string.includes('para polvilhar') ||
    string.includes('pitada') ||
    /((^|\s)raspas?\s)/.test(string)
  ) {
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

  if (
    lowText.includes('a gosto') ||
    lowText.includes('à gosto') ||
    lowText.includes('pitada') ||
    lowText.includes('para polvilhar') ||
    /((^|\s)raspas?\s)/.test(lowText)
  ) {
    quantity = 0;
  }

  return {
    quantity,
    type,
  };
}

function ingredientFromString(text = ''): Ingredient {
  const { food } = FoodService.getFoodByString(text);

  const measure = measureFromString(text);

  if (!food) return PORTION;

  // const food = foods[ingredientData.foodId - 1];
  const quantity = getQuantityByMeasure(measure, food);
  const calories = (food.calories * quantity) / 100 || 0;
  const totalFat = (food.totalFat * quantity) / 100 || 0;
  const carbohydrates = (food.carbohydrates * quantity) / 100 || 0;
  const dietaryFiber = (food.dietaryFiber * quantity) / 100 || 0;
  const proteins = (food.proteins * quantity) / 100 || 0;
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
  const vitamins: Vitamins = Object.entries(food.vitamins).reduce(
    (acc, [key, vitamin]): Vitamins => ({
      ...acc,
      [key]: {
        ...vitamin,
        quantity: (vitamin.quantity * quantity) / 100,
      },
    }),
    VITAMINS,
  );

  const minerals: Minerals = Object.entries(food.minerals).reduce(
    (acc, [key, mineral]) => ({
      ...acc,
      [key]: {
        ...mineral,
        quantity: (mineral.quantity * quantity) / 100,
      },
    }),
    MINERALS,
  );

  return {
    food,
    quantity,
    calories,
    carbohydrates,
    totalFat,
    dietaryFiber,
    proteins,
    aminoAcids,
    measure,
    description: text,
    vitamins,
    minerals,
  };
}

const IngredientService = {
  ingredientFromString,
  measureFromString,
};

export default IngredientService;
