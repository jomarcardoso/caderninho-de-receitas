import { FoodMyFoodData, FoodNacional } from './db.types';
import { FoodData } from '../services/food';
import { formatMyFood, formatNacional } from './utils';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import { edamCheese } from './src';

export const qFoodData: Array<FoodData> = [
  {
    ...formatMyFood(edamCheese as unknown as FoodMyFoodData),
    name: 'Queijo Edam',
    icon: '/images/food/cheese.svg',
    image:
      'https://heavenly-holland.com/wp-content/uploads/2017/05/cheese10-768x512.jpg',
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 30,
        type: 'SLICE',
      },
    ],
    keys: ['queijo edam'],
    type: 'cheese',
  },
  {
    ...formatNacional(foodListNacional[462] as unknown as FoodNacional),
    name: 'Queijo muçarela',
    icon: '/images/food/cheese.svg',
    image:
      'https://www.alimentosonline.com.br/fotos_artigos/6253/mussarela.jpg',
    keys: ['queijo', 'queijo muçarela', 'muçarela', 'mozarela', 'mozzarella'],
    type: 'cheese',
  },
];
