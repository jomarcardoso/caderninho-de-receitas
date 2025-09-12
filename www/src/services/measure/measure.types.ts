import { Language } from '../language/language.types';

export interface MeasureTypeBase {
  type: number;
  text: Record<Language, string>;
}

export interface MeasureBase {
  type: number;
  quantity: number;
}
