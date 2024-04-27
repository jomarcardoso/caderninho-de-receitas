import { FoodMyFoodData, FoodNacional } from './db.types';
import type { FoodData } from '../services/food';
import { formatMyFood, formatNacional } from './utils';
import foodListNacional from './src/cadastro-nacional/food-list.json';
import { edamCheese } from './src';

export const qFoodData: Array<FoodData> = [
  {
    ...formatMyFood(edamCheese as unknown as FoodMyFoodData),
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
    keys: ['queijo edam'],
    type: 'cheese',
  },
  {
    ...formatNacional(foodListNacional[462] as unknown as FoodNacional),
    name: 'Queijo muçarela',
    icon: '/images/food/cheese.svg',
    image:
      'https://www.alimentosonline.com.br/fotos_artigos/6253/mussarela.jpg',
    keys: [
      'queijo',
      'queijo muçarela',
      'muçarela',
      'mozarela',
      'mozzarella',
      'queijo mozarela',
    ],
    type: 'cheese',
  },
  {
    ...formatNacional(foodListNacional[460] as unknown as FoodNacional),
    name: 'Queijo minas frescal',
    icon: '/images/food/cheese.svg',
    image:
      'https://img.itdg.com.br/tdg/images/blog/uploads/2018/09/queijo-minas-frescal.jpg?w=1200',
    keys: ['queijo minas frescal', 'queijos minas frescal'],
    type: 'cheese',
  },
  {
    ...formatNacional(foodListNacional[461] as unknown as FoodNacional),
    name: 'Queijo minas meia cura',
    icon: '/images/food/cheese.svg',
    image:
      'https://a-static.mlcdn.com.br/618x463/queijo-minas-canastra-meia-cura-legitimo-aprox-1-1-kg-canastra-redondo/emporiosantos/64b02c56a37d11ebbdbe4201ac1850f5/b27b602ba98eee6be92600c23b35c8f0.jpg',
    keys: ['queijo minas'],
    type: 'cheese',
  },
  {
    ...formatNacional(foodListNacional[463] as unknown as FoodNacional),
    name: 'Queijo parmesão',
    icon: '/images/food/cheese.svg',
    image:
      'https://a-static.mlcdn.com.br/618x463/queijo-minas-canastra-meia-cura-legitimo-aprox-1-1-kg-canastra-redondo/emporiosantos/64b02c56a37d11ebbdbe4201ac1850f5/b27b602ba98eee6be92600c23b35c8f0.jpg',
    keys: ['queijo minas'],
    type: 'cheese',
  },
  {
    ...formatNacional(foodListNacional[464] as unknown as FoodNacional),
    name: 'Queijo parmesão',
    icon: '/images/food/cheese.svg',
    image:
      'https://a-static.mlcdn.com.br/618x463/queijo-minas-canastra-meia-cura-legitimo-aprox-1-1-kg-canastra-redondo/emporiosantos/64b02c56a37d11ebbdbe4201ac1850f5/b27b602ba98eee6be92600c23b35c8f0.jpg',
    keys: ['queijo minas'],
    type: 'cheese',
  },
  {
    ...formatNacional(foodListNacional[465] as unknown as FoodNacional),
    name: 'Queijo petit suisse',
    icon: '/images/food/yoghurt.png',
    image:
      'https://storage.googleapis.com/imagens_videos_gou_cooking_prod/production/cooking/cropped_temp_32983750954cf8fe02e36d0.12560684_.jpg',
    keys: ['queijo petit suisse', 'petit suisse', 'danone', 'danoninho'],
    type: 'cheese',
  },
  {
    ...formatNacional(foodListNacional[466] as unknown as FoodNacional),
    name: 'Queijo prato',
    icon: '/images/food/cheese.svg',
    image:
      'https://www.casamissao.com.br/wp-content/uploads/2020/12/queijo-prato-fatiado.jpg',
    keys: ['queijo prato'],
    type: 'cheese',
  },
  {
    ...formatNacional(foodListNacional[441] as unknown as FoodNacional),
    name: 'Quibe assado',
    icon: '/images/food/cake.svg',
    image: 'https://cdn.panelinha.com.br/receita/1564765785453-quibe.jpg',
    keys: ['quibe assado'],
    type: 'solid',
  },
  {
    ...formatNacional(foodListNacional[443] as unknown as FoodNacional),
    name: 'Quibe frito',
    icon: '/images/food/quibe.png',
    image:
      'https://salgadosdesucesso.com.br/wp-content/uploads/2019/02/receita-de-quibe-frito-1200x900.jpg',
    keys: ['quibe frito', 'quibe'],
    type: 'solid',
  },
  {
    ...formatNacional(foodListNacional[468] as unknown as FoodNacional),
    name: 'Ricota',
    icon: '/images/food/ricotta.png',
    image:
      'https://www.thespruceeats.com/thmb/0SFkKV13vXlNq4T_uq6IpmZUrAY=/2123x1415/filters:fill(auto,1)/106908888-58aefb225f9b58a3c9287cf3.jpg',
    keys: ['queijo ricota', 'ricotta'],
    type: 'cheese',
  },
];
