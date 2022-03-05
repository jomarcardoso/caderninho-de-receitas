import { FoodData } from '../services/food';
import { FoodMyFoodData } from './db.types';
import { grape } from './src';
import { format } from './utils';

export const uFoodData: Array<FoodData> = [
  {
    name: 'Urucum',
    icon: '/images/food/seasoning.png',
    image:
      'https://www.dicasdemulher.com.br/wp-content/uploads/2020/03/urucum-0.png',
    keys: ['falso-açafrão', 'colorau'],
  },
  {
    ...format(grape as unknown as FoodMyFoodData),
    name: 'Uva',
    icon: '/images/food/grape.png',
    image:
      'https://images.unsplash.com/photo-1525286102393-8bf945cd0649?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2074&q=80',
    keys: ['uva'],
  },
];
