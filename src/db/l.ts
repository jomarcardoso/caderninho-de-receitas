import { milk, orange, lemon, coconutMilk, porkLoin } from './src';
import { FoodMyFoodData, FoodNacional } from './db.types';
import type { FoodData } from '../services/food';
import { formatMyFood, formatNacional } from './utils';
import foodListNacional from './src/cadastro-nacional/food-list.json';

export const lFoodData: Array<FoodData> = [
  {
    ...formatMyFood(orange as unknown as FoodMyFoodData),
    name: 'Laranja',
    gi: 43,
    icon: '/images/food/orange.svg',
    image:
      'https://images.unsplash.com/photo-1549888834-3ec93abae044?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    calories: 0,
    carbohydrates: 14,
    oneMeasures: [
      {
        quantity: 137,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
    type: 'fruit',
  },
  {
    ...formatMyFood(coconutMilk as unknown as FoodMyFoodData),
    name: 'Leite de coco',
    icon: '/images/food/coconut-milk.png',
    image:
      'https://media.istockphoto.com/photos/coconut-vegan-milk-with-halves-of-nuts-over-brown-background-picture-id1304494306?b=1&k=20&m=1304494306&s=170667a&w=0&h=bLfsZbv8t6Oej_GXr3KPy7uLuETt_Yb_w6tNaLtlm3s=',
    keys: ['leite de coco'],
    type: 'liquid',
  },
  {
    ...formatMyFood(milk as unknown as FoodMyFoodData),
    name: 'Leite de vaca',
    icon: '/images/food/milk.svg',
    image:
      'https://images.unsplash.com/photo-1608634960479-c70cf0c3dece?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    unitOfMeasurement: 'liter',
    keys: ['leite', 'leite de vaca'],
    type: 'liquid',
  },
  {
    ...formatNacional(foodListNacional[576] as unknown as FoodNacional),
    name: 'Lentilha cozida',
    icon: '/images/food/lentils.png',
    image:
      'https://d1uz88p17r663j.cloudfront.net/resized/7b01c063de9f3c6a8b7b786f54df253c_lentilhas-vinho-receitas-nestle_1200_600.jpg',
    keys: ['lentilha', 'lentilhas', 'lentilha cozida', 'lentilhas cozidas'],
    unitOfMeasurement: 'gram',
    type: 'seed',
  },
  {
    ...formatNacional(foodListNacional[577] as unknown as FoodNacional),
    name: 'Lentilha crua',
    icon: '/images/food/lentils.png',
    image:
      'https://www.acasaencantada.com.br/wp-content/uploads/2019/09/lentilha.png',
    keys: ['lentilha crua', 'farinha de lentilha', 'farinha de lentilhas'],
    unitOfMeasurement: 'gram',
    type: 'seed',
  },
  {
    ...formatMyFood(lemon as unknown as FoodMyFoodData),
    name: 'Limão',
    keys: ['limão', 'limões'],
    icon: '/images/food/lemon.png',
    image:
      'https://minhasaude.proteste.org.br/wp-content/uploads/2020/10/lim%C3%B5es-970x472.jpg',
    oneMeasures: [
      {
        quantity: 170,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
    type: 'fruit',
  },
  {
    ...formatNacional(foodListNacional[593] as unknown as FoodNacional),
    name: 'Linhaça',
    icon: '/images/food/linseed.svg',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/02/linseed2-62e1099.jpg?quality=90&resize=556,505',
    keys: ['semente de linhaça'],
    unitOfMeasurement: 'gram',
    type: 'seed',
  },
  {
    ...formatMyFood(porkLoin as unknown as FoodMyFoodData),
    name: 'Lombo de porco',
    icon: '/images/food/chop.png',
    image:
      'https://media.istockphoto.com/photos/baked-pork-loin-with-whole-grain-mustard-picture-id693429828?b=1&k=20&m=693429828&s=170667a&w=0&h=LogyIFTqLo69l8rDzTlDGApXotSFYZDUDffvNl7-ZRc=',
    keys: [
      'lombo',
      'lombinho',
      'lombo de porco',
      'filé de porco',
      'lombo suíno',
      'filé suíno',
      'filé mignon suíno',
    ],
    type: 'meat',
  },
];
