import { FoodMyFoodData, FoodNacional } from './db.types';
import type { FoodData } from '../services/food';
import { formatMyFood, formatNacional } from './utils';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import {
  chicken as chickenData,
  wheatFlour as wheatFlourData,
  oatFlour,
  cornFlour,
  cassavaFlour,
} from './src';

export const fFoodData: Array<FoodData> = [
  {
    name: 'Falafel',
    image: 'https://cdn.panelinha.com.br/receita/1544465565960-falafel.jpg',
    keys: [
      'falafel',
      'falafel de frito',
      'falafel de grão-de-bico',
      'falafel de fava',
    ],
  },
  {
    ...formatMyFood(oatFlour as unknown as FoodMyFoodData),
    icon: '/images/food/oat-flour.svg',
    image:
      'https://cdn.awsli.com.br/600x450/757/757669/produto/41919778/2bbdd6f3f5.jpg',
    name: 'Farinha de aveia',
    keys: ['farelo de aveia'],
    gi: 72,
    version: 'FLOUR',
    type: 'powder',
  },
  {
    ...formatMyFood(cassavaFlour as unknown as FoodMyFoodData),
    name: 'Farinha de mandioca',
    icon: '/images/food/cassava-flour.png',
    image:
      'https://media.istockphoto.com/photos/cassava-flour-in-handmade-pot-natural-organic-flour-from-brazil-picture-id1300392101?b=1&k=20&m=1300392101&s=170667a&w=0&h=MubnvNFt5Cv_6aKakGNc3UCaGzGTGXHkO6DuPP50c8E=',
    keys: ['farinha de mandioca', 'farofa'],
    type: 'powder',
  },
  {
    ...formatNacional(foodListNacional[35] as unknown as FoodNacional),
    name: 'Farinha de rosca',
    icon: '/images/food/wheat-flour.svg',
    image:
      'https://img.itdg.com.br/tdg/images/blog/uploads/2017/09/shutterstock_170955137.jpg?w=1200',
    keys: [
      'farinha de rosca',
      'farinha de pão',
      'farinha de pães',
      'pão ralado',
      'pão seco moído',
    ],
  },
  {
    ...formatMyFood(wheatFlourData as unknown as FoodMyFoodData),
    name: 'Farinha de trigo',
    gi: 85,
    icon: '/images/food/wheat-flour.svg',
    image:
      'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1062&q=80',
    unitOfMeasurement: 'gram',
    keys: ['farinha branca', 'farinha'],
    oneMeasures: [
      {
        quantity: 120,
        type: 'CUP',
      },
      {
        quantity: 7.5,
        type: 'TABLE_SPOON',
      },
      {
        quantity: 2.5,
        type: 'TEA_SPOON',
      },
    ],
    type: 'powder',
  },
  {
    name: 'Fermento',
    icon: '/images/food/yeast.svg',
    image:
      'https://static1.casapraticaqualita.com.br/articles/0/21/30/@/2427-fermento-biologico-fresco-conhecido-com-article_content_img-3.jpg',
    unitOfMeasurement: 'gram',
    type: 'powder',
  },
  {
    ...formatNacional(foodListNacional[193] as unknown as FoodNacional),
    name: 'Figo',
    icon: '/images/food/fig.png',
    image:
      'https://conteudo.imguol.com.br/c/entretenimento/84/2021/03/15/figo-1615830295984_v2_615x300.jpg',
    keys: ['figo', 'figos', 'figo cru', 'figos cru'],
    oneMeasures: [
      {
        type: 'UNITY',
        quantity: 60,
      },
    ],
    type: 'fruit',
  },
  {
    ...formatNacional(foodListNacional[194] as unknown as FoodNacional),
    name: 'Figo enlatado em calda',
    icon: '/images/food/fig.png',
    image:
      'https://kemdistribuidora.com.br/wp-content/uploads/2015/09/figo-em-calda.bmp',
    keys: [
      'figo em calda',
      'figos em calda',
      'figo enlatado',
      'figos enlatados',
    ],
    oneMeasures: [
      {
        type: 'UNITY',
        quantity: 60,
      },
    ],
    type: 'fruit',
  },
  {
    name: 'Folha de Louro',
    icon: '/images/food/leaf.png',
    image:
      'https://images.unsplash.com/photo-1612549225312-900aa64d56bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    keys: ['folha de louro', 'folhas de louro', 'louro'],
    type: 'herb',
  },
  {
    ...formatMyFood(chickenData as unknown as FoodMyFoodData),
    gi: 0,
    name: 'Frango',
    icon: '/images/food/chicken.svg',
    image:
      'https://images.unsplash.com/photo-1606728035253-49e8a23146de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    unitOfMeasurement: 'gram',
    keys: [
      'galinha',
      'peito de frango',
      'coxa de frango',
      'frango assado',
      'frango desfiado',
      'frango cozido',
    ],
    oneMeasures: [
      {
        quantity: 400,
        type: 'BREAST',
      },
    ],
    type: 'meat',
  },
  {
    name: 'Frango assado',
    image:
      'https://www.mexidodeideias.com.br/wp-content/uploads/2012/07/Farofa_Caipira1.jpg',
    keys: [
      'frango assado',
      'frango assado com farofa',
      'frango recheado',
      'frango assado com recheio',
      'frango recheado assado',
      'frango recheado assado com farofa',
      'frango assado com recheio de farofa',
    ],
  },
  {
    ...formatMyFood(cornFlour as unknown as FoodMyFoodData),
    name: 'Fubá',
    icon: '/images/food/corn-flour.svg',
    image:
      'https://caldobom.com.br/uploads/2018/12/diferenca-entre-fuba-e-farinha-de-milho.jpg',
    keys: ['farinha de milho'],
    version: 'FLOUR',
    type: 'powder',
  },
];
