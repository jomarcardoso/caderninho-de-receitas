import type { FoodData } from '../services/food';

export const hFoodData: Array<FoodData> = [
  {
    name: 'Hashweh',
    image:
      'https://cdn.panelinha.com.br/receita/1531406282006-corte%20arroz.jpg',
    description: 'arroz árabe',
    keys: [
      'arroz árabe',
      'hashweh',
      'arroz marroquino',
      'arroz árabe com carne',
      'arroz árabe com carne moída',
      'arroz árabe com especiarias',
      'arroz árabe com carne moída e especiarias',
    ],
  },
  {
    name: 'Hortelã',
    icon: '/images/food/mint.png',
    image:
      'https://images.unsplash.com/photo-1588908933351-eeb8cd4c4521?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    keys: ['hortelã', 'hortelãs', 'folha de hortelã', 'folhas de hortelã'],
    type: 'herb',
  },
];
