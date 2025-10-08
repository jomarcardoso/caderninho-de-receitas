import { I18N_TEXT } from './language.data';
import { type Language } from './language.types';

export type TranslationKey = keyof typeof I18N_TEXT;

type Replacements = Record<string, string | number>;

export function translate(
  key: TranslationKey,
  language: Language,
  replacements: Replacements = {},
): string {
  const entry = I18N_TEXT[key];

  if (!entry) {
    return key;
  }

  const template = entry[language] ?? entry.en;

  return Object.entries(replacements).reduce(
    (accumulator, [replacementKey, value]) =>
      accumulator.replace(
        new RegExp(`{${replacementKey}}`, 'g'),
        String(value),
      ),
    template,
  );
}
