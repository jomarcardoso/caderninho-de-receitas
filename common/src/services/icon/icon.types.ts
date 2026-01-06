import type { LanguageText } from '../language/language.types';

export interface IconDto {
  name: LanguageText;
  url: string;
  keys?: LanguageText;
}

export interface Icon extends IconDto {
  id: number;
}
