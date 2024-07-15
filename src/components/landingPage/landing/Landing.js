import React, { useEffect } from 'react';
import Header from '../header/Header';
import Hero from './hero/Hero';
import MapSection from './mapSection/MapSection';
import ScrollableDestination from './scrollableDestination/ScrollableDestination';
import About from './about/About';
import Contact from './contact/Contact';
import Footer from '../footer/Footer';
import styles from './Landing.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';

const Landing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.targetId) {
      scroller.scrollTo(location.state.targetId, {
        duration: 500,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }
  }, [location]);

  return (<div className={styles.Landing}>
    <Hero navigate={navigate} />
    <MapSection />
    <ScrollableDestination />
    <About />
    <Contact />
  </div>);
};

export default Landing;