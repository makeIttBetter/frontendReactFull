import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <p>&copy; 2024 AiTripPlanner. All rights reserved by Flomad.</p>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            {/*<Link to="/privacy-policy-terms" className={styles.navLink}>
              Privacy Policy & Terms of Service
            </Link>*/}
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;