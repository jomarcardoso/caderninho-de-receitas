import { FoodData } from '../services/food';
import { FoodMyFoodData } from './db.types';

import { formatMyFood } from './utils';
import { yogurt } from './src';

export const iFoodData: Array<FoodData> = [
  {
    ...formatMyFood(yogurt as unknown as FoodMyFoodData),
    name: 'Iogurte natural',
    icon: '/images/food/yoghurt.png',
    image:
      'https://images.unsplash.com/photo-1562114808-b4b33cf60f4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=873&q=80',
    keys: [
      'iogurte natural',
      'iogurt',
      'iogurte',
      'yogurt',
      'yogurte',
      'yogourt',
      'yogourte',
      'iogourte',
      'yoghurt',
      'yoghurte',
      'ioghurte',
    ],
    type: 'liquid',
  },
];
