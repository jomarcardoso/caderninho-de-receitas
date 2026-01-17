import {
  AminoAcids,
  AminoAcidsData,
  AMINO_ACIDS,
} from '../amino-acid/amino-acid.constants';
import { MINERALS, Minerals, MineralsData } from '../mineral';
import { VITAMINS, Vitamins, VitaminsData } from '../vitamin';

export type UnitOfMeasurement = 'gram' | 'liter';

export const MeasurerValues = {
  CUP: 'xícara',
  TABLE_SPOON: 'colhar de sopa',
  TEA_SPOON: 'colher de chá',
  UNITY: 'unidade',
  UNITY_SMALL: 'unidade pequena',
  UNITY_LARGE: 'unidade grande',
  LITERAL: '',
  CAN: 'lata',
  GLASS: 'vidro',
  BREAST: 'peito',
  CLOVE: 'dente',
  SLICE: 'fatia',
  BUNCH: 'cacho',
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

export type FoodType =
  | 'liquid'
  | 'seed'
  | 'herb'
  | 'temper'
  | 'fruit'
  | 'solid'
  | 'oil'
  | 'legumen'
  | 'flake'
  | 'root'
  | 'meat'
  | 'vegetable'
  | 'cake'
  | 'cheese'
  | 'powder';

export interface Food {
  id: number;
  name: string;
  description: string;
  image: string;
  gi: number;
  calories: number;
  acidification: number;
  carbohydrates: number;
  ashes: number;
  proteins: number;
  saturedFats: number;
  monounsaturatedFats: number;
  polyunsaturatedFats: number;
  cholesterol: number;
  totalFat: number;
  dietaryFiber: number;
  sugar: number;
  minerals: Minerals;
  vitamins: Vitamins;
  gl: number;
  aminoAcids: AminoAcids;
  unitOfMeasurement: UnitOfMeasurement;
  oneMeasures: Array<Measure>;
  keys: Array<string>;
  version: FoodVersion;
  rawId: number;
  recipe: boolean;
  icon: string;
  type: FoodType;
}

export interface FoodData
  extends Partial<Omit<Food, 'minerals' | 'vitamins' | 'aminoAcids'>> {
  minerals?: MineralsData;
  vitamins?: VitaminsData;
  aminoAcids?: AminoAcidsData;
}

export enum FoodVersions {
  RAW = 'cru',
  JUICE = 'suco',
  BOILED = 'cozinhado',
  FLOUR = 'farinha integral',
  REFINED_FLOUR = 'farinha refinada',
}

export type FoodVersion = keyof typeof FoodVersions;

export const FOOD: Food = {
  aminoAcids: AMINO_ACIDS,
  id: 0,
  keys: [],
  name: '',
  acidification: 0,
  calories: 0,
  carbohydrates: 0,
  ashes: 0,
  description: '',
  dietaryFiber: 0,
  sugar: 0,
  gi: 0,
  gl: 0,
  image: '',
  minerals: MINERALS,
  monounsaturatedFats: 0,
  polyunsaturatedFats: 0,
  oneMeasures: [],
  proteins: 0,
  saturedFats: 0,
  totalFat: 0,
  cholesterol: 0,
  unitOfMeasurement: 'gram',
  vitamins: VITAMINS,
  version: 'RAW',
  rawId: 0,
  recipe: false,
  icon: '',
  type: 'solid',
};
