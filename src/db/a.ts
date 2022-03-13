import { FoodMyFoodData, FoodNacional } from './db.types';
import { FoodData } from '../services/food';
import { formatMyFood, formatNacional } from './utils';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import {
  zucchini,
  olive,
  cassava,
  peanut,
  brownSugar,
  rosemary,
  greenLeafLettuce,
  whiteRice,
  garlic,
  oat,
  pineapple,
  avocado,
  sugar as sugarData,
  oliveOil as oliveOilData,
  water,
  coconutWater,
} from './src';

export const aFoodData: Array<FoodData> = [
  {
    ...formatMyFood(avocado as unknown as FoodMyFoodData),
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
    ...formatMyFood(pineapple as unknown as FoodMyFoodData),
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
    ...formatMyFood(zucchini as unknown as FoodMyFoodData),
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
    ...formatMyFood(sugarData as unknown as FoodMyFoodData),
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
    ...formatMyFood(brownSugar as unknown as FoodMyFoodData), // TODO: precisa diferenciar do açúcar branco
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
    ...formatMyFood(water as unknown as FoodMyFoodData),
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
    ...formatMyFood(coconutWater as unknown as FoodMyFoodData),
    name: 'Água de coco',
    icon: '/images/food/coconut-water.png',
    image:
      'https://media.istockphoto.com/photos/coconut-drink-with-pulp-in-glass-on-wooden-table-picture-id526133774?b=1&k=20&m=526133774&s=170667a&w=0&h=0OifDfpyMrzYuy2fy-D-FRlucUJx2IjXJGK47vk4X7s=',
    keys: ['coco', 'agua de coco', 'água de coco'],
  },
  {
    ...formatMyFood(cassava as unknown as FoodMyFoodData),
    name: 'Aipim',
    icon: '/images/food/cassava.png',
    image:
      'https://a-static.mlcdn.com.br/618x463/aipim/fruitexpress/1878daaecaf611eb86614201ac18500e/a80c447bae57a657277ef1e2516cb498.jpg',
    keys: ['mandioca', 'macacheira', 'cassava'],
  },
  {
    ...formatMyFood(rosemary as unknown as FoodMyFoodData),
    name: 'Alecrim',
    icon: '/images/food/rosemary.png',
    image:
      'https://images.unsplash.com/photo-1603129624917-3c579e864025?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    keys: ['alecrim', 'ramo de alecrim', 'ramos de alecrim'],
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
    ...formatMyFood(greenLeafLettuce as unknown as FoodMyFoodData),
    name: 'alface',
    gi: 0,
    icon: '/images/food/lettuce.svg',
    image:
      'https://images.unsplash.com/photo-1622205313162-be1d5712a43f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80',
    description: 'Alface, roxa, crua',
  },
  {
    ...formatMyFood(garlic as unknown as FoodMyFoodData),
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
    ...formatNacional(foodListNacional[586] as unknown as FoodNacional), // TODO: Verificar
    name: 'Amêndoa',
    icon: '/images/food/almond.png',
    image:
      'https://d3ugyf2ht6aenh.cloudfront.net/stores/798/671/products/amendoa-crua-111-74c26a793b14e338cb15407454214424-1024-1024.jpg',
    keys: ['amêndoa', 'amêndoas', 'amêndoa com pele', 'amêndoas com pele'],
    unitOfMeasurement: 'gram',
  },
  {
    ...formatNacional(foodListNacional[586] as unknown as FoodNacional),
    name: 'Amêndoa torrada e salgada',
    icon: '/images/food/almond.png',
    image:
      'https://d3ugyf2ht6aenh.cloudfront.net/stores/798/671/products/amendoa-crua-111-74c26a793b14e338cb15407454214424-1024-1024.jpg',
    keys: [
      'amêndoa torrada',
      'amêndoas torradas',
      'amêndoa salgada',
      'amêndoas salgadas',
      'amêndoa torrada e salgada',
      'amêndoas torrada e salgada',
    ],
    unitOfMeasurement: 'gram',
  },
  {
    ...formatMyFood(peanut as unknown as FoodMyFoodData),
    name: 'Amendoim',
    icon: '/images/food/peanut.png',
    image:
      'https://images.unsplash.com/photo-1604267437800-d89485144366?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1888&q=80',
    keys: ['amendoim', 'amendoins'],
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
    ...formatMyFood(whiteRice as unknown as FoodMyFoodData),
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
    ...formatMyFood(oat as unknown as FoodMyFoodData),
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
    ...formatMyFood(oliveOilData as unknown as FoodMyFoodData),
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
    ...formatMyFood(olive as unknown as FoodMyFoodData),
    name: 'Azeitona',
    icon: '/images/food/olive.png',
    image:
      'https://images.unsplash.com/photo-1582042043408-de36ded9059b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    keys: ['azeitona', 'oliva', 'azeitonas'],
  },
];
