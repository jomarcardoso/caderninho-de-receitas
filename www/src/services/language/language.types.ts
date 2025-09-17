export type Language = 'en' | 'pt';

export interface LanguageText {
  text: Record<Language, string>;
}

export interface LanguageTextAndPlural extends LanguageText {
  pluralText: Record<Language, string>;
}

export const I18N_TEXT: Record<string, Record<Language, string>> = {
  language: {
    en: 'language',
    pt: 'idioma',
  },
  english: {
    en: 'english',
    pt: 'inglês',
  },
  portuguese: {
    en: 'portuguese',
    pt: 'português',
  },
  logout: {
    en: 'logout',
    pt: 'sair',
  },
} as const;
