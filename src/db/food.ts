import fs from 'fs';
import path from 'path';
import { FoodMyFoodData } from './db.types';
import {
  UnitOfMeasurement,
  AMINO_ACIDS,
  MINERALS,
  VITAMINS,
  FoodData,
} from '../services/food';
import {
  coconut as coconutData,
  egg as eggData,
  chicken as chickenData,
  oliveOil as oliveOilData,
  sugar as sugarData,
  wheatFlour as wheatFlourData,
  avocado,
} from './src';

function format(food: FoodMyFoodData): FoodData {
  return {
    saturedFats: food.FASAT,
    calories: food.ENERC_KCAL,
    enName: encodeURIComponent(food.name1.toLowerCase().replace(/\s/, '-')),
    aminoAcids: {
      alanine: food.ALA_G,
      arginine: food.ARG_G,
      asparticAcid: food.ASP_G,
      cystine: food.CYS_G,
      glutamicAcid: food.GLU_G,
      glutamine: 0,
      glycine: food.GLY_G,
      histidine: food.HISTN_G,
      isoleucine: food.ILE_G,
      leucine: food.LEU_G,
      lysine: food.LYS_G,
      methionine: food.MET_G,
      phenylalanine: food.PHE_G,
      proline: food.PRO_G,
      serine: food.SER_G,
      threonine: food.THR_G,
      tryptophan: food.TRP_G,
      tyrosine: food.TYR_G,
      valine: food.VAL_G,
    },
    carbohydrates: food.CHOCDF,
    proteins: Number(food.PROCNT),
    totalFat: Number(food.FAT),
  };
}

