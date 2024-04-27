import { VITAMINS_DATA } from '../services/vitamin/vitamin.constants';
import { MINERALS_DATA } from '../services/mineral';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import { orangeJuice, parsley, cuminSeed, salt } from './src';
import type { FoodData } from '../services/food';
import { FoodMyFoodData, FoodNacional } from './db.types';
import { formatMyFood, formatNacional } from './utils';

export const sFoodData: Array<FoodData> = [
  {
    ...formatMyFood(salt as unknown as FoodMyFoodData),
    name: 'Sal',
    icon: '/images/food/salt.svg',
    image:
      'https://acrediteounao.com/wp-content/uploads/2018/12/sal-de-cozinha-e1543846010596.jpg',
    unitOfMeasurement: 'gram',
    type: 'powder',
  },
  {
    name: 'Salada de macarrão com beringela e purê de beterraba',
    image:
      'https://cdn.panelinha.com.br/receita/1461898800000-Salada-de-macarrao-com-berinjela-e-pure-de-beterraba.jpg',
    keys: [
      'salada de beterraba',
      'salada de beringela',
      'salada de beterraba',
      'purê de beterraba',
    ],
  },
  {
    ...formatNacional(foodListNacional[546] as unknown as FoodNacional),
    name: 'Salpicão de frango',
    image:
      'https://images.aws.nestle.recipes/resized/0716d60c3ce29bc173181d4277693339_salpicao-frango-tradicional-receitas-nestle_1200_600.jpg',
    keys: ['salpicão', 'salpicão de frango'],
  },
  {
    ...formatMyFood(parsley as unknown as FoodMyFoodData),
    name: 'Salsa',
    icon: '/images/food/parsley.png',
    image:
      'https://images.unsplash.com/photo-1535189487909-a262ad10c165?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=689&q=80',
    keys: [
      'salsa',
      'folha de salsa',
      'folhas de salsa',
      'folha de salsinha',
      'folhas de salsinha',
      'salsinha',
      'temperinho',
      'temperinho verde',
      'tempero verde',
    ],
    type: 'herb',
  },
  {
    name: 'Sanduíche',
    icon: '/images/food/sandwich.svg',
    image:
      'https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=625&q=80',
  },
  {
    ...formatMyFood(cuminSeed as unknown as FoodMyFoodData),
    name: 'Semente de cominho',
    icon: '/images/food/cumin-seed.png',
    image:
      'https://images.unsplash.com/photo-1601723897386-e5df0c749fb7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VtaW58ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    keys: ['cominho', 'sementes de cominho'],
    type: 'seed',
  },
  {
    name: 'Semolina',
    icon: '/images/food/couscous.png',
    image:
      'https://www.mundoboaforma.com.br/wp-content/uploads/2020/11/semolina.jpg',
    keys: ['semolina', 'semolina de trigo', 'sêmola', 'sêmola de trigo'],
    calories: 360,
    proteins: 13,
    carbohydrates: 73,
    dietaryFiber: 3.9,
    minerals: {
      ...MINERALS_DATA,
      sodium: 1,
      potassium: 186,
      iron: 1.2,
      magnesium: 47,
      calcium: 17,
    },
    vitamins: {
      ...VITAMINS_DATA,
      c: 0,
      b6: 0.1,
    },
    type: 'powder',
  },
  {
    name: 'Sopa de Couve-flor',

    icon: '/images/food/soup.svg',
    image:
      'https://cdn.panelinha.com.br/receita/1468292400000-Sopa-de-couve-flor-com-farofinha-de-pao.jpg',
    keys: ['sopa de couve-flor', 'sopa de couve flor'],
  },
  {
    ...formatMyFood(orangeJuice as unknown as FoodMyFoodData),
    name: 'Suco de Laranja',
    icon: '/images/food/orange-juice.svg',
    image:
      'https://images.unsplash.com/photo-1614065612682-10dbc3db2b31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=657&q=80',
    gi: 50,
    gl: 6,
    version: 'JUICE',
    oneMeasures: [
      {
        quantity: 248,
        type: 'CUP',
      },
    ],
    unitOfMeasurement: 'liter',
    type: 'liquid',
  },
  {
    name: 'Sushi',
    image:
      'https://www.sabornamesa.com.br/media/k2/items/cache/5031e263a4a258791d6306b2d3d9dbf6_XL.jpg',
    keys: ['sushi', 'sushi de salmão', 'suchi'],
  },
];
