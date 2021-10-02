import fs from 'fs';
import path from 'path';
import { FoodMyFoodData } from './db.types';
import { UnitOfMeasurement, AMINO_ACIDS, FoodData } from '../services/food';
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
  blackBean,
  cornRecipe,
  whiteBread,
  chickenPasty,
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
} from './src';
import { VITAMINS_DATA } from '../services/vitamin/vitamin.constants';
import { MINERALS_DATA } from '../services/mineral';

function format(food: FoodMyFoodData): FoodData {
  return {
    saturedFats: food.FASAT,
    calories: food.ENERC_KCAL,
    enName: encodeURIComponent(
      food?.name1?.toLowerCase().replace(/\s/, '-') ??
        food?.name?.toLowerCase().replace(/\s/, '-') ??
        food?.name3?.toLowerCase().replace(/\s/, '-') ??
        food?.name2?.toLowerCase().replace(/\s/, '-'),
    ),
    aminoAcids: {
      alanine: food.ALA_G,
      arginine: food.ARG_G,
      asparticAcid: food.ASP_G,
      cystine: food.CYS_G,
      glutamicAcid: food.GLU_G,
      glutamine: 0,
      glycine: food.GLY_G,
      histidine: food.HISTN_G,
      isoleucine: food.ILE_G,
      leucine: food.LEU_G,
      lysine: food.LYS_G,
      methionine: food.MET_G,
      phenylalanine: food.PHE_G,
      proline: food.PRO_G,
      serine: food.SER_G,
      threonine: food.THR_G,
      tryptophan: food.TRP_G,
      tyrosine: food.TYR_G,
      valine: food.VAL_G,
    },
    carbohydrates: food.CHOCDF,
    proteins: Number(food.PROCNT),
    totalFat: Number(food.FAT),
    vitamins: {
      ...VITAMINS_DATA, // tem que tirar isso
      c: food.VITC,
      a: food.VITA_RAE, // talvez não
      betaCarotene: food.CARTB,
      alphaCarotene: food.CARTA,
      lycopene: food.LYCPN,
      k: food.VITK1,
      choline: food.CHOLN,
      b3: food.NIA,
      b12: food.VITB12,
      b2: food.RIBF,
      b6: food.VITB6A,
      d: food.VITD_IU,
    },
    minerals: {
      ...MINERALS_DATA,
      calcium: food.CA,
      iron: food.FE,
      potassium: food.K,
      magnesium: food.MG,
      phosphorus: food.P,
      manganese: food.MN,
      copper: food.CU,
      sodium: food.NA,
      zinc: food.ZN,
    },
  };
}

