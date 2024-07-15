import React, { useEffect } from 'react';
import MainSection from './MainSection';
import Features from './Feature';
import Screenshot from './Screenshot';
import Testimonials from './Testimonials';
import Download from './Download';
import styles from './LearnMore.module.css';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';

const LearnMore = () => {
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

  return (
    <div className={styles.LearnMore}>
      <MainSection styles={styles} />
      <Features styles={styles} />
      <Screenshot styles={styles} />
      <Testimonials styles={styles} />
      <Download styles={styles} />
    </div>
  );
};

export default LearnMore;