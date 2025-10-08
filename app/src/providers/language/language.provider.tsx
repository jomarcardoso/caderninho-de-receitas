import { type FC, type HTMLProps, useEffect, useState } from 'react';
import { LanguageContext } from './language.context';
import { STORAGE_LANGUAGE } from '../../storage/storage.service';
import { StorageService } from '../../storage';
import { type Language } from 'services/language/language.types';

let initialLanguage: Language = 'pt';

if (typeof window !== 'undefined') {
  const languageLanguageJson = localStorage.getItem(STORAGE_LANGUAGE);

  initialLanguage = navigator.language.split('-')[0] as Language;

  if (languageLanguageJson) {
    initialLanguage = JSON.parse(languageLanguageJson) as Language;
  }
}

export const LanguageProvider: FC<HTMLProps<Element>> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    StorageService.setLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

