import foodListNacional from './src/cadastro-nacional/food-list.json';
import type { FoodData } from '../services/food';
import { FoodMyFoodData, FoodNacional } from './db.types';
import { formatMyFood, formatNacional } from './utils';
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
  {
    ...formatNacional(foodListNacional[469] as unknown as FoodNacional),
    name: 'Isotônico',
    icon: '/images/food/ricotta.png',
    image:
      'https://www.thespruceeats.com/thmb/0SFkKV13vXlNq4T_uq6IpmZUrAY=/2123x1415/filters:fill(auto,1)/106908888-58aefb225f9b58a3c9287cf3.jpg',
    keys: ['isotônico', 'isotónica', 'bebida isotônica', 'bebida isotónica'],
    type: 'liquid',
  },
];
