import { MINERALS, Minerals, MineralsData } from '../mineral';
import { VITAMINS, Vitamins, VitaminsData } from '../vitamin';

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
  SLICE: 'fatia',
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

export type AminoAcidsData = Partial<AminoAcids>;

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

export interface Food {
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

export const FOOD: Food = {
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
  cholesterol: 0,
  unitOfMeasurement: UnitOfMeasurement.gram,
  vitamins: VITAMINS,
  version: 'RAW',
  rawId: 0,
};
