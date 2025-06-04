import mergeWith from 'lodash/mergeWith';
import {
  eggplant,
  boiledPotato,
  banana,
  sweetPotato,
  beetroot,
  bakingSoda,
} from './src';
import { FoodMyFoodData, FoodNacional } from './db.types';
import type { FoodData } from '../services/food';
import { formatMyFood, formatNacional, verifyQuantity } from './utils';
import { VITAMINS_DATA } from '../services/vitamin/vitamin.constants';
import foodListNacional from './src/cadastro-nacional/food-list.json';

export const SWEET_POTATO: FoodData = {
  ...formatMyFood(sweetPotato as unknown as FoodMyFoodData),
  name: 'Batata Doce',
  icon: '/images/food/sweet-potato.png',
  image:
    'https://images.unsplash.com/photo-1584699006710-3ad3b82fce7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  keys: ['batata doce', 'batata-doce', 'batata doce cozida'],
  oneMeasures: [
    {
      quantity: 240,
      type: 'UNITY',
    },
  ],
  unitOfMeasurement: 'gram',
  type: 'root',
};

export const bFoodData: Array<FoodData> = [
  {
    name: 'Babaganouch',
    image: 'https://cdn.panelinha.com.br/receita/958532400000-Babaganouch.jpg',
    keys: [
      'babaganouch',
      'baba ghanoush',
      'babaganuche',
      'baba ganoush',
      'babaganoush',
    ],
  },
  {
    name: 'Banana Mysore',
    gi: 87,
    gl: 6,
    icon: '/images/food/banana.svg',
    image:
      'https://www.mundoecologia.com.br/wp-content/gallery/banana-my/Banana-Mysore-2.jpg',
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
    oneMeasures: [
      {
        type: 'UNITY',
        quantity: 100,
      },
    ],
    type: 'fruit',
  },
  {
    ...mergeWith(
      formatMyFood(banana as unknown as FoodMyFoodData),
      formatNacional(foodListNacional[178] as unknown as FoodNacional),
      verifyQuantity,
    ),
    name: 'Banana nanica',
    icon: '/images/food/banana.svg',
    image:
      'https://cdn.awsli.com.br/600x450/1693/1693441/produto/92535301/9f9c9fa2f7.jpg',
    keys: ['banana', 'banana nanica', 'bananas', 'bananas nanicax'],
    gi: 70,
    gl: 14,
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
    oneMeasures: [
      {
        type: 'UNITY',
        quantity: 110,
      },
    ],
    type: 'fruit',
  },
  {
    ...formatMyFood(banana as unknown as FoodMyFoodData),
    name: 'Banana Prata',
    gi: 39,
    gl: 8,
    icon: '/images/food/banana.svg',
    image:
      'https://images.unsplash.com/photo-1583485646409-f9feb9af2a67?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    calories: 89,
    carbohydrates: 28,
    unitOfMeasurement: 'gram',
    keys: ['banana'],
    oneMeasures: [
      {
        quantity: 70,
        type: 'UNITY',
      },
    ],
    type: 'fruit',
  },
  {
    name: 'Banha de porco',
    icon: '/images/food/pork.png',
    image:
      'https://data.gessulli.com.br/file/2019/08/21/H102608-F00000-Q576-2000x0.jpeg',
    keys: ['banha', 'banha de porco'],
    calories: 902,
    totalFat: 95,
    saturedFats: 39,
    carbohydrates: 0,
    dietaryFiber: 0,
    sugar: 0,
    vitamins: {
      ...VITAMINS_DATA,
      c: 0,
      b6: 0,
      d: 102,
    },
    type: 'oil',
  },
  {
    ...formatMyFood(boiledPotato as unknown as FoodMyFoodData),
    name: 'Batata',
    description: 'batata inglesa cozida',
    icon: '/images/food/potato.svg',
    image:
      'https://images.unsplash.com/photo-1563012678-bdfec255931b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    unitOfMeasurement: 'gram',
    keys: ['batatinha', 'batata inglesa'],
    oneMeasures: [
      {
        quantity: 225,
        type: 'UNITY',
      },
    ],
    type: 'root',
  },
  SWEET_POTATO,
  {
    ...formatMyFood(eggplant as unknown as FoodMyFoodData),
    name: 'Beringela',
    icon: '/images/food/eggplant.png',
    image:
      'https://images.unsplash.com/photo-1613881553903-4543f5f2cac9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    keys: ['berinjela', 'beringela', 'beringela crua'],
    oneMeasures: [
      {
        quantity: 170,
        type: 'UNITY',
      },
      {
        quantity: 270,
        type: 'UNITY_LARGE',
      },
    ],
    type: 'fruit',
  },
  {
    ...formatMyFood(beetroot as unknown as FoodMyFoodData),
    name: 'Beterraba',
    icon: '/images/food/beetroot.png',
    image:
      'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    keys: ['beterraba', 'beterraba crua'],
    oneMeasures: [
      {
        quantity: 140,
        type: 'UNITY',
      },
    ],
    type: 'root',
  },
  {
    ...formatMyFood(bakingSoda as unknown as FoodMyFoodData),
    name: 'Bicarbonato de sódio',
    icon: '/images/food/baking-soda.png',
    image:
      'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/06/baking-soda-water-and-wooden-spoon-1296x728-1.jpg?h=1528',
    keys: ['bicarbonato', 'bicarbonato de sódio'],
    type: 'powder',
  },
  {
    ...formatNacional(foodListNacional[7] as unknown as FoodNacional),
    name: 'Biscoito de maizena',
    icon: '/images/food/biscuit.png',
    image:
      'https://3.bp.blogspot.com/-TonRrjPIQss/XAWN49EDjuI/AAAAAAAANqE/oJEtizgTh3Q8nKYzxOUyNfBxPPyxFAaKQCLcBGAs/s1600/biscoito-de-maizena.jpg',
    keys: ['biscoito de maizena'],
  },
  {
    ...formatNacional(foodListNacional[8] as unknown as FoodNacional),
    name: 'Biscoito recheado',
    icon: '/images/food/oreo.png',
    image:
      'https://www.mashed.com/img/gallery/oreo-just-hinted-at-a-new-flavor-and-fans-cant-stop-guessing/l-intro-1645649340.jpg',
    keys: ['biscoito recheado', 'oreo', 'bolacha recheada', 'biscoito oreo'],
  },
  {
    name: 'Bolo de cenoura',
    gi: 67,
    icon: '/images/food/carrot-cake.svg',
    image:
      'https://d1uz88p17r663j.cloudfront.net/original/2b76e99abc4136ccf26008c1c387023f_Bolo-de-cenoura-com-cobertura-de-brigadeiro-receitas-nestle.jpg',
    unitOfMeasurement: 'gram',
    recipe: true,
    keys: ['bolo de cenoura com cobertura', 'bolo de cenoura'],
  },
  {
    name: 'Bolo de laranja',
    image:
      'https://cdn.panelinha.com.br/receita/1632405810503-bolo-laranja.jpg',
    keys: ['bolo de laranja'],
  },
];
