import mergeWith from 'lodash/mergeWith';
import { FoodMyFoodData, FoodNacional } from './db.types';
import { FoodData, FoodService } from '../services/food';
import { format, formatNacional, verifyQuantity } from './utils';
import {
  coconut as coconutData,
  egg as eggData,
  chicken as chickenData,
  oliveOil as oliveOilData,
  sugar as sugarData,
  wheatFlour as wheatFlourData,
  avocado,
  onion,
  pepper,
  corn,
  tomato,
  ham,
  pineapple,
  carrot,
  oat,
  butter,
  milk,
  margarine,
  garlic,
  strawberry,
  orange,
  water,
  beef,
  pear,
  apple,
  banana,
  whiteRice,
  whiteBread,
  greenLeafLettuce,
  salt,
  boiledPotato,
  peanutButterSmooth,
  creamCheese,
  soybeanOil,
  wheatBread,
  orangeJuice,
  oatFlour,
  cornFlour,
  edamCheese,
  parsley,
  cassava,
  coriander,
  lemon,
  blackPepper,
  sweetPotato,
  cauliflower,
  chocolateDark45at59,
  cocoa,
  grape,
  thyme,
  beetroot,
  rosemary,
  nut,
  eggplant,
  yogurt,
  pasta,
  peanut,
  bakingSoda,
  cinnamon,
  clove,
  brownSugar,
  zucchini,
  paprika,
  olive,
  basil,
  cassavaFlour,
  chive,
  curry,
  coconutWater,
  coconutMilk,
  ginger,
  pea,
  mango,
  passionFruit,
  porkLoin,
  chayote,
  redWineVinegar,
  cuminSeed,
  coffee,
  eggYolk,
  tangerine,
  kiwi,
} from './src';
import { VITAMINS_DATA } from '../services/vitamin/vitamin.constants';
import { MINERALS_DATA } from '../services/mineral';
import { AMINO_ACIDS } from '../services/amino-acid';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import { recipesData } from './recipes';
import { beansData } from './beans';

