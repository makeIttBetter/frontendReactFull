import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = ({toggleDarkMode, darkMode}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleLearnMoreNavigation = (to) => {
    navigate('/learn-more', { state: { targetId: to } });
  };

  const handleLandingNavigation = (to) => {
    navigate('/', { state: { targetId: to } });
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <header className={`${styles.header} ${darkMode ? styles.darkMode : ''} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.logo} onClick={() => handleLandingNavigation()}>
            <h1 className={`${styles.originalH1} ${styles.logoHoverEffect}`}>AiTripPlanner</h1>
          </div>
          <ul className={styles.navLinks}>
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
          <div className={styles.buttonContainer}>
            <Link to="/auth" className={styles.cta}>Log In</Link> {/* Updated to use Link */}
            <a href="#" className={styles.cta} onClick={toggleDarkMode}>DarkMode</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

