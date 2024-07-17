import React from 'react';
import featureIcon1 from 'assets/places/borabora.jpg';
import featureIcon2 from 'assets/places/borabora.jpg';
import featureIcon3 from 'assets/places/borabora.jpg';
import featureIcon4 from 'assets/places/borabora.jpg';
import featureIcon5 from 'assets/places/borabora.jpg';
import styles from './Feature.module.css'; // Ensure correct import path

const Features = () => {
  return (
    <section id='scrollable-destination' className={`${styles['scrollable-destination']} ${styles['flex-container']}`}>
      <div className={styles.container}>
        <h2 className='original-h2'>Enhance Your Travel Experience!</h2>
        <div className={styles['image-container']}>
          <div className={styles['image-box']}>
            <img src={featureIcon1} alt="Feature 1" />
            <div className={styles.description}>
              <strong>Instant Assistance</strong><br />
              Receive instant help and suggestions during your travels.
            </div>
          </div>
          <div className={styles['image-box']}>
            <img src={featureIcon2} alt="Feature 2" />
            <div className={styles.description}>
              <strong>Real-Time Updates</strong><br />
              Get real-time updates on events and locations during your trip.
            </div>
          </div>
          <div className={styles['image-box']}>
            <img src={featureIcon3} alt="Feature 3" />
            <div className={styles.description}>
              <strong>Integration with Maps</strong><br />
              Seamlessly integrate with maps for easy navigation.
            </div>
          </div>
          <div className={styles['image-box']}>
            <img src={featureIcon4} alt="Feature 4" />
            <div className={styles.description}>
              <strong>Personalized Itineraries</strong><br />
              Get custom travel plans based on your preferences and interests.
            </div>
          </div>
          <div className={styles['image-box']}>
            <img src={featureIcon5} alt="Feature 5" />
            <div className={styles.description}>
              <strong>Event Recommendations</strong><br />
              Find events and activities happening around your destination.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
