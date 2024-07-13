import React from 'react';
import styles from './About.module.css';

const About = () => (
  <section id="about" className={`${styles.about} ${styles['flex-container']}`}>
    <div className={styles.container}>
      <h2 className="original-h2">About Us</h2>
      <p>We are passionate about making travel planning easy and enjoyable using the power of AI. Our chatbot is designed to assist you at every step of your journey, ensuring you have a memorable experience.</p>
    </div>
  </section>
);

export default About;