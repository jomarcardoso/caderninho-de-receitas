import {
  corn,
  butter,
  margarine,
  strawberry,
  apple,
  peanutButterSmooth,
  pasta,
  basil,
  mango,
  passionFruit,
  tangerine,
  tomato,
} from './src';
import { FoodMyFoodData, FoodNacional } from './db.types';
import type { FoodData } from '../services/food';
import { formatMyFood, formatNacional } from './utils';
import { VITAMINS_DATA } from '../services/vitamin/vitamin.constants';
import { MINERALS_DATA } from '../services/mineral';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import { AMINO_ACIDS } from '../services/amino-acid';

export const HONEY: FoodData = {
  name: 'Mel',
  icon: '/images/food/honey.png',
  image:
    'https://images.unsplash.com/photo-1573697610008-4c72b4e9508f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80',
  calories: 304,
  dietaryFiber: 0.2,
  sugar: 82,
  carbohydrates: 82,
  vitamins: {
    ...VITAMINS_DATA,
    c: 0.5,
    b6: 0,
  },
  minerals: {
    ...MINERALS_DATA,
    iron: 0.4,
    magnesium: 2,
    calcium: 6,
    potassium: 52,
    sodium: 4,
  },
  keys: ['mel', 'mel de abelha'],
  type: 'liquid',
};

export const LEMON_AND_HONEY_SALAD_SAUCE: FoodData = {
  name: 'Molho de Limão e Mel para Salada',
  icon: '/images/food/sauce.png',
  image:
    'https://cdn.panelinha.com.br/receita/1619447331360-molho%2011.07.16.jpg',

  keys: [
    'molho de limão e mel para salada',
    'molho de salada',
    'molho para salada',
    'molho pra   salada',
    'molho de limão',
    'molho de mel',
  ],
};