const foods: Array<FoodData> = [
  {
    name: 'Maçã Fugi',
    enName: 'apple',
    id: 1,
    gi: 25,
    gl: 3,
    image: '/images/food/apple.svg',
    calories: 52,
    carbohydrates: 14,
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasures: [
      {
        quantity: 192,
        type: 'UNITY',
      },
    ],
    aminoAcids: {
      tryptophan: 1,
      threonine: 6,
      isoleucine: 6,
      leucine: 13,
      lysine: 12,
      methionine: 1,
      cystine: 1,
      phenylalanine: 6,
      tyrosine: 1,
      valine: 12,
      histidine: 5,
      arginine: 6,
      alanine: 11,
      asparticAcid: 70,
      glutamicAcid: 25,
      glycine: 9,
      proline: 6,
      serine: 10,
      glutamine: 0,
    },
  },
  {
    name: 'Pêra',
    enName: 'pear',
    id: 2,
    gi: 38,
    image: '/images/food/pear.svg',
    calories: 57,
    aminoAcids: {
      tryptophan: 2,
      threonine: 11,
      isoleucine: 11,
      leucine: 19,
      lysine: 17,
      methionine: 2,
      cystine: 2,
      phenylalanine: 11,
      tyrosine: 2,
      valine: 17,
      histidine: 2,
      arginine: 10,
      alanine: 14,
      asparticAcid: 105,
      glutamicAcid: 30,
      glycine: 13,
      proline: 21,
      serine: 15,
      glutamine: 0,
    },
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasures: [
      {
        quantity: 178,
        type: 'UNITY',
      },
    ],
  },
  {
    name: 'Banana Prata',
    enName: 'silver-banana',
    id: 3,
    gi: 39,
    gl: 8,
    image: '/images/food/banana.svg',
    calories: 89,
    carbohydrates: 28,
    aminoAcids: {
      tryptophan: 9,
      threonine: 28,
      isoleucine: 28,
      leucine: 68,
      lysine: 50,
      methionine: 8,
      cystine: 9,
      phenylalanine: 49,
      tyrosine: 9,
      valine: 47,
      histidine: 77,
      arginine: 49,
      alanine: 40,
      asparticAcid: 124,
      glutamicAcid: 152,
      glycine: 28,
      proline: 38,
      serine: 40,
      glutamine: 0,
    },
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasures: [
      {
        quantity: 101,
        type: 'UNITY',
      },
    ],
  },
  {
    name: 'Arroz Branco',
    enName: 'white-rice',
    id: 4,
    gi: 81,
    gl: 18,
    carbohydrates: 32,
    image: '/images/food/rice.svg',
    calories: 130,
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasures: [
      {
        quantity: 158,
        type: 'CUP',
      },
    ],
    aminoAcids: {
      tryptophan: 31,
      threonine: 96,
      isoleucine: 116,
      leucine: 222,
      lysine: 97,
      methionine: 163,
      cystine: 55,
      phenylalanine: 144,
      tyrosine: 90,
      valine: 164,
      histidine: 63,
      arginine: 224,
      alanine: 156,
      asparticAcid: 253,
      glutamicAcid: 524,
      glycine: 122,
      proline: 127,
      serine: 141,
      glutamine: 0,
    },
    keys: ['arroz'],
  },
  {
    name: 'Feijão',
    enName: 'bean',
    id: 5,
    gi: 29,
    image: '/images/food/bean.svg',
    calories: 132,
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasures: [
      {
        quantity: 172,
        type: 'CUP',
      },
    ],
    saturedFats: 0.1,
    totalFat: 0.5,
    minerals: {
      sodium: 1.7,
      iron: 2.1,
      calcium: 27,
      potassium: 355,
      phosphorus: 140,
    },
    carbohydrates: 23.7,
    dietaryFiber: 8.7,
    aminoAcids: {
      tryptophan: 105,
      threonine: 373,
      isoleucine: 391,
      leucine: 708,
      lysine: 608,
      methionine: 133,
      cystine: 96,
      phenylalanine: 479,
      tyrosine: 250,
      valine: 464,
      histidine: 247,
      arginine: 549,
      alanine: 372,
      asparticAcid: 1072,
      glutamicAcid: 1351,
      glycine: 346,
      proline: 376,
      serine: 482,
      glutamine: 0,
    },
  },
  {
    name: 'Banana Nanica',
    enName: 'nanica-banana',
    id: 6,
    gi: 70,
    gl: 14,
    image: '/images/food/banana.svg',
    calories: 89,
    carbohydrates: 28,
    aminoAcids: {
      tryptophan: 9,
      threonine: 28,
      isoleucine: 28,
      leucine: 68,
      lysine: 50,
      methionine: 8,
      cystine: 9,
      phenylalanine: 49,
      tyrosine: 9,
      valine: 47,
      histidine: 77,
      arginine: 49,
      alanine: 40,
      asparticAcid: 124,
      glutamicAcid: 152,
      glycine: 28,
      proline: 38,
      serine: 40,
      glutamine: 0,
    },
  },
  {
    name: 'Banana Mysore',
    enName: 'mysore-banana',
    id: 7,
    gi: 87,
    gl: 6,
    image: '/images/food/banana.svg',
    calories: 89,
    carbohydrates: 12,
    aminoAcids: {
      tryptophan: 9,
      threonine: 28,
      isoleucine: 28,
      leucine: 68,
      lysine: 50,
      methionine: 8,
      cystine: 9,
      phenylalanine: 49,
      tyrosine: 9,
      valine: 47,
      histidine: 77,
      arginine: 49,
      alanine: 40,
      asparticAcid: 124,
      glutamicAcid: 152,
      glycine: 28,
      proline: 38,
      serine: 40,
      glutamine: 0,
    },
  },
  {
    name: 'Laranja',
    enName: 'orange',
    id: 8,
    gi: 43,
    image: '/images/food/orange.svg',
    calories: 0,
    carbohydrates: 14,
    aminoAcids: {
      tryptophan: 2,
      threonine: 8,
      isoleucine: 8,
      leucine: 13,
      lysine: 9,
      methionine: 3,
      cystine: 5,
      phenylalanine: 9,
      tyrosine: 4,
      valine: 1,
      histidine: 3,
      arginine: 47,
      alanine: 15,
      asparticAcid: 75,
      glutamicAcid: 33,
      glycine: 9,
      proline: 44,
      serine: 13,
      glutamine: 0,
    },
    oneMeasures: [
      {
        quantity: 248,
        type: 'CUP',
      },
    ],
    unitOfMeasurement: UnitOfMeasurement.liter,
  },
  {
    name: 'Polenta',
    enName: 'polenta',
    id: 9,
    gi: 74,
    gl: 11,
    image: '/images/food/polenta.svg',
    calories: 0,
    carbohydrates: 21,
    aminoAcids: {
      tryptophan: 10,
      threonine: 54,
      isoleucine: 51,
      leucine: 175,
      lysine: 40,
      methionine: 30,
      cystine: 26,
      phenylalanine: 70,
      tyrosine: 58,
      valine: 72,
      histidine: 44,
      arginine: 71,
      alanine: 107,
      asparticAcid: 99,
      glutamicAcid: 268,
      glycine: 59,
      proline: 125,
      serine: 68,
      glutamine: 0,
    },
    oneMeasures: [
      {
        quantity: 233,
        type: 'CUP',
      },
    ],
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    name: 'Pão Francês',
    enName: 'bread-roll',
    id: 10,
    gi: 100,
    gl: 14,
    image: '/images/food/bread-roll.svg',
    calories: 0,
    carbohydrates: 20,
    aminoAcids: {
      tryptophan: 99,
      threonine: 255,
      isoleucine: 336,
      leucine: 608,
      lysine: 231,
      methionine: 153,
      cystine: 182,
      phenylalanine: 422,
      tyrosine: 249,
      valine: 380,
      histidine: 188,
      arginine: 320,
      alanine: 302,
      asparticAcid: 414,
      glutamicAcid: 2772,
      glycine: 309,
      proline: 926,
      serine: 416,
      glutamine: 0,
    },
    oneMeasures: [
      {
        quantity: 38,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    name: 'Morango',
    enName: 'strawberry',
    id: 11,
    gi: 53,
    gl: 2,
    image: '/images/food/strawberry.svg',
    calories: 0,
    carbohydrates: 6,
    aminoAcids: AMINO_ACIDS,
  },
  {
    id: 12,
    name: 'pastel',
    enName: 'pasty',
    image: '/images/food/pasty.svg',
    description: 'pastel de carne, frito',
    aminoAcids: {
      tryptophan: 120,
      threonine: 300,
      isoleucine: 410,
      leucine: 810,
      lysine: 390,
      methionine: 190,
      cystine: 70,
      phenylalanine: 500,
      tyrosine: 360,
      valine: 500,
      arginine: 410,
      histidine: 180,
      alanine: 310,
      asparticAcid: 540,
      glutamicAcid: 370,
      glycine: 300,
      proline: 180,
      serine: 470,
      glutamine: 0,
    },
  },
  {
    id: 13,
    name: 'alho',
    enName: 'garlic',
    gi: 0,
    image: '/images/food/garlic.svg',
    description: 'Alho-poró, cru',
    aminoAcids: {
      tryptophan: 10,
      threonine: 30,
      isoleucine: 40,
      leucine: 70,
      lysine: 80,
      methionine: 10,
      cystine: 0,
      phenylalanine: 50,
      tyrosine: 60,
      valine: 50,
      arginine: 80,
      histidine: 20,
      alanine: 60,
      asparticAcid: 50,
      glutamicAcid: 180,
      glycine: 50,
      proline: 30,
      serine: 40,
      glutamine: 0,
    },
    oneMeasures: [
      {
        quantity: 31.4,
        type: 'CLOVE',
      },
    ],
  },
  {
    id: 14,
    enName: 'lettuce',
    name: 'alface',
    gi: 0,
    image: '/images/food/lettuce.svg',
    description: 'Alface, roxa, crua',
    aminoAcids: {
      tryptophan: 0,
      threonine: 30,
      isoleucine: 30,
      leucine: 60,
      lysine: 50,
      methionine: 10,
      cystine: 0,
      phenylalanine: 40,
      tyrosine: 40,
      valine: 40,
      arginine: 60,
      histidine: 20,
      alanine: 50,
      asparticAcid: 50,
      glutamicAcid: 110,
      glycine: 40,
      proline: 30,
      serine: 30,
      glutamine: 0,
    },
  },
  {
    id: 15,
    name: 'Presunto',
    enName: 'ham',
    gi: 0,
    image: '/images/food/ham.svg',
    description: 'Presunto, sem capa de gordura',
    aminoAcids: {
      tryptophan: 150,
      threonine: 710,
      isoleucine: 690,
      leucine: 1150,
      lysine: 1280,
      methionine: 480,
      cystine: 220,
      phenylalanine: 630,
      tyrosine: 550,
      valine: 720,
      arginine: 1200,
      histidine: 890,
      alanine: 820,
      asparticAcid: 1370,
      glutamicAcid: 2360,
      glycine: 730,
      proline: 650,
      serine: 680,
      glutamine: 0,
    },
    keys: [],
  },
  {
    id: 16,
    name: 'Abacaxi',
    enName: 'pineapple',
    gi: 59,
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasures: [
      {
        quantity: 905,
        type: 'UNITY',
      },
    ],
    image: '/images/food/pineapple.svg',
    aminoAcids: {
      alanine: 33,
      arginine: 19,
      asparticAcid: 121,
      cystine: 14,
      glutamicAcid: 79,
      glutamine: 0,
      glycine: 24,
      histidine: 10,
      isoleucine: 19,
      leucine: 24,
      lysine: 26,
      methionine: 12,
      phenylalanine: 21,
      proline: 17,
      serine: 35,
      threonine: 19,
      tryptophan: 5,
      tyrosine: 19,
      valine: 24,
    },
    keys: [],
  },
  {
    id: 17,
    enName: 'carrot',
    name: 'Cenoura',
    gi: 16,
    image: '/images/food/carrot.svg',
    keys: ['cenoura ralada', 'cenouras raladas', 'pedaços de cenoura'],
    oneMeasures: [
      {
        quantity: 61,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: UnitOfMeasurement.gram,
    aminoAcids: {
      tryptophan: 12,
      threonine: 191,
      isoleucine: 77,
      leucine: 102,
      lysine: 101,
      methionine: 20,
      cystine: 83,
      phenylalanine: 61,
      tyrosine: 43,
      valine: 69,
      histidine: 40,
      arginine: 91,
      alanine: 113,
      asparticAcid: 190,
      glutamicAcid: 366,
      glycine: 47,
      proline: 54,
      serine: 54,
      glutamine: 0,
    },
  },
  {
    ...format(avocado),
    id: 18,
    name: 'Abacate',
    enName: 'avocado',
    gi: 15,
    image: '/images/food/avocado.svg',
    aminoAcids: {
      tryptophan: 25,
      threonine: 73,
      isoleucine: 84,
      leucine: 143,
      lysine: 132,
      methionine: 38,
      cystine: 27,
      phenylalanine: 97,
      tyrosine: 49,
      valine: 107,
      histidine: 49,
      arginine: 88,
      alanine: 109,
      asparticAcid: 236,
      glutamicAcid: 287,
      glycine: 104,
      proline: 98,
      serine: 114,
      glutamine: 0,
    },
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasures: [
      {
        quantity: 201,
        type: 'UNITY',
      },
    ],
  },
  {
    id: 19,
    name: 'Aveia',
    enName: 'oat',
    calories: 394,
    carbohydrates: 66.6,
    proteins: 13.9,
    dietaryFiber: 9.1,
    minerals: {
      calcium: 47.9,
      phosphorus: 153.4,
      manganese: 1.9,
      magnesium: 118.8,
      potassium: 336.3,
      iron: 4.5,
      zinc: 2.6,
      sodium: 4.6,
    },
    vitamins: {
      c: 1.4,
    },
    image: '/images/food/oats.svg',
    oneMeasures: [
      {
        quantity: 234,
        type: 'CUP',
      },
    ],
    unitOfMeasurement: UnitOfMeasurement.gram,
    aminoAcids: {
      tryptophan: 40,
      threonine: 96,
      isoleucine: 116,
      leucine: 216,
      lysine: 135,
      methionine: 46,
      cystine: 97,
      phenylalanine: 142,
      tyrosine: 101,
      valine: 160,
      histidine: 54,
      arginine: 167,
      alanine: 124,
      asparticAcid: 302,
      glutamicAcid: 623,
      glycine: 147,
      proline: 96,
      serine: 151,
      glutamine: 0,
    },
    keys: ['aveia em flocos', 'flocos de aveia'],
  },
  {
    ...format(coconutData),
    id: 20,
    name: 'Coco ralado',
    gi: 42,
    enName: 'coconut',
    image: '/images/food/coconut.svg',
    oneMeasures: [
      {
        quantity: 80,
        type: 'CUP',
      },
      {
        quantity: 5,
        type: 'TABLE_SPOON',
      },
      {
        quantity: 1.5,
        type: 'TEA_SPOON',
      },
    ],
    unitOfMeasurement: UnitOfMeasurement.gram,
    keys: ['coco', 'côco', 'cocos', 'côcos'],
  },
  {
    ...format(eggData),
    id: 21,
    name: 'Ovo',
    enName: 'egg',
    gi: 0,
    image: '/images/food/egg.svg',
    oneMeasures: [
      {
        quantity: 46,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: UnitOfMeasurement.gram,
    keys: ['ovos'],
  },
  {
    ...format(chickenData),
    id: 22,
    gi: 0,
    name: 'Frango',
    enName: 'chicken',
    image: '/images/food/chicken.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
    keys: ['galinha', 'peito de frango', 'coxa de frango'],
    oneMeasures: [
      {
        quantity: 400,
        type: 'BREAST',
      },
    ],
  },
  {
    ...format(oliveOilData),
    id: 23,
    name: 'Azeite de oliva',
    gi: 0,
    enName: 'olive-oil',
    image: '/images/food/olive-oil.svg',
    unitOfMeasurement: UnitOfMeasurement.liter,
    keys: ['azeite', 'óleo de oliva', 'azeite de oliva extra virgem'],
    oneMeasures: [
      {
        quantity: 240,
        type: 'CUP',
      },
      {
        quantity: 15,
        type: 'TABLE_SPOON',
      },
      {
        quantity: 5,
        type: 'TEA_SPOON',
      },
    ],
  },
  {
    ...format(sugarData),
    id: 24,
    name: 'Açúcar branco',
    enName: 'sugar',
    gi: 92,
    image: '/images/food/sugar.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
    keys: ['açúcar', 'açucar'],
    oneMeasures: [
      {
        quantity: 160,
        type: 'CUP',
      },
      {
        quantity: 10,
        type: 'TABLE_SPOON',
      },
      {
        quantity: 3.5,
        type: 'TEA_SPOON',
      },
    ],
  },
  {
    ...format(wheatFlourData),
    id: 25,
    name: 'Farinha de trigo',
    enName: 'wheat-flour',
    gi: 85,
    image: '/images/food/wheat-flour.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
    keys: ['farinha branca', 'farinha'],
    oneMeasures: [
      {
        quantity: 120,
        type: 'CUP',
      },
      {
        quantity: 7.5,
        type: 'TABLE_SPOON',
      },
      {
        quantity: 2.5,
        type: 'TEA_SPOON',
      },
    ],
  },
  {
    ...format(sugarData), // TODO: precisa diferenciar do açúcar branco
    id: 26,
    name: 'Açúcar mascavo',
    enName: 'brown-sugar',
    gi: 80,
    image: '/images/food/sugar.svg', // TODO: precisa diferenciar do açúcar branco
    unitOfMeasurement: UnitOfMeasurement.gram,
    keys: ['açúcar escuro', 'açúcar integral'],
    oneMeasures: [
      {
        quantity: 160,
        type: 'CUP',
      },
      {
        quantity: 10,
        type: 'TABLE_SPOON',
      },
      {
        quantity: 3.5,
        type: 'TEA_SPOON',
      },
    ],
  },
  {
    ...format(sugarData), // TODO: precisa diferenciar do açúcar branco
    id: 27,
    name: 'Bolo de cenoura',
    enName: 'carrot-cake',
    gi: 67,
    image: '/images/food/carrot-cake.svg', // TODO: precisa diferenciar do açúcar branco
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    id: 28,
    name: 'Sal',
    enName: 'salt',
    image: '/images/food/salt.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
    calories: 0,
    totalFat: 0,
    saturedFats: 0,
    monounsaturatedFats: 0,
    minerals: {
      ...MINERALS,
      sodium: 38.758,
      calcium: 24,
      iron: 0.3,
      magnesium: 1,
      potassium: 8,
    },
  },
  {
    id: 29,
    name: 'Batata',
    enName: 'potato',
    image: '/images/food/potato.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
    calories: 77,
    carbohydrates: 17,
    dietaryFiber: 2.2,
    sugar: 0.8,
    proteins: 2,
    totalFat: 0.1,
    keys: ['batatinha', 'batata inglesa'],
    minerals: {
      ...MINERALS,
      sodium: 6,
      potassium: 421,
      iron: 0.8,
      magnesium: 23,
      calcium: 12,
    },
    vitamins: {
      ...VITAMINS,
      c: 19.7,
      b6: 0.3,
    },
  },
  {
    id: 30,
    name: 'Cebola',
    enName: 'onion',
    image: '/images/food/onion.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
    calories: 40,
    carbohydrates: 9,
    dietaryFiber: 1.7,
    sugar: 4.2,
    oneMeasures: [
      {
        quantity: 100,
        type: 'UNITY_SMALL',
      },
      {
        quantity: 125,
        type: 'UNITY',
      },
      {
        quantity: 150,
        type: 'UNITY_LARGE',
      },
    ],
    minerals: {
      ...MINERALS,
      sodium: 4,
      potassium: 146,
      iron: 0.2,
      magnesium: 10,
      calcium: 23,
    },
    vitamins: {
      c: 7.4,
      b6: 0.1,
    },
  },
  {
    id: 31,
    name: 'Pimenta',
    enName: 'pepper',
    image: '/images/food/pepper.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    id: 32,
    name: 'Milho',
    enName: 'corn',
    image: '/images/food/corn.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
    calories: 98,
    proteins: 3.2,
    totalFat: 2.4,
    carbohydrates: 17.1,
    dietaryFiber: 4.6,
    oneMeasures: [
      {
        quantity: 170,
        type: 'CAN',
      },
    ],
    keys: ['milho verde'],
  },
  {
    id: 33,
    name: 'Molho de tomate',
    enName: 'tomato-sauce',
    image: '/images/food/tomato-sauce.svg',
    unitOfMeasurement: UnitOfMeasurement.liter,
    oneMeasures: [
      {
        quantity: 350,
        type: 'CAN',
      },
    ],
  },
  {
    id: 34,
    name: 'Manteiga de amendoim',
    enName: 'peanut-butter',
    image: '/images/food/peanut-butter.svg',
    unitOfMeasurement: UnitOfMeasurement.liter,
  },
  {
    id: 35,
    name: 'Margarina',
    enName: 'margarine',
    image: '/images/food/margarine.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    id: 36,
    name: 'Requeijão',
    enName: 'cream-cheese',
    image: '/images/food/cream-cheese.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    id: 37,
    name: 'Leite',
    enName: 'milk',
    image: '/images/food/milk.svg',
    unitOfMeasurement: UnitOfMeasurement.liter,
  },
  {
    id: 38,
    name: 'Fermento',
    enName: 'yeast',
    image: '/images/food/yeast.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    id: 39,
    name: 'Óleo de soja',
    enName: 'soy-oil',
    image: '/images/food/oil.svg',
    unitOfMeasurement: UnitOfMeasurement.liter,
    keys: ['óleo'],
  },
  {
    id: 40,
    name: 'Manteiga',
    enName: 'butter',
    image: '/images/food/butter.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    id: 41,
    name: 'Pão caseiro',
    enName: 'homebread',
    image: '/images/food/bread.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
    keys: ['pão', 'pãozinho'],
  },
  {
    id: 42,
    name: 'Cuca',
    image: '/images/food/bread.svg',
    enName: 'crumb-cake',
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    id: 43,
    image: '/images/food/orange-juice.svg',
    name: 'Suco de Laranja',
    enName: 'orange-juice',
    gi: 50,
    gl: 6,
    version: 'JUICE',
    rawId: 8,
  },
  {
    id: 44,
    image: '/images/food/carrot.svg',
    name: 'Cenoura cozida',
    enName: 'boiled-carrot',
    gi: 38,
    version: 'BOILED',
    rawId: 17,
  },
  {
    id: 45,
    image: '/images/food/oat-flour.svg',
    name: 'Farinha de aveia',
    enName: 'oat-flour',
    keys: ['farelo de aveia'],
    gi: 72,
    version: 'FLOUR',
    rawId: 19,
  },
  {
    id: 46,
    name: 'Fubá',
    image: '/images/food/corn-flour.svg',
    enName: 'cornflour',
    keys: ['farinha de milho'],
    version: 'FLOUR',
    rawId: 32,
  },
  {
    id: 47,
    name: 'Amido de milho',
    image: '/images/food/corn-flour.svg',
    enName: 'maize-starch',
    keys: ['maizena'],
    version: 'REFINED_FLOUR',
    rawId: 32,
  },
];

fs.writeFileSync(
  path.resolve(__dirname, 'food.json'),
  JSON.stringify({ foods }),
);
