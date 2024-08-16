import React, { useContext, useEffect } from 'react';
// import { TranslationContext } from '../../../TranslationProvider';
import { TranslationContext } from '../../components/frontcomponent/TranslationProvider';


const Test = () => {
    const { translations, switchLanguage } = useContext(TranslationContext);

    useEffect(() => {
        switchLanguage('en'); // Load English translations initially
      }, []);
  return (
    <>
     <h1>{translations.welcome_message || 'Loading...'}</h1>
      <p>{translations.contact_us || 'Loading...'}</p>
      <p>{translations.description || 'Loading...'}</p>
      <button onClick={() => switchLanguage('yo')}>Switch to Yoruba</button>
      <button onClick={() => switchLanguage('en')}>Switch to English</button>

      <p>Hello welcome to our page</p>
    </>
  )
}

export default Test