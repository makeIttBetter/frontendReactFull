import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Landing from './landing/Landing';
import LearnMore from './learn-more/LearnMore';
import PrivacyPolicyTermsOfService from './landing/PrivacyPolicyTermsOfService/PrivacyPolicyTermsOfService';
import styles from './LandingPage.module.css';
// import './styles/landingStyles.css';

  const LandingPage = () => {
    // const [darkMode, setDarkMode] = useState(false);
  
    // const toggleDarkMode = () => {
    //   setDarkMode(!darkMode);
    // ${darkMode ? 'dark-mode' : 'light-mode'}
    // toggleDarkMode={toggleDarkMode} darkMode={darkMode}
    // };
  
    return (
      <div className={`${styles.LandingPage} `}>
        <Header/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/privacy-policy-terms" element={<PrivacyPolicyTermsOfService />}/>
        </Routes>
        <Footer />
      </div>
    );
  };
  
  export default LandingPage;