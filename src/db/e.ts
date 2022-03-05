import { FoodMyFoodData } from './db.types';
import { FoodData } from '../services/food';
import { format } from './utils';
import { pea } from './src';

export const eFoodData: Array<FoodData> = [
  {
    ...format(pea as unknown as FoodMyFoodData),
    name: 'Ervilha',
    icon: '/images/food/pea.png',
    image:
      'https://media.istockphoto.com/photos/pea-protein-powder-and-snap-pea-portrait-picture-id1175572671?b=1&k=20&m=1175572671&s=170667a&w=0&h=EWO5nG741j6gFokkAljmYE6tkCyEvGZxMMjjJq3dJZc=',
    keys: ['ervilha', 'ervilhas'],
  },
];
