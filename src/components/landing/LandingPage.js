import React from 'react';
import Header from './header/Header';
import Hero from './hero/Hero';
import MapSection from './mapSection/MapSection';
import ScrollableDestination from './scrollableDestination/ScrollableDestination';
import About from './about/About';
import Contact from './contact/Contact';
import Footer from './footer/Footer';
import styles from './LandingPage.module.css';

const LandingPage = () => (
  <div className={styles.LandingPage}>
    <Header />
    <Hero />
    <MapSection />
    <ScrollableDestination />
    <About />
    <Contact />
    <Footer />
  </div>
);

export default LandingPage;