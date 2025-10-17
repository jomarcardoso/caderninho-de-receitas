import { I18N_TEXT } from '@common/services/language/language.data';

// i18n/transform.ts
export function getMessagesByLang(lang: string) {
  const messages: Record<string, string> = {};

  for (const key of Object.keys(I18N_TEXT)) {
    const translation = I18N_TEXT[key][lang];
    if (translation) messages[key] = translation;
  }

  return messages;
}
