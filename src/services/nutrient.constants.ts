import { WeightUnity } from './unity';

export interface Nutrient<TKey = string, TNick = string, TName = string> {
  key: TKey | '';
  nick: TNick | '';
  name: TName | '';
  unity: WeightUnity;
  dv: number;
  quantity: number;
}

export const NUTRIENT: Nutrient = {
  dv: 0,
  key: '',
  name: '',
  unity: 'mg',
  nick: '',
  quantity: 0,
};
