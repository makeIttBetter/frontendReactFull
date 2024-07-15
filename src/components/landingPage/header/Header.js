import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLearnMoreNavigation = (to) => {
    navigate('/learn-more', { state: { targetId: to } });
  };

  const handleLandingNavigation = (to) => {
    navigate('/', { state: { targetId: to } });
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
  <header className={styles.header}>
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <h1 className="original-h1">AiTripPlanner</h1>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <a onClick={() => handleLearnMoreNavigation('features')} className={styles.linkButton}>
              Features
            </a>
          </li>
          <li>
            <a onClick={() => handleLandingNavigation('about')} className={styles.linkButton}>
              About
            </a>
          </li>
          <li>
            <a onClick={() => handleLandingNavigation('contact')} className={styles.linkButton}>
              Contact
            </a>
          </li>
        </ul>
        <a onClick={() => handleLogin()} className={styles.cta}>Start Planning</a>
      </nav>
    </div>
  </header>);
};

export default Header;
