'use client';

import { createContext } from 'react';

export type Language = 'en' | 'pt';

export const LanguageContext = createContext<{
  language: Language;
  setLanguage?: React.Dispatch<React.SetStateAction<Language>>;
}>({ language: 'en' });