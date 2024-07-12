import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <h1 className="original-h1">AiTripPlanner</h1>
        </div>
        <ul className={styles.navLinks}>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#" className={styles.cta}>Start Planning</a>
      </nav>
    </div>
  </header>
);

export default Header;
