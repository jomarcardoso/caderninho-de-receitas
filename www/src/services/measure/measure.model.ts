import { LanguageTextAndPlural } from '../language/language.types';

export interface Measure extends LanguageTextAndPlural {
  quantity: number;
}
