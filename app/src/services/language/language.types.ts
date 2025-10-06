export type Language = 'en' | 'pt';

export type LanguageText = Record<Language, string>;

export interface LanguageTextAndPlural {
  text: LanguageText;
  pluralText: LanguageText;
}
