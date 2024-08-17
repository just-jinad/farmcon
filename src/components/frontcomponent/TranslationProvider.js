import React, { useState, createContext } from 'react';
import axios from 'axios';

const TranslationContext = createContext();

const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  const switchLanguage = async (lang) => {
    setLanguage(lang);

    const keys = ['welcome_message', 
      'welcome_message2',
      'card1Title',
      'card1Description',
      'card2Title',
      'card2Description',
      'card3Title',
      'card3Description',
      'homeSec1Title',
      'homeSec1Description',
      'homeSec1Description2',
      'homeSec2Title',
      'homeSec2Description',
      'homeSec2Aim',
      'homeSec2Aim2',
      'homeSec2Aim3',
      'homeSec3',
      'signup',
      'login',
      'logout',
      'about',
      'aboutChild',
      'aboutChild2',
      'aboutChild3',
      'logoutQue',
      'logoutQue2',
      'logoutQue3',
      // Signup translations
      'signupWords',
      'typewriter',
      'question1',
      'signupCall',
      'question2',
      'email',
      'password',


      'contact_us', 
      'description']; // Add your keys here
    try {
      const response = await axios.post('http://localhost:8888/translate', {
        keys,
        language: lang,
      });
      setTranslations(response.data);
    } catch (error) {
      console.error('Error fetching translations:', error);
    }
  };

  return (
    <TranslationContext.Provider value={{ language, translations, switchLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export { TranslationContext, TranslationProvider };
