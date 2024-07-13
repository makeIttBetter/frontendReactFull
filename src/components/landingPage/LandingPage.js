import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Landing from './landing/Landing';
import LearnMore from './learn-more/LearnMore';
import styles from './LandingPage.module.css';

const LandingPage = () => (
  <div className={styles.LandingPage}>
    <Header />
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/learn-more" element={<LearnMore />} />
    </Routes>
    <Footer />
  </div>
);

export default LandingPage;