export const mFoodData: Array<FoodData> = [
  {
    ...formatNacional(foodListNacional[39] as unknown as FoodNacional),
    name: 'Macarrão fusilli',
    icon: '/images/food/screw-pasta.png',
    image: 'https://www.bonde.com.br/img/bondenews/2017/11/img_1_33_1117.jpg',
    keys: [
      'massa',
      'macarrão',
      'massa parafuso',
      'massa parafuso de trigo',
      'macarrão parafuso',
      'macarrão parafuso de trigo',
      'macarrão fusilli',
      'macarrão fusilli de trigo',
      'massa fusilli',
      'massa fusilli de trigo',
      'massa fusili',
      'massa fusili de trigo',
      'macarrão fusili',
      'macarrão fusili de trigo',
    ],
    oneMeasures: [
      {
        quantity: 500,
        type: 'UNITY',
      },
    ],
    type: 'solid',
  },
  {
    name: 'Massa de pastel',
    image: 'https://i.panelinha.com.br/i1/64-bk-6977-massa-pastel1.webp',
    type: 'solid',
    keys: ['massa de'],
    recipe: true,
  },
  {
    ...formatMyFood(apple as unknown as FoodMyFoodData),
    name: 'Maçã Fuji',
    gi: 25,
    gl: 3,
    icon: '/images/food/apple.svg',
    image:
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    calories: 52,
    carbohydrates: 14,
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 192,
        type: 'UNITY',
      },
    ],
    type: 'fruit',
  },
  {
    ...formatNacional(foodListNacional[542] as unknown as FoodNacional),
    name: 'Maniçoba',
    image:
      'https://i.pinimg.com/originals/aa/69/2b/aa692b1b67df3742efe2cf6e521068b3.jpg',
    keys: ['maniçoba'],
  },
  {
    ...formatMyFood(mango as unknown as FoodMyFoodData),
    name: 'Manga',
    icon: '/images/food/mango.png',
    image:
      'https://media.istockphoto.com/photos/mangoes-composition-picture-id1272010307?b=1&k=20&m=1272010307&s=170667a&w=0&h=ZjJ85mpjAr__adYT7zqSdYEDi1XvWiqgtVLqNYIDtkw=',
    keys: ['manga', 'mangas'],
    oneMeasures: [
      {
        quantity: 400,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
    type: 'fruit',
  },
  {
    ...formatMyFood(basil as unknown as FoodMyFoodData),
    name: 'Manjericão',
    icon: '/images/food/basil.png',
    image:
      'https://images.unsplash.com/photo-1538596313828-41d729090199?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    keys: ['manjericão'],
    type: 'herb',
  },
  {
    ...formatMyFood(butter as unknown as FoodMyFoodData),
    name: 'Manteiga',
    icon: '/images/food/butter.svg',
    image:
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: 'gram',
    type: 'oil',
  },
  {
    ...formatNacional(foodListNacional[556] as unknown as FoodNacional),
    ...formatMyFood(peanutButterSmooth as unknown as FoodMyFoodData),
    name: 'Manteiga de amendoim',
    icon: '/images/food/peanut-butter.svg',
    image:
      'https://images.unsplash.com/flagged/photo-1625402535207-953e03369f59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: 'liter',
    type: 'oil',
  },
  {
    ...formatMyFood(passionFruit as unknown as FoodMyFoodData),
    name: 'Maracujá',
    icon: '/images/food/passion-fruit.png',
    image:
      'https://media.istockphoto.com/photos/fresh-passion-fruit-on-wood-table-in-top-view-flat-lay-for-background-picture-id860079962?b=1&k=20&m=860079962&s=170667a&w=0&h=WjvMtFrnUVnXWtwMt8uDO3MwEyveM-WEOQT-pG_6Npg=',
    keys: ['maracujá'],
    oneMeasures: [
      {
        quantity: 44,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
    type: 'fruit',
  },
  {
    ...formatMyFood(margarine as unknown as FoodMyFoodData),
    name: 'Margarina',
    icon: '/images/food/margarine.svg',
    image:
      'https://www.saudevitalidade.com/wp-content/uploads/2021/02/pao-com-margarina-cafe-da-manha-1571859727604_v2_1920x1146-800x445.jpg',
    unitOfMeasurement: 'gram',
    type: 'oil',
  },
  {
    ...formatNacional(foodListNacional[467] as unknown as FoodNacional),
    name: 'Maria mole',
    icon: '/images/food/marshmallows.png',
    image:
      'https://www.oetker.com.br/Recipe/Recipes/oetker.com.br/br-pt/dessert/image-thumb__70800__RecipeDetailsLightBox/maria-mole.jpg',
    keys: ['maria-mole', 'marshmallow', 'marximelo'],
    type: 'cake',
  },
  {
    ...formatMyFood(pasta as unknown as FoodMyFoodData),
    name: 'Massa gravatinha',
    icon: '/images/food/farfalle.png',
    image:
      'https://dcom-prod.imgix.net/files/wp-content/uploads/2017/07/1499888237-frango-grelhado-com-brocolis-e-macarrao-gravatinha_616x462.jpg?w=1280&h=720&crop=focalpoint&fp-x=0.5&fp-y=0.1&fit=crop&auto=compress&q=75',
    keys: ['massa gravatinha', 'gravatinha', 'massa', 'macarrão'],
  },
  HONEY,
  {
    ...formatMyFood(tangerine as unknown as FoodMyFoodData),
    name: 'Mexerica',
    icon: '/images/food/tangerine.png',
    image:
      'https://images.unsplash.com/photo-1564415900645-30612d54dd0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80',
    keys: [
      'mexerica',
      'tangerina',
      'bergamota',
      'vergamota',
      'laranja-mimosa',
      'mandarina',
      'fuxiqueira',
      'poncã',
      'manjerica',
      'laranja-cravo',
      'mimosa',
    ],
    oneMeasures: [
      {
        quantity: 135,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
    type: 'fruit',
  },
  {
    ...formatMyFood(corn as unknown as FoodMyFoodData),
    name: 'Milho',
    icon: '/images/food/corn.svg',
    image:
      'https://images.unsplash.com/photo-1601171908052-92d5a595199b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1146&q=80',
    unitOfMeasurement: 'gram',
    calories: 98,
    proteins: 3.2,
    totalFat: 2.4,
    carbohydrates: 17.1,
    dietaryFiber: 4.6,
    oneMeasures: [
      {
        quantity: 170,
        type: 'CAN',
      },
    ],
    keys: ['milho verde'],
    type: 'seed',
  },
  {
    ...formatNacional(foodListNacional[13] as unknown as FoodNacional),
    name: 'Mistura para bolo',
    icon: '/images/food/cake.svg',
    image:
      'https://img.shoppub.io/w=1000,h=1000,q=80,f=auto/beirario/media/uploads/produtos/foto/bb4dcde9240cafile.png',
    keys: [
      'mistura para bolo',
      'mistura pronta para bolo',
      'mistura de bolo',
      'mistura pronta',
    ],
  },
  LEMON_AND_HONEY_SALAD_SAUCE,
  {
    name: 'Molho de tahine',
    image:
      'https://cdn.panelinha.com.br/receita/1409799600000-Molho-de-tahine.jpg',
    keys: ['molho de tahine'],
  },
  {
    ...formatMyFood(tomato as unknown as FoodMyFoodData),
    name: 'Molho de tomate',
    icon: '/images/food/tomato-sauce.svg',
    image:
      'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: 'liter',
    keys: ['molho de tomate', 'extrato', 'extrato de tomate'],
    oneMeasures: [
      {
        quantity: 350,
        type: 'CAN',
      },
    ],
    type: 'liquid',
  },
  {
    ...formatMyFood(strawberry as unknown as FoodMyFoodData),
    name: 'Morango',
    gi: 53,
    gl: 2,
    icon: '/images/food/strawberry.svg',
    image:
      'https://images.unsplash.com/photo-1591271300850-22d6784e0a7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    calories: 0,
    carbohydrates: 6,
    aminoAcids: AMINO_ACIDS,
    oneMeasures: [
      {
        quantity: 24,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
    type: 'fruit',
    keys: ['moranguinho'],
  },
  {
    name: 'Semente de mostarda',
    icon: '/images/food/mustard-seed.png',
    image:
      'https://media.swncdn.com/via/5884-istockgetty-images-plusrezkrr.jpg',
    type: 'seed',
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 6,
        type: 'TABLE_SPOON',
      },
    ],
    keys: ['sementes de mostarda', 'mostarda em semente'],
  },
  {
    name: 'Muhammara',
    image:
      'https://cdn.panelinha.com.br/receita/1608246532491-Muhammara_receita.jpg',
    keys: [
      'muhammara',
      'pasta de pimentão',
      'pasta de pimentão vermelho',
      'muhamara',
      'mhammara',
    ],
  },
];
