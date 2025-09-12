import { Language } from '../language/language.types';

export interface MeasurementUnit {
  type: number;
  text: Record<Language, string>;
  pluralText: Record<Language, string>;
}

export type MeasurementUnitResponse = MeasurementUnit;
