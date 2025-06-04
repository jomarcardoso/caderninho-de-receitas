import { FoodMyFoodData } from './db.types';
import type { FoodData } from '../services/food';
import { formatMyFood } from './utils';
import { nut } from './src';

export const nFoodData: Array<FoodData> = [
  {
    ...formatMyFood(nut as unknown as FoodMyFoodData),
    name: 'Noz',
    icon: '/images/food/walnut.png',
    image:
      'https://images.unsplash.com/photo-1524593656068-fbac72624bb0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    keys: ['noz', 'nozes'],
    type: 'seed',
  },
  {
    name: 'Noz-moscada',
    icon: '/images/food/seasoning.png',
    image:
      'https://radioaratiba.com.br/wp-content/uploads/2018/06/noz-moscada-696x462.jpg',
    keys: ['noz-moscada', 'noz moscada', 'noz-moscadas', 'noz moscadas'],
    type: 'powder',
  },
];
