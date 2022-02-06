import { Nutrient } from '../nutrient.constants';

export type MineralNick =
  | 'Na'
  | 'Ca'
  | 'P'
  | 'Mn'
  | 'Mg'
  | 'Fe'
  | 'K'
  | 'Cu'
  | 'Zn'
  | 'Se'
  | 'F';

export type MineralName =
  | 'Sódio'
  | 'Cálcio'
  | 'Fósforo'
  | 'Manganês'
  | 'Magnésio'
  | 'Ferro'
  | 'Potássio'
  | 'Cobre'
  | 'Zinco'
  | 'Selênio'
  | 'Flúor';

export type Mineral = Nutrient<MineralKey, MineralNick, MineralName>;

export interface Minerals {
  sodium: Mineral;
  calcium: Mineral;
  phosphorus: Mineral;
  manganese: Mineral;
  magnesium: Mineral;
  iron: Mineral;
  potassium: Mineral;
  copper: Mineral;
  zinc: Mineral;
  fluoride: Mineral;
  selenium: Mineral;
}

export type MineralKey = keyof Minerals;

export type MineralsData = Record<MineralKey, number>;

export const MINERAL: Mineral = {
  key: '',
  dv: 0,
  name: '',
  nick: '',
  quantity: 0,
  unity: 'mg',
};

export const MINERALS: Minerals = {
  calcium: MINERAL,
  copper: MINERAL,
  iron: MINERAL,
  magnesium: MINERAL,
  manganese: MINERAL,
  phosphorus: MINERAL,
  potassium: MINERAL,
  sodium: MINERAL,
  zinc: MINERAL,
  fluoride: MINERAL,
  selenium: MINERAL,
};

export const MINERALS_DATA: MineralsData = {
  calcium: 0,
  copper: 0,
  fluoride: 0,
  iron: 0,
  magnesium: 0,
  manganese: 0,
  phosphorus: 0,
  potassium: 0,
  sodium: 0,
  zinc: 0,
  selenium: 0,
};
