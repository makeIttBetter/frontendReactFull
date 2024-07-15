import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <p>&copy; 2024 AiTripPlanner. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;