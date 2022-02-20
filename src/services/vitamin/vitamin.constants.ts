import { Nutrient } from '../nutrient.constants';

type VitaminNick =
  | ''
  | 'C'
  | 'B1'
  | 'B2'
  | 'B3'
  | 'B5'
  | 'B6'
  | 'B7'
  | 'B9'
  | 'foodFolate'
  | 'folateDFE'
  | 'Colina'
  | 'B11'
  | 'B12'
  | 'retinol'
  | 'Betacaroteno'
  | 'Alfa caroteno'
  | 'Criptoxantina'
  | 'A'
  | 'Licopeno'
  | 'E'
  | 'D'
  | 'D₂'
  | 'D₃'
  | 'K'
  | 'K₁';

type VitaminName =
  | ''
  | 'Biotina'
  | 'Retinol'
  | 'Provitamina A'
  | 'Ácido ascórbico'
  | 'Colecalciferol'
  | 'Tocoferol'
  | 'Vitamina anti-hemorrágica'
  | 'Piridoxina'
  | 'Cobalamina'
  | 'Ácido pteroilheptaglutâmico'
  | 'Alfa-caroteno'
  | 'Tiamina'
  | 'Riboflavina'
  | 'Niacina'
  | 'Ácido pantotênico'
  | 'Biotina'
  | 'Ácido fólico ou folacina ou ácido pteroil-L-glutâmico ou folato'
  | 'Betacaroteno'
  | 'Colina'
  | 'Criptoxantina'
  | 'Ergocalciferol'
  | 'Filoquinona ou Fitomenadiona'
  | 'Licopeno';

export type Vitamin = Nutrient<VitaminKey, VitaminNick, VitaminName>;

export interface Vitamins {
  c: Vitamin;
  b1: Vitamin;
  b2: Vitamin;
  b3: Vitamin;
  b5: Vitamin;
  b6: Vitamin;
  b7: Vitamin;
  b9: Vitamin;
  // folicAcid: Vitamin;
  // foodFolate: Vitamin;
  // folateDFE: Vitamin;
  choline: Vitamin;
  b11: Vitamin;
  b12: Vitamin;
  // retinol: Vitamin;
  betaCarotene: Vitamin;
  alphaCarotene: Vitamin;
  cryptoxanthinCarotene: Vitamin;
  a: Vitamin;
  lycopene: Vitamin;
  e: Vitamin;
  d: Vitamin;
  d2: Vitamin;
  d3: Vitamin;
  k: Vitamin;
  // k1: Vitamin;
}

export type VitaminKey = keyof Vitamins;

export type VitaminsData = Record<VitaminKey, number>;

export const VITAMIN: Vitamin = {
  key: '',
  dv: 0,
  name: '',
  nick: '',
  quantity: 0,
  unity: 'mg',
};

export const VITAMINS: Vitamins = {
  a: VITAMIN,
  alphaCarotene: VITAMIN,
  b11: VITAMIN,
  b12: VITAMIN,
  b1: VITAMIN,
  b2: VITAMIN,
  b3: VITAMIN,
  b5: VITAMIN,
  b6: VITAMIN,
  b7: VITAMIN,
  b9: VITAMIN,
  betaCarotene: VITAMIN,
  c: VITAMIN,
  choline: VITAMIN,
  cryptoxanthinCarotene: VITAMIN,
  d2: VITAMIN,
  d3: VITAMIN,
  d: VITAMIN,
  e: VITAMIN,
  // folateDFE: VITAMIN,
  // folicAcid: VITAMIN,
  // foodFolate: VITAMIN,
  // k1: VITAMIN,
  k: VITAMIN,
  lycopene: VITAMIN,
  // retinol: VITAMIN,
};

export const VITAMINS_DATA: VitaminsData = {
  a: 0,
  alphaCarotene: 0,
  b1: 0,
  b11: 0,
  b12: 0,
  b2: 0,
  b3: 0,
  b5: 0,
  b6: 0,
  b7: 0,
  b9: 0,
  betaCarotene: 0,
  c: 0,
  choline: 0,
  cryptoxanthinCarotene: 0,
  d: 0,
  d2: 0,
  d3: 0,
  e: 0,
  k: 0,
  // k1: 0,
  lycopene: 0,
};
