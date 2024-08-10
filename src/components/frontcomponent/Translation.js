import React, { useState } from 'react';
import axios from 'axios';

const Translation = ({ setTranslatedText }) => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [buttonText, setButtonText] = useState('Translate to');

  const handleLanguageChange = async (lang, langName) => {
    setSelectedLang(lang);
    setButtonText(langName);

    if (lang !== 'en') {
      const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
          'x-rapidapi-key': '3e0aa4e731msh0ba1212b897e872p11db74jsnce42fc7ddfeb', 
        },
        data: new URLSearchParams({
          source: 'en',
          q: 'Welcome to FarmCon, your number one online platform for buying and selling farm produce|Why Choose Us|At FarmCon, we understand the unique challenges and opportunities that Nigerian farmers face. That\'s why we\'ve created a platform specifically tailored to meet the needs of local farmers like you. Here are just a few reasons why you should choose FarmCon:|Seamless Selling Experience|With FarmCon, selling your goods is quick, easy, and hassle-free. Our user-friendly platform allows you to upload photos of your produce, set your prices, and connect with eager buyers from across Nigeria.|24/7 Support|As a FarmCon member, you\'ll have access to a wealth of resources and support to help you succeed. From marketing tips to agricultural advice, we\'re here to help you grow your business and achieve your goals.|Fair and Transparent Pricing|Our streamlined online platform makes shopping effortless, offering an intuitive browsing experience to find your perfect pieces with ease.|Empowering Local Farmers|FarmCon is committed to empowering Nigerian farmers by providing them with a direct avenue to showcase and sell their produce. We believe in the importance of supporting local agriculture and helping farmers thrive in their communities.|FarmCon - Your Simple Farming Solution|At FarmCon, we\'re here to offer a straightforward platform to help you kickstart your farming journey. As a budding farmer, you may not have a large team behind you, and that\'s okay. Here\'s what we bring to the table:|Easy Listing Process|List your farm produce quickly and effortlessly on FarmCon\'s platform. With just a few simple steps, you can showcase your goods to potential buyers without any hassle.|Transparent Transactions|Experience transparent transactions with FarmCon\'s secure payment system. We prioritize honesty and integrity in all our dealings, ensuring a fair and trustworthy marketplace for all.|User-Friendly Interface|Navigate FarmCon\'s user-friendly platform with ease. Our simple interface makes it easy to upload listings, connect with buyers, and manage your farm business efficiently, even with just one person.|Basic Farming Tips and Resources|Access basic farming tips and resources tailored for beginners. While we may not have a large team of experts, we strive to provide helpful information and guidance to support you along the way.',
          target: lang,
        }),
      };

      const response = await axios.request(options);
      const translations = response.data.data.translations[0].translatedText.split('|');

      setTranslatedText({
        welcome: translations[0],
        whyChooseUs: translations[1],
        whyChooseUsText: translations[2],
        seamlessSellingExperience: translations[3],
        seamlessSellingExperienceText: translations[4],
        support: translations[5],
        supportText: translations[6],
        pricing: translations[7],
        pricingText: translations[8],
        empoweringFarmers: translations[9],
        empoweringFarmersText: translations[10],
        simpleFarmingSolution: translations[11],
        simpleFarmingSolutionText: translations[12],
        listingProcess: translations[13],
        listingProcessText: translations[14],
        transactions: translations[15],
        transactionsText: translations[16],
        interface: translations[17],
        interfaceText: translations[18],
        tips: translations[19],
        tipsText: translations[20],
      });
    }
  };

  return (
    <div className="btn-group dropright translate">
      <button id="langSel" type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {buttonText}
      </button>
      <div className="dropdown-menu translate-option">
        <a className="dropdown-item" href="#" onClick={() => handleLanguageChange('en', 'English (default)')}>English (default)</a>
        <a className="dropdown-item" href="#" onClick={() => handleLanguageChange('it', 'Italian')}>Italian</a>
        <a className="dropdown-item" href="#" onClick={() => handleLanguageChange('es', 'Spanish')}>Spanish</a>
        <a className="dropdown-item" href="#" onClick={() => handleLanguageChange('de', 'German')}>German</a>
        <a className="dropdown-item" href="#" onClick={() => handleLanguageChange('yo', 'Yoruba')}>Yoruba</a>
      </div>
    </div>
  );
};

export default Translation;
