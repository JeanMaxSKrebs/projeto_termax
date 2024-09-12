// LanguageContext.js
import React, { createContext, useState, useContext } from 'react';
import { translations } from '../utils/translate.js'; // Supondo que você tenha um arquivo com traduções

export const LanguageContext = createContext({});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt'); // Define o idioma padrão como português

  const setLanguageAndTranslate = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const t = (key) => {
    return translations[language][key] || key; // Retorna a tradução ou a chave se não houver tradução
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageAndTranslate, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
