import React from 'react';
import styles from './Hero.module.css';

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.container}>
      <h2 className="original-h2">AiTripPlanner for the perfect trip</h2>
      <p>Discover and plan your next adventure with our AI-powered trip planner chatbot.</p>
      <a href="learn-more.html" className={styles.cta}>Learn More</a>
    </div>
  </section>
);

export default Hero;