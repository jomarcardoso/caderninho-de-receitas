import isNaN from 'lodash/isNaN';
import {
  Food,
  AminoAcids,
  Measure,
  Measurer,
  FoodService,
  MEASURE,
  FOOD,
} from '../food';
import { Ingredient, PORTION, UnFormat } from './ingredient.types';

export function getQuantityByMeasure(
  measure: Measure = MEASURE,
  food: Food = FOOD,
): number {
  if (measure.type === 'LITERAL') return measure.quantity;

  let { quantity = 0 }: Measure =
    food.oneMeasures.find((oneMeasure) => oneMeasure.type === measure.type) ||
    MEASURE;

  if (quantity === 0) {
    if (measure.type === 'CUP') {
      quantity = 150;
    }

    if (measure.type === 'TABLE_SPOON') {
      quantity = 15;
    }

    if (measure.type === 'TEA_SPOON') {
      quantity = 5;
    }
  }

  return measure.quantity * quantity;
}

export function verifyIsLiteral(string = ''): boolean {
  return /((\d|\d\s)(g|kg)\s)|\d\s(kilo|grama)/.test(string);
}

function measureFromString(text = ''): Measure {
  const lowText = text.toLowerCase();
  let type: Measurer = 'UNITY';

  if (lowText.includes('peito')) {
    type = 'BREAST';
  }

  if (lowText.includes('lata')) {
    type = 'CAN';
  }

  if (lowText.includes('dente')) {
    type = 'CLOVE';
  }

  if (
    lowText.includes('xícara') ||
    lowText.includes('xicara') ||
    lowText.includes('copo')
  ) {
    type = 'CUP';
  }

  if (lowText.includes('colher')) {
    type = 'TABLE_SPOON';
  }

  if (lowText.match(/.*colher.*chá.*/)) {
    type = 'TEA_SPOON';
  }

  if (lowText.includes('fatia') || lowText.includes('rodela')) {
    type = 'SLICE';
  }

  if (lowText.includes('folha')) {
    type = 'UNITY';
  }

  if (verifyIsLiteral(lowText)) type = 'LITERAL';

  if (type === 'UNITY') {
    if (lowText.includes('pequeno') || lowText.includes('pequena')) {
      type = 'UNITY_SMALL';
    }

    if (lowText.includes('grande')) {
      type = 'UNITY_LARGE';
    }
  }

  const valueSplit = lowText.split(' ') || [];
  const quantityString =
    valueSplit.find((statement) => /^\d{1,}/.test(statement)) || '';

  let quantity = Number(quantityString.replace(/\D/, ''));

  if (valueSplit.find((statement) => statement === 'duas')) quantity = 2;

  if (isNaN(quantity) || !quantity) quantity = 1;

  if (
    lowText.startsWith('meio') ||
    lowText.startsWith('meia') ||
    lowText.startsWith('1/2')
  )
    quantity = 0.5;

  if (
    lowText.includes('e meio') ||
    lowText.includes('e meia') ||
    lowText.includes('e 1/2')
  )
    quantity += 0.5;

  const isInKiloGram = lowText.includes('kg');

  if (type === 'LITERAL' && isInKiloGram) {
    quantity *= 1000;
  }

  if (lowText.includes('a gosto') || lowText.includes('à gosto')) {
    quantity = 0;
    type = 'LITERAL';
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
