import {
  AminoAcids,
  AminoAcidsData,
  AMINO_ACIDS,
} from '../amino-acid/amino-acid.constants';
import { Language } from '../language/language.types';
import { MINERALS, Minerals, MineralsData } from '../mineral';
import { VITAMINS, Vitamins, VitaminsData } from '../vitamin';

export type UnitOfMeasurement = 'gram' | 'liter';

export const MeasurerValues = {
  CUP: 'xícara', // 0
  TABLE_SPOON: 'colhar de sopa', // 1
  TEA_SPOON: 'colher de chá', // 2
  UNITY: 'unidade', // 3
  UNITY_SMALL: 'unidade pequena', // 4
  UNITY_LARGE: 'unidade grande', // 5
  LITERAL: '', // 6
  CAN: 'lata', // 7
  GLASS: 'vidro', // 8
  BREAST: 'peito', // 9
  CLOVE: 'dente', // 10
  SLICE: 'fatia', // 11
  BUNCH: 'cacho', // 12
} as const;

export type MeasureType = keyof typeof MeasurerValues;

export interface Measure {
  type: MeasureType;
  quantity: number;
}

export interface MeasureData {
  type: number;
  quantity: number;
}

export const MEASURE: Measure = {
  type: 'LITERAL',
  quantity: 0,
};

export const FoodTypes = {
  LIQUID: 'liquid', // 0
  SEED: 'seed', // 1
  HERB: 'herb', // 2
  TEMPER: 'temper', // 3
  FRUIT: 'fruit', // 4
  SOLID: 'solid', // 5
  OIL: 'oil', // 6
  LEGUMEN: 'legumen', // 7
  FLAKE: 'flake', // 8
  ROOT: 'root', // 9
  MEAT: 'meat', // 10
  VEGETABLE: 'vegetable', // 11
  CAKE: 'cake', // 12
  CHEESE: 'cheese', // 13
  POWDER: 'powder', // 14
} as const;

export type FoodType = (typeof FoodTypes)[keyof typeof FoodTypes];

interface FoodBase {
  id: number;
  name: Record<Language, string>;
  description: Record<Language, string>;
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
  gl: number;
  keys: Array<string>;
  version: FoodVersion;
  rawId: number;
  recipe: boolean;
  icon: string;
  type: FoodType;
  unitOfMeasurement: UnitOfMeasurement;
  oneMeasures: Array<Measure>;
}

export interface Food extends FoodBase {
  aminoAcids: AminoAcids;
  minerals: Minerals;
  vitamins: Vitamins;
}

export interface FoodData
  extends Partial<
      Omit<
        FoodBase,
        | 'unitOfMeasurement'
        | 'oneMeasures'
        | 'keys'
        | 'type'
        | 'name'
        | 'description'
      >
    >,
    Partial<AminoAcidsData>,
    Partial<MineralsData>,
    Partial<VitaminsData> {
  unitOfMeasurement?: 0 | 1;
  oneMeasures?: Array<MeasureData>;
  keys?: string;
  type?: number;
  name?: string;
  description?: string;
  namePt?: string;
  descriptionPt?: string;
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
  aminoAcids: { ...AMINO_ACIDS },
  minerals: { ...MINERALS },
  vitamins: { ...VITAMINS },
  id: 0,
  keys: [],
  name: {
    en: '',
    pt: '',
  },
  acidification: 0,
  calories: 0,
  carbohydrates: 0,
  ashes: 0,
  description: {
    en: '',
    pt: '',
  },
  dietaryFiber: 0,
  sugar: 0,
  gi: 0,
  gl: 0,
  image: '',
  monounsaturatedFats: 0,
  polyunsaturatedFats: 0,
  oneMeasures: [],
  proteins: 0,
  saturedFats: 0,
  totalFat: 0,
  cholesterol: 0,
  unitOfMeasurement: 'gram',
  version: 'RAW',
  rawId: 0,
  recipe: false,
  icon: '',
  type: 'solid',
};
