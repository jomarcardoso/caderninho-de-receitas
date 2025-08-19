import { createContext } from 'react';
import { Language } from '../../services/language/language.types';

export const LanguageContext = createContext<{
  language: Language;
  setLanguage?: React.Dispatch<React.SetStateAction<Language>>;
}>({ language: 'en' });
