import { FoodMyFoodData } from './db.types';
import type { FoodData } from '../services/food';
import { formatMyFood } from './utils';
import { kiwi } from './src';

export const kFoodData: Array<FoodData> = [
  {
    ...formatMyFood(kiwi as unknown as FoodMyFoodData),
    name: 'Kiwi',
    icon: '/images/food/kiwi.png',
    image:
      'https://images.unsplash.com/photo-1616684000067-36952fde56ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
    keys: ['kiwi', 'kiwis', 'groselha chinesa'],
    oneMeasures: [
      {
        quantity: 154,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
    type: 'fruit',
  },
];