export const foodsData: Array<FoodData> = [
  {
    ...format(apple as unknown as FoodMyFoodData),
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
  },
  {
    ...format(pear as unknown as FoodMyFoodData),
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
    ...format(banana as unknown as FoodMyFoodData),
    name: 'Banana Prata',
    gi: 39,
    gl: 8,
    icon: '/images/food/banana.svg',
    image:
      'https://images.unsplash.com/photo-1583485646409-f9feb9af2a67?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    calories: 89,
    carbohydrates: 28,
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 101,
        type: 'UNITY',
      },
    ],
  },
  {
    ...format(whiteRice as unknown as FoodMyFoodData),
    name: 'Arroz Branco',
    gi: 81,
    gl: 18,
    carbohydrates: 32,
    icon: '/images/food/rice.svg',
    image:
      'https://images.unsplash.com/photo-1568347355280-d33fdf77d42a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80',
    calories: 130,
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 158,
        type: 'CUP',
      },
    ],
    aminoAcids: {
      tryptophan: 31,
      threonine: 96,
      isoleucine: 116,
      leucine: 222,
      lysine: 97,
      methionine: 163,
      cystine: 55,
      phenylalanine: 144,
      tyrosine: 90,
      valine: 164,
      histidine: 63,
      arginine: 224,
      alanine: 156,
      asparticAcid: 253,
      glutamicAcid: 524,
      glycine: 122,
      proline: 127,
      serine: 141,
      glutamine: 0,
    },
    keys: ['arroz'],
  },
  {
    name: 'Banana Nanica',
    gi: 70,
    gl: 14,
    icon: '/images/food/banana.svg',
    image:
      'https://w1.ezcdn.com.br/euorganico/fotos/grande/72fg1/banana-nanica.jpg',
    calories: 89,
    carbohydrates: 28,
    aminoAcids: {
      tryptophan: 9,
      threonine: 28,
      isoleucine: 28,
      leucine: 68,
      lysine: 50,
      methionine: 8,
      cystine: 9,
      phenylalanine: 49,
      tyrosine: 9,
      valine: 47,
      histidine: 77,
      arginine: 49,
      alanine: 40,
      asparticAcid: 124,
      glutamicAcid: 152,
      glycine: 28,
      proline: 38,
      serine: 40,
      glutamine: 0,
    },
  },
  {
    name: 'Banana Mysore',
    gi: 87,
    gl: 6,
    icon: '/images/food/banana.svg',
    image:
      'https://www.mundoecologia.com.br/wp-content/gallery/banana-my/Banana-Mysore-2.jpg',
    calories: 89,
    carbohydrates: 12,
    aminoAcids: {
      tryptophan: 9,
      threonine: 28,
      isoleucine: 28,
      leucine: 68,
      lysine: 50,
      methionine: 8,
      cystine: 9,
      phenylalanine: 49,
      tyrosine: 9,
      valine: 47,
      histidine: 77,
      arginine: 49,
      alanine: 40,
      asparticAcid: 124,
      glutamicAcid: 152,
      glycine: 28,
      proline: 38,
      serine: 40,
      glutamine: 0,
    },
  },
  {
    ...format(orange as unknown as FoodMyFoodData),
    name: 'Laranja',
    gi: 43,
    icon: '/images/food/orange.svg',
    image:
      'https://images.unsplash.com/photo-1549888834-3ec93abae044?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    calories: 0,
    carbohydrates: 14,
    oneMeasures: [
      {
        quantity: 137,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...format(whiteBread as unknown as FoodMyFoodData),
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
    ...format(strawberry as unknown as FoodMyFoodData),
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
  },
  {
    ...format(garlic as unknown as FoodMyFoodData),
    name: 'alho',
    gi: 0,
    icon: '/images/food/garlic.svg',
    image:
      'https://images.unsplash.com/photo-1559454473-27bc85c67728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=617&q=80',
    description: 'Alho-poró, cru',
    oneMeasures: [
      {
        quantity: 31.4,
        type: 'CLOVE',
      },
    ],
  },
  {
    ...format(greenLeafLettuce as unknown as FoodMyFoodData),
    name: 'alface',
    gi: 0,
    icon: '/images/food/lettuce.svg',
    image:
      'https://images.unsplash.com/photo-1622205313162-be1d5712a43f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80',
    description: 'Alface, roxa, crua',
  },
  {
    ...format(ham as unknown as FoodMyFoodData),
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
  {
    ...format(pineapple as unknown as FoodMyFoodData),
    name: 'Abacaxi',
    gi: 59,
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 905,
        type: 'UNITY',
      },
    ],
    icon: '/images/food/pineapple.svg',
    image:
      'https://images.unsplash.com/photo-1572859730774-2cb70677d258?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    keys: [],
  },
  {
    ...format(carrot as unknown as FoodMyFoodData),
    name: 'Cenoura',
    gi: 16,
    icon: '/images/food/carrot.svg',
    image:
      'https://images.unsplash.com/photo-1582515073490-39981397c445?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    keys: ['cenoura ralada', 'cenouras raladas', 'pedaços de cenoura'],
    oneMeasures: [
      {
        quantity: 61,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...format(avocado as unknown as FoodMyFoodData),
    name: 'Abacate',
    gi: 15,
    icon: '/images/food/avocado.svg',
    image:
      'https://images.unsplash.com/photo-1612215047504-a6c07dbe4f7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: 'gram',
    oneMeasures: [
      {
        quantity: 201,
        type: 'UNITY',
      },
    ],
    keys: ['avocado'],
  },
  {
    ...format(oat as unknown as FoodMyFoodData),
    name: 'Aveia',
    icon: '/images/food/oats.svg',
    image:
      'https://images.unsplash.com/photo-1586810512929-6b8659fde098?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    oneMeasures: [
      {
        quantity: 234,
        type: 'CUP',
      },
    ],
    unitOfMeasurement: 'gram',
    keys: ['aveia em flocos', 'flocos de aveia'],
  },
  {
    ...format(coconutData as unknown as FoodMyFoodData),
    name: 'Coco ralado',
    gi: 42,
    icon: '/images/food/coconut.svg',
    image:
      'https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    oneMeasures: [
      {
        quantity: 80,
        type: 'CUP',
      },
      {
        quantity: 5,
        type: 'TABLE_SPOON',
      },
      {
        quantity: 1.5,
        type: 'TEA_SPOON',
      },
    ],
    unitOfMeasurement: 'gram',
    keys: ['coco', 'côco', 'cocos', 'côcos'],
  },
  {
    ...format(eggData as unknown as FoodMyFoodData),
    name: 'Ovo',
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
    keys: ['ovos'],
  },
  {
    ...format(chickenData as unknown as FoodMyFoodData),
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
  },
  {
    ...format(oliveOilData as unknown as FoodMyFoodData),
    name: 'Azeite de oliva',
    gi: 0,
    icon: '/images/food/olive-oil.svg',
    image:
      'https://veja.abril.com.br/wp-content/uploads/2017/06/azeite-023.jpg?quality=70&strip=info&resize=680,453',
    unitOfMeasurement: 'liter',
    keys: ['azeite', 'óleo de oliva', 'azeite de oliva extra virgem'],
    oneMeasures: [
      {
        quantity: 240,
        type: 'CUP',
      },
      {
        quantity: 15,
        type: 'TABLE_SPOON',
      },
      {
        quantity: 5,
        type: 'TEA_SPOON',
      },
    ],
  },
  {
    ...format(sugarData as unknown as FoodMyFoodData),
    name: 'Açúcar branco',
    gi: 92,
    icon: '/images/food/sugar.svg',
    image: 'https://udop.com.br/u_img/noticias/2020/acucar33.jpg',
    unitOfMeasurement: 'gram',
    keys: ['açúcar', 'açucar'],
    oneMeasures: [
      {
        quantity: 160,
        type: 'CUP',
      },
      {
        quantity: 10,
        type: 'TABLE_SPOON',
      },
      {
        quantity: 3.5,
        type: 'TEA_SPOON',
      },
    ],
  },
  {
    ...format(wheatFlourData as unknown as FoodMyFoodData),
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
  },
  {
    ...format(brownSugar as unknown as FoodMyFoodData), // TODO: precisa diferenciar do açúcar branco
    name: 'Açúcar mascavo',
    gi: 80,
    icon: '/images/food/sugar.svg', // TODO: precisa diferenciar do açúcar branco
    image: 'https://superbeal.com.br/img/news/site_5d653235ca208.png',
    unitOfMeasurement: 'gram',
    keys: ['açúcar escuro', 'açúcar integral'],
    oneMeasures: [
      {
        quantity: 160,
        type: 'CUP',
      },
      {
        quantity: 10,
        type: 'TABLE_SPOON',
      },
      {
        quantity: 3.5,
        type: 'TEA_SPOON',
      },
    ],
  },
  {
    ...format(salt as unknown as FoodMyFoodData),
    name: 'Sal',
    icon: '/images/food/salt.svg',
    image:
      'https://acrediteounao.com/wp-content/uploads/2018/12/sal-de-cozinha-e1543846010596.jpg',
    unitOfMeasurement: 'gram',
  },
  {
    ...format(boiledPotato as unknown as FoodMyFoodData),
    name: 'Batata',
    description: 'batata inglesa cozida',
    icon: '/images/food/potato.svg',
    image:
      'https://images.unsplash.com/photo-1563012678-bdfec255931b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    unitOfMeasurement: 'gram',
    keys: ['batatinha', 'batata inglesa'],
    oneMeasures: [
      {
        quantity: 225,
        type: 'UNITY',
      },
    ],
  },
  {
    ...format(onion as unknown as FoodMyFoodData),
    name: 'Cebola',
    icon: '/images/food/onion.svg',
    image:
      'https://images.unsplash.com/photo-1560087706-04151ac8da26?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    unitOfMeasurement: 'gram',
    calories: 40,
    carbohydrates: 9,
    dietaryFiber: 1.7,
    sugar: 4.2,
    oneMeasures: [
      {
        quantity: 100,
        type: 'UNITY_SMALL',
      },
      {
        quantity: 125,
        type: 'UNITY',
      },
      {
        quantity: 150,
        type: 'UNITY_LARGE',
      },
    ],
  },
  {
    ...format(pepper as unknown as FoodMyFoodData),
    name: 'Pimenta',
    icon: '/images/food/pepper.svg',
    image:
      'https://images.unsplash.com/photo-1526179969422-e92255a5f223?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: 'gram',
  },
  {
    ...format(corn as unknown as FoodMyFoodData),
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
  },
  {
    ...format(tomato as unknown as FoodMyFoodData),
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
  },
  {
    ...formatNacional(foodListNacional[556] as unknown as FoodNacional),
    ...format(peanutButterSmooth as unknown as FoodMyFoodData),
    name: 'Manteiga de amendoim',
    icon: '/images/food/peanut-butter.svg',
    image:
      'https://images.unsplash.com/flagged/photo-1625402535207-953e03369f59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: 'liter',
  },
  {
    ...format(margarine as unknown as FoodMyFoodData),
    name: 'Margarina',
    icon: '/images/food/margarine.svg',
    image:
      'https://www.saudevitalidade.com/wp-content/uploads/2021/02/pao-com-margarina-cafe-da-manha-1571859727604_v2_1920x1146-800x445.jpg',
    unitOfMeasurement: 'gram',
  },
  {
    ...format(creamCheese as unknown as FoodMyFoodData),
    name: 'Requeijão',
    icon: '/images/food/cream-cheese.svg',
    image:
      'https://images.unsplash.com/photo-1547920303-9befbe3decc7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80',
    unitOfMeasurement: 'gram',
  },
  {
    ...format(milk as unknown as FoodMyFoodData),
    name: 'Leite',
    icon: '/images/food/milk.svg',
    image:
      'https://images.unsplash.com/photo-1608634960479-c70cf0c3dece?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    unitOfMeasurement: 'liter',
  },
  {
    name: 'Fermento',
    icon: '/images/food/yeast.svg',
    image:
      'https://static1.casapraticaqualita.com.br/articles/0/21/30/@/2427-fermento-biologico-fresco-conhecido-com-article_content_img-3.jpg',
    unitOfMeasurement: 'gram',
  },
  {
    ...format(soybeanOil as unknown as FoodMyFoodData),
    name: 'Óleo de soja',
    icon: '/images/food/oil.svg',
    image:
      'https://img.ibxk.com.br/2020/01/22/22215352968302.jpg?w=1120&h=420&mode=crop&scale=both',
    unitOfMeasurement: 'liter',
    keys: ['óleo'],
  },
  {
    ...format(butter as unknown as FoodMyFoodData),
    name: 'Manteiga',
    icon: '/images/food/butter.svg',
    image:
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: 'gram',
  },
  {
    ...format(wheatBread as unknown as FoodMyFoodData),
    name: 'Pão caseiro',
    icon: '/images/food/bread.svg',
    image:
      'https://images.unsplash.com/photo-1537200275355-4f0c0714f777?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: 'gram',
    keys: ['pão', 'pãozinho', 'pão integral'],
  },
  {
    ...format(orangeJuice as unknown as FoodMyFoodData),
    icon: '/images/food/orange-juice.svg',
    image:
      'https://images.unsplash.com/photo-1614065612682-10dbc3db2b31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=657&q=80',
    name: 'Suco de Laranja',
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
  },
  {
    ...format(carrot as unknown as FoodMyFoodData),
    icon: '/images/food/carrot.svg',
    image:
      'https://images.unsplash.com/photo-1556909172-89cf0b24ff02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80',
    name: 'Cenoura cozida',
    gi: 38,
    version: 'BOILED',
    oneMeasures: [
      {
        quantity: 130,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...format(oatFlour as unknown as FoodMyFoodData),
    icon: '/images/food/oat-flour.svg',
    image:
      'https://cdn.awsli.com.br/600x450/757/757669/produto/41919778/2bbdd6f3f5.jpg',
    name: 'Farinha de aveia',
    keys: ['farelo de aveia'],
    gi: 72,
    version: 'FLOUR',
  },
  {
    ...format(cornFlour as unknown as FoodMyFoodData),
    name: 'Fubá',
    icon: '/images/food/corn-flour.svg',
    image:
      'https://caldobom.com.br/uploads/2018/12/diferenca-entre-fuba-e-farinha-de-milho.jpg',
    keys: ['farinha de milho'],
    version: 'FLOUR',
  },
  {
    name: 'Amido de milho',
    icon: '/images/food/corn-flour.svg',
    image:
      'https://images.armazemcerealista.com.br/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/a/m/amido-de-milho---100g.jpg',
    keys: ['maizena'],
    version: 'REFINED_FLOUR',
  },
  {
    ...format(tomato as unknown as FoodMyFoodData),
    name: 'Tomate',
    icon: '/images/food/tomato.svg',
    image:
      'https://images.unsplash.com/photo-1561155713-50f2a38fde2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: 'gram',
    keys: ['tomate'],
    calories: 18,
    totalFat: 0.2,
    proteins: 0.9,
    dietaryFiber: 1.2,
    sugar: 2.6,
    saturedFats: 0,
    oneMeasures: [
      {
        quantity: 123,
        type: 'UNITY',
      },
      {
        quantity: 123,
        type: 'SLICE',
      },
    ],
  },
  {
    ...format(edamCheese as unknown as FoodMyFoodData),
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
    keys: ['queijo'],
  },
  {
    ...format(ham as unknown as FoodMyFoodData),
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
    ...format(water as unknown as FoodMyFoodData),
    name: 'Água',
    icon: '/images/food/water.svg',
    image:
      'https://images.unsplash.com/photo-1612392549274-9afb280ce7a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: 'liter',
    oneMeasures: [
      {
        quantity: 240,
        type: 'CUP',
      },
    ],
  },
  {
    ...format(parsley as unknown as FoodMyFoodData),
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
  },
  {
    ...mergeWith(
      formatNacional(foodListNacional[178] as unknown as FoodNacional),
      format(beef as unknown as FoodMyFoodData),
      verifyQuantity,
    ),
    name: 'Carne bovina',
    icon: '/images/food/beef.svg',
    image:
      'https://images.unsplash.com/photo-1588347785102-2944ba63d0c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    keys: ['carne', 'carne de gado', 'carne moída', 'bife', 'acém'],
  },
  {
    ...format(cassava as unknown as FoodMyFoodData),
    name: 'Aipim',
    icon: '/images/food/cassava.png',
    image:
      'https://a-static.mlcdn.com.br/618x463/aipim/fruitexpress/1878daaecaf611eb86614201ac18500e/a80c447bae57a657277ef1e2516cb498.jpg',
    keys: ['mandioca', 'macacheira', 'cassava'],
  },
  {
    ...format(coriander as unknown as FoodMyFoodData),
    name: 'Coentro',
    keys: ['coentro'],
    icon: '/images/food/coriander.png',
    image:
      'https://s2.glbimg.com/2uv6Zz8Fr8j89rvJC1mZl8wGPdo=/smart/e.glbimg.com/og/ed/f/original/2020/10/27/coriandrum-sativum-coentro-aespeciarista-.jpg',
  },
  {
    ...format(lemon as unknown as FoodMyFoodData),
    name: 'Limão',
    keys: ['limão', 'limões'],
    icon: '/images/food/lemon.png',
    image:
      'https://minhasaude.proteste.org.br/wp-content/uploads/2020/10/lim%C3%B5es-970x472.jpg',
    oneMeasures: [
      {
        quantity: 170,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...format(blackPepper as unknown as FoodMyFoodData),
    name: 'Pimenta do Reino',
    icon: '/images/food/black-pepper.png',
    image:
      'http://premiertemperos.com.br/novo/wp-content/uploads/2020/04/1706-1-1200x675.jpg',
    keys: ['pimenta do reino', 'pimenta preta', 'pimenta'],
  },
  {
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
  },
  {
    ...format(sweetPotato as unknown as FoodMyFoodData),
    name: 'Batata Doce',
    icon: '/images/food/sweet-potato.png',
    image:
      'https://images.unsplash.com/photo-1584699006710-3ad3b82fce7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    keys: ['batata doce', 'batata-doce', 'batata doce cozida'],
    oneMeasures: [
      {
        quantity: 240,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...format(cauliflower as unknown as FoodMyFoodData),
    name: 'Couve-flor',
    icon: '/images/food/cauliflower.png',
    image:
      'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80',
    keys: [
      'couve-flor',
      'couve flor',
      'couves-flor',
      'couves-flores',
      'couve-flores',
    ],
    oneMeasures: [
      {
        quantity: 600,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
  },
  {
    name: 'Folha de Louro',
    icon: '/images/food/leaf.png',
    image:
      'https://images.unsplash.com/photo-1612549225312-900aa64d56bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    keys: ['folha de louro', 'folhas de louro', 'louro'],
  },
  {
    ...format(grape as unknown as FoodMyFoodData),
    name: 'Uva',
    icon: '/images/food/grape.png',
    image:
      'https://images.unsplash.com/photo-1525286102393-8bf945cd0649?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2074&q=80',
    keys: ['uva'],
  },
  {
    ...format(cocoa as unknown as FoodMyFoodData),
    name: 'Cacau',
    icon: '/images/food/cocoa.png',
    image:
      'https://images.unsplash.com/photo-1578269830911-6159f1aee3b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80',
    keys: ['cacau'],
  },
  {
    ...format(chocolateDark45at59 as unknown as FoodMyFoodData),
    name: 'Chocolate preto 45 - 59%',
    icon: '/images/food/chocolate.png',
    image:
      'https://media.istockphoto.com/photos/dark-chocolate-bar-on-rustic-wood-table-picture-id463813283?b=1&k=20&m=463813283&s=170667a&w=0&h=x-SXgRiiAkH-ilp7dZPZUQWdq0V7-4jwDf4BK8PRd0M=',
    keys: [
      'chocolate',
      'achocolatado',
      'chocolate em pó',
      'chocolate ao leite',
    ],
  },
  {
    ...format(thyme as unknown as FoodMyFoodData),
    name: 'Tomilho',
    icon: '/images/food/thyme.png',
    image:
      'https://images.unsplash.com/photo-1606072104299-cdaab62c0a07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    keys: ['tomilho', 'ramo de tomilho', 'ramos de tomilho'],
  },
  {
    ...format(rosemary as unknown as FoodMyFoodData),
    name: 'Alecrim',
    icon: '/images/food/rosemary.png',
    image:
      'https://images.unsplash.com/photo-1603129624917-3c579e864025?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    keys: ['alecrim', 'ramo de alecrim', 'ramos de alecrim'],
  },
  {
    ...format(beetroot as unknown as FoodMyFoodData),
    name: 'Beterraba',
    icon: '/images/food/beetroot.png',
    image:
      'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    keys: ['beterraba', 'beterraba crua'],
    oneMeasures: [
      {
        quantity: 140,
        type: 'UNITY',
      },
    ],
  },
  {
    ...format(nut as unknown as FoodMyFoodData),
    name: 'Noz',
    icon: '/images/food/walnut.png',
    image:
      'https://images.unsplash.com/photo-1524593656068-fbac72624bb0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    keys: ['noz', 'nozes'],
  },
  {
    ...format(eggplant as unknown as FoodMyFoodData),
    name: 'Beringela',
    icon: '/images/food/eggplant.png',
    image:
      'https://images.unsplash.com/photo-1613881553903-4543f5f2cac9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    keys: ['berinjela', 'beringela', 'beringela crua'],
    oneMeasures: [
      {
        quantity: 170,
        type: 'UNITY',
      },
      {
        quantity: 270,
        type: 'UNITY_LARGE',
      },
    ],
  },
  {
    name: "Za'atar",
    icon: '/images/food/zaatar.png',
    image:
      'https://acozinhaquefala.com.br/wp-content/uploads/2021/09/zaatar-zatar.jpg',
    keys: ["za'atar", 'zátar', 'zatar', 'zaatar', 'zattar'],
  },
  {
    ...format(yogurt as unknown as FoodMyFoodData),
    name: 'Iogurte natural',
    icon: '/images/food/yoghurt.png',
    image:
      'https://images.unsplash.com/photo-1562114808-b4b33cf60f4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=873&q=80',
    keys: [
      'iogurte natural',
      'iogurt',
      'iogurte',
      'yogurt',
      'yogurte',
      'yogourt',
      'yogourte',
      'iogourte',
      'yoghurt',
      'yoghurte',
      'ioghurte',
    ],
  },
  {
    ...format(pasta as unknown as FoodMyFoodData),
    name: 'Massa gravatinha',
    icon: '/images/food/farfalle.png',
    image:
      'https://dcom-prod.imgix.net/files/wp-content/uploads/2017/07/1499888237-frango-grelhado-com-brocolis-e-macarrao-gravatinha_616x462.jpg?w=1280&h=720&crop=focalpoint&fp-x=0.5&fp-y=0.1&fit=crop&auto=compress&q=75',
    keys: ['massa gravatinha', 'gravatinha', 'massa', 'macarrão'],
  },
  {
    ...format(peanut as unknown as FoodMyFoodData),
    name: 'Amendoim',
    icon: '/images/food/peanut.png',
    image:
      'https://images.unsplash.com/photo-1604267437800-d89485144366?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1888&q=80',
    keys: ['amendoim', 'amendoins'],
  },
  {
    ...format(bakingSoda as unknown as FoodMyFoodData),
    name: 'Bicarbonato de sódio',
    icon: '/images/food/baking-soda.png',
    image:
      'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/06/baking-soda-water-and-wooden-spoon-1296x728-1.jpg?h=1528',
    keys: ['bicarbonato', 'bicarbonato de sódio'],
  },
  {
    ...format(cinnamon as unknown as FoodMyFoodData),
    name: 'Canela',
    icon: '/images/food/cinnamon.png',
    image:
      'https://images.unsplash.com/photo-1611256243212-48a03787ea01?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1177&q=80',
    keys: ['canela', 'casca de canela', 'canela em pó', 'canela em casca'],
  },
  {
    ...format(clove as unknown as FoodMyFoodData),
    name: 'Cravo da índia',
    icon: '/images/food/clove.png',
    image:
      'https://images.unsplash.com/photo-1626609940603-1fc7556a94ef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    keys: ['cravo', 'cravos', 'cravos da índia', 'cravo-da-índia'],
  },
  {
    ...format(zucchini as unknown as FoodMyFoodData),
    name: 'Abobrinha',
    icon: '/images/food/zucchini.png',
    image:
      'https://images.unsplash.com/photo-1580294672673-4fbda48428be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    keys: ['abobrinha', 'abobrinha italiana'],
    oneMeasures: [
      {
        quantity: 255,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...format(paprika as unknown as FoodMyFoodData),
    name: 'Páprica',
    icon: '/images/food/paprika.png',
    image:
      'https://images.unsplash.com/photo-1575319026763-726d092c26c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    keys: ['paprica', 'páprica doce', 'páprica picante'],
  },
  {
    ...format(olive as unknown as FoodMyFoodData),
    name: 'Azeitona',
    icon: '/images/food/olive.png',
    image:
      'https://images.unsplash.com/photo-1582042043408-de36ded9059b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    keys: ['azeitona', 'oliva', 'azeitonas'],
  },
  {
    ...format(basil as unknown as FoodMyFoodData),
    name: 'Manjericão',
    icon: '/images/food/basil.png',
    image:
      'https://images.unsplash.com/photo-1538596313828-41d729090199?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    keys: ['manjericão'],
  },
  {
    ...format(chive as unknown as FoodMyFoodData),
    name: 'Cebolinha',
    icon: '/images/food/chive.png',
    image:
      'https://media.istockphoto.com/photos/fresh-chives-siniklav-or-frenk-sogani-on-wooden-surface-picture-id845638780?b=1&k=20&m=845638780&s=170667a&w=0&h=5akMDvDeooH-uLd8av-DOBB0d3j8wJEI_hzjfHuX5Ik=',
    keys: [
      'cebolinha',
      'cebolinho',
      'cebolinha-francesa',
      'cebolinha francesa',
    ],
  },
  {
    ...format(cassavaFlour as unknown as FoodMyFoodData),
    name: 'Farinha de mandioca',
    icon: '/images/food/cassava-flour.png',
    image:
      'https://media.istockphoto.com/photos/cassava-flour-in-handmade-pot-natural-organic-flour-from-brazil-picture-id1300392101?b=1&k=20&m=1300392101&s=170667a&w=0&h=MubnvNFt5Cv_6aKakGNc3UCaGzGTGXHkO6DuPP50c8E=',
    keys: ['farinha de mandioca', 'farofa'],
  },
  {
    ...format(curry as unknown as FoodMyFoodData),
    name: 'Caril',
    icon: '/images/food/curry.png',
    image:
      'https://media.istockphoto.com/photos/curry-powder-on-a-wooden-spoon-and-in-a-wooden-bowl-picture-id1271918149?b=1&k=20&m=1271918149&s=170667a&w=0&h=ICQNG-IxiJ-ExTpYkn87rW5qhN8Cu5tVHEwVnAsGZSs=',
    keys: ['caril', 'curry'],
  },
  {
    ...format(coconutWater as unknown as FoodMyFoodData),
    name: 'Água de coco',
    icon: '/images/food/coconut-water.png',
    image:
      'https://media.istockphoto.com/photos/coconut-drink-with-pulp-in-glass-on-wooden-table-picture-id526133774?b=1&k=20&m=526133774&s=170667a&w=0&h=0OifDfpyMrzYuy2fy-D-FRlucUJx2IjXJGK47vk4X7s=',
    keys: ['coco', 'agua de coco', 'água de coco'],
  },
  {
    ...format(coconutMilk as unknown as FoodMyFoodData),
    name: 'Leite de coco',
    icon: '/images/food/coconut-milk.png',
    image:
      'https://media.istockphoto.com/photos/coconut-vegan-milk-with-halves-of-nuts-over-brown-background-picture-id1304494306?b=1&k=20&m=1304494306&s=170667a&w=0&h=bLfsZbv8t6Oej_GXr3KPy7uLuETt_Yb_w6tNaLtlm3s=',
    keys: ['leite de coco', 'coco'],
  },
  {
    ...format(ginger as unknown as FoodMyFoodData),
    name: 'Gengibre',
    icon: '/images/food/ginger.png',
    image:
      'https://media.istockphoto.com/photos/ginger-root-and-ginger-powder-in-the-bowl-picture-id647402644?b=1&k=20&m=647402644&s=170667a&w=0&h=5lyuLq8qT16BelSweo6vprZzM62uDGZXdpPXdEDzqBc=',
    keys: ['gengibre', 'gengibre em pó'],
  },
  {
    ...format(pea as unknown as FoodMyFoodData),
    name: 'Ervilha',
    icon: '/images/food/pea.png',
    image:
      'https://media.istockphoto.com/photos/pea-protein-powder-and-snap-pea-portrait-picture-id1175572671?b=1&k=20&m=1175572671&s=170667a&w=0&h=EWO5nG741j6gFokkAljmYE6tkCyEvGZxMMjjJq3dJZc=',
    keys: ['ervilha', 'ervilhas'],
  },
  {
    ...format(mango as unknown as FoodMyFoodData),
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
  },
  {
    ...format(passionFruit as unknown as FoodMyFoodData),
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
  },
  {
    ...format(porkLoin as unknown as FoodMyFoodData),
    name: 'Lombo de porco',
    icon: '/images/food/chop.png',
    image:
      'https://media.istockphoto.com/photos/baked-pork-loin-with-whole-grain-mustard-picture-id693429828?b=1&k=20&m=693429828&s=170667a&w=0&h=LogyIFTqLo69l8rDzTlDGApXotSFYZDUDffvNl7-ZRc=',
    keys: [
      'lombo',
      'lombinho',
      'lombo de porco',
      'filé de porco',
      'lombo suíno',
      'filé suíno',
      'filé mignon suíno',
    ],
  },
  {
    ...format(chayote as unknown as FoodMyFoodData),
    name: 'Chuchu',
    icon: '/images/food/chayote.png',
    image:
      'https://static1.conquistesuavida.com.br/articles/2/78/82/@/25512-o-chuchu-e-uma-fonte-poderosa-de-nutrien-640x400-3.jpg',
    keys: ['chuchu', 'chuchu cru'],
    oneMeasures: [
      {
        quantity: 320,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...format(redWineVinegar as unknown as FoodMyFoodData),
    name: 'Vinagre de vinho tinto',
    icon: '/images/food/red-wine-vinegar.png',
    image:
      'data:image/jpeg;base64,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',
    keys: ['vinagre', 'vinagre de vinho', 'vinagre de vinho tinto'],
  },
  {
    ...format(cuminSeed as unknown as FoodMyFoodData),
    name: 'Semente de cominho',
    icon: '/images/food/cumin-seed.png',
    image:
      'https://images.unsplash.com/photo-1601723897386-e5df0c749fb7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VtaW58ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    keys: ['cominho', 'sementes de cominho'],
  },
  {
    ...format(water as unknown as FoodMyFoodData),
    name: 'Gelo',
    icon: '/images/food/ice.png',
    image:
      'https://images.unsplash.com/photo-1561365890-798858b32e0c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGljZSUyMGN1YmV8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    keys: ['gelo'],
  },
  {
    ...formatNacional(foodListNacional[588] as unknown as FoodNacional),
    name: 'Castanha-do-pará',
    icon: '/images/food/brazil-nut.png',
    image:
      'https://www.sistersintravel.com/wp-content/uploads/2015/12/sisters-in-travel-curiosidade-castanha-do-par%C3%A1-720x485.jpg',
    keys: ['castanha', 'castanha do pará'],
  },
  {
    ...formatNacional(foodListNacional[474] as unknown as FoodNacional),
    name: 'Chá de erva-doce',
    icon: '/images/food/anise.png',
    image:
      'https://diariodonordeste.verdesmares.com.br/image/contentid/policy:7.4537296:1625738451/erva-doce%201.jpeg?f=default&$p$f=bacd656',
    keys: ['chá de erva-doce', 'erva-doce', 'erva doce'],
  },
  {
    ...format(coffee as unknown as FoodMyFoodData),
    name: 'Café',
    icon: '/images/food/coffee.png',
    image:
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=871&q=80',
    keys: ['grão de café', 'grãos de café', 'café moído'],
  },
  {
    ...format(eggYolk as unknown as FoodMyFoodData),
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
  },
  {
    ...mergeWith(
      format(banana as unknown as FoodMyFoodData),
      formatNacional(foodListNacional[178] as unknown as FoodNacional),
      verifyQuantity,
    ),
    name: 'Banana nanica',
    icon: '/images/food/banana.svg',
    image:
      'https://cdn.awsli.com.br/600x450/1693/1693441/produto/92535301/9f9c9fa2f7.jpg',
    keys: ['banana', 'banana nanica', 'bananas', 'bananas nanicax'],
  },
  {
    name: 'Urucum',
    icon: '/images/food/seasoning.png',
    image:
      'https://www.dicasdemulher.com.br/wp-content/uploads/2020/03/urucum-0.png',
    keys: ['falso-açafrão', 'colorau'],
  },
  {
    name: 'Hortelã',
    icon: '/images/food/mint.png',
    image:
      'https://images.unsplash.com/photo-1588908933351-eeb8cd4c4521?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    keys: ['hortelã', 'hortelãs', 'folha de hortelã', 'folhas de hortelã'],
  },
  {
    ...format(tangerine as unknown as FoodMyFoodData),
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
  },
  {
    ...format(kiwi as unknown as FoodMyFoodData),
    name: 'Kiwi',
    icon: '/images/food/kiwi.png',
    image:
      'https://images.unsplash.com/photo-1616684000067-36952fde56ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
    keys: ['kiwi', 'kiwis', 'groselha chinesa'],
    oneMeasures: [
      {
        quantity: 154,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...formatNacional(foodListNacional[189] as unknown as FoodNacional),
    name: 'carambola',
    icon: '/images/food/star-fruit.png',
    image:
      'https://s2.glbimg.com/oqkIn68SdYB-3esiOk0byUm9VL0=/620x455/e.glbimg.com/og/ed/f/original/2020/01/28/carambola.jpg',
    keys: ['carambola', 'carambolas'],
    oneMeasures: [
      {
        quantity: 220,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...formatNacional(foodListNacional[462] as unknown as FoodNacional),
    name: 'Queijo muçarela',
    icon: '/images/food/cheese.svg',
    image:
      'https://www.alimentosonline.com.br/fotos_artigos/6253/mussarela.jpg',
    keys: ['queijo', 'queijo muçarela', 'muçarela', 'mozarela', 'mozzarella'],
  },
  {
    ...formatNacional(foodListNacional[485] as unknown as FoodNacional),
    name: 'Clara de ovo',
    icon: '/images/food/egg.svg',
    image:
      'https://areademulher.r7.com/wp-content/uploads/2020/07/clara-de-ovo-beneficios-modo-de-usar-para-quem-e-mais-indicado.jpg',
    keys: ['clara de ovo', 'clara de ovos', 'claras de ovo', 'claras de ovos'],
    oneMeasures: [
      {
        quantity: 35,
        type: 'UNITY',
      },
    ],
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
    name: 'Noz-moscada',
    icon: '/images/food/seasoning.png',
    image:
      'https://radioaratiba.com.br/wp-content/uploads/2018/06/noz-moscada-696x462.jpg',
    keys: ['noz-moscada', 'noz moscada', 'noz-moscadas', 'noz moscadas'],
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
    ...formatNacional(foodListNacional[147] as unknown as FoodNacional),
    name: 'Rabanete',
    icon: '/images/food/radish.png',
    image:
      'http://vamoscomermelhor.com.br/wp-content/uploads/2014/07/dsc00507-2.jpg',
    keys: ['rabanete', 'rabanetes', 'rabanete vermelho', 'rabanete cru'],
    oneMeasures: [
      {
        quantity: 50,
        type: 'UNITY',
      },
    ],
  },
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
  },
  {
    ...formatNacional(foodListNacional[75] as unknown as FoodNacional),
    name: 'Aipo',
    icon: '/images/food/celery.png',
    image:
      'https://www.cervejapetra.com.br/wp-content/uploads/2017/10/Sals%C3%A3o-min-945x486.jpg',
    keys: [
      'aipo',
      'salsão',
      'salsa em ponto grande',
      'talo de aipo',
      'talo de salsão',
      'talo de salsa em ponto grande',
    ],
    oneMeasures: [
      {
        quantity: 250,
        type: 'UNITY',
      },
    ],
  },
  {
    ...formatNacional(foodListNacional[443] as unknown as FoodNacional),
    name: 'Toucinho',
    icon: '/images/food/ham.svg',
    image:
      'https://espetinhodesucesso.com.br/wp-content/uploads/2018/12/como-fazer-bacon-artesanal-1200x675.jpg',
    keys: ['toucinho', 'toucinhos', 'bacon', 'bacon em cubos'],
    unitOfMeasurement: 'gram',
  },
  ...recipesData,
  ...beansData,
];

export const foods = foodsData.map(FoodService.format);
