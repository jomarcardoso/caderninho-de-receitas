import { createContext } from 'react';
import { type Language } from '../../services/language/language.types';

export const LanguageContext = createContext<{
  language: Language;
  setLanguage?: React.Dispatch<React.SetStateAction<Language>>;
}>({ language: 'en' });
