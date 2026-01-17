import mergeWith from 'lodash/mergeWith';
import { FoodMyFoodData, FoodNacional } from './db.types';
import type { FoodData } from '../services/food';
import { formatMyFood, formatNacional, verifyQuantity } from './utils';
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
  cornRecipe,
  chickenPasty,
} from './src';

export const SWEET_POTATO_BREAD: FoodData = {
  name: 'Pão de Batata Doce',
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
};

export const BREAD: FoodData = {
  ...formatMyFood(wheatBread as unknown as FoodMyFoodData),
  name: 'Pão caseiro',
  icon: '/images/food/bread.svg',
  image:
    'https://images.unsplash.com/photo-1537200275355-4f0c0714f777?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  unitOfMeasurement: 'gram',
  keys: ['pão', 'pãozinho', 'pão integral'],
  type: 'cake',
  recipe: true,
};

export const pFoodData: Array<FoodData> = [
  BREAD,
  SWEET_POTATO_BREAD,
  {
    name: 'Pão de Ló',
    image:
      'https://s2.glbimg.com/WoMudBfzWeMl0GzSwccmbkAOiW4=/0x0:5472x3648/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2021/8/N/inlAOzTDKABlgDpAoqlg/pao-de-lo-1-.jpg',
    keys: ['pão de ló', 'pão-de-ló'],
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
    type: 'cake',
  },
  {
    ...formatMyFood(paprika as unknown as FoodMyFoodData),
    name: 'Páprica',
    icon: '/images/food/paprika.png',
    image:
      'https://images.unsplash.com/photo-1575319026763-726d092c26c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    keys: ['paprica', 'páprica doce', 'páprica picante'],
    type: 'powder',
  },
  {
    ...formatNacional(foodListNacional[377] as unknown as FoodNacional),
    name: 'Patinho',
    icon: '/images/food/meat-steak.svg',
    image:
      'https://s.cornershopapp.com/product-images/2660452.jpg?versionId=BnVK8BbjHmNiGVF3YvP8nYkZs4fDnYIr',
    keys: [
      'patinho',
      'carne moída',
      'patinho moído',
      'carne patinho',
      'carne de patinho',
    ],
    type: 'meat',
  },
  {
    ...formatNacional(foodListNacional[378] as unknown as FoodNacional),
    name: 'Patinho grelhado',
    icon: '/images/food/meat-steak.svg',
    image:
      'https://www.kitano.com.br/wp-content/uploads/2019/07/SSP_2546-Contra-file%E2%95%A0%C3%BC-na-manteiga-e-alecrim.jpg',
    keys: [
      'patinho grelhado',
      'patinho assado',
      'carne de patinho grelhado',
      'carne de patinho assado',
      'patinho assada',
      'patinho assado',
    ],
    type: 'meat',
  },
  {
    ...formatMyFood(chickenPasty as unknown as FoodMyFoodData),
    name: 'pastel',
    icon: '/images/food/pasty.svg',
    image:
      'https://s2.glbimg.com/w5pW4yBkSibfdkhkDE-GGVYd21I=/0x0:1080x608/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2021/P/A/rfLBcEQhizbQPhwoBQew/capas-para-materias-gshow-home-2-.jpg',
    description: 'pastel de frango, frito',
  },
  {
    name: 'Pavê de chocolate',
    image: 'https://cdn.panelinha.com.br/receita/1554734130093-_MGL7178.jpg',
    keys: [
      'torta de bolacha',
      'torta de bolacha maria',
      'torta de biscoito',
      'torta de biscoito maria',
      'pavê de bolacha',
      'pavê de bolacha maria',
      'pavê de chocolate',
      'pavê de biscoito',
      'pavê de biscoito maria',
      'pavê',
    ],
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
    type: 'meat',
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
    type: 'fruit',
  },
  {
    ...formatMyFood(pear as unknown as FoodMyFoodData),
    name: 'Pera',
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
    type: 'fruit',
    keys: ['pêra', 'pera'],
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
    type: 'meat',
  },
  {
    name: 'Peru de natal',
    image: 'https://cdn.panelinha.com.br/receita/1167789600000-Peru-assado.jpg',
    keys: ['peru assado', 'peru de natal'],
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
    type: 'powder',
  },
  {
    ...formatNacional(foodListNacional[144] as unknown as FoodNacional),
    name: 'Pimentão amarelo',
    icon: '/images/food/paprika.png',
    image:
      'https://agrodomingues.com.br/wp-content/uploads/2020/10/paprika-yellow-vegetables-318208.jpg',
    keys: ['pimentão amarelo', 'pimentões amarelos', 'pimentões amarelo'],
    oneMeasures: [
      {
        quantity: 215,
        type: 'UNITY',
      },
    ],
    type: 'fruit',
  },
  {
    ...formatNacional(foodListNacional[145] as unknown as FoodNacional),
    name: 'Pimentão verde',
    icon: '/images/food/paprika.png',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmkxpDwz0UbKAHT7Yp0Qfo_37-sxuk50wlBw&usqp=CAU',
    keys: ['pimentão', 'pimentão verde', 'pimentões verdes', 'pimentões'],
    oneMeasures: [
      {
        quantity: 215,
        type: 'UNITY',
      },
    ],
    type: 'fruit',
  },
  {
    ...formatNacional(foodListNacional[146] as unknown as FoodNacional),
    name: 'Pimentão vermelho',
    icon: '/images/food/paprika.png',
    image:
      'https://cdn.awsli.com.br/800x800/998/998380/produto/36868381/1c91e001cd.jpg',
    keys: ['pimentão vermelho', 'pimentões vermelhos', 'pimentões vermelho'],
    oneMeasures: [
      {
        quantity: 215,
        type: 'UNITY',
      },
    ],
    type: 'fruit',
  },
  {
    ...mergeWith(
      formatMyFood(cornRecipe as unknown as FoodMyFoodData),
      formatNacional(foodListNacional[61] as unknown as FoodNacional),
      verifyQuantity,
    ),
    name: 'Polenta',
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
    unitOfMeasurement: 'gram',
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
    type: 'meat',
  },
  {
    name: 'Pudim',
    description: `\
Seja de leite, de coco ou até de pão, uma das sobremesas que mais tem ligação com brasileiro é o pudim. Apesar de alguns indícios apontarem Portugal como seu berço, o pudim é um dos orgulhos e paixões nacionais. E é claro que este doce merecia um dia só dele: no dia 22 de Maio se comemora o Dia Nacional do Pudim.

Se por um lado é praticamente incontestável o quão delicioso um pudim pode ser, em relação à sua origem, há várias dúvidas. Os portugueses afirmam ser os criadores do pudim, no século XVI, porém há controvérsias, pois historiadores afirmam que não tem como saber exatamente onde e nem quando esse doce foi inventado.

Outra história conta que o pudim foi inventado por um abade português (cargo religioso acima do monge). Os relatos dão conta de que ele não divulgava a sua receita secreta para ninguém que ousasse perguntar. Com o sucesso do doce entre a população, ele pensou em fazer uma competição com outros confeiteiros, para ver se algum deles conseguia fazer o pudim perfeitamente.

No fim das contas, ninguém conseguiu fazer a receita exatamente igual, porém já tinham uma ideia de como chegar a algo relativamente próximo. A receita original só foi revelada após a morte do abade, quando seu caderno de receitas foi encontrado. Bem, se é lenda ou não, dificilmente saberemos.

A primeira vez que se tem registro de uma receita de pudim no Brasil, foi no “O Cozinheiro Imperial”, primeiro livro de cozinha editado no País, de 1840. A receita era de pudim de nata. Porém, a forma atual da receita é preparada com leite condensado (mais à frente falaremos especificamente dele).

O Dia Nacional do Pudim é comemorado em 22 de Maio. Porém, não há registros de quando, nem do porquê de a data ter sido criada. Em outros países, como nos Estados Unidos (que tem praticamente um dia para tudo), a iguaria também tem seu valor – como no dia 12/02, quando é celebrado o Dia Nacional do Pudim de Ameixa.
`,
    image:
      'https://cdn.panelinha.com.br/receita/955076400000-Pudim-de-leite.jpg',
    keys: ['pudim', 'pudim de leite', 'pudim de leite condensado'],
  },
];
