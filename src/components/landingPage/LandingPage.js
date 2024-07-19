import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Landing from './landing/Landing';
import LearnMore from './learn-more/LearnMore';
import styles from './LandingPage.module.css';
import './styles/landingStyles.css';

  const LandingPage = () => {
    const [darkMode, setDarkMode] = useState(false);
  
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };
  
    return (
      <div className={`${styles.LandingPage} ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
        <Footer />
      </div>
    );
  };
  
  export default LandingPage;