const foods: Array<FoodData> = [
  {
    ...format(apple as unknown as FoodMyFoodData),
    id: 1,
    name: 'Maçã Fuji',
    enName: 'apple',
    gi: 25,
    gl: 3,
    icon: '/images/food/apple.svg',
    image:
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    calories: 52,
    carbohydrates: 14,
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasures: [
      {
        quantity: 192,
        type: 'UNITY',
      },
    ],
    aminoAcids: {
      tryptophan: 1,
      threonine: 6,
      isoleucine: 6,
      leucine: 13,
      lysine: 12,
      methionine: 1,
      cystine: 1,
      phenylalanine: 6,
      tyrosine: 1,
      valine: 12,
      histidine: 5,
      arginine: 6,
      alanine: 11,
      asparticAcid: 70,
      glutamicAcid: 25,
      glycine: 9,
      proline: 6,
      serine: 10,
      glutamine: 0,
    },
  },
  {
    ...format(pear as unknown as FoodMyFoodData),
    id: 2,
    name: 'Pêra',
    enName: 'pear',
    gi: 38,
    icon: '/images/food/pear.svg',
    image:
      'https://images.unsplash.com/photo-1562051725-cc35a65c8227?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    calories: 57,
    aminoAcids: {
      tryptophan: 2,
      threonine: 11,
      isoleucine: 11,
      leucine: 19,
      lysine: 17,
      methionine: 2,
      cystine: 2,
      phenylalanine: 11,
      tyrosine: 2,
      valine: 17,
      histidine: 2,
      arginine: 10,
      alanine: 14,
      asparticAcid: 105,
      glutamicAcid: 30,
      glycine: 13,
      proline: 21,
      serine: 15,
      glutamine: 0,
    },
    unitOfMeasurement: UnitOfMeasurement.gram,
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
    enName: 'silver-banana',
    id: 3,
    gi: 39,
    gl: 8,
    icon: '/images/food/banana.svg',
    image:
      'https://images.unsplash.com/photo-1583485646409-f9feb9af2a67?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
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
    unitOfMeasurement: UnitOfMeasurement.gram,
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
    enName: 'white-rice',
    id: 4,
    gi: 81,
    gl: 18,
    carbohydrates: 32,
    icon: '/images/food/rice.svg',
    image:
      'https://images.unsplash.com/photo-1568347355280-d33fdf77d42a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80',
    calories: 130,
    unitOfMeasurement: UnitOfMeasurement.gram,
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
    ...format(blackBean as unknown as FoodMyFoodData),
    name: 'Feijão preto',
    enName: 'bean',
    id: 5,
    gi: 29,
    icon: '/images/food/bean.svg',
    image:
      'https://minhasaude.proteste.org.br//wp-content/uploads/2020/07/escolher-o-feijao-preto-970x472.jpg',
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasures: [
      {
        quantity: 172,
        type: 'CUP',
      },
    ],
    keys: ['feijão', 'feijoada'],
  },
  {
    name: 'Banana Nanica',
    enName: 'nanica-banana',
    id: 6,
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
    enName: 'mysore-banana',
    id: 7,
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
    enName: 'orange',
    id: 8,
    gi: 43,
    icon: '/images/food/orange.svg',
    image:
      'https://images.unsplash.com/photo-1549888834-3ec93abae044?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    calories: 0,
    carbohydrates: 14,
    oneMeasures: [
      {
        quantity: 248,
        type: 'CUP',
      },
    ],
    unitOfMeasurement: UnitOfMeasurement.liter,
  },
  {
    ...format(cornRecipe as unknown as FoodMyFoodData),
    name: 'Polenta',
    enName: 'corn-meal',
    id: 9,
    gi: 74,
    gl: 11,
    icon: '/images/food/polenta.svg',
    image: 'https://t2.rg.ltmcdn.com/pt/images/4/9/1/polenta_mole_194_600.jpg',
    calories: 0,
    carbohydrates: 21,
    oneMeasures: [
      {
        quantity: 233,
        type: 'CUP',
      },
    ],
    unitOfMeasurement: UnitOfMeasurement.gram,
    recipe: true,
  },
  {
    ...format(whiteBread as unknown as FoodMyFoodData),
    name: 'Pão Francês',
    enName: 'bread-roll',
    id: 10,
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
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    ...format(strawberry as unknown as FoodMyFoodData),
    name: 'Morango',
    enName: 'strawberry',
    id: 11,
    gi: 53,
    gl: 2,
    icon: '/images/food/strawberry.svg',
    image:
      'https://images.unsplash.com/photo-1591271300850-22d6784e0a7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    calories: 0,
    carbohydrates: 6,
    aminoAcids: AMINO_ACIDS,
  },
  {
    ...format(chickenPasty as unknown as FoodMyFoodData),
    id: 12,
    name: 'pastel',
    enName: 'pasty',
    icon: '/images/food/pasty.svg',
    image:
      'https://s2.glbimg.com/w5pW4yBkSibfdkhkDE-GGVYd21I=/0x0:1080x608/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2021/P/A/rfLBcEQhizbQPhwoBQew/capas-para-materias-gshow-home-2-.jpg',
    description: 'pastel de frango, frito',
    recipe: true,
  },
  {
    ...format(garlic as unknown as FoodMyFoodData),
    id: 13,
    name: 'alho',
    enName: 'garlic',
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
    id: 14,
    enName: 'lettuce',
    name: 'alface',
    gi: 0,
    icon: '/images/food/lettuce.svg',
    image:
      'https://images.unsplash.com/photo-1622205313162-be1d5712a43f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80',
    description: 'Alface, roxa, crua',
    aminoAcids: {
      tryptophan: 0,
      threonine: 30,
      isoleucine: 30,
      leucine: 60,
      lysine: 50,
      methionine: 10,
      cystine: 0,
      phenylalanine: 40,
      tyrosine: 40,
      valine: 40,
      arginine: 60,
      histidine: 20,
      alanine: 50,
      asparticAcid: 50,
      glutamicAcid: 110,
      glycine: 40,
      proline: 30,
      serine: 30,
      glutamine: 0,
    },
  },
  {
    ...format(ham),
    id: 15,
    name: 'Presunto',
    enName: 'ham',
    gi: 0,
    icon: '/images/food/ham.svg',
    image:
      'https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'Presunto, sem capa de gordura',
    keys: [],
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasures: [
      {
        quantity: 30,
        type: 'SLICE',
      },
    ],
  },
  {
    ...format(pineapple),
    id: 16,
    name: 'Abacaxi',
    enName: 'pineapple',
    gi: 59,
    unitOfMeasurement: UnitOfMeasurement.gram,
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
    id: 17,
    enName: 'carrot',
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
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    ...format(avocado as unknown as FoodMyFoodData),
    id: 18,
    name: 'Abacate',
    enName: 'avocado',
    gi: 15,
    icon: '/images/food/avocado.svg',
    image:
      'https://images.unsplash.com/photo-1612215047504-a6c07dbe4f7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasures: [
      {
        quantity: 201,
        type: 'UNITY',
      },
    ],
    keys: ['avocado'],
  },
  {
    ...format(oat),
    id: 19,
    name: 'Aveia',
    enName: 'oat',
    icon: '/images/food/oats.svg',
    image:
      'https://images.unsplash.com/photo-1586810512929-6b8659fde098?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    oneMeasures: [
      {
        quantity: 234,
        type: 'CUP',
      },
    ],
    unitOfMeasurement: UnitOfMeasurement.gram,
    keys: ['aveia em flocos', 'flocos de aveia'],
  },
  {
    ...format(coconutData),
    id: 20,
    name: 'Coco ralado',
    gi: 42,
    enName: 'coconut',
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
    unitOfMeasurement: UnitOfMeasurement.gram,
    keys: ['coco', 'côco', 'cocos', 'côcos'],
  },
  {
    ...format(eggData),
    id: 21,
    name: 'Ovo',
    enName: 'egg',
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
    unitOfMeasurement: UnitOfMeasurement.gram,
    keys: ['ovos'],
  },
  {
    ...format(chickenData),
    id: 22,
    gi: 0,
    name: 'Frango',
    enName: 'chicken',
    icon: '/images/food/chicken.svg',
    image:
      'https://images.unsplash.com/photo-1606728035253-49e8a23146de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    unitOfMeasurement: UnitOfMeasurement.gram,
    keys: ['galinha', 'peito de frango', 'coxa de frango'],
    oneMeasures: [
      {
        quantity: 400,
        type: 'BREAST',
      },
    ],
  },
  {
    ...format(oliveOilData),
    id: 23,
    name: 'Azeite de oliva',
    gi: 0,
    enName: 'olive-oil',
    icon: '/images/food/olive-oil.svg',
    image:
      'https://veja.abril.com.br/wp-content/uploads/2017/06/azeite-023.jpg?quality=70&strip=info&resize=680,453',
    unitOfMeasurement: UnitOfMeasurement.liter,
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
    ...format(sugarData),
    id: 24,
    name: 'Açúcar branco',
    enName: 'sugar',
    gi: 92,
    icon: '/images/food/sugar.svg',
    image:
      'https://images.unsplash.com/photo-1558467516-f427f3ea3c33?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80',
    unitOfMeasurement: UnitOfMeasurement.gram,
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
    id: 25,
    name: 'Farinha de trigo',
    enName: 'wheat-flour',
    gi: 85,
    icon: '/images/food/wheat-flour.svg',
    image:
      'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1062&q=80',
    unitOfMeasurement: UnitOfMeasurement.gram,
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
    ...format(sugarData), // TODO: precisa diferenciar do açúcar branco
    id: 26,
    name: 'Açúcar mascavo',
    enName: 'brown-sugar',
    gi: 80,
    icon: '/images/food/sugar.svg', // TODO: precisa diferenciar do açúcar branco
    image: 'https://superbeal.com.br/img/news/site_5d653235ca208.png',
    unitOfMeasurement: UnitOfMeasurement.gram,
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
    id: 27,
    name: 'Bolo de cenoura',
    enName: 'carrot-cake',
    gi: 67,
    icon: '/images/food/carrot-cake.svg',
    image:
      'https://d1uz88p17r663j.cloudfront.net/original/2b76e99abc4136ccf26008c1c387023f_Bolo-de-cenoura-com-cobertura-de-brigadeiro-receitas-nestle.jpg',
    unitOfMeasurement: UnitOfMeasurement.gram,
    recipe: true,
  },
  {
    ...format(salt as unknown as FoodMyFoodData),
    id: 28,
    name: 'Sal',
    enName: 'salt',
    icon: '/images/food/salt.svg',
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    ...format(boiledPotato as unknown as FoodMyFoodData),
    id: 29,
    name: 'Batata',
    enName: 'potato',
    description: 'batata inglesa cozida',
    icon: '/images/food/potato.svg',
    image:
      'https://images.unsplash.com/photo-1563012678-bdfec255931b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    unitOfMeasurement: UnitOfMeasurement.gram,
    keys: ['batatinha', 'batata inglesa'],
  },
  {
    ...format(onion),
    id: 30,
    name: 'Cebola',
    enName: 'onion',
    icon: '/images/food/onion.svg',
    image:
      'https://images.unsplash.com/photo-1560087706-04151ac8da26?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    unitOfMeasurement: UnitOfMeasurement.gram,
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
    id: 31,
    name: 'Pimenta',
    enName: 'pepper',
    icon: '/images/food/pepper.svg',
    image:
      'https://images.unsplash.com/photo-1526179969422-e92255a5f223?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    ...format(corn),
    id: 32,
    name: 'Milho',
    enName: 'corn',
    icon: '/images/food/corn.svg',
    image:
      'https://images.unsplash.com/photo-1601171908052-92d5a595199b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1146&q=80',
    unitOfMeasurement: UnitOfMeasurement.gram,
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
    id: 33,
    name: 'Molho de tomate',
    enName: 'tomato-sauce',
    icon: '/images/food/tomato-sauce.svg',
    image:
      'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: UnitOfMeasurement.liter,
    oneMeasures: [
      {
        quantity: 350,
        type: 'CAN',
      },
    ],
  },
  {
    ...format(peanutButterSmooth as unknown as FoodMyFoodData),
    id: 34,
    name: 'Manteiga de amendoim',
    enName: 'peanut-butter',
    icon: '/images/food/peanut-butter.svg',
    image:
      'https://images.unsplash.com/flagged/photo-1625402535207-953e03369f59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: UnitOfMeasurement.liter,
  },
  {
    ...format(margarine as unknown as FoodMyFoodData),
    id: 35,
    name: 'Margarina',
    enName: 'margarine',
    icon: '/images/food/margarine.svg',
    image:
      'https://www.saudevitalidade.com/wp-content/uploads/2021/02/pao-com-margarina-cafe-da-manha-1571859727604_v2_1920x1146-800x445.jpg',
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    ...format(creamCheese as unknown as FoodMyFoodData),
    id: 36,
    name: 'Requeijão',
    enName: 'cream-cheese',
    icon: '/images/food/cream-cheese.svg',
    image:
      'https://images.unsplash.com/photo-1547920303-9befbe3decc7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80',
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    ...format(milk as unknown as FoodMyFoodData),
    id: 37,
    name: 'Leite',
    enName: 'milk',
    icon: '/images/food/milk.svg',
    image:
      'https://images.unsplash.com/photo-1608634960479-c70cf0c3dece?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    unitOfMeasurement: UnitOfMeasurement.liter,
  },
  {
    id: 38,
    name: 'Fermento',
    enName: 'yeast',
    icon: '/images/food/yeast.svg',
    image:
      'https://static1.casapraticaqualita.com.br/articles/0/21/30/@/2427-fermento-biologico-fresco-conhecido-com-article_content_img-3.jpg',
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    ...format(soybeanOil as unknown as FoodMyFoodData),
    id: 39,
    name: 'Óleo de soja',
    enName: 'soy-oil',
    icon: '/images/food/oil.svg',
    image:
      'https://img.ibxk.com.br/2020/01/22/22215352968302.jpg?w=1120&h=420&mode=crop&scale=both',
    unitOfMeasurement: UnitOfMeasurement.liter,
    keys: ['óleo'],
  },
  {
    ...format(butter as unknown as FoodMyFoodData),
    id: 40,
    name: 'Manteiga',
    enName: 'butter',
    icon: '/images/food/butter.svg',
    image:
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    ...format(wheatBread as unknown as FoodMyFoodData),
    id: 41,
    name: 'Pão caseiro',
    enName: 'homebread',
    icon: '/images/food/bread.svg',
    image:
      'https://images.unsplash.com/photo-1537200275355-4f0c0714f777?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: UnitOfMeasurement.gram,
    keys: ['pão', 'pãozinho', 'pão integral'],
  },
  {
    id: 42,
    name: 'Cuca',
    icon: '/images/food/bread.svg',
    image: 'https://cdn.panelinha.com.br/receita/1550859492306-cuca-banana.jpg',
    enName: 'crumb-cake',
    unitOfMeasurement: UnitOfMeasurement.gram,
    recipe: true,
  },
  {
    ...format(orangeJuice as unknown as FoodMyFoodData),
    id: 43,
    icon: '/images/food/orange-juice.svg',
    image:
      'https://images.unsplash.com/photo-1614065612682-10dbc3db2b31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=657&q=80',
    name: 'Suco de Laranja',
    enName: 'orange-juice',
    gi: 50,
    gl: 6,
    version: 'JUICE',
    rawId: 8,
  },
  {
    ...format(carrot as unknown as FoodMyFoodData),
    id: 44,
    icon: '/images/food/carrot.svg',
    image:
      'https://images.unsplash.com/photo-1556909172-89cf0b24ff02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80',
    name: 'Cenoura cozida',
    enName: 'boiled-carrot',
    gi: 38,
    version: 'BOILED',
    rawId: 17,
  },
  {
    ...format(oatFlour as unknown as FoodMyFoodData),
    id: 45,
    icon: '/images/food/oat-flour.svg',
    image:
      'https://cdn.awsli.com.br/600x450/757/757669/produto/41919778/2bbdd6f3f5.jpg',
    name: 'Farinha de aveia',
    enName: 'oat-flour',
    keys: ['farelo de aveia'],
    gi: 72,
    version: 'FLOUR',
    rawId: 19,
  },
  {
    ...format(cornFlour as unknown as FoodMyFoodData),
    id: 46,
    name: 'Fubá',
    icon: '/images/food/corn-flour.svg',
    image:
      'https://caldobom.com.br/uploads/2018/12/diferenca-entre-fuba-e-farinha-de-milho.jpg',
    enName: 'cornflour',
    keys: ['farinha de milho'],
    version: 'FLOUR',
    rawId: 32,
  },
  {
    id: 47,
    name: 'Amido de milho',
    icon: '/images/food/corn-flour.svg',
    image:
      'https://images.armazemcerealista.com.br/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/a/m/amido-de-milho---100g.jpg',
    enName: 'maize-starch',
    keys: ['maizena'],
    version: 'REFINED_FLOUR',
    rawId: 32,
  },
  {
    ...format(tomato as unknown as FoodMyFoodData),
    id: 48,
    name: 'Tomate',
    enName: 'tomato',
    icon: '/images/food/tomato.svg',
    image:
      'https://images.unsplash.com/photo-1561155713-50f2a38fde2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: UnitOfMeasurement.gram,
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
    id: 49,
    name: 'Queijo Edam',
    enName: 'cheese',
    icon: '/images/food/cheese.svg',
    image:
      'https://heavenly-holland.com/wp-content/uploads/2017/05/cheese10-768x512.jpg',
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasures: [
      {
        quantity: 30,
        type: 'SLICE',
      },
    ],
    keys: ['queijo'],
  },
  {
    id: 50,
    name: 'Sanduíche',
    enName: 'sandwich',
    icon: '/images/food/sandwich.svg',
    image:
      'https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=625&q=80',
    recipe: true,
  },
  {
    ...format(ham),
    id: 51,
    name: 'Peito de peru defumado',
    enName: 'ham',
    icon: '/images/food/ham.svg',
    image:
      'https://i2.wp.com/files.agro20.com.br/uploads/2019/11/Peito-de-peru-1.jpg?resize=600%2C338&ssl=1',
    unitOfMeasurement: UnitOfMeasurement.gram,
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
    id: 52,
    name: 'Água',
    enName: 'water',
    icon: '/images/food/water.svg',
    image:
      'https://images.unsplash.com/photo-1612392549274-9afb280ce7a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    unitOfMeasurement: UnitOfMeasurement.liter,
    oneMeasures: [
      {
        quantity: 240,
        type: 'CUP',
      },
    ],
  },
  {
    ...format(parsley as unknown as FoodMyFoodData),
    id: 53,
    name: 'Salsa',
    enName: 'parsley',
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
    ...format(beef as unknown as FoodMyFoodData),
    id: 54,
    name: 'Carne bovina',
    enName: 'beef',
    icon: '/images/food/beef.svg',
    image:
      'https://images.unsplash.com/photo-1588347785102-2944ba63d0c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    keys: ['carne', 'carne de gado', 'carne moída', 'bife'],
  },
  {
    id: 55,
    name: 'Galinhada',
    enName: 'chicken-risotto',
    icon: '/images/food/rice.svg',
    image:
      'https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=731&q=80',
    keys: ['risoto de frango', 'arroz com galinha', 'arroz com frango'],
    recipe: true,
  },
  {
    ...format(cassava as unknown as FoodMyFoodData),
    id: 56,
    name: 'Aipim',
    enName: 'cassava',
    icon: '/images/food/cassava.png',
    image:
      'https://a-static.mlcdn.com.br/618x463/aipim/fruitexpress/1878daaecaf611eb86614201ac18500e/a80c447bae57a657277ef1e2516cb498.jpg',
    keys: ['mandioca', 'macacheira', 'cassava'],
  },
  {
    id: 57,
    name: 'Estrogonofe de Carne',
    enName: 'beef-stroganoff',
    icon: '/images/food/stroganoff.png',
    image:
      'https://piracanjuba.com.br/content/receitas/cont/0000000056/rec056_1910.jpg',
    keys: ['strogonofe', 'estrogonofe'],
    recipe: true,
  },
  {
    id: 58,
    name: 'Estrogonofe de Frango',
    enName: 'chicken-stroganoff',
    icon: '/images/food/stroganoff.png',
    image:
      'https://img.cybercook.com.br/imagens/receitas/644/strogonoff-de-frango-1-840x480.jpg?q=75',
    keys: ['strogonofe', 'estrogonofe'],
    recipe: true,
  },
  {
    ...format(coriander as unknown as FoodMyFoodData),
    id: 59,
    name: 'Coentro',
    enName: 'coriander',
    keys: ['coentro'],
    icon: '/images/food/coriander.png',
    image:
      'https://s2.glbimg.com/2uv6Zz8Fr8j89rvJC1mZl8wGPdo=/smart/e.glbimg.com/og/ed/f/original/2020/10/27/coriandrum-sativum-coentro-aespeciarista-.jpg',
  },
  {
    ...format(lemon as unknown as FoodMyFoodData),
    id: 60,
    name: 'Limão',
    enName: 'lemon',
    keys: ['limão', 'limões'],
    icon: '/images/food/lemon.png',
    image:
      'https://minhasaude.proteste.org.br/wp-content/uploads/2020/10/lim%C3%B5es-970x472.jpg',
  },
  {
    ...format(blackPepper as unknown as FoodMyFoodData),
    id: 61,
    name: 'Pimenta do Reino',
    enName: 'black-pepper',
    icon: '/images/food/black-pepper.png',
    image:
      'http://premiertemperos.com.br/novo/wp-content/uploads/2020/04/1706-1-1200x675.jpg',
    keys: ['pimenta do reino', 'pimenta preta', 'pimenta'],
  },
  {
    id: 62,
    name: 'Guacamole',
    enName: 'guacamole',
    icon: '/images/food/guacamole.png',
    image: 'https://cdn.panelinha.com.br/receita/1513697612821-guacamole.jpg',
    recipe: true,
    keys: ['guacamole'],
  },
  {
    id: 63,
    name: 'Molho de Limão e Mel para Salada',
    enName: 'lemon-and-honey-salad-dressing',
    icon: '/images/food/sauce.png',
    image:
      'https://cdn.panelinha.com.br/receita/1619447331360-molho%2011.07.16.jpg',
    recipe: true,
    keys: [
      'molho de limão e mel para salada',
      'molho de salada',
      'molho para salada',
      'molho pra   salada',
      'molho de limão',
      'molho de mel',
    ],
  },
  {
    id: 64,
    name: 'Mel',
    enName: 'honey',
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
    id: 65,
    name: 'Pão de Batata Doce',
    enName: 'sweet-potato-bread',
    icon: '/images/food/bread.png',
    image:
      'https://cdn.panelinha.com.br/receita/1544639354405-pa%CC%83o%20de%20batata-doce%20para%20trocar.jpg',
    keys: [
      'pão de batata doce',
      'bolinho de batata',
      'bolinho de batata doce',
      'bolinho de batata-doce',
      'pão de batata-doce',
    ],
    recipe: true,
  },
  {
    ...format(sweetPotato as unknown as FoodMyFoodData),
    id: 66,
    name: 'Batata Doce',
    enName: 'sweet-potato',
    icon: '/images/food/sweet-potato.png',
    image:
      'https://images.unsplash.com/photo-1584699006710-3ad3b82fce7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    keys: ['batata doce', 'batata-doce', 'batata doce cozida'],
  },
  {
    id: 67,
    name: 'Sopa de Couve-flor',
    enName: 'cauliflower-soup',
    recipe: true,
    icon: '/images/food/soup.svg',
    image:
      'https://cdn.panelinha.com.br/receita/1468292400000-Sopa-de-couve-flor-com-farofinha-de-pao.jpg',
    keys: ['sopa de couve-flor', 'sopa de couve flor'],
  },
  {
    ...format(cauliflower as unknown as FoodMyFoodData),
    id: 68,
    name: 'Couve-flor',
    enName: 'cauliflower',
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
  },
  {
    id: 69,
    name: 'Folha de Louro',
    enName: 'bay-leaf',
    icon: '/images/food/leaf.png',
    image:
      'https://images.unsplash.com/photo-1612549225312-900aa64d56bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    keys: ['folha de louro', 'folhas de louro', 'louro'],
  },
  {
    id: 70,
    name: 'Caldo de Legumes',
    enName: 'vegetable-broth',
    image:
      'https://cdn.panelinha.com.br/receita/1339470000000-Caldo-caseiro-de-legumes.jpg',
    keys: ['caldo de legume', 'caldo de legumes'],
    recipe: true,
  },
  {
    ...format(grape as unknown as FoodMyFoodData),
    id: 71,
    name: 'Uva',
    enName: 'grape',
    icon: '/images/food/grape.png',
    image:
      'https://images.unsplash.com/photo-1525286102393-8bf945cd0649?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2074&q=80',
    keys: ['uva'],
  },
  {
    ...format(cocoa as unknown as FoodMyFoodData),
    id: 72,
    name: 'Cacau',
    enName: 'cocoa',
    icon: '/images/food/cocoa.png',
    image:
      'https://images.unsplash.com/photo-1578269830911-6159f1aee3b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80',
    keys: ['cacau'],
  },
  {
    ...format(chocolateDark45at59 as unknown as FoodMyFoodData),
    id: 73,
    name: 'Chocolate preto 45 - 59%',
    enName: 'chocolate-dark-45-59',
    icon: '/images/food/chocolate.png',
    image:
      'https://media.istockphoto.com/photos/dark-chocolate-bar-on-rustic-wood-table-picture-id463813283?b=1&k=20&m=463813283&s=170667a&w=0&h=x-SXgRiiAkH-ilp7dZPZUQWdq0V7-4jwDf4BK8PRd0M=',
    keys: ['chocolate', 'achocolatado', 'chocolate em pó'],
  },
  {
    ...format(thyme as unknown as FoodMyFoodData),
    id: 74,
    name: 'Tomilho',
    enName: 'thyme',
    icon: '/images/food/thyme.png',
    image:
      'https://images.unsplash.com/photo-1606072104299-cdaab62c0a07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    keys: ['tomilho', 'ramo de tomilho', 'ramos de tomilho'],
  },
  {
    ...format(rosemary as unknown as FoodMyFoodData),
    id: 75,
    name: 'Alecrim',
    enName: 'rosemary',
    icon: '/images/food/rosemary.png',
    image:
      'https://images.unsplash.com/photo-1603129624917-3c579e864025?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    keys: ['alecrim', 'ramo de alecrim', 'ramos de alecrim'],
  },
  {
    ...format(beetroot as unknown as FoodMyFoodData),
    id: 76,
    name: 'Beterraba',
    enName: 'beetroot',
    icon: '/images/food/beetroot.png',
    image:
      'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    keys: ['beterraba', 'beterraba crua'],
  },
  {
    ...format(nut as unknown as FoodMyFoodData),
    id: 77,
    name: 'Noz',
    enName: 'nut',
    icon: '/images/food/walnut.png',
    image:
      'https://images.unsplash.com/photo-1524593656068-fbac72624bb0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    keys: ['noz', 'nozes'],
  },
];

fs.writeFileSync(
  path.resolve(__dirname, 'food.json'),
  JSON.stringify({ foods }),
);
