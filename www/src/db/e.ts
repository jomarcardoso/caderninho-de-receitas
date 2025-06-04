import { FoodMyFoodData, FoodNacional } from './db.types';
import type { FoodData } from '../services/food';
import { formatMyFood, formatNacional } from './utils';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import { pea } from './src';

export const eFoodData: Array<FoodData> = [
  {
    ...formatMyFood(pea as unknown as FoodMyFoodData),
    name: 'Ervilha',
    icon: '/images/food/pea.png',
    image:
      'https://media.istockphoto.com/photos/pea-protein-powder-and-snap-pea-portrait-picture-id1175572671?b=1&k=20&m=1175572671&s=170667a&w=0&h=EWO5nG741j6gFokkAljmYE6tkCyEvGZxMMjjJq3dJZc=',
    keys: ['ervilha', 'ervilhas'],
    type: 'seed',
  },
  {
    name: 'Esfirra',
    description:
      'Esfirra ou esfiha é uma pequena torta assada originária da Síria e do Líbano, e encontrada em outros países do Oriente Médio, como a Jordânia, Palestina e Iraque, além do Brasil e Argentina, para onde foi levada por imigrantes sírios e libaneses e se tornou extremamente popular.',
    image:
      'https://vocegastro.com.br/app/uploads/2021/10/como-fazer-esfirra-aberta.jpg',
    keys: ['esfirra', 'esfirras', 'esfiha', 'esfihas'],
  },
  {
    name: 'Espaguete',
    image:
      'https://www.comidaereceitas.com.br/wp-content/uploads/2021/06/espaguete_bolonhesaa-780x430.jpg',
    keys: ['espaguete', 'esparguete', 'macarronete', 'macarrão com molho'],
  },
  {
    ...formatNacional(foodListNacional[536] as unknown as FoodNacional),
    name: 'Estrogonofe de Carne',
    icon: '/images/food/stroganoff.png',
    image:
      'https://piracanjuba.com.br/content/receitas/cont/0000000056/rec056_1910.jpg',
    keys: ['strogonofe', 'estrogonofe'],
  },
  {
    ...formatNacional(foodListNacional[537] as unknown as FoodNacional),
    name: 'Estrogonofe de Frango',
    icon: '/images/food/stroganoff.png',
    image:
      'https://img.cybercook.com.br/imagens/receitas/644/strogonoff-de-frango-1-840x480.jpg?q=75',
    keys: ['strogonofe', 'estrogonofe'],
  },
];
