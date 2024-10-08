import React from 'react';
import featureIcon1 from 'assets/features/AI-chat.jpg';
import featureIcon2 from 'assets/features/clock.jpg';
import featureIcon3 from 'assets/features/navigation.jpg';
import featureIcon4 from 'assets/features/mapItinerary.jpg';
import featureIcon5 from 'assets/features/currency.png';
import styles from './Feature.module.css';

const destinations = [
  { image: featureIcon1, alt: "Instant Assistance", title: "Instant Assistance", subtitle: "Receive instant help and suggestions during your travels" },
  { image: featureIcon2, alt: "Real-Time Updates", title: "Real-Time Updates", subtitle: "Get real-time updates on weather and locations during your trip."},
  { image: featureIcon3, alt: "Integration with Maps", title: "Integration with Maps", subtitle:"Seamlessly integrate with maps for easy navigation." },
  { image: featureIcon4, alt: "Personalized Itineraries", title: "Personalized Itineraries" , subtitle:"Get custom travel plans based on your preferences and interests."},
  { image: featureIcon5, alt: "Currency Exchange", title: "Currency Exchange", subtitle: "Stay updated with the latest exchange rates."}
];

const ScrollableDestination = () => {
  return (
    <section id="scrollable-destination" className={styles['scrollable-destination']}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Enhance Your Travel Experience</h2>
        <div className={styles['image-container']}>
          {destinations.map((feature, index) => (
            <div
              key={index}
              className={styles['card']}
              style={{ backgroundImage: `url(${feature.image})` }}
            >
              <div className={styles['card-info']}>
                <div className={styles['card-title']}>{feature.title}</div>
                <div className={styles['card-subtitle']}>{feature.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollableDestination;

/*const Features = () => {
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
              Get real-time updates on weather and locations during your trip.
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
              <strong>Currency Exchange </strong><br />
              Stay updated with the latest exchange rates to manage your travel budget effectively.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
*/