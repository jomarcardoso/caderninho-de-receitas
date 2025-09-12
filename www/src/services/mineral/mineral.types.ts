import { Language } from '../language/language.types';

export interface Mineral {
  index: number;
  name: Record<Language, string>;
  shortName: string;
  measurementUnit: string;
}
