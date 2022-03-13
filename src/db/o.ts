import { egg as eggData, soybeanOil } from './src';

import { FoodMyFoodData } from './db.types';
import { FoodData } from '../services/food';
import { formatMyFood } from './utils';

export const oFoodData: Array<FoodData> = [
  {
    ...formatMyFood(soybeanOil as unknown as FoodMyFoodData),
    name: 'Óleo de soja',
    icon: '/images/food/oil.svg',
    image:
      'https://img.ibxk.com.br/2020/01/22/22215352968302.jpg?w=1120&h=420&mode=crop&scale=both',
    unitOfMeasurement: 'liter',
    keys: ['óleo'],
  },
  {
    ...formatMyFood(eggData as unknown as FoodMyFoodData),
    name: 'Ovo',
    gi: 0,
    icon: '/images/food/egg.svg',
    image:
      'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    oneMeasures: [
      {
        quantity: 46,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
    keys: ['ovos'],
  },
];
