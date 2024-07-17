import React, { useEffect } from 'react';
import Screenshot from './Screenshot';
import Download from './Download';
import styles from './LearnMore.module.css';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';

const LearnMore = () => {
  useEffect(() => {
    // Your useEffect logic here if needed
  }, []);

  return (
    <div className={styles.LearnMore}>
      <Download styles={styles} />
      <Screenshot styles={styles} />
    </div>
  );
};

export default LearnMore;