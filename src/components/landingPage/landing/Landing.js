import React, { useEffect } from 'react';
import Hero from './hero/Hero';
import MapSection from './mapSection/MapSection';
import ScrollableDestination from './scrollableDestination/ScrollableDestination';
import About from './about/About';
import Contact from './contact/Contact';
import styles from './Landing.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import Features from '../learn-more/Feature';
import Testimonials from '../learn-more/Testimonials';
import Download from '../learn-more/Download';
import MainSection from '../learn-more/MainSection';
import Screenshot from '../learn-more/Screenshot';

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
    <Features styles={styles} />
    <Screenshot styles={styles} />
    <MainSection styles={styles} />
    <MapSection />
    <ScrollableDestination styles={styles} />
    <Testimonials styles={styles} />
    <Download styles={styles} />
    <About />
    <Contact />
  </div>);
};

export default Landing;