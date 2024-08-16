// LanguageContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Language Context
const LanguageContext = createContext();

// Custom hook to use the Language Context
export const useLanguage = () => useContext(LanguageContext);

// Language Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang); // Save to localStorage
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
