export type Language = 'en' | 'pt';

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
