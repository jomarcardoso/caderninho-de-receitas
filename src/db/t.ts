import type { FoodData } from '../services/food';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import { tomato, thyme } from './src';
import { formatNacional, formatMyFood } from './utils';
import { FoodMyFoodData, FoodNacional } from './db.types';

export const tFoodData: Array<FoodData> = [
  {
    name: 'Tabule',
    image: 'https://cdn.panelinha.com.br/receita/1565021106629-tabule.jpg',
    keys: [
      'tabule',
      'salada de triguinho',
      'salada libanesa',
      'salada de triguinho libanesa',
    ],
  },
  {
    ...formatMyFood(tomato as unknown as FoodMyFoodData),
    name: 'Tomate',
    icon: '/images/food/tomato.svg',
    image:
      'https://images.unsplash.com/photo-1561155713-50f2a38fde2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: 'gram',
    keys: ['tomate'],
    calories: 18,
    totalFat: 0.2,
    proteins: 0.9,
    dietaryFiber: 1.2,
    sugar: 2.6,
    saturedFats: 0,
    oneMeasures: [
      {
        quantity: 123,
        type: 'UNITY',
      },
      {
        quantity: 123,
        type: 'SLICE',
      },
    ],
    type: 'fruit',
  },
  {
    ...formatMyFood(thyme as unknown as FoodMyFoodData),
    name: 'Tomilho',
    icon: '/images/food/thyme.png',
    image:
      'https://images.unsplash.com/photo-1606072104299-cdaab62c0a07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    keys: ['tomilho', 'ramo de tomilho', 'ramos de tomilho'],
    type: 'herb',
  },
  {
    ...formatNacional(foodListNacional[443] as unknown as FoodNacional),
    name: 'Toucinho',
    icon: '/images/food/ham.svg',
    image:
      'https://espetinhodesucesso.com.br/wp-content/uploads/2018/12/como-fazer-bacon-artesanal-1200x675.jpg',
    keys: ['toucinho', 'toucinhos', 'bacon', 'bacon em cubos'],
    unitOfMeasurement: 'gram',
    type: 'meat',
  },
];
