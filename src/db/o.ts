import mergeWith from 'lodash/mergeWith';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import { egg as eggData, soybeanOil } from './src';
import { FoodMyFoodData, FoodNacional } from './db.types';
import type { FoodData } from '../services/food';
import { formatMyFood, formatNacional, verifyQuantity } from './utils';

export const oFoodData: Array<FoodData> = [
  {
    ...formatMyFood(soybeanOil as unknown as FoodMyFoodData),
    name: 'Óleo de soja',
    icon: '/images/food/oil.svg',
    image:
      'https://img.ibxk.com.br/2020/01/22/22215352968302.jpg?w=1120&h=420&mode=crop&scale=both',
    unitOfMeasurement: 'liter',
    keys: ['óleo'],
    type: 'oil',
  },
  {
    name: 'Orégano',
    icon: '/images/food/oregano.png',
    image:
      'https://www.blog.bioritmo.com.br/wp-content/uploads/2021/11/shutterstock_524219779-1.jpg',
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 2.5,
        type: 'TABLE_SPOON',
      },
    ],
  },
  {
    ...mergeWith(
      formatNacional(foodListNacional[489] as unknown as FoodNacional),
      formatMyFood(eggData as unknown as FoodMyFoodData),
      verifyQuantity,
    ),
    name: 'Ovo cru',
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
    keys: [
      'ovos',
      'ovo',
      'ovo de galinha',
      'ovos de galinha',
      'ovos de frango',
      'ovo de frango',
    ],
    type: 'liquid',
  },
  {
    ...formatNacional(foodListNacional[489] as unknown as FoodNacional),
    name: 'Ovo cozido',
    icon: '/images/food/egg.svg',
    image:
      'https://images.aws.nestle.recipes/resized/8431b78f563804dd482bdc3911f82dc1_ovo-cozido-receitas-nestle_1200_600.jpg',
    keys: ['ovo cozido', 'ovo cozido de galinha'],
    type: 'solid',
  },
  {
    ...formatNacional(foodListNacional[486] as unknown as FoodNacional),
    name: 'Ovo de codorna cru',
    icon: '/images/food/egg.svg',
    image:
      'https://data.gessulli.com.br/file/2016/05/19/H101457-F00000-L189-1200x0.jpeg',
    keys: ['ovo de codorna', 'ovo de codorna cru'],
    type: 'liquid',
  },
  {
    ...formatNacional(foodListNacional[491] as unknown as FoodNacional),
    name: 'Ovo frito',
    icon: '/images/food/egg.svg',
    image: 'https://cdn.panelinha.com.br/receita/1519158375914-ovo%20frito.jpg',
    keys: ['ovo frito', 'ovos fritos'],
    type: 'solid',
  },
];
