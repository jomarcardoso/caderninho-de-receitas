import mergeWith from 'lodash/mergeWith';
import { FoodMyFoodData, FoodNacional } from './db.types';
import type { FoodData } from '../services/food';
import { formatMyFood, formatNacional, verifyQuantity } from './utils';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import {
  coconut as coconutData,
  carrot,
  coffee,
  beef,
  chocolateDark45at59,
  cocoa,
  coriander,
  cauliflower,
  cinnamon,
  clove,
  chive,
  curry,
  chayote,
  onion,
} from './src';

export const CINNAMON: FoodData = {
  ...formatMyFood(cinnamon as unknown as FoodMyFoodData),
  name: 'Canela',
  icon: '/images/food/cinnamon.png',
  image:
    'https://images.unsplash.com/photo-1611256243212-48a03787ea01?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1177&q=80',
  keys: ['canela', 'casca de canela', 'canela em pó', 'canela em casca'],
  type: 'powder',
};

export const CARROT: FoodData = {
  ...formatMyFood(carrot as unknown as FoodMyFoodData),
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
  type: 'root',
};

export const cFoodData: Array<FoodData> = [
  {
    ...formatMyFood(cocoa as unknown as FoodMyFoodData),
    name: 'Cacau em pó',
    icon: '/images/food/cocoa.png',
    image:
      'https://images.unsplash.com/photo-1578269830911-6159f1aee3b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80',
    keys: ['cacau', 'cacau em pó'],
    type: 'powder',
  },
  {
    ...formatNacional(foodListNacional[473] as unknown as FoodNacional),
    name: 'Cachaça',
    icon: '/images/food/liquor.png',
    image:
      'https://www.cachacariadosamigos.com.br/smart/modulos/blog/imagens/grande/quais-sao-as-caracteristicas-de-uma-cachaca-boa_60-45.jpg',
    keys: ['cachaça', 'aguardente', 'cachaça de cana', 'aguardente de cana'],
    type: 'liquid',
  },
  {
    ...mergeWith(
      formatNacional(foodListNacional[472] as unknown as FoodNacional),
      formatMyFood(coffee as unknown as FoodMyFoodData),
      verifyQuantity,
    ),
    name: 'Café passado',
    description: 'Café infusão 10%.',
    icon: '/images/food/coffee.png',
    image:
      'https://loucodocafe.com.br/wp-content/uploads/2019/09/como-coar-cafe-02-e1568171389779-1280x720.jpg',
    keys: [
      'café',
      'café passado',
      'café de infusão',
      'café de infusão 10%',
      'café infusão',
    ],
    type: 'powder',
  },
  {
    ...formatMyFood(coffee as unknown as FoodMyFoodData),
    name: 'Café moído',
    icon: '/images/food/coffee.png',
    image:
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=871&q=80',
    keys: ['grão de café', 'grãos de café', 'café moído'],
    type: 'powder',
  },
  {
    ...formatNacional(foodListNacional[474] as unknown as FoodNacional),
    name: 'Caldo de cana',
    icon: '/images/food/lemon-juice.png',
    image:
      'https://comeraprender.com.br/wp-content/uploads/2019/07/shutterstock_348902039-1-1200x675.jpg',
    keys: ['caldo de cana'],
    type: 'liquid',
  },
  {
    name: 'Caldo de Legumes',
    image:
      'https://cdn.panelinha.com.br/receita/1339470000000-Caldo-caseiro-de-legumes.jpg',
    keys: ['caldo de legume', 'caldo de legumes'],
  },
  CINNAMON,
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
    type: 'fruit',
  },
  {
    name: 'Cardamomo',
    description:
      'O cardamomo é uma especiaria bastante versátil, podendo ser usado na forma natural em chás, como substituto do alho no refogado do arroz ou adicionado em doces como pudins e geleias. Também pode-se aromatizar pães, colocar no molho da carne e saladas de frutas, por exemplo.',
    icon: '/images/food/cardamom.png',
    image:
      'https://a-static.mlcdn.com.br/618x463/cardamomo-verdadeiro-ou-cardamomo-verde-jardim-exotico/jardimexotico/4499408033/715cda1e07338ac245ed33643f8fc305.jpg',
    keys: ['cardamomo', 'cardamomos', 'baga de cardamomo'],
    type: 'seed',
  },
  {
    ...formatMyFood(curry as unknown as FoodMyFoodData),
    name: 'Caril',
    description:
      'O caril ou curry é um nome dado a determinados pratos, cuja principal caraterística é ter um molho cozinhado com especiarias e outros ingredientes típicos da cozinha da Índia, da Tailândia e de outros países asiáticos.',
    icon: '/images/food/curry.png',
    image:
      'https://media.istockphoto.com/photos/curry-powder-on-a-wooden-spoon-and-in-a-wooden-bowl-picture-id1271918149?b=1&k=20&m=1271918149&s=170667a&w=0&h=ICQNG-IxiJ-ExTpYkn87rW5qhN8Cu5tVHEwVnAsGZSs=',
    keys: ['caril', 'curry'],
    type: 'liquid',
  },
  {
    ...mergeWith(
      formatNacional(foodListNacional[178] as unknown as FoodNacional),
      formatMyFood(beef as unknown as FoodMyFoodData),
      verifyQuantity,
    ),
    name: 'Carne bovina',
    icon: '/images/food/beef.svg',
    image:
      'https://images.unsplash.com/photo-1588347785102-2944ba63d0c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    keys: ['carne', 'carne de gado', 'carne moída', 'bife', 'acém'],
    type: 'meat',
  },
  {
    ...formatNacional(foodListNacional[588] as unknown as FoodNacional),
    name: 'Castanha-do-pará',
    icon: '/images/food/brazil-nut.png',
    image:
      'https://www.sistersintravel.com/wp-content/uploads/2015/12/sisters-in-travel-curiosidade-castanha-do-par%C3%A1-720x485.jpg',
    keys: ['castanha', 'castanha do pará'],
    type: 'seed',
  },
  {
    ...formatMyFood(onion as unknown as FoodMyFoodData),
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
    type: 'vegetable',
    keys: [
      'cebola palito',
      'cebolas palito',
      'cebolete',
      'cebola para conserva',
      'cebolas para conserva',
    ],
  },
  {
    ...formatMyFood(chive as unknown as FoodMyFoodData),
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
    type: 'herb',
  },
  {
    name: 'Cebolas em conserva',
    image:
      'https://www.sumerbol.com.br/uploads/images/2017/11/cebola-em-conserva-576-1510594360.jpg',
    keys: ['cebola em conserva'],
    recipe: true,
  },
  CARROT,
  {
    ...formatMyFood(carrot as unknown as FoodMyFoodData),
    name: 'Cenoura cozida',
    icon: '/images/food/carrot.svg',
    image:
      'https://images.unsplash.com/photo-1556909172-89cf0b24ff02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80',
    gi: 38,
    version: 'BOILED',
    oneMeasures: [
      {
        quantity: 130,
        type: 'UNITY',
      },
    ],
    unitOfMeasurement: 'gram',
    type: 'root',
  },
  {
    ...formatNacional(foodListNacional[475] as unknown as FoodNacional),
    name: 'Cerveja pilsen',
    icon: '/images/food/beer.svg',
    image:
      'https://blog.todovino.com.br/wp-content/uploads/2020/01/cerveja-pilsen1.jpg',
    keys: ['cerveja'],
    type: 'liquid',
  },
  {
    ...formatNacional(foodListNacional[476] as unknown as FoodNacional),
    name: 'Chá de erva-doce',
    description: 'Chá de erva-doce(Pimpinella anisum), infusão 5%',
    icon: '/images/food/anise.png',
    image:
      'https://diariodonordeste.verdesmares.com.br/image/contentid/policy:7.4537296:1625738451/erva-doce%201.jpeg?f=default&$p$f=bacd656',
    keys: [
      'chá de erva-doce',
      'erva-doce',
      'erva doce',
      'anis-verde',
      'anis verde',
      'pimpinela-branca',
      'pimpinela branca',
    ],
    type: 'liquid',
  },
  {
    name: 'Chapati',
    description:
      'Também conhecido como pão ázimo, pãozinho indiano ou pão sírio',
    image: 'https://cdn.panelinha.com.br/receita/1594316806337-chapati1.jpg',
    keys: [
      'chapati',
      'pão ázimo',
      'pão azimo',
      'pão sírio',
      'pão indiano',
      'pãozinho indiano',
      'pãozinho sírio',
    ],
  },
  {
    ...formatMyFood(chocolateDark45at59 as unknown as FoodMyFoodData),
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
    type: 'solid',
  },
  {
    ...formatMyFood(chayote as unknown as FoodMyFoodData),
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
    type: 'fruit',
  },
  {
    name: 'Churrasco',
    image:
      'https://img.itdg.com.br/tdg/images/blog/uploads/2021/08/Churrasco-barato.jpg',
    keys: ['churrasco', 'churrasco de carne'],
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
    type: 'liquid',
  },
  {
    name: 'Coalhada fresca',
    image:
      'https://img.cybercook.com.br/imagens/receitas/190/coalhada-seca.jpg',
    keys: ['coalhada', 'coalhada fresca'],
  },
  {
    name: 'Coalhada seca',
    image:
      'https://img.cybercook.com.br/imagens/receitas/190/coalhada-seca.jpg',
    keys: ['coalhada seca'],
  },
  {
    ...formatMyFood(coconutData as unknown as FoodMyFoodData),
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
    type: 'flake',
  },
  {
    ...formatMyFood(coriander as unknown as FoodMyFoodData),
    name: 'Coentro',
    keys: ['coentro'],
    icon: '/images/food/coriander.png',
    image:
      'https://s2.glbimg.com/2uv6Zz8Fr8j89rvJC1mZl8wGPdo=/smart/e.glbimg.com/og/ed/f/original/2020/10/27/coriandrum-sativum-coentro-aespeciarista-.jpg',
    type: 'herb',
  },
  {
    ...formatMyFood(cauliflower as unknown as FoodMyFoodData),
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
    type: 'legumen',
  },
  {
    ...formatMyFood(clove as unknown as FoodMyFoodData),
    name: 'Cravo da índia',
    icon: '/images/food/clove.png',
    image:
      'https://images.unsplash.com/photo-1626609940603-1fc7556a94ef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    keys: ['cravo', 'cravos', 'cravos da índia', 'cravo-da-índia'],
    type: 'herb',
  },
  {
    name: 'Cuca',
    icon: '/images/food/bread.svg',
    image: 'https://cdn.panelinha.com.br/receita/1550859492306-cuca-banana.jpg',
    unitOfMeasurement: 'gram',
  },
];
