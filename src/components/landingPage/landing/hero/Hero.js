import React from 'react';
import styles from './Hero.module.css';

const Hero = ({ navigate }) => {
  const handleLearnMoreClick = () => {
    navigate('/learn-more');
  };

  return (
    <div className={styles.container}> {/* Ensure this container is centered */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className="original-h2">AiTripPlanner for the perfect trip</h2>
          <p>Discover and plan your next adventure with our AI-powered trip planner chatbot.</p>
          {/*<a onClick={handleLearnMoreClick} className={styles.cta}>Learn More</a>*/}
        </div>
      </section>
    </div>
  );
};

export default Hero;