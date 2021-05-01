export enum UnitOfMeasurement {
  gram,
  liter,
}

export const MeasurerValues = {
  CUP: 'xícara',
  TABLE_SPOON: 'colhar de sopa',
  TEA_SPOON: 'colher de chá',
  UNITY: 'unidade',
  UNITY_SMALL: 'unidade pequena',
  UNITY_LARGE: 'unidade grande',
  LITERAL: '',
  CAN: 'lata',
  BREAST: 'peito',
  CLOVE: 'dente',
};

export type Measurer = keyof typeof MeasurerValues;

export interface Measure {
  type: Measurer;
  quantity: number;
}

export const MEASURE: Measure = {
  type: 'LITERAL',
  quantity: 0,
};

export interface EssencialAminoAcids {
  methionine: number;
  leucine: number;
  isoleucine: number;
  lysine: number;
  phenylalanine: number;
  threonine: number;
  tryptophan: number;
  valine: number;
  histidine: number;
}

export interface NonEssencialAminoAcids {
  arginine: number;
  proline: number;
  glycine: number;
  glutamine: number;
  cystine: number;
  alanine: number;
  asparticAcid: number;
  glutamicAcid: number;
  serine: number;
  tyrosine: number;
}

export type AminoAcids = EssencialAminoAcids & NonEssencialAminoAcids;

export const AMINO_ACIDS: AminoAcids = {
  alanine: 0,
  arginine: 0,
  asparticAcid: 0,
  cystine: 0,
  glutamicAcid: 0,
  glutamine: 0,
  glycine: 0,
  histidine: 0,
  isoleucine: 0,
  leucine: 0,
  lysine: 0,
  methionine: 0,
  phenylalanine: 0,
  proline: 0,
  serine: 0,
  threonine: 0,
  tryptophan: 0,
  tyrosine: 0,
  valine: 0,
};

export interface Minerals {
  sodium: number;
  calcium: number;
  phosphorus: number;
  manganese: number;
  magnesium: number;
  iron: number;
  potassium: number;
  copper: number;
  zinc: number;
}

interface Vitamins {
  c?: number;
  b1?: number;
  b2?: number;
  b5?: number;
  b6?: number;
  b7?: number;
  b9?: number;
  folicAcid?: number;
  foodFolate?: number;
  folateDFE?: number;
  choline?: number;
  b12?: number;
  retinol?: number;
  betaCarotene?: number;
  alphaCarotene?: number;
  cryptoxanthinCarotene?: number;
  a?: number;
  lycopene?: number;
  e?: number;
  d?: number;
  d2?: number;
  d3?: number;
  k?: number;
  k1?: number;
}

export interface PureFood {
  id: number;
  name: string;
  description: string;
  enName: string;
  image: string;
  gi: number;
  calories: number;
  acidification: number;
  carbohydrates: number;
  proteins: number;
  saturedFats: number;
  monounsaturatedFats: number;
  totalFat: number;
  dietaryFiber: number;
  sugar: number;
  minerals: Partial<Minerals>;
  vitamins: Partial<Vitamins>;
  gl: number;
  aminoAcids: AminoAcids;
  unitOfMeasurement: UnitOfMeasurement;
  oneMeasures: Array<Measure>;
  keys: Array<string>;
}

export enum FoodVersions {
  RAW = 'RAW',
  JUICE = 'JUICE',
  BOILED = 'BOILED',
  FLOUR = 'FLOUR',
}

export type FoodVersion = keyof typeof FoodVersions;

export interface Food extends PureFood {
  flour: PureFood;
  boiled: PureFood;
  juice: PureFood;
}

export interface FoodData extends Partial<PureFood> {
  flour?: Partial<PureFood>;
  boiled?: Partial<PureFood>;
  juice?: Partial<PureFood>;
}

export const MINERALS: Minerals = {
  calcium: 0,
  copper: 0,
  iron: 0,
  magnesium: 0,
  manganese: 0,
  phosphorus: 0,
  potassium: 0,
  sodium: 0,
  zinc: 0,
};

export const VITAMINS: Vitamins = {
  a: 0,
  alphaCarotene: 0,
  b12: 0,
  b1: 0,
  b2: 0,
  b5: 0,
  b6: 0,
  b7: 0,
  b9: 0,
  betaCarotene: 0,
  c: 0,
  choline: 0,
  cryptoxanthinCarotene: 0,
  d2: 0,
  d3: 0,
  d: 0,
  e: 0,
  folateDFE: 0,
  folicAcid: 0,
  foodFolate: 0,
  k1: 0,
  k: 0,
  lycopene: 0,
  retinol: 0,
};

export enum TRANSLATED_AMINO_ACIDS {
  alanine = 'Alanina',
  arginine = 'Arginina',
  asparticAcid = 'Ácido Aspártico',
  cystine = 'Cistina',
  glutamicAcid = 'Ácido Glutâmico',
  glutamine = 'Glutamina',
  glycine = 'Glicina',
  histidine = 'Histidina',
  isoleucine = 'Isoleucina',
  leucine = 'Leucina',
  lysine = 'Lisina',
  methionine = 'Metionina',
  phenylalanine = 'Fenilalanina',
  proline = 'Prolina',
  serine = 'Serina',
  threonine = 'Treonina',
  tryptophan = 'Triptofano',
  tyrosine = 'Tirosina',
  valine = 'Valina',
}

export const PURE_FOOD: PureFood = {
  aminoAcids: AMINO_ACIDS,
  enName: '',
  id: 0,
  keys: [],
  name: '',
  acidification: 0,
  calories: 0,
  carbohydrates: 0,
  description: '',
  dietaryFiber: 0,
  sugar: 0,
  gi: 0,
  gl: 0,
  image: '',
  minerals: MINERALS,
  monounsaturatedFats: 0,
  oneMeasures: [],
  proteins: 0,
  saturedFats: 0,
  totalFat: 0,
  unitOfMeasurement: UnitOfMeasurement.gram,
  vitamins: VITAMINS,
};

export const FOOD: Food = {
  ...PURE_FOOD,
  boiled: PURE_FOOD,
  flour: PURE_FOOD,
  juice: PURE_FOOD,
};
