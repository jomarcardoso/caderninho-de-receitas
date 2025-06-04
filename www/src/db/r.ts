import type { FoodData } from '../services/food';
import { FoodMyFoodData, FoodNacional } from './db.types';
import { creamCheese } from './src';
import { formatNacional, formatMyFood } from './utils';
import foodListNacional from './src/cadastro-nacional/food-list.json';

export const rFoodData: Array<FoodData> = [
  {
    ...formatNacional(foodListNacional[147] as unknown as FoodNacional),
    name: 'Rabanete',
    icon: '/images/food/radish.png',
    image:
      'http://vamoscomermelhor.com.br/wp-content/uploads/2014/07/dsc00507-2.jpg',
    keys: ['rabanete', 'rabanetes', 'rabanete vermelho', 'rabanete cru'],
    oneMeasures: [
      {
        quantity: 50,
        type: 'UNITY',
      },
    ],
    type: 'root',
  },
  {
    ...formatNacional(foodListNacional[531] as unknown as FoodNacional),
    name: 'Repolho',
    icon: '/images/food/cabbage.png',
    image:
      'https://assets.clevelandclinic.org/transform/871f96ae-a852-4801-8675-683191ce372d/Benefits-Of-Cabbage-589153824-770x533-1_jpg',
    keys: ['repolho', 'cabeça de repolho'],
    oneMeasures: [
      {
        quantity: 900,
        type: 'UNITY',
      },
    ],
    type: 'herb',
  },
  {
    ...formatMyFood(creamCheese as unknown as FoodMyFoodData),
    name: 'Requeijão',
    icon: '/images/food/cream-cheese.svg',
    image:
      'https://images.unsplash.com/photo-1547920303-9befbe3decc7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80',
    unitOfMeasurement: 'gram',
    type: 'cheese',
  },
  {
    ...formatNacional(foodListNacional[248] as unknown as FoodNacional),
    name: 'Romã',
    icon: '/images/food/pomegranate.png',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Pomegranate.jpg/1200px-Pomegranate.jpg',
    keys: ['romã', 'romãs'],
    oneMeasures: [
      {
        type: 'UNITY',
        quantity: 100,
      },
    ],
    type: 'fruit',
  },
];
