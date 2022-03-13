import { FoodMyFoodData, FoodNacional } from './db.types';
import { FoodData } from '../services/food';
import { formatMyFood, formatNacional } from './utils';
import { VITAMINS_DATA } from '../services/vitamin/vitamin.constants';
import { MINERALS_DATA } from '../services/mineral';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import {
  pepper,
  ham,
  pear,
  whiteBread,
  wheatBread,
  blackPepper,
  paprika,
} from './src';

export const pFoodData: Array<FoodData> = [
  {
    ...formatMyFood(wheatBread as unknown as FoodMyFoodData),
    name: 'Pão caseiro',
    icon: '/images/food/bread.svg',
    image:
      'https://images.unsplash.com/photo-1537200275355-4f0c0714f777?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: 'gram',
    keys: ['pão', 'pãozinho', 'pão integral'],
  },
  {
    ...formatMyFood(whiteBread as unknown as FoodMyFoodData),
    name: 'Pão Francês',
    gi: 100,
    gl: 14,
    icon: '/images/food/bread-roll.svg',
    image:
      'https://images.unsplash.com/photo-1580822642566-5138e95313d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    calories: 0,
    carbohydrates: 20,
    oneMeasures: [
      {
        quantity: 38,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...formatMyFood(paprika as unknown as FoodMyFoodData),
    name: 'Páprica',
    icon: '/images/food/paprika.png',
    image:
      'https://images.unsplash.com/photo-1575319026763-726d092c26c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    keys: ['paprica', 'páprica doce', 'páprica picante'],
  },
  {
    ...formatMyFood(ham as unknown as FoodMyFoodData),
    name: 'Peito de peru defumado',
    icon: '/images/food/ham.svg',
    image:
      'https://i2.wp.com/files.agro20.com.br/uploads/2019/11/Peito-de-peru-1.jpg?resize=600%2C338&ssl=1',
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 30,
        type: 'SLICE',
      },
    ],
    keys: ['peito de peru'],
  },
  {
    ...formatNacional(foodListNacional[141] as unknown as FoodNacional),
    name: 'Pepino',
    icon: '/images/food/cucumber.png',
    image: 'https://s1.static.brasilescola.uol.com.br/be/2021/05/pepino.jpg',
    keys: ['pepino', 'pepinos'],
    oneMeasures: [
      {
        quantity: 35,
        type: 'UNITY',
      },
    ],
  },
  {
    ...formatMyFood(pear as unknown as FoodMyFoodData),
    name: 'Pêra',
    gi: 38,
    icon: '/images/food/pear.svg',
    image:
      'https://images.unsplash.com/photo-1562051725-cc35a65c8227?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    calories: 57,
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 178,
        type: 'UNITY',
      },
    ],
  },
  {
    name: 'Pernil de cordeiro',
    icon: '/images/food/ham.svg',
    image:
      'https://www.minervafoods.com/wp-content/uploads/2018/02/pernil_de_cordeiro_cru_-_blog.jpg',
    keys: [
      'cordeiro',
      'carne de cordeiro',
      'pernil de cordeiro',
      'pernis de cordeiro',
      'pernil de cordeiro cru',
      'pernis de cordeiros cru',
      'ovelha',
      'carne de ovelha',
      'pernil de ovelha',
      'pernis de ovelha',
      'pernil de ovelha cru',
      'pernis de ovelhas cru',
    ],
    unitOfMeasurement: 'gram',
    calories: 230,
    totalFat: 17.1,
    saturedFats: 7.4,
    monounsaturatedFats: 7,
    polyunsaturatedFats: 1.4,
    carbohydrates: 0,
    proteins: 17.9,
    cholesterol: 69,
    minerals: {
      ...MINERALS_DATA,
      sodium: 0.1,
      calcium: 9,
      copper: 0.1,
      iron: 1.7,
      magnesium: 23,
      manganese: 0.1,
      phosphorus: 170,
      potassium: 249,
      selenium: 0.1,
      zinc: 3.3,
    },
    vitamins: {
      ...VITAMINS_DATA,
      a: 0,
      b1: 0.1,
      b11: 0.1,
      b12: 0.1,
      b2: 0.2,
      b3: 6.3,
      b5: 0.7,
      b6: 0.1,
      c: 0,
      d: 0,
      e: 0.2,
      k: 0,
    },
  },
  {
    ...formatMyFood(pepper as unknown as FoodMyFoodData),
    name: 'Pimenta',
    icon: '/images/food/pepper.svg',
    image:
      'https://images.unsplash.com/photo-1526179969422-e92255a5f223?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: 'gram',
  },
  {
    ...formatMyFood(blackPepper as unknown as FoodMyFoodData),
    name: 'Pimenta do Reino',
    icon: '/images/food/black-pepper.png',
    image:
      'http://premiertemperos.com.br/novo/wp-content/uploads/2020/04/1706-1-1200x675.jpg',
    keys: ['pimenta do reino', 'pimenta preta', 'pimenta'],
  },
  {
    ...formatNacional(foodListNacional[141] as unknown as FoodNacional),
    name: 'Pimentão amarelo',
    icon: '/images/food/paprika.png',
    image:
      'https://agrodomingues.com.br/wp-content/uploads/2020/10/paprika-yellow-vegetables-318208.jpg',
    keys: ['pimentão', 'pimentão amarelo', 'pimentões amarelos'],
    oneMeasures: [
      {
        quantity: 215,
        type: 'UNITY',
      },
    ],
  },
  {
    ...formatMyFood(ham as unknown as FoodMyFoodData),
    name: 'Presunto',
    gi: 0,
    icon: '/images/food/ham.svg',
    image:
      'https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'Presunto, sem capa de gordura',
    keys: [],
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 30,
        type: 'SLICE',
      },
    ],
  },
];
