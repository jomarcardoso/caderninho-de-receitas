export type Language = 'en' | 'pt';

export type LanguageText = Record<Language, string>;

export interface LanguageTextAndPlural {
  text: LanguageText;
  pluralText: LanguageText;
}

export const I18N_TEXT: Record<string, LanguageText> = {
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
