import React from 'react';
import featureIcon1 from 'assets/places/borabora.jpg';
import featureIcon2 from 'assets/places/borabora.jpg';
import featureIcon3 from 'assets/places/borabora.jpg';
import featureIcon4 from 'assets/places/borabora.jpg';
import featureIcon5 from 'assets/places/borabora.jpg';
import featureIcon6 from 'assets/places/borabora.jpg';

const Features = ({ styles }) => (
  <section id={styles['features-extended']}>
    <div className={styles.container}>
      <h2>Features</h2>
      <div className={styles.feature}>
        <img src={featureIcon1} alt="Feature 1" />
        <h3>Custom Itineraries</h3>
        <p>Create personalized travel itineraries based on your preferences.</p>
      </div>
      <div className={styles.feature}>
        <img src={featureIcon2} alt="Feature 2" />
        <h3>Real-Time Updates</h3>
        <p>Get real-time updates on events and locations during your trip.</p>
      </div>
      <div className={styles.feature}>
        <img src={featureIcon3} alt="Feature 3" />
        <h3>Integration with Maps</h3>
        <p>Seamlessly integrate with maps for easy navigation.</p>
      </div>
      <div className={styles.feature}>
        <img src={featureIcon4} alt="Feature 4" />
        <h3>Personalized Itineraries</h3>
        <p>Get custom travel plans based on your preferences and interests.</p>
      </div>
      <div className={styles.feature}>
        <img src={featureIcon5} alt="Feature 5" />
        <h3>Event Recommendations</h3>
        <p>Find events and activities happening around your destination.</p>
      </div>
      <div className={styles.feature}>
        <img src={featureIcon6} alt="Feature 6" />
        <h3>Real-Time Assistance</h3>
        <p>Receive real-time help and suggestions during your travels.</p>
      </div>
    </div>
  </section>
);

export default Features;
