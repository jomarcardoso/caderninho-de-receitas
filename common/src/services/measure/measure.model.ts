import type { LanguageTextAndPlural } from '../language/language.types';
import { MeasureType } from './measure.types';

export type Measure = LanguageTextAndPlural;

export type Measures = Partial<Record<MeasureType, number>>;
