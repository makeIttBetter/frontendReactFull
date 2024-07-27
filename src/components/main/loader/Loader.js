// Loader.js
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles['loader-container']}>
      <ThreeDots
        height="40"
        width="40"
        color="var(--theme-color)"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;