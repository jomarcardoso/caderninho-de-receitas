import type { FoodData } from '../services/food';
import { formatMyFood, formatNacional } from './utils';
import { FoodMyFoodData, FoodNacional } from './db.types';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import { blackBean, whiteBean } from './src';

export const BEAN: FoodData = {
  ...formatMyFood(blackBean as unknown as FoodMyFoodData),
  ...formatNacional(foodListNacional[566] as unknown as FoodNacional),
  name: 'Feijão preto cozido',
  gi: 29,
  icon: '/images/food/bean.svg',
  image:
    'https://images.aws.nestle.recipes/resized/a50c044300b75df1169dd0f8e885bad4_feijao-preto-bem-temperado-receitas-nestle_1200_600.jpg',
  unitOfMeasurement: 'gram',
  oneMeasures: [
    {
      quantity: 172,
      type: 'CUP',
    },
  ],
  keys: [
    'feijão',
    'feijoada',
    'feijão-preto',
    'feijão preto',
    'feijão preto cozido',
    'feijão-preto cozido',
  ],
  version: 'BOILED',
};

export const beansData: Array<FoodData> = [
  {
    ...formatNacional(foodListNacional[560] as unknown as FoodNacional),
    name: 'Feijão carioca cozido',
    icon: '/images/food/bean.svg',
    image:
      'https://www.sabornamesa.com.br/media/k2/items/cache/e63eba4a60c5a7383338249762b2606c_XL.jpg',
    keys: [
      'feijão-carioca',
      'feijão carioca',
      'feijão carioca cozido',
      'feijão-carioca cozido',
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...formatNacional(foodListNacional[561] as unknown as FoodNacional),
    name: 'Feijão carioca cru',
    icon: '/images/food/bean.svg',
    image:
      'https://http2.mlstatic.com/D_NQ_NP_832877-MLB40140053658_122019-O.jpg',
    keys: [
      'farinha de feijão-carioca',
      'farinha de feijão carioca',
      'feijão carioca moído',
      'feijão-carioca moído',
      'feijão carioca cru',
      'feijão-carioca cru',
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...formatNacional(foodListNacional[562] as unknown as FoodNacional),
    name: 'Feijão fradinho cozido',
    icon: '/images/food/bean.svg',
    image:
      'https://www.marolacomcarambola.com.br/wp-content/uploads/2019/04/receita-de-feijao-fradinho-com-calabresa-2.jpg',
    keys: [
      'feijão-fradinho',
      'feijão fradinho',
      'feijão fradinho cozido',
      'feijão-fradinho cozido',
    ],
    unitOfMeasurement: 'gram',
    version: 'BOILED',
  },
  {
    ...formatNacional(foodListNacional[563] as unknown as FoodNacional),
    name: 'Feijão fradinho cru',
    icon: '/images/food/bean.svg',
    image:
      'https://emporioquatroestrelas.vteximg.com.br/arquivos/ids/158084-1000-1000/Feijao-Fradinho-500g.png?v=636930890740770000',
    keys: [
      'farinha de feijão-fradinho',
      'farinha de feijão fradinho',
      'feijão fradinho moído',
      'feijão-fradinho moído',
      'feijão fradinho cru',
      'feijão-fradinho cru',
    ],
    unitOfMeasurement: 'gram',
    version: 'RAW',
  },
  {
    ...formatNacional(foodListNacional[564] as unknown as FoodNacional),
    name: 'Feijão jalo cozido',
    icon: '/images/food/bean.svg',
    image:
      'https://i1.wp.com/files.agro20.com.br/uploads/2019/10/Feij%C3%A3o-jalo-1.jpg?fit=1024%2C682&ssl=1',
    keys: [
      'feijão-jalo',
      'feijão jalo',
      'feijão jalo cozido',
      'feijão-jalo cozido',
    ],
    unitOfMeasurement: 'gram',
    version: 'BOILED',
  },
  {
    ...formatNacional(foodListNacional[565] as unknown as FoodNacional),
    name: 'Feijão jalo cru',
    icon: '/images/food/bean.svg',
    image:
      'http://d3ugyf2ht6aenh.cloudfront.net/stores/818/927/products/feijao-jalo1-09b93785daa32ae71415326974364620-640-0.jpeg',
    keys: [
      'farinha de feijão-jalo',
      'farinha de feijão jalo',
      'feijão jalo moído',
      'feijão-jalo moído',
      'feijão jalo cru',
      'feijão-jalo cru',
    ],
    unitOfMeasurement: 'gram',
    version: 'RAW',
  },
  BEAN,
  {
    ...formatMyFood(blackBean as unknown as FoodMyFoodData),
    ...formatNacional(foodListNacional[567] as unknown as FoodNacional),
    name: 'Feijão preto cru',
    gi: 29,
    icon: '/images/food/bean.svg',
    image:
      'https://minhasaude.proteste.org.br//wp-content/uploads/2020/07/escolher-o-feijao-preto-970x472.jpg',
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 172,
        type: 'CUP',
      },
    ],
    keys: [
      'feijão cru',
      'feijão-preto cru',
      'farinha de feijão',
      'farinha de feijão-preto',
      'farelo de feijão',
      'farelo de feijão-preto',
      'feijão moído',
      'feijão moído-preto',
    ],
    version: 'BOILED',
  },
  {
    ...formatNacional(foodListNacional[568] as unknown as FoodNacional),
    name: 'Feijão rajado cozido',
    gi: 29,
    icon: '/images/food/bean.svg',
    image:
      'https://cdn.levty.com/camil/prd/imagem/feijao_rajado/FEIJAO_RAJADO.jpg',
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 172,
        type: 'CUP',
      },
    ],
    keys: [
      'feijão-rajado',
      'feijão rajado',
      'feijão rajado cozido',
      'feijão-rajado cozido',
    ],
    version: 'BOILED',
  },
  {
    ...formatNacional(foodListNacional[569] as unknown as FoodNacional),
    name: 'Feijão rajado cru',
    gi: 29,
    icon: '/images/food/bean.svg',
    image:
      'https://i2.wp.com/files.agro20.com.br/uploads/2020/03/feijaorajado2.jpg?resize=600%2C338&ssl=1',
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 172,
        type: 'CUP',
      },
    ],
    keys: [
      'farinha de feijão rajado',
      'farinha de feijão-rajado',
      'feijão rajado moído',
      'feijão rajado-moído',
      'feijão rajado cru',
      'feijão-rajado cru',
    ],
    version: 'RAW',
  },
  {
    ...formatNacional(foodListNacional[570] as unknown as FoodNacional),
    name: 'Feijão rosinha cozido',
    icon: '/images/food/bean.svg',
    image:
      'https://www.comidaereceitas.com.br/wp-content/uploads/2021/07/feijao_linguica-780x449.jpg',
    keys: [
      'feijão-rosinha',
      'feijão rosinha',
      'feijão rosinha cozido',
      'feijão-rosinha cozido',
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...formatNacional(foodListNacional[571] as unknown as FoodNacional),
    name: 'Feijão rosinha cru',
    icon: '/images/food/bean.svg',
    image:
      'https://emporioquatroestrelas.vteximg.com.br/arquivos/ids/158091-1000-1000/Feijao-Rosinha-500g.png?v=636930970411630000',
    keys: [
      'farinha de feijão rosinha',
      'farinha de feijão-rosinha',
      'feijão rosinha moído',
      'feijão rosinha-moído',
      'feijão rosinha cru',
      'feijão-rosinha cru',
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...formatNacional(foodListNacional[572] as unknown as FoodNacional),
    name: 'Feijão roxo cozido',
    icon: '/images/food/bean.svg',
    image:
      'https://www.receiteria.com.br/wp-content/uploads/receitas-com-feijao-vermelho-0.jpg',
    keys: [
      'feijão-roxo',
      'feijão roxo',
      'feijão roxo cozido',
      'feijão-roxo cozido',
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...formatNacional(foodListNacional[573] as unknown as FoodNacional),
    name: 'Feijão roxo cru',
    icon: '/images/food/bean.svg',
    image:
      'https://www.mercadaonatural.com.br/resizer/view/600/600/true/false/14305.jpg',
    keys: [
      'farinha de feijão-roxo',
      'farinha de feijão roxo',
      'feijão roxo moído',
      'feijão-roxo moído',
      'feijão roxo cru',
      'feijão-roxo cru',
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...formatMyFood(whiteBean as unknown as FoodMyFoodData),
    name: 'feijão branco',
    icon: '/images/food/bean.svg',
    image:
      'https://www.sabornamesa.com.br/media/k2/items/cache/8fff24d59ce766ab65e090a401680032_XL.jpg',
    keys: [
      'feijão branco',
      'feijão-branco',
      'feijão-branco cozido',
      'feijão-branco-cozido',
    ],
    unitOfMeasurement: 'gram',
  },
];
