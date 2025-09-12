import { Language } from '../language/language.types';

export interface Vitamin {
  index: number;
  name: Record<Language, string>;
  shortName: string;
  measurementUnit: string;
}

export interface Vitamins {
  a: Vitamin;
  alphaCarotene: Vitamin;
  b1: Vitamin;
  b2: Vitamin;
  b3: Vitamin;
  b5: Vitamin;
  b6: Vitamin;
  b7: Vitamin;
  b9: Vitamin;
  b11: Vitamin;
  b12: Vitamin;
  betaCarotene: Vitamin;
  c: Vitamin;
  choline: Vitamin;
  cryptoxanthinCarotene: Vitamin;
  d: Vitamin;
  d2: Vitamin;
  d3: Vitamin;
  e: Vitamin;
  k: Vitamin;
  lycopene: Vitamin;
  // folicAcid: Vitamin;
  // foodFolate: Vitamin;
  // folateDFE: Vitamin;
  // retinol: Vitamin;
  // k1: Vitamin;
}
