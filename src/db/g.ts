import { FoodMyFoodData, FoodNacional } from './db.types';
import { FoodData } from '../services/food';
import { formatMyFood, formatNacional } from './utils';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import { eggYolk, ginger, water } from './src';

export const gFoodData: Array<FoodData> = [
  {
    ...formatMyFood(water as unknown as FoodMyFoodData),
    name: 'Gelo',
    icon: '/images/food/ice.png',
    image:
      'https://images.unsplash.com/photo-1561365890-798858b32e0c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGljZSUyMGN1YmV8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    keys: ['gelo'],
    type: 'liquid',
  },
  {
    ...formatMyFood(eggYolk as unknown as FoodMyFoodData),
    name: 'Gema de ovo',
    icon: '/images/food/egg-yolk.png',
    image:
      'https://static.clubedaanamariabraga.com.br/wp-content/uploads/2017/07/ovo-gema-636.jpg',
    keys: ['gema', 'gema de ovo', 'gemas', 'gemas de ovo', 'gema de ovos'],
    oneMeasures: [
      {
        quantity: 15,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
    type: 'oil',
  },
  {
    ...formatMyFood(ginger as unknown as FoodMyFoodData),
    name: 'Gengibre',
    icon: '/images/food/ginger.png',
    image:
      'https://media.istockphoto.com/photos/ginger-root-and-ginger-powder-in-the-bowl-picture-id647402644?b=1&k=20&m=647402644&s=170667a&w=0&h=5lyuLq8qT16BelSweo6vprZzM62uDGZXdpPXdEDzqBc=',
    keys: ['gengibre', 'gengibre em pó'],
    type: 'root',
  },
  {
    ...formatNacional(foodListNacional[592] as unknown as FoodNacional),
    name: 'Gergelim',
    description:
      'O gergelim, também conhecido como sésamo, é a semente de uma planta originária do Oriente, de nome científico Sesamum indicum. Além de deliciosas, as sementes de gergelim trazem muitos benefícios, como melhorar a saúde óssea, proteger contra radiação e prevenir câncer, hipertensão, diabetes e inflamação.',
    icon: '/images/food/sesame.png',
    image:
      'https://www.jasminealimentos.com/wp-content/uploads/2017/04/gergelim1.jpg',
    keys: [
      'gergelim',
      'gergelins',
      'semente de gergelim',
      'farinha de gergelim',
      'sésamo',
      'sésamos',
      'semente de sésamo',
      'farinha de sésamo',
      'tahine',
      'taíne',
      'tahin',
      'tahini',
    ],
    unitOfMeasurement: 'gram',
    type: 'seed',
  },
  {
    ...formatNacional(foodListNacional[574] as unknown as FoodNacional),
    name: 'Grão-de-bico',
    icon: '/images/food/chickpea.png',
    image:
      'https://conteudo.imguol.com.br/c/entretenimento/94/2016/12/07/grao-de-bico-1481138396075_v2_450x337.jpg',
    keys: ['grão de bico', 'grãos de bico', 'grãos-de-bico'],
    unitOfMeasurement: 'gram',
    type: 'seed',
  },
  {
    ...formatNacional(foodListNacional[575] as unknown as FoodNacional),
    name: 'Guandu',
    icon: '/images/food/peas.png',
    image:
      'https://content.paodeacucar.com/wp-content/uploads/2019/08/o-que-%C3%A9-guandu-4.jpg',
    keys: [
      'guandu',
      'grãos de guandu',
      'grão-de-guandu',
      'grãos-de-guandu',
      'ingá',
      'inga',
      'ingás',
      'ingas',
    ],
    unitOfMeasurement: 'gram',
    type: 'seed',
  },
];
